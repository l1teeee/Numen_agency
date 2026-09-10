'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'
import { DoodleSvg, DrawPath } from '../primitives'

interface SketchPencilDoodleProps {
  active?: boolean
  className?: string
}

const FRAME =
  'M 20 37 C 48 35.2, 84 35.6, 120 36.4 C 121.6 48, 121.2 66, 120.6 85 ' +
  'C 90 86.6, 54 86.2, 21 85.4 C 19.4 70, 19.8 52, 20.4 37.6'

// Measured length of FRAME. The reveal below rides on it, so the two must match.
const FRAME_LENGTH = 296.2
// A run of 6/5 dashes that ends on the frame (26 whole periods plus one more 6
// dash is 292), then a single gap that swallows the frame's last 4.2 units and a
// further FRAME_LENGTH. The pattern is exactly twice the frame, so a dash offset
// of FRAME_LENGTH parks the whole run past the end and paints nothing.
const FRAME_DASHES = `${'6 5 '.repeat(26)}6 300.4`

// Drawn with its tip at the origin, which is what the keyframes move.
const PENCIL_LEAD = 'M 0.3 0.2 C 3.6 -2.3, 6.9 -5, 10.2 -7.5 C 8 -9.1, 5.8 -10.6, 3.6 -12.1 C 2.5 -8.1, 1.4 -4.1, 0.3 0.2 Z'
const PENCIL_BARREL =
  'M 10.2 -7.5 C 15.6 -15.2, 21 -22.9, 26.3 -30.5 C 24.1 -32.1, 21.9 -33.6, 19.7 -35.1 ' +
  'C 14.3 -27.4, 9 -19.8, 3.6 -12.1 C 5.8 -10.6, 8 -9.1, 10.2 -7.5 Z'
const PENCIL_BAND = 'M 22.8 -25.5 C 20.6 -27, 18.4 -28.6, 16.2 -30.1'

// FRAME sampled at nine points of equal arc length, held at the first point
// until the pencil starts and at the last one after it finishes.
const TIP_X = [20, 20, 56.9, 93.9, 120.9, 120.6, 84.3, 47.2, 20.2, 20.4, 20.4]
const TIP_Y = [37, 37, 35.8, 35.9, 47.3, 84.3, 86, 85.9, 74.7, 37.7, 37.7]
const TIP_TIMES = [0, 0.06, 0.12125, 0.1825, 0.24375, 0.305, 0.36625, 0.4275, 0.48875, 0.55, 1]

const LOOP_SECONDS = 7

/**
 * A pencil sketching a dashed placeholder frame, then lifting so the frame
 * fades and the sketch starts over. Marks something that is not drawn yet.
 *
 * The frame is revealed by sliding its own dash pattern onto the path, so
 * nothing is ever painted over the surface behind it. DrawPath cannot do this:
 * animating pathLength overwrites the dash pattern.
 */
export function SketchPencilDoodle({ active = true, className }: SketchPencilDoodleProps) {
  const reduceMotion = useReducedMotion()
  const sketching = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 160 100" className={cn('w-24', className)}>
      <motion.g
        animate={sketching ? { opacity: [1, 1, 0, 0] } : { opacity: active ? 1 : 0 }}
        transition={
          sketching
            ? { duration: LOOP_SECONDS, times: [0, 0.85, 0.95, 1], repeat: Infinity, ease: 'linear' }
            : { duration: 0.3 }
        }
      >
        <motion.path
          d={FRAME}
          strokeDasharray={FRAME_DASHES}
          animate={sketching ? { strokeDashoffset: [FRAME_LENGTH, FRAME_LENGTH, 0, 0] } : { strokeDashoffset: 0 }}
          transition={
            sketching
              ? { duration: LOOP_SECONDS, times: [0, 0.06, 0.55, 1], repeat: Infinity, ease: 'linear' }
              : { duration: 0 }
          }
        />
        <motion.g
          animate={sketching ? { x: TIP_X, y: TIP_Y } : { x: TIP_X[0], y: TIP_Y[0] }}
          transition={
            sketching
              ? { duration: LOOP_SECONDS, times: TIP_TIMES, repeat: Infinity, ease: 'linear' }
              : { duration: 0 }
          }
        >
          <DrawPath d={PENCIL_LEAD} active={active} duration={0.3} fill="currentColor" />
          <DrawPath d={PENCIL_BARREL} active={active} delay={0.12} duration={0.45} />
          <DrawPath d={PENCIL_BAND} active={active} delay={0.4} duration={0.2} />
        </motion.g>
      </motion.g>
    </DoodleSvg>
  )
}
