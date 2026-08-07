import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import { SiteFooter } from '@/components/blocks/sections'
import { BlogPageClient } from './BlogPageClient'

const title = 'Blog'
const description =
  'Artículos sobre desarrollo web, diseño de productos, integración de IA e infraestructura. Recursos para founders y equipos tech en El Salvador y LATAM.'
const url = `${SITE_URL}/blog`

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'blog agencia digital El Salvador',
    'artículos desarrollo web El Salvador',
    'agencia software El Salvador',
    'recursos founders El Salvador',
    'desarrollo SaaS Next.js Supabase',
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    images: [
      {
        url: '/OPimage.png',
        width: 1200,
        height: 630,
        alt: 'Numen Agency — Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/OPimage.png'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: title, item: url },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <BlogPageClient />
      <SiteFooter />
    </>
  )
}
