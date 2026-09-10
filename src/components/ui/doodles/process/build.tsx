'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

// Each gear turns by exactly one tooth pitch (360 / teeth) and holds, so the
// cycle ends on a pose identical to its start and the loop never rewinds.
const TURN = { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, times: [0, 0.42, 0.7, 1], delay: 1.7 }
const SPIN_FROM_CENTRE = { transformBox: 'fill-box', originX: 0.5, originY: 0.5 } as const

/**
 * Process step 03: a three gear train driving a code glyph, the machinery that
 * turns a design into a running product.
 */
export function BuildDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <motion.g
        style={SPIN_FROM_CENTRE}
        animate={idle ? { rotate: [0, 0, 51.4, 51.4] } : { rotate: 0 }}
        transition={idle ? TURN : { duration: 0 }}
      >
        <DrawPath
          d="M 41.2 23.8 L 41.9 11 L 54.5 12.8 L 55 22.2 L 63.4 26.9 L 72.9 20.5 L 78.2 31.3 L 72.4 37 L 74.7 46.5 L 83.1 50.3 L 81 61.2 L 70.5 60.8 L 65.7 68.4 L 69.9 78.8 L 58.3 82.2 L 52.2 72.9 L 42.9 75.2 L 39.6 81.4 L 26.1 78.8 L 30 68.3 L 25 60.5 L 14.5 62.8 L 12.1 49.7 L 20.3 46.5 L 23.5 37.1 L 15.5 31.2 L 25.2 21.4 L 32.4 27.4 Z"
          fill="currentColor"
          active={active}
          delay={0}
          duration={0.55}
        />
        <DrawPath
          d="M 57.8 48 C 57.8 53.4, 53 57.1, 48 57.1 C 43 57.1, 37.4 53.8, 37.4 48 C 37.4 42.2, 42.1 37.3, 48 37.3 C 53.9 37.3, 57.8 42.6, 57.8 48 Z"
          fill="var(--background)"
          active={active}
          delay={0.35}
          duration={0.3}
        />
      </motion.g>

      <motion.g
        style={SPIN_FROM_CENTRE}
        animate={idle ? { rotate: [0, 0, -45, -45] } : { rotate: 0 }}
        transition={idle ? TURN : { duration: 0 }}
      >
        <DrawPath
          d="M 126.9 25 L 128.4 9.1 L 144.3 10.8 L 145.1 23.3 L 156.5 28.6 L 168 19.6 L 176.6 31.8 L 169.5 40.5 L 174.6 52.3 L 186.7 55.1 L 187.1 68.9 L 173.6 72 L 170 83 L 179.2 94.1 L 167.3 103.1 L 155.6 94.8 L 145.2 101.6 L 145 111.6 L 128.1 115.2 L 126.3 100.9 L 115.7 95.5 L 105.5 105 L 94.1 92.6 L 101.1 82.9 L 97.2 70.8 L 84.2 71.1 L 85.7 53.6 L 98 53.7 L 103.7 41.2 L 95 31.4 L 104.7 20.2 L 115 27.8 Z"
          fill="var(--background)"
          active={active}
          delay={0.15}
          duration={0.65}
        />
        <DrawPath
          d="M 150.8 62 C 150.8 70.2, 143.7 76, 136 76 C 128.3 76, 120.4 70.6, 120.4 62 C 120.4 53.4, 127.3 46.2, 136 46.2 C 144.7 46.2, 150.8 53.8, 150.8 62 Z"
          fill="currentColor"
          active={active}
          delay={0.5}
          duration={0.3}
        />
      </motion.g>

      <motion.g
        style={SPIN_FROM_CENTRE}
        animate={idle ? { rotate: [0, 0, 40, 40] } : { rotate: 0 }}
        transition={idle ? TURN : { duration: 0 }}
      >
        <DrawPath
          d="M 234.3 19.8 L 235.9 3 L 251 4.7 L 251.7 18.2 L 262.9 22.8 L 274.1 12.1 L 283.1 23 L 276.2 33 L 282.5 43.5 L 295.8 44.1 L 298.5 56.8 L 284.9 62.4 L 283.8 73.4 L 296.4 82.2 L 287.6 93.3 L 273.3 87.9 L 265.9 97.2 L 269.6 107.5 L 255.6 116.3 L 248.7 102.8 L 237.3 101.8 L 231.9 115.6 L 216.9 109.4 L 219.4 96.8 L 210.8 88.2 L 198.9 95.6 L 191.8 80.1 L 203.5 73.8 L 201.6 60.6 L 187.9 57.4 L 189.3 43.4 L 203 43.8 L 207.7 33 L 203.2 22.7 L 213 10.8 L 223.5 21.5 Z"
          fill="var(--background)"
          active={active}
          delay={0.3}
          duration={0.8}
        />
        <DrawPath
          d="M 272.7 60 C 272.7 76.4, 258.8 88.6, 243 88.6 C 227.2 88.6, 212.1 77.1, 212.1 60 C 212.1 42.9, 225.8 28.9, 243 28.9 C 260.2 28.9, 272.7 43.6, 272.7 60 Z"
          active={active}
          delay={0.7}
          duration={0.4}
        />
      </motion.g>

      <DrawPath d="M 229.5 47.5 L 218.8 60.2 L 229 72.5" active={active} delay={0.95} duration={0.3} />
      <DrawPath d="M 249.5 43.5 L 236.6 76.2" active={active} delay={1.02} duration={0.3} />
      <DrawPath d="M 257 48 L 267.4 59.6 L 256.6 72.5" active={active} delay={1.09} duration={0.3} />
    </DoodleSvg>
  )
}
