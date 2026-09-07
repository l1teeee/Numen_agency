'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { JULIAN, IGMER, type FounderFigure } from './illustrations/founder-paths.generated'

const EASE = [0.22, 1, 0.36, 1] as const

interface Gesture {
  keyframes: { rotate: number[]; y?: number[] }
  times: number[]
  duration: number
}

// Each gesture spends most of its cycle at rest so the loop reads as an
// occasional greeting instead of a metronome.
const WAVE: Gesture = {
  keyframes: { rotate: [0, 0, -13, 7, -13, 7, 0, 0] },
  times: [0, 0.62, 0.68, 0.74, 0.8, 0.86, 0.92, 1],
  duration: 4.4,
}

// `y` is in view-box units, so the dip is sized against the figure, not the
// rendered pixel size.
const NOD: Gesture = {
  keyframes: { rotate: [0, 0, 4, 0, 4, 0, 0], y: [0, 0, 16, 0, 16, 0, 0] },
  times: [0, 0.4, 0.52, 0.64, 0.76, 0.88, 1],
  duration: 5.2,
}

const FIGURES: Record<string, { paths: FounderFigure; gesture: Gesture }> = {
  julian: { paths: JULIAN, gesture: WAVE },
  igmer: { paths: IGMER, gesture: NOD },
}

export type FounderName = keyof typeof FIGURES

/**
 * Line-art portrait whose limb loops a gesture while `active`. The palette is
 * pinned to the original drawing - black ink on white - in both themes, so the
 * portrait never flips into a negative of itself.
 */
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
    <svg viewBox={paths.viewBox} className={className} aria-hidden="true">
      <motion.g
        style={{ transformBox: 'view-box', originX: paths.origin[0], originY: paths.origin[1] }}
        animate={playing ? gesture.keyframes : { rotate: 0, y: 0 }}
        transition={
          playing
            ? { duration: gesture.duration, times: gesture.times, ease: EASE, repeat: Infinity }
            : { duration: 0.4, ease: EASE }
        }
      >
        <path d={paths.moving} className="fill-black" fillRule="evenodd" />
      </motion.g>
      {/* Matches the white tile the portrait sits on, so the limb swings behind
          the body instead of showing through it. */}
      <path d={paths.fill} className="fill-white" fillRule="evenodd" />
      <path d={paths.still} className="fill-black" fillRule="evenodd" />
    </svg>
  )
}
