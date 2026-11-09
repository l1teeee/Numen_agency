'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { IndexEntry, IndexSection, INDEX_ASIDE_LINK, INDEX_GRID, PageIntro } from '@/components/blocks/index-section'
import { Navbar } from '@/components/blocks/navbar'
import { SiteFooter } from '@/components/blocks/sections'
import { useLang } from '@/lib/lang'

export function NotFoundContent() {
  const { lang, t } = useLang()
  const copy = t.doodles.notFound
  const editorial = lang === 'en' ? {
    label: 'A little detour',
    destinations: 'A few good places to land',
    work: 'Explore what we have built.',
    blog: 'Take an idea with you.',
    contact: 'Start a conversation',
    contactDesc: 'Tell us what is on your mind.',
  } : {
    label: 'Un pequeño desvío',
    destinations: 'Unos buenos lugares para aterrizar',
    work: 'Explora lo que hemos construido.',
    blog: 'Llévate una idea contigo.',
    contact: 'Inicia una conversación',
    contactDesc: 'Cuéntanos qué tienes en mente.',
  }
  const destinations = [
    { href: '/projects', title: t.nav.projectsLink, description: editorial.work },
    { href: '/blog', title: t.blog.label, description: editorial.blog },
    { href: '/#contact', title: editorial.contact, description: editorial.contactDesc },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageIntro label={`404 / ${editorial.label}`} title={copy.title} description={copy.desc} />
        <IndexSection
          id="destinations"
          title={editorial.destinations}
          aside={
            <Link href="/" className={INDEX_ASIDE_LINK}>
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              {copy.cta}
            </Link>
          }
        >
          <ol className={INDEX_GRID}>
            {destinations.map((destination, index) => (
              <IndexEntry key={destination.href} index={index} name={destination.title} desc={destination.description} href={destination.href} external={false} compact />
            ))}
          </ol>
        </IndexSection>
      </main>
      <SiteFooter />
    </div>
  )
}
