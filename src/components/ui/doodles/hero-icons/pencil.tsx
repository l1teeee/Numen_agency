'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 2.7 45.4 C 5.9 44.2 9.2 43.2 12.6 42.2 C 23.1 31.7 34.4 20.9 45.4 9.4 C 43.1 7.2 40.9 4.9 38.7 2.7 C 27.7 13.7 16.8 24.8 5.9 35.5 C 4.9 38.8 3.9 42.1 2.7 45.4 Z' },
  { d: 'M 5.9 35.6 C 8.3 37.9 10.4 40 12.5 42.2' },
  { d: 'M 32.9 8.6 C 35.2 10.8 37.3 13 39.6 15.3' },
]

/** A pencil on the diagonal, sharpened tip at the bottom left. */
export function PencilIcon(props: HeroIconProps) {
  const reducedMotion = useReducedMotion()
  const active = props.active !== false
  const playing = active && !reducedMotion

  return (
    <HeroIconFrame strokes={STROKES} {...props} motionProfile="pencil">
      <motion.path
        d="M 3.4 46 C 7.2 46.7 11.5 46.6 15.8 45.6"
        initial={false}
        animate={{ pathLength: playing ? [0, 1, 1, 0] : active ? 1 : 0, opacity: playing ? [0, 1, 1, 0] : active ? 0.85 : 0 }}
        transition={playing ? { duration: 3.7, repeat: Infinity, repeatDelay: 0.15, ease: 'easeInOut' } : { duration: 0 }}
      />
      <motion.circle
        cx="3.4"
        cy="46"
        r="0.9"
        fill="currentColor"
        stroke="none"
        initial={false}
        animate={{ opacity: playing ? [0.1, 0.9, 0.1] : active ? 0.45 : 0, scale: playing ? [0.7, 1.15, 0.7] : 1 }}
        transition={playing ? { duration: 3.7, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      />
    </HeroIconFrame>
  )
}
