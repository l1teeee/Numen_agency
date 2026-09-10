'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'
import type { HeroIconProps, HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 16.1 8.8 C 11.7 13 7.3 17.2 2.6 21.4 C 2 22.7 2.1 24.1 3 25.2 C 7.5 29.5 11.9 33.8 16.5 38' },
  { d: 'M 32 8.6 C 36.4 12.8 40.8 17 45.5 21.2 C 46.1 22.5 46 23.8 45.2 25 C 40.6 29.3 36.2 33.6 31.6 37.8' },
  { d: 'M 29.9 2.7 C 28.1 9.9 26.2 17 24.2 24.2 C 22.4 31.1 20.4 38 18.4 45.4' },
]

const CONTENT_LINES = [
  'M 18 13.4 L 22 13.4',
  'M 17.2 17.4 L 20.8 17.4',
  'M 25.5 30.5 L 28.8 30.5',
]

/** The angle-bracket-slash mark, drawn rather than typeset. */
export function CodeIcon(props: HeroIconProps) {
  const { active = true, className } = props
  const reducedMotion = useReducedMotion()
  const playing = active && !reducedMotion

  return (
    <DoodleSvg viewBox="0 0 48 48" strokeWidth={2} className={className}>
      <motion.g
        initial={false}
        animate={playing ? { x: [-0.8, -2.2, -0.8] } : { x: 0 }}
        transition={playing ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      >
        <DrawPath d={STROKES[0].d} active={active} />
      </motion.g>
      <motion.g
        initial={false}
        animate={playing ? { x: [0.8, 2.2, 0.8] } : { x: 0 }}
        transition={playing ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      >
        <DrawPath d={STROKES[1].d} active={active} />
      </motion.g>
      <DrawPath d={STROKES[2].d} active={active} delay={0.08} />
      {CONTENT_LINES.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={false}
          animate={playing ? { pathLength: [0, 1, 1, 0], opacity: [0.1, 1, 1, 0.1] } : { pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={playing ? { duration: 2.2, repeat: Infinity, delay: index * 0.22, repeatDelay: 0.8, ease: 'easeInOut' } : { duration: 0 }}
        />
      ))}
    </DoodleSvg>
  )
}
