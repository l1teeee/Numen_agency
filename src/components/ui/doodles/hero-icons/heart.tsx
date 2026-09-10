'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 23.7 45.3 C 16.9 38.9 8.8 32.5 4 25.4 C -0.1 19.5 0.6 10.4 6.6 5.6 C 12.5 0.9 20.6 3 23.3 9.8 C 23.7 10.7 24 10.7 24.4 9.8 C 27.1 2.7 35.7 0.7 41.6 5.4 C 47.6 10.2 48.2 19.3 43.9 25.2 C 39 32.3 30.6 39 23.7 45.3 Z', fill: 'currentColor' },
]

/** A solid heart. */
export function HeartIcon(props: HeroIconProps) {
  const reducedMotion = useReducedMotion()
  const active = props.active !== false
  const playing = active && !reducedMotion

  return (
    <HeroIconFrame strokes={STROKES} {...props} motionProfile="heart">
      <motion.path
        d="M 5.5 28.5 C 9 35.8 15.2 40.6 23.7 45 C 32.2 40.6 38.4 35.8 42 28.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        initial={false}
        animate={{ pathLength: playing ? [0, 1, 1, 0] : active ? 1 : 0, opacity: playing ? [0, 0.42, 0] : active ? 0.18 : 0, scale: playing ? [0.82, 1.06, 1.16] : 1 }}
        transition={playing ? { duration: 2.2, repeat: Infinity, ease: 'easeOut' } : { duration: 0 }}
        style={{ transformOrigin: '24px 32px' }}
      />
    </HeroIconFrame>
  )
}
