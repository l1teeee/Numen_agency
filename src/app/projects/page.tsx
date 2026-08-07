import type { Metadata } from 'next'
import { Navbar } from '@/components/blocks/navbar'
import { LiveProjectsSection, SiteFooter } from '@/components/blocks/sections'
import { SITE_URL } from '@/lib/site'

const title = 'Live Projects'
const description = 'All products built by Numen Agency currently deployed and running in production.'
const url = `${SITE_URL}/projects`

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'proyectos Numen Agency',
    'construir MVP El Salvador',
    'casos de éxito desarrollo web El Salvador',
    'portafolio agencia digital El Salvador',
    'productos SaaS El Salvador',
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
        alt: 'Numen Agency — Proyectos en producción',
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

export default function ProjectsPage() {
  return (
    <div className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <Navbar alwaysVisible />
      <main className="flex min-h-screen flex-col">
        <LiveProjectsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
