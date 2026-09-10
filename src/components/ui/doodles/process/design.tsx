'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DOODLE_EASE, DoodleSvg, DrawPath } from '../primitives'

const INK_STROKE = 'M 98 110 C 112 107, 130 103.5, 147 102'

// One cycle: the pen dips onto the board, lays the stroke down, lifts, then the
// stroke fades while it is out of the way so the loop restarts unnoticed.
const DRAW_TIMES = [0, 0.12, 0.28, 0.42, 0.62, 0.72, 1]
const STROKE_LENGTH = [0, 0, 0.6, 1, 1, 1, 1]
const STROKE_OPACITY = [0, 0, 1, 1, 1, 0, 0]
const PEN_X = [0, 0, -2, -3, 0, 0, 0]
const PEN_Y = [0, 0, 2, 3, 0, 0, 0]
const DRAW_LOOP = { duration: 6.5, repeat: Infinity, ease: 'easeInOut' as const, times: DRAW_TIMES, delay: 1.5 }

const SWATCHES = [
  {
    d: 'M 277 94 C 277 100.1, 272.1 105, 266 105 C 259.9 105, 255 100.1, 255 94 C 255 87.9, 259.9 83, 266 83 C 272.1 83, 277 87.9, 277 94 Z',
    fill: 'currentColor',
    delay: 0.85,
  },
  {
    d: 'M 302 100 C 302 105.5, 297.5 110, 292 110 C 286.5 110, 282 105.5, 282 100 C 282 94.5, 286.5 90, 292 90 C 297.5 90, 302 94.5, 302 100 Z',
    fill: undefined,
    delay: 0.92,
  },
  {
    d: 'M 299 66 C 299 71, 295 75, 290 75 C 285 75, 281 71, 281 66 C 281 61, 285 57, 290 57 C 295 57, 299 61, 299 66 Z',
    fill: undefined,
    delay: 0.99,
  },
]

/**
 * Process step 02: a wireframed artboard with a marker resting on it, next to
 * three colour swatches.
 */
export function DesignDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <DrawPath
        d="M 20 12.6 C 58 10.9, 98 9.1, 135.9 7.4 C 141 7.2, 144.1 10, 144.3 15 C 145.5 45, 147 78, 148.3 103.9 C 148.5 109, 145.7 112.1, 140.7 112.3 C 102 114, 62 115.9, 24.8 117.5 C 19.8 117.7, 16.6 114.9, 16.4 109.9 C 15.2 80, 13.6 47, 12.4 21 C 12.2 16, 15 12.8, 20 12.6 Z"
        active={active}
        delay={0}
        duration={0.9}
      />
      <DrawPath
        d="M 21.3 19.6 L 131.2 14.6 L 131.6 22.6 L 21.7 27.6 Z"
        fill="currentColor"
        active={active}
        delay={0.4}
        duration={0.35}
      />
      <DrawPath
        d="M 22 34.6 C 60 32.8, 98 31, 135.9 29.4 C 136.5 40, 136.9 51, 137.4 61.4 C 99 63.2, 61 64.9, 23.5 66.6 C 22.9 56, 22.5 45, 22 34.6 Z"
        active={active}
        delay={0.35}
        duration={0.5}
      />
      <DrawPath
        d="M 27 64.5 L 48 44 L 62 54 L 84 38 L 130 59 Z"
        fill="currentColor"
        active={active}
        delay={0.55}
        duration={0.45}
      />
      <DrawPath
        d="M 123.5 42 C 123.5 45.6, 120.6 48.5, 117 48.5 C 113.4 48.5, 110.5 45.6, 110.5 42 C 110.5 38.4, 113.4 35.5, 117 35.5 C 120.6 35.5, 123.5 38.4, 123.5 42 Z"
        active={active}
        delay={0.68}
        duration={0.3}
      />
      <DrawPath d="M 23.8 74.5 C 52 73.6, 88 71.2, 117.7 70.2" active={active} delay={0.6} duration={0.3} />
      <DrawPath d="M 24.3 84.5 C 46 83.8, 74 82, 96.2 81.2" active={active} delay={0.66} duration={0.3} />
      <DrawPath
        d="M 36 92 L 68 90.5 C 74 90.2, 79 94.5, 79.3 100.5 C 79.6 106.5, 75 111.2, 69 111.5 L 37 113 C 31 113.3, 26 109, 25.7 103 C 25.4 97, 30 92.3, 36 92 Z"
        fill="currentColor"
        active={active}
        delay={0.72}
        duration={0.4}
      />

      {reduceMotion ? (
        <path d={INK_STROKE} style={{ opacity: active ? 1 : 0 }} />
      ) : (
        <motion.path
          d={INK_STROKE}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={idle ? { pathLength: STROKE_LENGTH, opacity: STROKE_OPACITY } : { pathLength: 0, opacity: 0 }}
          transition={idle ? DRAW_LOOP : { duration: 0.2 }}
        />
      )}

      <motion.g
        animate={idle ? { x: PEN_X, y: PEN_Y } : { x: 0, y: 0 }}
        transition={idle ? DRAW_LOOP : { duration: 0.3, ease: DOODLE_EASE }}
      >
        <DrawPath
          d="M 150 106 L 163.5 81.6 L 249.3 9.6 L 262.1 25 L 176.3 97 Z"
          fill="currentColor"
          active={active}
          delay={0.5}
          duration={0.55}
        />
        <DrawPath
          d="M 150 106 L 163.5 81.6 L 176.3 97 Z"
          fill="var(--background)"
          active={active}
          delay={0.9}
          duration={0.3}
        />
        <DrawPath
          d="M 178.8 68.7 L 191.6 84.1 L 199.3 77.7 L 186.5 62.3 Z"
          fill="var(--background)"
          active={active}
          delay={0.98}
          duration={0.3}
        />
      </motion.g>

      {SWATCHES.map((swatch) => (
        <DrawPath key={swatch.d} d={swatch.d} fill={swatch.fill} active={active} delay={swatch.delay} duration={0.3} />
      ))}
    </DoodleSvg>
  )
}
