'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useLenis } from 'lenis/react'
import { useLang } from '@/lib/lang'
import { cn } from '@/lib/utils'
import { SECTION_HREFS, handleSectionLinkClick } from '@/lib/section-scroll'
import { ScribbleUnderline } from '@/components/ui/doodles/scribbles'
import { HERO_ICONS, type HeroIconName } from '@/components/ui/doodles/hero-icons'

const EASE = [0.22, 1, 0.36, 1] as const

interface ScatterItem {
  name: HeroIconName
  /** Where the icon sits and how big it is, in the hero's own box. */
  place: string
  /** Seconds into the float loop, so the field never pulses in unison. */
  offset: number
  drift: number
  tilt: number
}

// Two side bands, clear of the middle where the headline sits. The four solid
// icons are drawn smaller than the outline ones: at the same box they carry far
// more weight and pull the eye off the copy.
const SCATTER: ScatterItem[] = [
  { name: 'idea', place: 'left-[4%] top-[13%] w-14', offset: 0, drift: 7, tilt: 4 },
  { name: 'star', place: 'left-[21%] top-[25%] w-9', offset: 1.4, drift: 5, tilt: 7 },
  { name: 'window', place: 'left-[11%] top-[37%] w-16', offset: 2.6, drift: 6, tilt: 3 },
  { name: 'pencil', place: 'left-[18%] top-[50%] w-12 xl:left-[24%]', offset: 4.1, drift: 6, tilt: 5 },
  { name: 'heart', place: 'left-[6%] top-[64%] w-10', offset: 5.3, drift: 5, tilt: 6 },
  { name: 'coffee', place: 'left-[19%] top-[78%] w-13', offset: 6.6, drift: 6, tilt: 4 },
  { name: 'rocket', place: 'right-[5%] top-[12%] w-11', offset: 0.8, drift: 8, tilt: 4 },
  { name: 'cursor', place: 'right-[22%] top-[26%] w-9', offset: 2.1, drift: 5, tilt: 7 },
  { name: 'chat', place: 'right-[10%] top-[39%] w-15', offset: 3.4, drift: 6, tilt: 3 },
  { name: 'gear', place: 'right-[14%] top-[52%] w-10 xl:right-[24%]', offset: 4.7, drift: 5, tilt: 6 },
  { name: 'code', place: 'right-[6%] top-[66%] w-14', offset: 5.9, drift: 7, tilt: 4 },
  { name: 'checklist', place: 'right-[20%] top-[79%] w-12', offset: 7.2, drift: 6, tilt: 5 },
]

const FLOAT_DURATION = 8

function floatVariants(drift: number, tilt: number): Variants {
  return {
    rest: { y: 0, rotate: 0, scale: 1 },
    float: {
      y: [0, -drift, 0, drift * 0.55, 0],
      x: [0, drift * 0.4, 0, -drift * 0.3, 0],
      rotate: [0, tilt, 0, -tilt * 0.7, 0],
      scale: [1, 1.05, 1, 0.97, 1],
    },
  }
}

/** One scattered mark, bobbing on its own offset so the field never pulses together. */
function FloatingMark({
  item,
  active,
}: {
  item: ScatterItem
  active: boolean
}) {
  const reducedMotion = useReducedMotion()
  const { name, place, offset, drift, tilt } = item
  const Icon = HERO_ICONS[name]

  return (
    <motion.div aria-hidden="true" className={cn('absolute', place)}>
      <motion.div
        className="text-foreground/60"
        variants={floatVariants(drift, tilt)}
        initial="rest"
        animate={reducedMotion ? 'rest' : 'float'}
        transition={{ duration: FLOAT_DURATION, repeat: Infinity, ease: 'easeInOut', delay: -offset }}
      >
        <Icon active={active} motionProfile={name} className="w-full" />
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const { t, lang } = useLang()
  const lenis = useLenis()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const es = lang === 'es'
  const enter = (delay: number) => ({
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.65, ease: EASE, delay: reducedMotion ? 0 : delay },
  })

  return (
    <section
      ref={ref}
      id="hero"
      className="hero-editorial relative flex min-h-svh flex-col overflow-hidden bg-background px-6 pb-6 pt-28 sm:px-10 lg:px-16"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

      {/* Sits on the section, not the content column, so the field runs edge to edge. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 inset-y-0 hidden lg:block sm:inset-x-8 xl:inset-x-12">
        {SCATTER.map((item) => (
          <FloatingMark key={item.name} item={item} active={inView} />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-[1408px] flex-1 items-center justify-center py-8">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <motion.p
            {...enter(0.05)}
            className="mb-7 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.19em] text-foreground/50"
          >
            <span className="h-2 w-2 rounded-full bg-foreground" />
            {es ? 'Estudio digital independiente / El Salvador' : 'Independent digital studio / El Salvador'}
          </motion.p>

          <motion.h1
            {...enter(0.12)}
            className="text-[clamp(2.35rem,4.8vw,4rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-foreground"
          >
            {es ? 'Ideas con' : 'Ideas with'}{' '}
            <span className="relative inline-block">
              {es ? 'carácter.' : 'character.'}
              <ScribbleUnderline delay={0.5} className="absolute -bottom-2 left-0 h-3 w-full" />
            </span>
            <br />
            <span className="text-foreground/40">{es ? 'Productos con propósito.' : 'Products with purpose.'}</span>
          </motion.h1>

          <motion.p {...enter(0.22)} className="mx-auto mt-8 max-w-[520px] text-base leading-relaxed text-foreground/50">
            {t.hero.subline}
          </motion.p>

          <motion.div {...enter(0.3)} className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href={SECTION_HREFS.work}
              scroll={false}
              onClick={(event) => handleSectionLinkClick(event, SECTION_HREFS.work, lenis)}
              className="inline-flex min-h-12 items-center justify-center gap-7 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              {t.hero.cta1}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href={SECTION_HREFS.contact}
              scroll={false}
              onClick={(event) => handleSectionLinkClick(event, SECTION_HREFS.contact, lenis)}
              className="inline-flex min-h-12 items-center justify-center gap-5 rounded-full border border-foreground/16 px-6 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              {t.hero.cta2}
              <span aria-hidden="true">+</span>
            </Link>
          </motion.div>

        </div>
      </div>

      <motion.div
        {...enter(0.45)}
        className="relative mx-auto mt-10 flex w-full max-w-[1408px] items-center justify-between gap-4 border-t border-foreground/12 pt-5 text-[10px] uppercase tracking-[0.12em] text-foreground/40 lg:mt-0"
      >
        <span className="min-w-0 flex items-center gap-3">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {es ? 'Productos en producción' : 'Products in production'}
        </span>
        <Link
          href="/projects"
          className="flex min-h-11 min-w-0 max-w-[62%] items-center justify-end gap-2 text-right hover:text-foreground sm:shrink-0"
        >
          {es ? 'Explora nuestros proyectos en producción' : 'Explore our products in production'}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
