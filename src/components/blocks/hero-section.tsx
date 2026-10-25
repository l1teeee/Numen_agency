'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform, type MotionStyle } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useLenis } from 'lenis/react'
import { useLang } from '@/lib/lang'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'
import { NumenArtLink } from '@/components/ui/numen-art-link'
import { ColumnLines } from '@/components/ui/column-lines'

const EASE = [0.22, 1, 0.36, 1] as const

const FRAME_COLLAPSE_DISTANCE = 280

export function HeroSection() {
  const { t, lang } = useLang()
  const lenis = useLenis()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroExit } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  // Fade the copy before the next section reaches the viewport's middle; the card stays as the same surface as the page.
  const heroOpacity = useTransform(heroExit, [0, 0.65], [1, 0])
  const { scrollY } = useScroll()
  const frameCollapse = useTransform(scrollY, [0, FRAME_COLLAPSE_DISTANCE], [0, 1])
  const frameStyle = { '--hero-collapse': frameCollapse } as MotionStyle
  const reducedMotion = useReducedMotion()
  const es = lang === 'es'
  const enter = (delay: number) => ({
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.65, ease: EASE, delay: reducedMotion ? 0 : delay },
  })

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-editorial relative flex min-h-svh flex-col overflow-hidden bg-background px-5 pb-24 pt-28 sm:px-8 sm:pb-14 lg:px-12 lg:pb-20"
    >
      <motion.div
        aria-hidden="true"
        className="hero-frame-card pointer-events-none absolute inset-0 bg-surface"
        style={frameStyle}
      >
        <ColumnLines />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="hero-frame-border pointer-events-none absolute border border-black/10 dark:border-white/[0.14]"
        style={frameStyle}
      />

      <motion.div
        style={{ opacity: reducedMotion ? undefined : heroOpacity }}
        className="relative mx-auto flex w-full max-w-[1408px] flex-1 flex-col px-4 sm:px-6"
      >
        <div className="flex flex-1 flex-col justify-center py-10">
          <motion.p
            {...enter(0.05)}
            className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.19em] text-foreground/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
            {es ? 'Estudio digital independiente / El Salvador' : 'Independent digital studio / El Salvador'}
          </motion.p>

          <motion.h1
            {...enter(0.12)}
            className="text-[clamp(2.5rem,6.2vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-foreground"
          >
            {es ? 'Ideas con carácter.' : 'Ideas with character.'}
            <br />
            <span className="text-foreground/40">{es ? 'Productos con propósito.' : 'Products with purpose.'}</span>
          </motion.h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <motion.p {...enter(0.22)} className="max-w-[34rem] text-base leading-relaxed text-foreground/50">
            {t.hero.subline}
          </motion.p>

          <motion.div {...enter(0.3)} className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap lg:shrink-0 lg:justify-end">
            <Link
              href={SECTION_HREFS.work}
              scroll={false}
              onClick={(event) => handleSectionLinkClick(event, SECTION_HREFS.work, lenis)}
              className="inline-flex min-h-12 w-full items-center justify-between gap-7 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-[opacity,transform] hover:opacity-80 active:scale-[0.98] sm:w-auto sm:justify-center"
            >
              {t.hero.cta1}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href={SECTION_HREFS.contact}
              scroll={false}
              onClick={(event) => handleSectionLinkClick(event, SECTION_HREFS.contact, lenis)}
              className="inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-full border border-foreground/16 px-6 text-sm font-medium transition-[background-color,transform] hover:bg-foreground/5 active:scale-[0.98] sm:w-auto sm:justify-center"
            >
              {t.hero.cta2}
              <span aria-hidden="true">+</span>
            </Link>
            <NumenArtLink className="w-full justify-between active:scale-[0.98] sm:w-auto sm:justify-center" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
