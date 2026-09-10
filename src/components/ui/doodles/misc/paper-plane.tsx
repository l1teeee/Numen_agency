'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'
import { DOODLE_EASE, DoodleSvg, DrawPath } from '../primitives'

interface PaperPlaneDoodleProps {
  active?: boolean
  /** false parks the plane at the start of the trail instead of flying it. */
  loop?: boolean
  className?: string
}

const TRAIL =
  'M 100 60 C 116 40, 146 28, 168 40 C 188 52, 186 80, 164 87 C 140 94, 112 80, 100 61 ' +
  'C 88 42, 58 28, 36 40 C 14 52, 16 80, 38 87 C 62 94, 88 80, 100 60 Z'

// The plane is drawn around its own centre so the flight keyframes below are
// simply points on TRAIL.
const UPPER_WING = 'M 19.6 0 C 8.1 -4.6, -7.2 -10.2, -19.6 -14.8 C -16.6 -10.5, -11.9 -4.9, -7.6 0.7 C 1.7 0.4, 11.5 0.2, 19.6 0 Z'
const LOWER_WING = 'M 19.6 0 C 11.5 0.2, 1.7 0.4, -7.6 0.7 C -11.4 5.3, -15.6 10.2, -18.7 14.6 C -6.8 10.2, 7.2 4.8, 19.6 0 Z'

// TRAIL sampled at eleven points of equal arc length, with the tangent angle at
// each one unwrapped so the plane never spins backwards. Last point = first.
const FLIGHT_X = [100, 134.1, 173.5, 174, 134.4, 100.9, 68.5, 29.2, 28.4, 68.1, 100]
const FLIGHT_Y = [60, 37.3, 44.2, 81.3, 86.3, 62.4, 37.8, 44.8, 81.7, 85.8, 60]
const FLIGHT_ROTATE = [-51, -16, 44, 137, 197, 236, 197, 137, 41, -19, -51]

const FLIGHT_SECONDS = 7
// Ten whole dash periods, so the marching dashes wrap without a jump.
const DASH_TRAVEL = 120

/**
 * A paper plane looping along a dashed flight path. Used where something has
 * just been sent, so the trail keeps moving under the plane.
 */
export function PaperPlaneDoodle({ active = true, loop = true, className }: PaperPlaneDoodleProps) {
  const reduceMotion = useReducedMotion()
  const flying = active && loop && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 200 120" className={cn('w-40', className)}>
      <motion.path
        d={TRAIL}
        strokeWidth={1.25}
        strokeDasharray="5 7"
        initial={{ opacity: 0, strokeDashoffset: 0 }}
        animate={
          flying ? { opacity: 1, strokeDashoffset: [0, -DASH_TRAVEL] } : { opacity: active ? 1 : 0, strokeDashoffset: 0 }
        }
        transition={{
          opacity: { duration: 0.6, ease: DOODLE_EASE },
          strokeDashoffset: flying ? { duration: FLIGHT_SECONDS, repeat: Infinity, ease: 'linear' } : { duration: 0 },
        }}
      />
      <motion.g
        animate={
          flying
            ? { x: FLIGHT_X, y: FLIGHT_Y, rotate: FLIGHT_ROTATE }
            : { x: FLIGHT_X[0], y: FLIGHT_Y[0], rotate: FLIGHT_ROTATE[0] }
        }
        transition={flying ? { duration: FLIGHT_SECONDS, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
      >
        <DrawPath d={UPPER_WING} active={active} duration={0.5} />
        <DrawPath d={LOWER_WING} active={active} delay={0.16} duration={0.5} fill="currentColor" />
      </motion.g>
    </DoodleSvg>
  )
}
