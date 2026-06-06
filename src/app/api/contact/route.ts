import { NextRequest, NextResponse } from 'next/server'
import { render } from 'react-email'
import { createElement } from 'react'
import { ContactConfirmationEmail, ContactInquiryEmail } from '@/emails/contact-inquiry'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const BREVO_API    = 'https://api.brevo.com/v3/smtp/email'
const CONTACT_EMAIL = 'contact@delta-numen.com'

const ALLOWED_ORIGINS = new Set([
  'https://delta-numen.com',
  'https://www.delta-numen.com',
])

const VALID_BUDGETS = new Set(['under1k', '1-5k', '5-10k', '10k+'])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// ─── Allowed origins ──────────────────────────────────────────
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  if (ALLOWED_ORIGINS.has(origin)) return true
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true
  return false
}

// ─── Rate limiting: 5 submissions per hour per IP ─────────────
let upstashLimiter: Ratelimit | null = null
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  upstashLimiter = new Ratelimit({
    redis: new Redis({
      url:   process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    prefix: 'rl:contact',
    analytics: false,
  })
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function inMemoryRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3_600_000 })
    return false
  }
  entry.count++
  return entry.count > 5
}

async function checkRateLimit(ip: string): Promise<{ limited: boolean; reset?: number }> {
  if (upstashLimiter) {
    const { success, reset } = await upstashLimiter.limit(ip)
    return { limited: !success, reset }
  }
  return { limited: inMemoryRateLimited(ip) }
}

// ─── Input sanitization ───────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')                        // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // strip control chars
    .trim()
}

export async function POST(req: NextRequest) {
  // Origin check (CSRF protection)
  const origin = req.headers.get('origin')
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Content-Type check
  const ct = req.headers.get('content-type') ?? ''
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
  }

  // IP rate limit
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const { limited, reset } = await checkRateLimit(ip)
  if (limited) {
    const headers: Record<string, string> = { 'Retry-After': '3600' }
    if (reset) headers['X-RateLimit-Reset'] = String(Math.ceil(reset / 1000))
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Honeypot — bots fill this hidden field, real users don't see it
  // Return 200 silently so bots believe submission succeeded
  if (body.website) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, budget, message } = body

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ error: 'Invalid fields' }, { status: 400 })
  }

  const cleanName    = sanitize(name)
  const cleanEmail   = sanitize(email).toLowerCase()
  const cleanMessage = sanitize(message)
  const cleanBudget  = typeof budget === 'string' ? sanitize(budget) : ''

  if (!cleanName || cleanName.length > 100) {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
  }
  if (!cleanEmail || cleanEmail.length > 254 || !EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!cleanMessage || cleanMessage.length > 2000) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
  }
  if (cleanBudget && !VALID_BUDGETS.has(cleanBudget)) {
    return NextResponse.json({ error: 'Invalid budget' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const emailData = { name: cleanName, email: cleanEmail, budget: cleanBudget, message: cleanMessage }
  const inquiryTemplate      = createElement(ContactInquiryEmail, emailData)
  const confirmationTemplate = createElement(ContactConfirmationEmail, { name: cleanName })

  const [htmlContent, textContent, confirmationHtml, confirmationText] = await Promise.all([
    render(inquiryTemplate),
    render(inquiryTemplate, { plainText: true }),
    render(confirmationTemplate),
    render(confirmationTemplate, { plainText: true }),
  ])

  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender:  { name: 'Numen Website', email: CONTACT_EMAIL },
      to:      [{ email: CONTACT_EMAIL, name: 'Numen' }],
      replyTo: { email: cleanEmail, name: cleanName },
      subject: `New inquiry from ${cleanName}`,
      htmlContent,
      textContent,
    }),
  })

  if (!res.ok) {
    const brevoError = await res.json().catch(() => ({}))
    console.error('[contact] Brevo error:', res.status, JSON.stringify(brevoError))
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
  }

  // Fire-and-forget confirmation email to the sender
  void fetch(BREVO_API, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender:  { name: 'Numen', email: CONTACT_EMAIL },
      to:      [{ email: cleanEmail, name: cleanName }],
      replyTo: { email: CONTACT_EMAIL, name: 'Numen' },
      subject: 'We received your project inquiry',
      htmlContent: confirmationHtml,
      textContent: confirmationText,
    }),
  })

  return NextResponse.json({ ok: true })
}
