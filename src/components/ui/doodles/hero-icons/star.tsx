'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 23.2 2.7 Q 26.6 9.9 29.6 18.1 Q 37.8 18.4 45.6 18.6 Q 39 24.3 33.1 29.2 Q 34 37.1 35.8 44.2 Q 29.5 39.1 23.8 34.9 Q 17.4 40.4 10.4 45.4 Q 13 37.6 14.7 29 Q 9 24 2.5 18.5 Q 9.6 17.7 17.8 17.3 Q 20.2 10.1 23.2 2.7 Z', fill: 'currentColor' },
]

/** A solid five-point star with uneven arms. */
export function StarIcon(props: HeroIconProps) {
  const reducedMotion = useReducedMotion()
  const active = props.active !== false
  const playing = active && !reducedMotion

  return (
    <HeroIconFrame strokes={STROKES} {...props} motionProfile={undefined}>
      <motion.path
        d={STROKES[0].d}
        fill="currentColor"
        stroke="none"
        initial={false}
        animate={{ opacity: playing ? [0.06, 0.5, 0.06] : active ? 0.24 : 0 }}
        transition={playing ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      />
      <motion.g
        stroke="currentColor"
        strokeWidth="1.2"
        initial={false}
        animate={{ opacity: playing ? [0, 1, 0] : 0, scale: playing ? [0.5, 1, 0.5] : 0.75 }}
        transition={playing ? { duration: 1.8, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' } : { duration: 0 }}
        style={{ transformOrigin: '41px 8px' }}
      >
        <path d="M 41 4.5 L 41 11.5 M 37.5 8 L 44.5 8" />
        <path d="M 8 30 L 8 35 M 5.5 32.5 L 10.5 32.5" />
      </motion.g>
    </HeroIconFrame>
  )
}
