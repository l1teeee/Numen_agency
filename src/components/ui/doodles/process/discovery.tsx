'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

const NOTE_LINES = [
  { d: 'M 21.5 48.9 C 50 46.4, 80 42.6, 109 39.7', delay: 0.45 },
  { d: 'M 23.1 63.8 C 48 61.4, 74 58.2, 96.7 56.1', delay: 0.51 },
  { d: 'M 24.6 78.7 C 54 76.2, 88 71.8, 116.1 69.1', delay: 0.57 },
  { d: 'M 26.2 93.6 C 48 91.4, 74 88.2, 93.8 86.5', delay: 0.63 },
  { d: 'M 27.8 108.5 C 54 106.2, 88 102, 111.3 99.7', delay: 0.69 },
]

/**
 * Process step 01: a magnifying glass held beside a page of notes, blowing up
 * the lines it covers.
 */
export function DiscoveryDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <DrawPath
        d="M 7.9 15.1 C 42 11.6, 84 7.1, 117.5 3.7 C 119 3.5, 120.2 4.5, 120.4 6 C 122.9 40, 127 74, 130.1 106.9 C 130.3 108.4, 129.4 109.7, 127.9 109.9 C 96 113.2, 56 117, 20.2 118.5 C 18.7 118.6, 17.5 117.6, 17.3 116.1 C 14.2 82, 10.6 49, 7.9 15.1 Z"
        active={active}
        delay={0}
        duration={0.85}
      />
      <DrawPath
        d="M 19 25 L 68.7 19.8 L 69.6 28.3 L 19.9 33.5 Z"
        fill="currentColor"
        active={active}
        delay={0.4}
        duration={0.3}
      />
      {NOTE_LINES.map((line) => (
        <DrawPath key={line.d} d={line.d} active={active} delay={line.delay} duration={0.3} />
      ))}

      <motion.g
        animate={idle ? { x: [0, 0, 7, -3, 0, 0], y: [0, 0, -3, 2, 0, 0] } : { x: 0, y: 0 }}
        transition={
          idle
            ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.42, 0.62, 0.8, 1], delay: 1.6 }
            : { duration: 0 }
        }
      >
        <DrawPath
          d="M 217.4 67.5 L 291.4 91.5 A 11.05 11.05 0 0 1 284.6 112.5 L 210.6 88.5 Z"
          fill="currentColor"
          active={active}
          delay={0.35}
          duration={0.4}
        />
        <DrawPath
          d="M 225.6 56 C 225.6 83.4, 202.5 104, 176 104 C 149.5 104, 124.7 84.3, 124.7 56 C 124.7 27.7, 147.5 4.4, 176 4.4 C 204.5 4.4, 225.6 28.6, 225.6 56 Z"
          fill="currentColor"
          active={active}
          delay={0.15}
          duration={0.8}
        />
        <DrawPath
          d="M 217.2 56.5 C 217.2 79.5, 197.8 96.9, 175.5 96.9 C 153.2 96.9, 132.5 80.3, 132.5 56.5 C 132.5 32.7, 151.6 13.3, 175.5 13.3 C 199.4 13.3, 217.2 33.5, 217.2 56.5 Z"
          fill="var(--background)"
          active={active}
          delay={0.55}
          duration={0.5}
        />
        <DrawPath
          d="M 140 50 L 201.7 43.5 L 202.7 53.4 L 141 59.9 Z"
          fill="currentColor"
          active={active}
          delay={0.85}
          duration={0.35}
        />
        <DrawPath d="M 143 74 C 160 72.5, 182 69.8, 198.7 68.1" active={active} delay={0.95} duration={0.3} />
        <DrawPath d="M 152 86 C 166 84.8, 180 83.2, 191.8 81.8" active={active} delay={1.05} duration={0.3} />
      </motion.g>
    </DoodleSvg>
  )
}
