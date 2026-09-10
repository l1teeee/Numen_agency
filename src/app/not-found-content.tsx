'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Navbar } from '@/components/blocks/navbar'
import { SiteFooter } from '@/components/blocks/sections'
import { FounderSticker } from '@/components/ui/doodles/founder-sticker'
import { DoodleSvg, DrawPath } from '@/components/ui/doodles/primitives'
import { PaperPlaneDoodle } from '@/components/ui/doodles/misc'
import { useLang } from '@/lib/lang'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const EASE = [0.22, 1, 0.36, 1] as const

// One stroke per pen lift: diagonal, bar and stem for each 4, a single loop for
// the 0. Drawn left to right so the number writes itself in.
const NUMERAL_STROKES = [
  'M 56 16 C 46 34, 32 56, 14 78',
  'M 8 78.5 C 26 76.4, 54 77.6, 80 76.2',
  'M 58 15 C 60 42, 59 76, 57 106',
  'M 131.5 15.2 C 149.5 15.8, 161 34.5, 161.5 60 C 162 85.5, 150.5 105.6, 131.5 105.8 ' +
    'C 112 106, 100.5 86, 100.5 60 C 100.5 34, 112.5 15.6, 130 15.2 C 132.5 15.1, 135 15.6, 137 16.2',
  'M 228 15 C 219 33, 205 55, 186 77',
  'M 180 77.5 C 199 75.8, 227 77, 252 75.5',
  'M 230 14.5 C 231.5 42, 231 76, 229.5 105',
]

export function NotFoundContent() {
  const { lang, t } = useLang()
  const reduceMotion = useReducedMotion()
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 pb-20 pt-32 lg:px-8 lg:pt-40">
        <p className="mb-10 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-foreground/65"><span className="h-px w-8 bg-foreground/60" />404 / {editorial.label}</p>
        <div className="relative mx-auto mb-14 w-fit sm:mb-16">
          <DoodleSvg
            viewBox="0 0 260 120"
            strokeWidth={2.25}
            className="w-[240px] text-foreground sm:w-[340px] md:w-[400px]"
          >
            {NUMERAL_STROKES.map((d, i) => (
              <DrawPath key={d} d={d} delay={0.15 + i * 0.09} duration={0.7} />
            ))}
          </DoodleSvg>
          <FounderSticker
            figure="igmer"
            size="w-16 sm:w-20"
            tilt={-6}
            delay={0.75}
            className="absolute -right-2 -bottom-9 sm:-right-10"
          />
          <PaperPlaneDoodle loop={false} className="absolute -top-6 -left-12 hidden w-28 -rotate-12 text-foreground/70 sm:block" />
        </div>

        <motion.div
          className="flex flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE, delay: reduceMotion ? 0 : 0.25 }}
        >
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/65">{copy.desc}</p>
          <Link
            href="/"
            className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />{copy.cta}
          </Link>
        </motion.div>
        <nav aria-label={editorial.destinations} className="mt-14 border-t border-foreground/15 pt-8 lg:mt-20">
          <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-foreground/65">{editorial.destinations}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: '/projects', title: t.nav.projectsLink, description: editorial.work },
              { href: '/blog', title: t.blog.label, description: editorial.blog },
              { href: '/#contact', title: editorial.contact, description: editorial.contactDesc },
            ].map((destination) => (
              <Link key={destination.href} href={destination.href} className="group rounded-2xl border border-foreground/20 p-5 transition-colors hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-offset-4">
                <span className="flex items-start justify-between gap-3 text-sm font-semibold text-foreground">{destination.title}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></span>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{destination.description}</p>
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <SiteFooter />
    </div>
  )
}
