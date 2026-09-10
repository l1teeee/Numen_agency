'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'
import type { HeroIconProps, HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 2.8 1.3 C 4.3 11.4 6.2 24.9 8.1 39.1 C 11 36.3 14 33.7 16.8 31.2 C 19 36.4 21.1 41.6 23.2 46.8 C 25.8 45.6 28.4 44.4 31.1 43.1 C 28.9 38.1 26.7 33 24.5 28 C 31.4 27.1 38.4 26.4 45.3 25.6 C 31.6 16.8 17.5 8.7 2.8 1.3 Z', fill: 'currentColor' },
]

/** A solid mouse pointer, the heaviest outline-free mark in the set. */
export function CursorIcon(props: HeroIconProps) {
  const { active = true, className } = props
  const reducedMotion = useReducedMotion()
  const playing = active && !reducedMotion

  return (
    <DoodleSvg viewBox="0 0 48 48" strokeWidth={2} className={className}>
      <DrawPath d={STROKES[0].d} fill={STROKES[0].fill} active={active} />
      <motion.g
        initial={false}
        animate={playing ? { scale: [0.35, 1.45, 0.35], opacity: [0, 0.75, 0] } : { scale: 1, opacity: active ? 0 : 0 }}
        transition={playing ? { duration: 1.35, repeat: Infinity, repeatDelay: 1.1, ease: 'easeOut' } : { duration: 0 }}
        style={{ transformOrigin: '8px 39px' }}
      >
        <motion.circle cx="8" cy="39" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </motion.g>
      <motion.g
        initial={false}
        animate={playing ? { x: [0, 0, 0.7, 0], y: [0, 0, 0.7, 0] } : { x: 0, y: 0 }}
        transition={playing ? { duration: 2.45, repeat: Infinity, times: [0, 0.42, 0.5, 0.62], ease: 'easeInOut' } : { duration: 0 }}
      >
        <motion.path d="M 10.5 38.5 L 12.3 40.3" fill="none" stroke="currentColor" strokeWidth="1.5" initial={false} animate={active ? { opacity: [0, 0, 1, 0] } : { opacity: 0 }} transition={playing ? { duration: 2.45, repeat: Infinity, times: [0, 0.42, 0.5, 0.68], ease: 'easeInOut' } : { duration: 0 }} />
      </motion.g>
    </DoodleSvg>
  )
}
