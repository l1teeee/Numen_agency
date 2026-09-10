'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'
import type { HeroIconProps, HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 11.2 3.1 C 6.6 3.3 2.9 7 2.7 11.5 C 2.5 17.7 2.5 24.1 2.7 30.3 C 2.9 34.8 6.6 38.5 11.2 38.8 C 12.6 38.9 14 38.9 15.5 39 C 15.1 41.2 14.2 43.4 13 45.4 C 16.7 43.7 20 41.4 22.7 38.9 C 27.5 38.9 32.2 38.9 37 38.8 C 41.5 38.5 45.2 34.8 45.4 30.3 C 45.6 24.1 45.6 17.7 45.4 11.5 C 45.2 7 41.5 3.3 37 3.1 C 28.3 2.7 19.8 2.7 11.2 3.1 Z' },
  { d: 'M 11.2 20.8 a 2.7 2.7 0 1 0 5.4 0 a 2.7 2.7 0 1 0 -5.4 0', fill: 'currentColor' },
  { d: 'M 21.3 20.8 a 2.7 2.7 0 1 0 5.4 0 a 2.7 2.7 0 1 0 -5.4 0', fill: 'currentColor' },
  { d: 'M 31.4 20.8 a 2.7 2.7 0 1 0 5.4 0 a 2.7 2.7 0 1 0 -5.4 0', fill: 'currentColor' },
]

const DOT_ORIGINS = ['13.9px 20.8px', '24px 20.8px', '34.1px 20.8px']

/** A speech bubble with three solid dots. */
export function ChatIcon(props: HeroIconProps) {
  const { active = true, className } = props
  const reducedMotion = useReducedMotion()
  const playing = active && !reducedMotion
  const dots = STROKES.slice(1)

  return (
    <DoodleSvg viewBox="0 0 48 48" strokeWidth={2} className={className}>
      <DrawPath d={STROKES[0].d} active={active} />
      {dots.map((stroke, index) => (
        <motion.path
          key={stroke.d}
          d={stroke.d}
          fill={stroke.fill}
          initial={false}
          animate={playing ? { opacity: [0.22, 1, 0.22], scale: [0.76, 1.08, 0.76] } : { opacity: active ? 1 : 0, scale: 1 }}
          transition={playing ? { duration: 1.25, repeat: Infinity, delay: index * 0.18, repeatDelay: 0.35, ease: 'easeInOut' } : { duration: 0 }}
          style={{ transformOrigin: DOT_ORIGINS[index] }}
        />
      ))}
    </DoodleSvg>
  )
}
