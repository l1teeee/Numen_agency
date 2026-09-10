'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

const PUFF_ORIGIN = { transformBox: 'fill-box', originX: 0.5, originY: 0.5 } as const
const PUFF_TIMES = [0, 0.42, 0.6, 0.8, 1]

// Ordered from the far end of the trail to the nozzle, which is both the paint
// order and the order the pen reveals them in.
const PUFFS = [
  {
    d: 'M 54 101.9 C 52.3 98.5, 54 94.1, 57.7 94.3 C 58.7 90.7, 64.5 90.5, 66.1 93 C 69.8 92.2, 72.7 95.5, 71.2 98.7 C 71.7 102.5, 68.4 106.2, 64.4 105.4 C 60.7 108, 54.7 105.8, 54 101.9 Z',
    delay: 0.72,
    drift: { x: [0, 0, -3, -1, 0], y: [0, 0, 2, 1, 0], scale: [1, 1, 1.08, 1.02, 1] },
    loop: 7.4,
    loopDelay: 3.2,
  },
  {
    d: 'M 80.9 96.6 C 78.6 92, 81.1 85.9, 86.1 86.2 C 87.5 81.2, 95.5 80.9, 97.7 84.4 C 102.7 83.3, 106.7 87.8, 104.6 92.2 C 105.3 97.5, 100.7 102.5, 95.3 101.4 C 90.2 105, 82 102, 80.9 96.6 Z',
    delay: 0.66,
    drift: { x: [0, 0, -3, -1, 0], y: [0, 0, 1.5, 0.5, 0], scale: [1, 1, 1.07, 1.02, 1] },
    loop: 7.2,
    loopDelay: 3,
  },
  {
    d: 'M 111.9 105.3 C 109 99.4, 112.1 91.7, 118.5 92.1 C 120.3 85.8, 130.4 85.4, 133.2 89.7 C 139.6 88.4, 144.7 94.1, 142 99.8 C 142.9 106.4, 137.1 112.9, 130.2 111.5 C 123.7 116, 113.3 112.2, 111.9 105.3 Z',
    delay: 0.6,
    drift: { x: [0, 0, -2.5, -1, 0], y: [0, 0, 1.5, 0.5, 0], scale: [1, 1, 1.06, 1.02, 1] },
    loop: 6.8,
    loopDelay: 2.4,
  },
  {
    d: 'M 137.9 100.2 C 134.1 92.7, 138.1 82.7, 146.4 83.2 C 148.7 75.1, 161.7 74.6, 165.3 80.2 C 173.5 78.5, 180.1 85.9, 176.6 93.1 C 177.7 101.7, 170.3 110, 161.4 108.2 C 153 114, 139.6 109.1, 137.9 100.2 Z',
    delay: 0.54,
    drift: { x: [0, 0, -2, -0.5, 0], y: [0, 0, 1, 0.5, 0], scale: [1, 1, 1.05, 1.01, 1] },
    loop: 6,
    loopDelay: 1.8,
  },
]

const STARS = [
  {
    d: 'M 25 24 C 25.7 33.1, 29.9 37.3, 39 38 C 29.9 38.7, 25.7 42.9, 25 52 C 24.3 42.9, 20.1 38.7, 11 38 C 20.1 37.3, 24.3 33.1, 25 24 Z',
    delay: 0.95,
    loop: 4.6,
    loopDelay: 2,
    times: [0, 0.52, 0.6, 0.7, 1],
  },
  {
    d: 'M 140 14 C 140.5 20.5, 143.5 23.5, 150 24 C 143.5 24.5, 140.5 27.5, 140 34 C 139.5 27.5, 136.5 24.5, 130 24 C 136.5 23.5, 139.5 20.5, 140 14 Z',
    delay: 1.02,
    loop: 5.8,
    loopDelay: 2.7,
    times: [0, 0.34, 0.42, 0.52, 1],
  },
  {
    d: 'M 270 92 C 270.5 98.5, 273.5 101.5, 280 102 C 273.5 102.5, 270.5 105.5, 270 112 C 269.5 105.5, 266.5 102.5, 260 102 C 266.5 101.5, 269.5 98.5, 270 92 Z',
    delay: 1.09,
    loop: 6.4,
    loopDelay: 2.3,
    times: [0, 0.7, 0.78, 0.87, 1],
  },
]

