import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'

const VALID_BODY = {
  name: 'Ada Lovelace',
  email: 'Ada@Example.com',
  category: 'website',
  message: 'We need a new website.',
}

let ipCounter = 0

interface ContactRequestOptions {
  origin?: string | null
  contentType?: string
  ip?: string
  body?: unknown
}

function contactRequest(options: ContactRequestOptions = {}): NextRequest {
  const origin = options.origin === undefined ? 'https://delta-numen.com' : options.origin
  ipCounter += 1
  const headers: Record<string, string> = {
    'content-type': options.contentType ?? 'application/json',
    'x-forwarded-for': options.ip ?? `203.0.113.${ipCounter}`,
  }
  if (origin !== null) headers.origin = origin
  const body = options.body ?? VALID_BODY
  return new NextRequest('https://delta-numen.com/api/contact', {
    method: 'POST',
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

function sentBody(fetchMock: ReturnType<typeof vi.fn>, call: number): Record<string, unknown> {
  const init = fetchMock.mock.calls[call][1] as RequestInit
  return JSON.parse(init.body as string)
}

describe('POST /api/contact', () => {
  it('rejects a missing or foreign origin', async () => {
    const missing = await POST(contactRequest({ origin: null }))
    expect(missing.status).toBe(403)
    expect(await missing.json()).toEqual({ error: 'Forbidden' })

    const foreign = await POST(contactRequest({ origin: 'https://evil.example' }))
    expect(foreign.status).toBe(403)
  })

  it('rejects a non-JSON content type', async () => {
    const res = await POST(contactRequest({ contentType: 'text/plain' }))
    expect(res.status).toBe(415)
    expect(await res.json()).toEqual({ error: 'Invalid content type' })
  })

  it('rejects malformed JSON', async () => {
    const res = await POST(contactRequest({ body: '{bad json' }))
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid JSON' })
  })

  it('answers 200 to the honeypot without sending email', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await POST(
      contactRequest({ body: { ...VALID_BODY, website: 'http://spam.example' } }),
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects an invalid name', async () => {
    const res = await POST(contactRequest({ body: { ...VALID_BODY, name: '<b></b>' } }))
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid name' })
  })

  it('rejects an invalid email', async () => {
    const res = await POST(contactRequest({ body: { ...VALID_BODY, email: 'not-an-email' } }))
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid email' })
  })

  it('rejects a message over 2000 characters', async () => {
    const res = await POST(contactRequest({ body: { ...VALID_BODY, message: 'a'.repeat(2001) } }))
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid message' })
  })

  it('rejects an unknown category', async () => {
    const res = await POST(contactRequest({ body: { ...VALID_BODY, category: 'unknown' } }))
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid category' })
  })

  it('fails when the email service is not configured', async () => {
    vi.stubEnv('BREVO_API_KEY', '')
    const res = await POST(contactRequest())
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Email service not configured' })
  })

  it('sends the lead and the confirmation through Brevo', async () => {
    vi.stubEnv('BREVO_API_KEY', 'test-key')
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)

    const res = await POST(contactRequest())

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(2)

    const [leadUrl, leadInit] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(leadUrl).toBe('https://api.brevo.com/v3/smtp/email')
    expect((leadInit.headers as Record<string, string>)['api-key']).toBe('test-key')
    const lead = sentBody(fetchMock, 0)
    expect(lead.to).toContainEqual({ email: 'contact@delta-numen.com', name: 'Numen' })
    expect(lead.replyTo).toEqual({ email: 'ada@example.com', name: 'Ada Lovelace' })
    expect(lead.subject).toBe('New lead from Ada Lovelace')
    expect(lead.htmlContent).toBeTruthy()
    expect(lead.textContent).toBeTruthy()

    const confirmation = sentBody(fetchMock, 1)
    expect(confirmation.to).toEqual([{ email: 'ada@example.com', name: 'Ada Lovelace' }])
  })

  it('answers 502 when Brevo rejects the email', async () => {
    vi.stubEnv('BREVO_API_KEY', 'test-key')
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response('{"message":"bad"}', { status: 400 }))
    vi.stubGlobal('fetch', fetchMock)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    const res = await POST(contactRequest())

    expect(res.status).toBe(502)
    expect(await res.json()).toEqual({ error: 'Failed to send email' })
    expect(consoleError).toHaveBeenCalled()
  })

  it('rate limits the sixth request from one IP', async () => {
    const options = { ip: '198.51.100.7', body: { ...VALID_BODY, category: 'unknown' } }
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const res = await POST(contactRequest(options))
      expect(res.status).toBe(400)
    }
    const limited = await POST(contactRequest(options))
    expect(limited.status).toBe(429)
    expect(await limited.json()).toEqual({ error: 'Too many requests' })
    expect(limited.headers.get('Retry-After')).toBe('3600')
  })
})
