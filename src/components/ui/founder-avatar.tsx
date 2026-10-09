'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { JULIAN, type FounderFigure } from './illustrations/founder-paths.generated'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

interface IdleGesture {
  keyframes: { rotate: number[]; y?: number[] }
  times: number[]
  duration: number
}

// The trace returns head, torso and both arms as one connected contour, so no limb
// can be rotated on its own. The figure sways as a whole around the hips instead,
// leaning into the raised hand.
const GREETING_SWAY: IdleGesture = {
  keyframes: { rotate: [0, 0, -3.2, 2.4, -2.8, 1.8, 0, 0] },
  times: [0, 0.72, 0.77, 0.81, 0.85, 0.89, 0.94, 1],
  duration: 7.8,
}

const FIGURES = {
  julian: { paths: JULIAN, gesture: GREETING_SWAY },
} satisfies Record<string, { paths: FounderFigure; gesture: IdleGesture }>

export type FounderName = keyof typeof FIGURES

export function FounderAvatar({
  figure,
  active,
  className,
}: {
  figure: FounderName
  active: boolean
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const { paths, gesture } = FIGURES[figure]
  const playing = active && !reduceMotion

  return (
    <svg
      viewBox={paths.viewBox}
      // The idle sway carries the figure a few units past the view box, as it does in DoodleSvg.
      style={{ overflow: 'visible' }}
      className={cn('block h-auto', className)}
      aria-hidden="true"
      focusable="false"
    >
      <motion.g
        style={{ transformBox: 'view-box', originX: 0.5, originY: 1 }}
        animate={playing ? gesture.keyframes : { rotate: 0, y: 0 }}
        transition={
          playing
            ? { duration: gesture.duration, times: gesture.times, ease: EASE, repeat: Infinity }
            : { duration: reduceMotion ? 0 : 0.3, ease: EASE }
        }
      >
        {/* The founders are the documented exception to the currentColor rule: they are
            printed portraits on white paper sticker tiles, so the ink stays black. */}
        <path d={paths.paper} fill="#ffffff" />
        <path d={paths.ink} fill="#000000" fillRule="evenodd" />
      </motion.g>
    </svg>
  )
}