/**
 * Process step 04: a rocket already off the pad, trailing exhaust the whole
 * width of the frame.
 */
export function LaunchDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      {PUFFS.map((puff) => (
        <motion.g
          key={puff.d}
          style={PUFF_ORIGIN}
          animate={idle ? puff.drift : { x: 0, y: 0, scale: 1 }}
          transition={
            idle
              ? { duration: puff.loop, repeat: Infinity, ease: 'easeInOut', times: PUFF_TIMES, delay: puff.loopDelay }
              : { duration: 0 }
          }
        >
          <DrawPath d={puff.d} fill="var(--background)" active={active} delay={puff.delay} duration={0.45} />
        </motion.g>
      ))}

      <motion.g
        style={PUFF_ORIGIN}
        animate={idle ? { y: [0, 0, -3, 1, 0, 0], rotate: [0, 0, -1.8, 0.8, 0, 0] } : { y: 0, rotate: 0 }}
        transition={
          idle
            ? { duration: 5.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.28, 0.5, 0.72, 0.86, 1], delay: 1.6 }
            : { duration: 0 }
        }
      >
        {/* The rocket is authored upright and set on its climb here, so the paths stay readable. */}
        <g transform="translate(298,6) rotate(58)">
          <DrawPath
            d="M -24 75 C -36 85, -44 102, -46 126 C -39 122, -31 118, -25 116 Z"
            fill="currentColor"
            active={active}
            delay={0.15}
            duration={0.45}
          />
          <DrawPath
            d="M 24 75 C 36 85, 44 102, 46 126 C 39 122, 31 118, 25 116 Z"
            fill="currentColor"
            active={active}
            delay={0.2}
            duration={0.45}
          />
          <DrawPath
            d="M -17 124 L -14 141 L 14 141 L 17 124 Z"
            fill="currentColor"
            active={active}
            delay={0.3}
            duration={0.3}
          />
          <DrawPath
            d="M 0 0 C 12 15, 23 34, 24 53 L 25 119 C 25 123, 22 126, 17 126 L -17 126 C -22 126, -25 123, -25 119 L -24 53 C -22 33, -11 14, 0 0 Z"
            fill="var(--background)"
            active={active}
            delay={0}
            duration={0.9}
          />
          <DrawPath
            d="M 13.5 48 C 13.5 55.5, 7.5 61.5, 0 61.5 C -7.5 61.5, -13.5 55.5, -13.5 48 C -13.5 40.5, -7.5 34.5, 0 34.5 C 7.5 34.5, 13.5 40.5, 13.5 48 Z"
            fill="currentColor"
            active={active}
            delay={0.7}
            duration={0.35}
          />
          <DrawPath d="M -23.8 105 C -12 106.3, 12 106.3, 23.8 105" active={active} delay={0.85} duration={0.25} />
          <DrawPath d="M -24 112 C -12 113.3, 12 113.3, 24 112" active={active} delay={0.9} duration={0.25} />
        </g>
      </motion.g>

      {STARS.map((star) => (
        <motion.g
          key={star.d}
          animate={idle ? { opacity: [1, 1, 0.15, 1, 1] } : { opacity: 1 }}
          transition={
            idle
              ? { duration: star.loop, repeat: Infinity, ease: 'easeInOut', times: star.times, delay: star.loopDelay }
              : { duration: 0 }
          }
        >
          <DrawPath d={star.d} fill="currentColor" active={active} delay={star.delay} duration={0.3} />
        </motion.g>
      ))}
    </DoodleSvg>
  )
}
