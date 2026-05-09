import { NextRequest, NextResponse } from 'next/server'

const BREVO_API = 'https://api.brevo.com/v3/smtp/email'

function buildEmailHtml(data: {
  name: string
  email: string
  budget: string
  message: string
}): string {
  const budgetLabels: Record<string, string> = {
    under5k: 'Under $5k',
    '5-15k': '$5k – $15k',
    '15-50k': '$15k – $50k',
    '50k+': '$50k+',
  }
  const budget = budgetLabels[data.budget] ?? data.budget ?? 'Not specified'

  const field = (label: string, value: string) => `
    <tr>
      <td style="padding:0 0 16px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:16px;border:1px solid rgba(255,255,255,0.08);border-radius:12px;background:rgba(255,255,255,0.02);">
              <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);font-family:'Plus Jakarta Sans',system-ui,sans-serif;">${label}</p>
              <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;font-family:'Plus Jakarta Sans',system-ui,sans-serif;white-space:pre-wrap;">${value}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New project inquiry</title>
</head>
<body style="margin:0;padding:0;background:#000000;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- top bar -->
          <tr>
            <td style="padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.25);font-family:'Plus Jakarta Sans',system-ui,sans-serif;">Numen Agency</span>
                  </td>
                  <td align="right">
                    <span style="font-size:10px;color:rgba(255,255,255,0.15);font-family:'Plus Jakarta Sans',system-ui,sans-serif;">Contact Form</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- heading -->
          <tr>
            <td style="padding:32px 0 28px;">
              <h1 style="margin:0;font-size:26px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;font-family:'Plus Jakarta Sans',system-ui,sans-serif;">New project inquiry</h1>
              <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.35);line-height:1.6;font-family:'Plus Jakarta Sans',system-ui,sans-serif;">
                ${data.name} sent a message through the contact form.
              </p>
            </td>
          </tr>

          <!-- fields -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${field('Name', data.name)}
                ${field('Email', data.email)}
                ${field('Budget', budget)}
                ${field('Message', data.message)}
              </table>
            </td>
          </tr>

          <!-- reply CTA -->
          <tr>
            <td style="padding-top:8px;padding-bottom:32px;">
              <a href="mailto:${data.email}" style="display:inline-block;padding:12px 24px;background:#ffffff;color:#000000;font-size:13px;font-weight:600;font-family:'Plus Jakarta Sans',system-ui,sans-serif;text-decoration:none;border-radius:100px;">Reply to ${data.name}</a>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);font-family:'Plus Jakarta Sans',system-ui,sans-serif;">
                © ${new Date().getFullYear()} Numen Agency · El Salvador · Remote worldwide
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

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

  const payload = {
    sender: { name: 'Numen Agency Website', email: 'hola@numenagency.com' },
    to: [{ email: 'hola@numenagency.com', name: 'Numen Agency' }],
    replyTo: { email: email.trim(), name: name.trim() },
    subject: `New inquiry from ${name.trim()}`,
    htmlContent: buildEmailHtml({ name: name.trim(), email: email.trim(), budget, message: message.trim() }),
  }

  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Brevo error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
