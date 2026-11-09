'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { IndexSection, INDEX_ASIDE_LINK, PageIntro } from '@/components/blocks/index-section'
import { LiveProjectsSection } from '@/components/blocks/sections'
import { useLang } from '@/lib/lang'

export function ProjectsPageContent() {
  const { lang } = useLang()
  const copy = lang === 'en' ? {
    label: 'Selected work / Numen',
    title: 'From a first sketch to the real world.',
    description: 'Websites, platforms, and digital products. A look at what happens when strategy, design, and development share the same table.',
    ctaTitle: 'Your idea could be next.',
    ctaDescription: 'Tell us what you want to build. We will help you find the right place to start.',
    contact: 'Tell us about your idea',
    process: 'See how we work',
  } : {
    label: 'Trabajo seleccionado / Numen',
    title: 'Del primer boceto al mundo real.',
    description: 'Sitios, plataformas y productos digitales. Una mirada a lo que pasa cuando estrategia, diseño y desarrollo se sientan en la misma mesa.',
    ctaTitle: 'Tu idea podría ser la siguiente.',
    ctaDescription: 'Cuéntanos qué quieres construir. Te ayudamos a encontrar por dónde empezar.',
    contact: 'Cuéntanos tu idea',
    process: 'Conoce nuestro proceso',
  }

  return (
    <>
      <PageIntro label={copy.label} title={copy.title} description={copy.description} />
      <LiveProjectsSection />
      <IndexSection
        id="contact"
        title={copy.ctaTitle}
        intro={copy.ctaDescription}
        aside={
          <div className="flex flex-wrap gap-x-6">
            <Link href="/#contact" className={INDEX_ASIDE_LINK}>
              {copy.contact}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link href="/#process" className={INDEX_ASIDE_LINK}>{copy.process}</Link>
          </div>
        }
      />
    </>
  )
}
