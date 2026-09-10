'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion, useInView, useMotionValue, useSpring, useTransform, type MotionValue, type Variants } from 'framer-motion'
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
  /** Pixels this icon shifts at full pointer travel. Bigger reads as nearer. */
  depth: number
}

// Two side bands, clear of the middle where the headline sits. The four solid
// icons are drawn smaller than the outline ones: at the same box they carry far
// more weight and pull the eye off the copy.
const SCATTER: ScatterItem[] = [
  { name: 'idea', place: 'left-[4%] top-[13%] w-14', offset: 0, drift: 7, tilt: 4, depth: 26 },
  { name: 'star', place: 'left-[21%] top-[25%] w-9', offset: 1.4, drift: 5, tilt: 7, depth: 14 },
  { name: 'window', place: 'left-[11%] top-[37%] w-16', offset: 2.6, drift: 6, tilt: 3, depth: 32 },
  { name: 'pencil', place: 'left-[24%] top-[50%] w-12', offset: 4.1, drift: 6, tilt: 5, depth: 12 },
  { name: 'heart', place: 'left-[6%] top-[64%] w-10', offset: 5.3, drift: 5, tilt: 6, depth: 22 },
  { name: 'coffee', place: 'left-[19%] top-[78%] w-13', offset: 6.6, drift: 6, tilt: 4, depth: 18 },
  { name: 'rocket', place: 'right-[5%] top-[12%] w-11', offset: 0.8, drift: 8, tilt: 4, depth: 28 },
  { name: 'cursor', place: 'right-[22%] top-[26%] w-9', offset: 2.1, drift: 5, tilt: 7, depth: 13 },
  { name: 'chat', place: 'right-[10%] top-[39%] w-15', offset: 3.4, drift: 6, tilt: 3, depth: 30 },
  { name: 'gear', place: 'right-[24%] top-[52%] w-10', offset: 4.7, drift: 5, tilt: 6, depth: 11 },
  { name: 'code', place: 'right-[6%] top-[66%] w-14', offset: 5.9, drift: 7, tilt: 4, depth: 24 },
  { name: 'checklist', place: 'right-[20%] top-[79%] w-12', offset: 7.2, drift: 6, tilt: 5, depth: 16 },
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
  pointerX,
  pointerY,
}: {
  item: ScatterItem
  active: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
}) {
  const reducedMotion = useReducedMotion()
  const { name, place, offset, drift, tilt, depth } = item
  const Icon = HERO_ICONS[name]
  // The field leans away from the cursor, nearer icons further than far ones.
  const parallaxX = useTransform(pointerX, (v) => -v * depth)
  const parallaxY = useTransform(pointerY, (v) => -v * depth * 0.5)

  return (
    <motion.div
      aria-hidden="true"
      className={cn('absolute', place)}
      style={reducedMotion ? undefined : { x: parallaxX, y: parallaxY }}
    >
      <motion.div
        className="text-foreground/60"
        variants={floatVariants(drift, tilt)}
        initial="rest"
        animate={reducedMotion ? 'rest' : 'float'}
        transition={{ duration: FLOAT_DURATION, repeat: Infinity, ease: 'easeInOut', delay: -offset }}
      >
        <Icon active={active} className="w-full" />
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
  // Pointer position as -0.5..0.5 of the hero, smoothed so the field glides.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 45, damping: 20, mass: 0.6 })
  const pointerY = useSpring(rawY, { stiffness: 45, damping: 20, mass: 0.6 })

  function trackPointer(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion) return
    const box = event.currentTarget.getBoundingClientRect()
    rawX.set((event.clientX - box.left) / box.width - 0.5)
    rawY.set((event.clientY - box.top) / box.height - 0.5)
  }

  function releasePointer() {
    rawX.set(0)
    rawY.set(0)
  }
  const enter = (delay: number) => ({
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.65, ease: EASE, delay: reducedMotion ? 0 : delay },
  })

  return (
    <section
      ref={ref}
      id="hero"
      onPointerMove={trackPointer}
      onPointerLeave={releasePointer}
      className="hero-editorial relative flex min-h-svh flex-col overflow-hidden bg-background px-6 pb-6 pt-28 sm:px-10 lg:px-16"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

      {/* Sits on the section, not the content column, so the field runs edge to edge. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        {SCATTER.map((item) => (
          <FloatingMark key={item.name} item={item} active={inView} pointerX={pointerX} pointerY={pointerY} />
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
        <span>{es ? 'Diseño + Código + Inteligencia artificial' : 'Design + Code + Artificial intelligence'}</span>
        <Link
          href={SECTION_HREFS.services}
          scroll={false}
          onClick={(event) => handleSectionLinkClick(event, SECTION_HREFS.services, lenis)}
          className="flex min-h-11 shrink-0 items-center gap-3 hover:text-foreground"
        >
          {es ? 'Conoce el estudio' : 'Explore the studio'}
          <ArrowDown size={15} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
