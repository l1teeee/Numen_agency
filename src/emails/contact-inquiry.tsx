import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email'
import type { ReactNode } from 'react'

export type ContactInquiryEmailProps = {
  name: string
  email: string
  company?: string
  phone?: string
  location?: string
  category?: string
  budget?: string
  message: string
}

const budgetLabels: Record<string, string> = {
  under1k: 'Under $1k',
  '1-5k': '$1k - $5k',
  '5-10k': '$5k - $10k',
  '10k+': '$10k+',
}

const categoryLabels: Record<string, string> = {
  website: 'Website / landing page',
  ecommerce: 'E-commerce',
  saas: 'SaaS / platform',
  ai: 'AI integration',
  automation: 'Automation',
  devops: 'DevOps / infrastructure',
  'product-design': 'Product design',
  consulting: 'Strategy / consulting',
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Section style={field}>
      <Text style={labelText}>{label}</Text>
      <Text style={fieldText}>{children}</Text>
    </Section>
  )
}

export function ContactInquiryEmail({
  name,
  email,
  company,
  phone,
  location,
  category,
  budget,
  message,
}: ContactInquiryEmailProps) {
  const formattedBudget = budget ? budgetLabels[budget] ?? budget : 'Not specified'
  const formattedCategory = category ? categoryLabels[category] ?? category : 'Not specified'

  return (
    <Html lang="en">
      <Head />
      <Preview>New lead from {name}</Preview>
      <Body style={body}>
        <Container style={container}>

          <Section style={topbar}>
            <Text style={brand}>Numen</Text>
            <Text style={eyebrow}>New Lead</Text>
          </Section>

          <Section style={intro}>
            <Heading as="h1" style={heading}>
              New project lead
            </Heading>
            <Text style={copy}>
              {name} created a new lead through the website form.
            </Text>
          </Section>

          <Field label="Name">{name}</Field>
          <Field label="Email">{email}</Field>
          {company && <Field label="Company">{company}</Field>}
          {phone && <Field label="Phone / WhatsApp">{phone}</Field>}
          <Field label="Location">{location || 'Not specified'}</Field>
          <Field label="Category">{formattedCategory}</Field>
          <Field label="Budget">{formattedBudget}</Field>
          <Field label="Message">{message}</Field>

          <Section style={ctaSection}>
            <Button href={`mailto:${email}`} style={button}>
              Reply to {name}
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            &copy; {new Date().getFullYear()} Numen &middot; El Salvador &middot; Remote worldwide
          </Text>

        </Container>
      </Body>
    </Html>
  )
}

export function ContactConfirmationEmail({ name }: Pick<ContactInquiryEmailProps, 'name'>) {
  return (
    <Html lang="en">
      <Head />
      <Preview>We received your message, {name}</Preview>
      <Body style={body}>
        <Container style={container}>

          <Section style={topbar}>
            <Text style={brand}>Numen</Text>
            <Text style={eyebrow}>Message Received</Text>
          </Section>

          <Section style={intro}>
            <Heading as="h1" style={heading}>
              Thanks, {name}.
            </Heading>
            <Text style={copy}>
              Your project details are in. We will review them and reply within 24 hours.
            </Text>
          </Section>

          <Field label="What happens next">
            We will review your message, assess the scope and constraints, then reach out to schedule a short discovery call.
          </Field>

          <Section style={ctaSection}>
            <Button href="mailto:contact@delta-numen.com" style={button}>
              Contact Numen
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            &copy; {new Date().getFullYear()} Numen &middot; El Salvador &middot; Remote worldwide
          </Text>

        </Container>
      </Body>
    </Html>
  )
}

// ─── Tokens ───────────────────────────────────────────────────

const font =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const body = {
  margin: 0,
  padding: 0,
  backgroundColor: '#080808',
  fontFamily: font,
}

const container = {
  width: '100%',
  maxWidth: '540px',
  margin: '0 auto',
  padding: '44px 28px',
}

const topbar = {
  paddingBottom: '32px',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
}

const brand = {
  display: 'inline-block',
  margin: 0,
  color: 'rgba(255,255,255,0.5)',
  fontFamily: font,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.3em',
  lineHeight: '16px',
  textTransform: 'uppercase' as const,
}

const eyebrow = {
  float: 'right' as const,
  margin: 0,
  color: 'rgba(255,255,255,0.22)',
  fontFamily: font,
  fontSize: '10px',
  letterSpacing: '0.04em',
  lineHeight: '16px',
}

const intro = {
  padding: '36px 0 8px',
}

const heading = {
  margin: 0,
  color: '#ffffff',
  fontFamily: font,
  fontSize: '30px',
  fontWeight: 600,
  letterSpacing: '-0.03em',
  lineHeight: '36px',
}

const copy = {
  margin: '12px 0 0',
  color: 'rgba(255,255,255,0.38)',
  fontFamily: font,
  fontSize: '14px',
  lineHeight: '22px',
}

// Editorial row: hairline top border, no background card
const field = {
  padding: '20px 0',
  borderTop: '1px solid rgba(255,255,255,0.07)',
}

const labelText = {
  margin: '0 0 6px',
  color: 'rgba(255,255,255,0.24)',
  fontFamily: font,
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  lineHeight: '13px',
  textTransform: 'uppercase' as const,
}

const fieldText = {
  margin: 0,
  color: 'rgba(255,255,255,0.78)',
  fontFamily: font,
  fontSize: '14px',
  lineHeight: '22px',
  whiteSpace: 'pre-wrap' as const,
}

const ctaSection = {
  padding: '28px 0 0',
}

const button = {
  display: 'inline-block',
  padding: '11px 24px',
  backgroundColor: '#ffffff',
  borderRadius: '999px',
  color: '#080808',
  fontFamily: font,
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  textDecoration: 'none',
}

const hr = {
  margin: '36px 0 20px',
  borderColor: 'rgba(255,255,255,0.07)',
}

const footer = {
  margin: 0,
  color: 'rgba(255,255,255,0.18)',
  fontFamily: font,
  fontSize: '11px',
  lineHeight: '18px',
}
