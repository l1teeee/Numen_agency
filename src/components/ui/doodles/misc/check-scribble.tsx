'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'
import { DOODLE_EASE, DoodleSvg, DrawPath } from '../primitives'

interface CheckScribbleProps {
  /** Flip to true to play the confirmation once. It never loops. */
  active?: boolean
  className?: string
}

const RING =
  'M 52 17.5 C 64.5 18.2, 74.5 25.5, 78.5 36 C 82.6 47, 80.5 60.5, 72.5 69.5 ' +
  'C 64.5 78.5, 51 82.8, 39 79 C 26.5 75, 15.8 64.5, 15 51 C 14.2 37.2, 22.5 25.2, 34 20 ' +
  'C 38 18.2, 42.4 17, 46.5 17.2'

const CHECK_DOWN = 'M 29.5 49 C 32.2 52.8, 35.8 57.2, 40.5 62.8'
const CHECK_UP = 'M 39.5 63.4 C 45.2 55, 52.4 45.2, 63.5 33'

// Drawn outside the ring, each starting at its own bottom-left end so they pop
// outwards from the circle.
const BURST_TICKS = [
  'M 59 9.5 C 59.8 6.8, 60.6 4.2, 61.5 1.5',
  'M 74 16.5 C 76.2 13.9, 78.4 11.4, 80.5 9',
  'M 85.5 33 C 88.1 32, 90.6 31, 93 30',
]

/**
 * Hand-drawn confirmation mark for the contact form: a ring that does not quite
 * close, a two-stroke check and three ticks that pop once the check lands.
 */
export function CheckScribble({ active = true, className }: CheckScribbleProps) {
  const reduceMotion = useReducedMotion()

  return (
    <DoodleSvg viewBox="0 0 96 96" className={cn('w-14', className)}>
      <DrawPath d={RING} active={active} duration={0.75} />
      <DrawPath d={CHECK_DOWN} active={active} delay={0.55} duration={0.22} />
      <DrawPath d={CHECK_UP} active={active} delay={0.74} duration={0.3} />
      {BURST_TICKS.map((d, index) =>
        reduceMotion ? (
          <path key={d} d={d} opacity={active ? 1 : 0} />
        ) : (
          <motion.g
            key={d}
            initial={{ scale: 0 }}
            animate={{ scale: active ? [0, 1.25, 1] : 0 }}
            transition={{ duration: 0.4, delay: active ? 1.06 + index * 0.07 : 0, ease: DOODLE_EASE }}
            style={{ transformBox: 'fill-box', originX: 0, originY: 1 }}
          >
            <path d={d} />
          </motion.g>
        ),
      )}
    </DoodleSvg>
  )
}
