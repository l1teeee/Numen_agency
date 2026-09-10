'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DOODLE_EASE, DoodleSvg, DrawPath } from '../primitives'

const FROM_BASELINE = { transformBox: 'fill-box', originX: 0.5, originY: 1 } as const
const FROM_START = { transformBox: 'fill-box', originX: 0, originY: 1 } as const
const CENTRED = { transformBox: 'fill-box', originX: 0.5, originY: 0.5 } as const

const BARS = [
  {
    d: 'M 16.5 90.5 C 30 90.1, 44 89.7, 56 89.4 C 57.2 98, 57 107, 56.6 115.2 C 44 115.4, 30 115.7, 17 115.8 C 16.3 107, 16.1 98, 16.5 90.5 Z',
    fill: 'var(--background)',
    delay: 0.3,
  },
  {
    d: 'M 68 78.5 C 82 78.1, 96 77.7, 108 77.4 C 109.2 90, 108.8 103, 108.6 115 C 96 115.2, 82 115.4, 68.6 115.6 C 68.2 103, 67.8 90, 68 78.5 Z',
    fill: 'var(--background)',
    delay: 0.4,
  },
  {
    d: 'M 120 62.5 C 134 62.1, 148 61.7, 160 61.4 C 161.2 79, 160.6 97, 160.4 114.8 C 148 115, 134 115.2, 120.6 115.4 C 120.2 97, 119.8 79, 120 62.5 Z',
    fill: 'var(--background)',
    delay: 0.5,
  },
  {
    d: 'M 172 44.5 C 186 44.1, 200 43.7, 212 43.4 C 213.2 67, 212.6 91, 212.4 114.6 C 200 114.8, 186 115, 172.6 115.2 C 172.2 91, 171.8 67, 172 44.5 Z',
    fill: 'var(--background)',
    delay: 0.6,
  },
  {
    d: 'M 224 22.5 C 238 22.1, 252 21.7, 264 21.4 C 265.2 52, 264.6 84, 264.4 114.4 C 252 114.6, 238 114.8, 224.6 115 C 224.2 84, 223.8 52, 224 22.5 Z',
    fill: 'currentColor',
    delay: 0.7,
  },
]

const TREND = 'M 10 100 C 36 97, 62 91, 88 85 C 124 77, 160 66, 192 55 C 232 41, 264 25, 288 5'
const TREND_HEAD = 'M 269.9 8.3 L 288 5 L 281.5 22.1'
// The trend line runs over the bars, so it is laid down twice: a wide stroke in
// the paper colour clears a channel, then the ink runs through it.
const HALO = { stroke: 'var(--background)', strokeWidth: 7 }

/**
 * Process step 05: a bar chart whose trend line outgrows the tallest bar and
 * leaves the frame.
 */
export function ScaleDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion
  const growDuration = reduceMotion ? 0 : 0.5

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <DrawPath d="M 8 113 C 80 115, 200 115.5, 304 113.5" active={active} delay={0} duration={0.5} />

      {BARS.map((bar) => (
        <motion.path
          key={bar.d}
          d={bar.d}
          fill={bar.fill}
          style={FROM_BASELINE}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={active ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: growDuration, delay: active && !reduceMotion ? bar.delay : 0, ease: DOODLE_EASE }}
        />
      ))}

      <motion.g
        style={FROM_START}
        animate={idle ? { rotate: [0, 0, -1.6, 0, 0] } : { rotate: 0 }}
        transition={
          idle
            ? { duration: 6.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.62, 0.78, 1], delay: 1.9 }
            : { duration: 0 }
        }
      >
        <DrawPath d={TREND} {...HALO} active={active} delay={0.75} duration={0.6} />
        <DrawPath d={TREND_HEAD} {...HALO} active={active} delay={1.3} duration={0.25} />
        <DrawPath d={TREND} active={active} delay={0.75} duration={0.6} />
        <DrawPath d={TREND_HEAD} active={active} delay={1.3} duration={0.25} />
      </motion.g>

      <motion.g
        style={CENTRED}
        animate={idle ? { opacity: [1, 1, 0.25, 1, 1], scale: [1, 1, 0.85, 1, 1] } : { opacity: 1, scale: 1 }}
        transition={
          idle
            ? { duration: 5.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.55, 0.64, 0.74, 1], delay: 2.2 }
            : { duration: 0 }
        }
      >
        <DrawPath
          d="M 44 20 C 44.6 27.8, 48.2 31.4, 56 32 C 48.2 32.6, 44.6 36.2, 44 44 C 43.4 36.2, 39.8 32.6, 32 32 C 39.8 31.4, 43.4 27.8, 44 20 Z"
          fill="currentColor"
          active={active}
          delay={1}
          duration={0.3}
        />
      </motion.g>
    </DoodleSvg>
  )
}
