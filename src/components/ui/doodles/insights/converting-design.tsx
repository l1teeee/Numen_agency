'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

// Circles, squares and triangles going in: many rough ideas, one outcome out.
const INPUTS = [
  { d: 'M 11.6 13.6 a 4.4 4.2 0 1 0 8.8 0 a 4.4 4.2 0 1 0 -8.8 0', delay: 0 },
  { d: 'M 41 6.6 L 51.6 5.4 L 52.6 15.8 L 42 17 Z', delay: 0.07 },
  { d: 'M 76.4 6.8 L 84.6 18 L 68.2 18.4 Z', delay: 0.14 },
  { d: 'M 103.6 8 a 4.2 4 0 1 0 8.4 0 a 4.2 4 0 1 0 -8.4 0', delay: 0.21 },
  { d: 'M 134.4 8.6 L 145 7.6 L 145.8 18 L 135.2 19 Z', delay: 0.28 },
  { d: 'M 172.6 5.4 L 180.4 16.8 L 164.4 17 Z', delay: 0.35 },
  { d: 'M 197.6 14.4 a 4.3 4.1 0 1 0 8.6 0 a 4.3 4.1 0 1 0 -8.6 0', delay: 0.42 },
]

const FUNNEL =
  'M 12 36.6 C 70 33.6, 150 34.4, 208 36.2 C 186 58, 152 80, 130.4 95.4 C 130.8 101.6, 130 106.4, 130.4 112.4 C 118 113.4, 102 113, 89.6 112.4 C 90 106.4, 89.2 101.6, 89.6 95.4 C 68 80, 34 58, 12 36.6 Z'

const STAGES = ['M 42 58 C 90 56.8, 140 57.4, 178 58', 'M 70 78 C 95 77.2, 125 77.6, 146 78']

const OUTCOME =
  'M 110 121.6 C 118.4 121.2, 123.8 127.2, 123.2 135 C 123.8 143, 118 148.8, 110 148.2 C 101.8 148.8, 96.2 142.8, 96.8 135 C 96.2 127, 102 121.2, 110 121.6 Z'

const POP_TIMES = [0, 0.62, 0.7, 0.78, 1]
const POP_SCALE = [1, 1, 1.16, 1, 1]

/**
 * Blog 07 card 02: a conversion funnel taking scattered shapes in and letting
 * one ticked outcome drop out, which pops once per cycle.
 */
export function ConvertingDesignDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 220 150" strokeWidth={2.25} className={className}>
      {INPUTS.map((input) => (
        <DrawPath key={input.d} d={input.d} active={active} delay={input.delay} duration={0.3} fill="currentColor" />
      ))}

      <DrawPath d={FUNNEL} active={active} delay={0.45} duration={0.75} fill="currentColor" />
      {STAGES.map((stage, i) => (
        <DrawPath
          key={stage}
          d={stage}
          active={active}
          delay={1 + i * 0.08}
          duration={0.3}
          stroke="var(--background)"
          strokeWidth={3}
        />
      ))}

      <motion.g
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
        animate={idle ? { scale: POP_SCALE } : { scale: 1 }}
        transition={
          idle
            ? { duration: 5.4, delay: 1.8, repeat: Infinity, ease: 'easeInOut', times: POP_TIMES }
            : { duration: 0.2 }
        }
      >
        <DrawPath d={OUTCOME} active={active} delay={1.05} duration={0.4} fill="currentColor" />
        <DrawPath
          d="M 103 135.4 L 108.4 141 L 117.6 129"
          active={active}
          delay={1.35}
          duration={0.25}
          stroke="var(--background)"
          strokeWidth={3.5}
        />
      </motion.g>
    </DoodleSvg>
  )
}
