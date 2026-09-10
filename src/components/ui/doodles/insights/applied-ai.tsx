'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

const PINS = [
  { d: 'M 26 52.4 L 13.6 52 M 26 76 L 11.6 76.4 M 26 100 L 14 99.6', delay: 0.5 },
  { d: 'M 194 52 L 206.4 52.4 M 194 76.4 L 208 76 M 194 100.4 L 206 100', delay: 0.55 },
  { d: 'M 80 26 L 80.4 14.6 M 110 26 L 109.6 12.6 M 140 26 L 140.4 14.6', delay: 0.6 },
  { d: 'M 80 126 L 79.6 137 M 110 126 L 110.4 139 M 140 126 L 139.6 137', delay: 0.65 },
]

const BODY =
  'M 34.4 27.2 C 70 24.8, 176 27.6, 185.6 26.2 C 191 25.8, 194.8 29.4, 194.2 34.4 C 195.4 56, 192.8 106, 193.6 118.2 C 194.4 123.2, 190.4 127, 185.4 126.2 C 176 127.4, 70 124.6, 33.8 126.6 C 28.6 127, 25.4 123.4, 26.2 118.4 C 25 106, 27.4 56, 26.2 33.4 C 26.4 28.6, 29.2 26.8, 34.8 26.4 Z'

const DIE =
  'M 62.4 39.4 C 90 37, 148 39.6, 157.6 38.2 C 163.4 37.8, 166.8 41.4, 166.2 46.4 C 167.2 62, 164.8 98, 165.6 107.2 C 166.4 112.2, 162.6 115, 157.6 114.2 C 148 115.4, 90 112.8, 61.4 114.6 C 56.4 115, 53.4 112.4, 54.2 107.2 C 53 98, 55.6 62, 54.2 45.4 C 54.4 40.8, 57 39.2, 62.8 38.8 Z'

// The traces line up with the pins outside, so each one reads as a single run
// from the die to the edge of the package.
const TRACES = [
  'M 52 52.4 L 36 52 M 52 76 L 32 76.4 M 52 100 L 36 99.6',
  'M 168 52 L 184 52.4 M 168 76.4 L 188 76 M 168 100.4 L 184 100',
  'M 80 36 L 80.4 30 M 110 36 L 109.6 29 M 140 36 L 140.4 30',
  'M 80 116 L 79.6 122 M 110 116 L 110.4 123 M 140 116 L 139.6 122',
]

const SPARK =
  'M 111.4 44.8 C 114.6 62.4, 120.6 70.2, 143 75.2 C 120 82, 113 91.2, 109.4 107.8 C 106.8 90.6, 100.2 82.8, 77.6 76.8 C 101.2 70.2, 108 61.2, 111.4 44.8 Z'

const PULSE_TIMES = [0, 0.58, 0.68, 0.78, 1]
const PULSE_SCALE = [1, 1, 1.12, 1, 1]

/**
 * Blog 07 card 03: a chip carrying a spark where the die would be, the model
 * sitting inside the product, breathing once per cycle.
 */
export function AppliedAiDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 220 150" strokeWidth={2.25} className={className}>
      {PINS.map((pin) => (
        <DrawPath key={pin.d} d={pin.d} active={active} delay={pin.delay} duration={0.3} />
      ))}

      <DrawPath d={BODY} active={active} duration={0.85} fill="currentColor" />
      <DrawPath d={DIE} active={active} delay={0.5} duration={0.55} fill="var(--background)" stroke="var(--background)" />

      {TRACES.map((trace, i) => (
        <DrawPath key={trace} d={trace} active={active} delay={0.85 + i * 0.04} duration={0.28} stroke="var(--background)" />
      ))}
      <DrawPath
        d="M 39 34.6 a 3.4 3.2 0 1 0 6.8 0 a 3.4 3.2 0 1 0 -6.8 0"
        active={active}
        delay={1.02}
        duration={0.22}
        fill="var(--background)"
        stroke="var(--background)"
      />

      <motion.g
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
        animate={idle ? { scale: PULSE_SCALE } : { scale: 1 }}
        transition={
          idle
            ? { duration: 5.8, delay: 1.8, repeat: Infinity, ease: 'easeInOut', times: PULSE_TIMES }
            : { duration: 0.2 }
        }
      >
        <DrawPath d={SPARK} active={active} delay={0.9} duration={0.45} fill="currentColor" />
      </motion.g>

      <DrawPath
        d="M 16 6 C 17.6 12.4, 19.6 14.4, 26 16 C 19.4 17.8, 17.4 19.8, 16 26 C 14.8 19.6, 12.6 17.4, 6 16 C 12.4 14.8, 14.4 12.6, 16 6 Z"
        active={active}
        delay={1.1}
        duration={0.3}
      />
      <DrawPath
        d="M 203 132 C 204.4 137, 206.2 138.6, 211 140 C 206 141.4, 204 143.2, 203 148 C 201.6 143, 199.8 141.4, 195 140 C 200.2 138.6, 202 136.8, 203 132 Z"
        active={active}
        delay={1.18}
        duration={0.3}
      />
    </DoodleSvg>
  )
}
