'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'
import type { HeroIconProps, HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 20.2 2.6 L 27.6 3.3 L 28.1 8.6 L 31.7 10.8 L 35.9 5.8 L 41.5 12.2 L 36.8 16.3 L 39.2 19.4 L 44.7 19.8 L 45.4 28.1 L 38.7 27.9 L 37.5 31.8 L 42.4 35.8 L 36.1 42.2 L 31 37.3 L 27.9 39.2 L 27.9 45.2 L 19.5 45.5 L 20 38.6 L 16.1 37.7 L 12.2 42.2 L 5.4 35.8 L 10.3 31.3 L 9.4 27.9 L 2.7 27.6 L 3.4 19.7 L 8.8 19.9 L 10.1 16.3 L 6.6 12.1 L 11.6 6 L 16.7 10.4 L 19.6 9.5 Z', fill: 'currentColor' },
  { d: 'M 30.6 23.6 Q 30.7 26.3 29.2 28 Q 27.4 29.9 25.3 29.9 Q 22.6 30.3 20.8 29.2 Q 18.6 28 18.1 26.2 Q 17.1 23.4 17.9 21.4 Q 18.9 19.4 20.8 18.8 Q 23.4 17.4 25.5 17.7 Q 27.5 18.2 28.2 19.9 Q 30.3 21.7 30.6 23.6 Z', fill: 'var(--background)' },
]

/** A solid cog. The centre is knocked out in the page colour so the hole reads on either theme. */
export function GearIcon(props: HeroIconProps) {
  const { active = true, className } = props
  const reducedMotion = useReducedMotion()
  const playing = active && !reducedMotion

  return (
    <DoodleSvg viewBox="0 0 48 48" strokeWidth={2} className={className}>
      <motion.g
        initial={false}
        animate={playing ? { rotate: [0, 360] } : { rotate: 0 }}
        transition={playing ? { duration: 9, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        style={{ transformOrigin: '24px 24px' }}
      >
        <DrawPath d={STROKES[0].d} fill={STROKES[0].fill} active={active} />
        <DrawPath d={STROKES[1].d} fill={STROKES[1].fill} active={active} delay={0.08} />
      </motion.g>
      <motion.g
        initial={false}
        animate={playing ? { opacity: [0.18, 0.85, 0.18] } : { opacity: active ? 0.28 : 0 }}
        transition={playing ? { duration: 1.9, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
      >
        <path d="M 4.2 8.2 L 7.1 10.5 M 40.5 7.7 L 38.6 10.2 M 42 39.8 L 39.7 37.7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </motion.g>
    </DoodleSvg>
  )
}
