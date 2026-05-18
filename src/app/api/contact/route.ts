import { NextRequest, NextResponse } from 'next/server'
import { render } from 'react-email'
import { createElement } from 'react'
import { ContactConfirmationEmail, ContactInquiryEmail } from '@/emails/contact-inquiry'

const BREVO_API = 'https://api.brevo.com/v3/smtp/email'
const CONTACT_EMAIL = 'contact@delta-numen.com'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, budget, message } = body as {
    name: string
    email: string
    budget: string
    message: string
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  const emailData = {
    name: name.trim(),
    email: email.trim(),
    budget,
    message: message.trim(),
  }
  const inquiryTemplate = createElement(ContactInquiryEmail, emailData)
  const confirmationTemplate = createElement(ContactConfirmationEmail, { name: emailData.name })
  const [htmlContent, textContent, confirmationHtml, confirmationText] = await Promise.all([
    render(inquiryTemplate),
    render(inquiryTemplate, { plainText: true }),
    render(confirmationTemplate),
    render(confirmationTemplate, { plainText: true }),
  ])

  const inquiryPayload = {
    sender: { name: 'Numen Website', email: CONTACT_EMAIL },
    to: [{ email: CONTACT_EMAIL, name: 'Numen' }],
    replyTo: { email: emailData.email, name: emailData.name },
    subject: `New inquiry from ${emailData.name}`,
    htmlContent,
    textContent,
  }

  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inquiryPayload),
  })

  if (!res.ok) {
    const brevoError = await res.json().catch(() => ({}))
    console.error('[contact] Brevo error:', res.status, JSON.stringify(brevoError))
    return NextResponse.json({ error: 'Failed to send email', detail: brevoError }, { status: 502 })
  }

  await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Numen', email: CONTACT_EMAIL },
      to: [{ email: emailData.email, name: emailData.name }],
      replyTo: { email: CONTACT_EMAIL, name: 'Numen' },
      subject: 'We received your project inquiry',
      htmlContent: confirmationHtml,
      textContent: confirmationText,
    }),
  })

  return NextResponse.json({ ok: true })
}
