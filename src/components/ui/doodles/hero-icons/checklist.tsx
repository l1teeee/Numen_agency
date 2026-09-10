'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'
import type { HeroIconProps, HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 5.8 2.5 C 4 2.7 3 4 3 5.8 C 2.7 17.6 2.7 29.8 3 42 C 3.1 44.1 4.3 45.4 6.4 45.6 C 18.2 45.9 29.9 45.9 41.7 45.6 C 43.8 45.4 45 44.1 45.2 42 C 45.4 29.8 45.4 17.6 45.2 5.8 C 45.2 4 43.9 2.7 42 2.5 C 29.9 2.2 17.9 2.2 5.8 2.5 Z' },
  { d: 'M 8.9 18.3 C 10.4 19.7 11.8 21.2 13.3 22.6 C 15.6 19.1 18.1 15.7 20.7 12.5' },
  { d: 'M 24.7 17.6 C 29.6 18.3 34.6 18.3 39.4 17.6' },
  { d: 'M 9.2 32.3 C 10.6 33.8 12.1 35.2 13.5 36.7 C 15.8 33.2 18.3 29.7 20.9 26.5' },
  { d: 'M 24.9 31.7 C 29.8 32.3 34.8 32.3 39.6 31.7' },
]

/** A sheet with two ticked lines. */
export function ChecklistIcon(props: HeroIconProps) {
  const { active = true, className } = props
  const reducedMotion = useReducedMotion()
  const playing = active && !reducedMotion

  return (
    <DoodleSvg viewBox="0 0 48 48" strokeWidth={2} className={className}>
      <DrawPath d={STROKES[0].d} active={active} />
      <motion.path d={STROKES[1].d} fill="none" stroke="currentColor" initial={false} animate={playing ? { pathLength: [0, 1, 1, 0] } : { pathLength: active ? 1 : 0 }} transition={playing ? { duration: 2.5, repeat: Infinity, delay: 0.1, ease: 'easeInOut' } : { duration: 0 }} />
      <DrawPath d={STROKES[2].d} active={active} delay={0.2} />
      <motion.path d={STROKES[3].d} fill="none" stroke="currentColor" initial={false} animate={playing ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: active ? 1 : 0 }} transition={playing ? { duration: 2.5, repeat: Infinity, delay: 0.72, ease: 'easeInOut' } : { duration: 0 }} />
      <DrawPath d={STROKES[4].d} active={active} delay={0.85} />
    </DoodleSvg>
  )
}
