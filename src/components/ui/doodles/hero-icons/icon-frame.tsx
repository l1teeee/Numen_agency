'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import type { ReactNode } from 'react'
import { DoodleSvg, DrawPath } from '../primitives'

export type HeroIconMotion = 'idea' | 'code' | 'cursor' | 'star' | 'heart' | 'gear' | 'rocket' | 'chat' | 'window' | 'coffee' | 'pencil' | 'checklist'

interface IconMotionProfile {
  animate: Record<string, number[]>
  duration: number
  ease: 'easeInOut' | 'linear'
}

const ICON_MOTION: Record<HeroIconMotion, IconMotionProfile> = {
  idea: { animate: { scale: [1, 1.018, 1, 1.018, 1] }, duration: 3.4, ease: 'easeInOut' },
  star: { animate: { scale: [1, 1.07, 1, 1.02, 1] }, duration: 3.8, ease: 'easeInOut' },
  window: { animate: { scale: [1, 1.008, 1] }, duration: 4.4, ease: 'easeInOut' },
  pencil: { animate: { x: [0, 1.5, 0, -0.8, 0], y: [0, -1, 0, 0.7, 0], rotate: [0, -2.5, 0, 1.5, 0] }, duration: 3.7, ease: 'easeInOut' },
  heart: { animate: { scale: [1, 1.12, 1, 1.06, 1] }, duration: 2.2, ease: 'easeInOut' },
  coffee: { animate: { y: [0, -0.7, 0] }, duration: 4.8, ease: 'easeInOut' },
  rocket: { animate: { y: [0, -4, 0], rotate: [0, -2, 0, 2, 0] }, duration: 5.8, ease: 'easeInOut' },
  cursor: { animate: { x: [0, 2, 0], y: [0, -2, 0] }, duration: 6.5, ease: 'easeInOut' },
  chat: { animate: { scale: [1, 1.04, 1, 1.04, 1], y: [0, -1, 0, 1, 0] }, duration: 6.9, ease: 'easeInOut' },
  gear: { animate: { rotate: [0, 90, 180, 270, 360] }, duration: 18, ease: 'linear' },
  code: { animate: { x: [0, 1.5, 0, -1.5, 0], rotate: [0, 2, 0, -2, 0] }, duration: 7.6, ease: 'easeInOut' },
  checklist: { animate: { y: [0, -1.5, 0, 1.5, 0], rotate: [0, 1.5, 0, -1.5, 0] }, duration: 8.6, ease: 'easeInOut' },
}

export interface HeroIconProps {
  active?: boolean
  className?: string
  motionProfile?: HeroIconMotion
  children?: ReactNode
}

export interface HeroIconStroke {
  d: string
  /** Omitted for an outline. 'currentColor' for solid ink, 'var(--background)' for a knockout. */
  fill?: string
}

/**
 * Shared body of every hero icon: one 48 unit box, one pen weight, a quick
 * draw-on, and an independent SVG motion profile.
 */
export function HeroIconFrame({ strokes, active = true, className, motionProfile, children }: HeroIconProps & { strokes: HeroIconStroke[] }) {
  const reducedMotion = useReducedMotion()
  const profile = motionProfile ? ICON_MOTION[motionProfile] : undefined

  return (
    <DoodleSvg viewBox="0 0 48 48" strokeWidth={2} className={className}>
      <motion.g
        initial={false}
        animate={reducedMotion || !active || !profile ? { rotate: 0, x: 0, y: 0, scale: 1, scaleY: 1 } : profile.animate}
        transition={reducedMotion || !active || !profile ? { duration: 0 } : { duration: profile.duration, repeat: Infinity, ease: profile.ease }}
        style={{ transformOrigin: '24px 24px' }}
      >
        {strokes.map((stroke, index) => (
          <DrawPath key={stroke.d} d={stroke.d} fill={stroke.fill} active={active} delay={index * 0.05} duration={0.38} />
        ))}
        {children}
      </motion.g>
    </DoodleSvg>
  )
}
