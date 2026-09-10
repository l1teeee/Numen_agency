'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { LiveProjectsSection } from '@/components/blocks/sections'
import { FounderSticker } from '@/components/ui/doodles/founder-sticker'
import { LaunchDoodle } from '@/components/ui/doodles/process'
import { ScribbleUnderline } from '@/components/ui/doodles/scribbles'
import { useLang } from '@/lib/lang'
import { useReducedMotion } from '@/lib/use-reduced-motion'

export function ProjectsPageContent() {
  const { lang } = useLang()
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const heroVisible = useInView(heroRef, { amount: 0.2 })
  const copy = lang === 'en' ? {
    label: 'Selected work / Numen',
    title: 'From a first sketch',
    accent: 'to the real world.',
    description: 'Websites, platforms, and digital products. A look at what happens when strategy, design, and development share the same table.',
    explore: 'Explore the products',
    note: 'Made to leave the notebook.',
    detail: 'Small details. Real products.',
    ctaTitle: 'Your idea could be next.',
    ctaDescription: 'Tell us what you want to build. We will help you find the right place to start.',
    contact: 'Tell us about your idea',
    process: 'See how we work',
  } : {
    label: 'Trabajo seleccionado / Numen',
    title: 'Del primer boceto',
    accent: 'al mundo real.',
    description: 'Sitios, plataformas y productos digitales. Una mirada a lo que pasa cuando estrategia, diseño y desarrollo se sientan en la misma mesa.',
    explore: 'Explorar los productos',
    note: 'Hechos para salir del cuaderno.',
    detail: 'Pequeños detalles. Productos reales.',
    ctaTitle: 'Tu idea podría ser la siguiente.',
    ctaDescription: 'Cuéntanos qué quieres construir. Te ayudamos a encontrar por dónde empezar.',
    contact: 'Cuéntanos tu idea',
    process: 'Conoce nuestro proceso',
  }

  return (
    <>
      <header ref={heroRef} className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-14 pt-32 md:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 lg:px-8 lg:pb-20 lg:pt-40">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.6 }} className="min-w-0">
          <p className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-foreground/65"><span className="h-px w-8 bg-foreground/60" />{copy.label}</p>
          <h1 className="text-[clamp(2.6rem,5.4vw,4.7rem)] font-semibold leading-[1.1] tracking-[-0.055em] text-foreground">
            {copy.title} <br />
            <span className="relative inline-block pb-4">{copy.accent}<ScribbleUnderline className="absolute bottom-0 left-0 h-3 w-full text-foreground/70" /></span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/65">{copy.description}</p>
          <a href="#live-projects" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{copy.explore}<ArrowDown className="size-4" aria-hidden="true" /></a>
        </motion.div>
        <div className="flex items-center gap-6 md:flex-col">
          <LaunchDoodle active={heroVisible} className="w-36 shrink-0 text-foreground md:w-full" />
          <p className="max-w-48 text-sm leading-relaxed text-foreground/65 md:text-center">{copy.note}</p>
        </div>
      </header>

      <LiveProjectsSection standalone />

      <section id="contact" className="relative z-30 mx-auto my-16 w-full max-w-6xl scroll-mt-28 px-6 lg:my-24 lg:px-8">
        <div className="grid items-center gap-8 rounded-[1.5rem] border border-foreground/20 bg-background p-6 sm:grid-cols-[1fr_140px] lg:p-12">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/65">{copy.detail}</p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">{copy.ctaTitle}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/65">{copy.ctaDescription}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">{copy.contact}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
              <Link href="/#process" className="inline-flex min-h-12 items-center rounded-full border border-foreground/25 px-6 py-3 text-sm text-foreground/75 transition-colors hover:border-foreground/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">{copy.process}</Link>
            </div>
          </div>
          <FounderSticker figure="igmer" size="w-24 md:w-28" tilt={-4} className="hidden justify-self-center sm:block" />
        </div>
      </section>
    </>
  )
}
