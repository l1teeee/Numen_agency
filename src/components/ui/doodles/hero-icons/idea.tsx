'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 17.5 33.3 C 13 30.4 10.1 25.4 10.5 20 C 10.9 12.8 17 7.3 24.3 7.6 C 31.5 7.9 37 14.1 36.6 21.3 C 36.4 26.1 33.6 30.3 29.5 33' },
  { d: 'M 17.7 33.5 C 18.1 36.9 18.5 40.4 19.1 43.7 C 21.1 46.5 26.7 46.6 28.8 43.9 C 29.2 40.5 29.5 37 29.6 33.6' },
  { d: 'M 18.1 38.5 C 21.9 39.6 25.9 39.5 29.2 38.4' },
  { d: 'M 24.3 6.4 C 24.2 4.8 24.1 3.6 23.9 2.2' },
  { d: 'M 11 11.3 C 8.2 9.6 5.5 8 2.7 6.5' },
  { d: 'M 36.9 11.1 C 39.7 9.4 42.4 7.8 45.4 6.3' },
]

/** A lightbulb with three rays. The idea in the hero field. */
export function IdeaIcon(props: HeroIconProps) {
  const reducedMotion = useReducedMotion()
  const active = props.active !== false
  const playing = active && !reducedMotion

  return (
    <HeroIconFrame strokes={STROKES} {...props} motionProfile={undefined}>
      <motion.path
        d="M 16.2 22 C 16.2 15.9 19.3 12 24.2 12 C 29.1 12 32.8 16 32.8 22 C 32.8 25.3 30.8 28.1 28.8 30.4 L 19.9 30.4 C 17.8 28.1 16.2 25.2 16.2 22 Z"
        fill="currentColor"
        stroke="none"
        initial={false}
        animate={{ opacity: playing ? [0.08, 0.78, 0.08] : active ? 0.42 : 0 }}
        transition={playing ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      />
      <motion.g
        initial={false}
        animate={{ opacity: playing ? [0.28, 1, 0.28] : active ? 0.72 : 0, scale: playing ? [0.96, 1.06, 0.96] : 1 }}
        transition={playing ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.18 } : { duration: 0 }}
        style={{ transformOrigin: '24px 7px' }}
      >
        <path d="M 24.3 6.4 C 24.2 4.8 24.1 3.6 23.9 2.2" />
        <path d="M 11 11.3 C 8.2 9.6 5.5 8 2.7 6.5" />
        <path d="M 36.9 11.1 C 39.7 9.4 42.4 7.8 45.4 6.3" />
      </motion.g>
    </HeroIconFrame>
  )
}
