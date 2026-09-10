'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

interface WebDevDoodleProps {
  /** Plays the draw-on and the address-bar typing loop; pass the section's in-view flag. */
  active?: boolean
  className?: string
}

const TYPE_CYCLE = 6.2
const TYPE_SCALE = [0, 0, 1, 1, 0, 0]
// The url stays typed for two thirds of the cycle, so the loop reads as a pause.
const TYPE_TIMES = [0, 0.05, 0.2, 0.86, 0.92, 1]

/**
 * Full-stack web development: a browser window carrying a heavy code glyph,
 * with a database standing beside it and lapping over its edge.
 */
export function WebDevDoodle({ active = true, className }: WebDevDoodleProps) {
  const reduceMotion = useReducedMotion()
  const looping = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <DrawPath
        active={active}
        duration={0.9}
        d="M 14 4.6 C 60 3.2, 130 5.2, 196 4.2 C 201.6 3.8, 205.8 6.4, 205.2 12 C 206.6 40, 204.4 84, 205 107.6 C 205.4 112.6, 202.2 114.8, 197.4 114.1 C 130 115.4, 60 113.2, 12 114.7 C 6.6 114.9, 4 112, 4.7 107.2 C 3.6 84, 5.8 40, 5.2 12 C 4.9 6.8, 7.6 4.6, 16.2 4.2"
      />
      <DrawPath
        active={active}
        delay={0.25}
        duration={0.5}
        fill="currentColor"
        d="M 14 4.6 C 60 3.2, 130 5.2, 196 4.2 C 201.6 3.8, 205.8 6.4, 205.2 12 C 205.6 18, 205 24.6, 205.3 30.4 C 130 31.6, 68 29.8, 4.9 31.2 C 4.7 24.6, 5.5 18, 5.2 12 C 4.9 6.8, 7.6 4.6, 16.2 4.2 Z"
      />
      <DrawPath
        active={active}
        delay={0.6}
        duration={0.22}
        fill="var(--background)"
        d="M 15.2 16.8 a 4.5 4.2 0 1 0 9 0 a 4.5 4.2 0 1 0 -9 0"
      />
      <DrawPath
        active={active}
        delay={0.66}
        duration={0.22}
        fill="var(--background)"
        d="M 29.4 17.4 a 4.2 4.4 0 1 0 8.4 0 a 4.2 4.4 0 1 0 -8.4 0"
      />
      <DrawPath
        active={active}
        delay={0.72}
        duration={0.22}
        fill="var(--background)"
        d="M 43 16.9 a 4.6 4.2 0 1 0 9.2 0 a 4.6 4.2 0 1 0 -9.2 0"
      />
      <DrawPath
        active={active}
        delay={0.72}
        duration={0.35}
        fill="var(--background)"
        d="M 74 9.8 C 102 8.8, 156 10.2, 184 9.4 C 189.6 9.1, 192.6 11.8, 192 16.8 C 192.6 21.8, 189.4 24.8, 184.2 24.4 C 156 25.2, 102 23.8, 74.4 24.7 C 68.8 24.9, 66 21.6, 66.6 16.6 C 66 11.6, 68.8 9.6, 75 9.2 Z"
      />
      <motion.path
        d="M 75.6 17.4 C 90 16.4, 112 17.6, 128.6 16.6"
        style={{ transformBox: 'fill-box', originX: 0, originY: 0.5 }}
        initial={{ scaleX: 0 }}
        animate={looping ? { scaleX: TYPE_SCALE } : { scaleX: active ? 1 : 0 }}
        transition={
          looping
            ? { duration: TYPE_CYCLE, delay: 1.4, repeat: Infinity, ease: 'easeInOut', times: TYPE_TIMES }
            : { duration: 0.2 }
        }
      />

      <DrawPath
        active={active}
        delay={0.4}
        duration={0.5}
        fill="currentColor"
        d="M 71 40.2 C 56 49.4, 34 62.4, 22.4 68.4 C 21.1 69.3, 21.3 70.7, 22.7 71.6 C 34.4 77.8, 56.4 90.6, 70.6 100.2 L 75.8 91.4 C 62 82.6, 48 74.6, 41.2 71.6 C 40.4 70.9, 40.4 69.6, 41.2 68.9 C 48 65.6, 62.2 57.2, 76.4 48.4 Z"
      />
      <DrawPath
        active={active}
        delay={0.5}
        duration={0.5}
        fill="currentColor"
        d="M 117.4 35.4 C 121 36.4, 124.4 37.6, 128 38.8 C 117.6 61.4, 105.4 84.4, 94.6 106.6 C 91 105.4, 87.6 104.4, 84 103.2 C 95 80.6, 106.4 58, 117.6 35.6 Z"
      />
      <DrawPath
        active={active}
        delay={0.6}
        duration={0.5}
        fill="currentColor"
        d="M 139 40.2 C 154 49.4, 176 62.4, 187.6 68.4 C 188.9 69.3, 188.7 70.7, 187.3 71.6 C 175.6 77.8, 153.6 90.6, 139.4 100.2 L 134.2 91.4 C 148 82.6, 162 74.6, 168.8 71.6 C 169.6 70.9, 169.6 69.6, 168.8 68.9 C 162 65.6, 147.8 57.2, 133.6 48.4 Z"
      />

      <DrawPath
        active={active}
        delay={0.85}
        duration={0.5}
        fill="var(--background)"
        d="M 203 52.4 C 202.6 45, 226 39.6, 255.2 39.8 C 284.4 40, 307.6 45.6, 307.2 52.2 C 307 68, 307.8 88, 307.2 103.6 C 307.4 111.4, 284 116.4, 255 116.2 C 226 116, 202.8 111.2, 203.2 103.4 C 202.6 88, 203.4 68, 203 52.4 Z"
      />
      <DrawPath
        active={active}
        delay={1}
        duration={0.32}
        fill="currentColor"
        d="M 203 52 a 52 12.4 0 1 0 104 0 a 52 12.4 0 1 0 -104 0"
      />
      <DrawPath
        active={active}
        delay={1.12}
        duration={0.28}
        d="M 203.2 71.4 C 205.6 78.6, 227.4 83, 255.2 83.2 C 283 83.4, 304.8 79.2, 307 72"
      />
      <DrawPath
        active={active}
        delay={1.2}
        duration={0.28}
        d="M 203.2 90.4 C 205.6 97.6, 227.4 102, 255.2 102.2 C 283 102.4, 304.8 98.2, 307 91"
      />
    </DoodleSvg>
  )
}
