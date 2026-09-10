'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

interface ProductDesignDoodleProps {
  /** Plays the draw-on and the cursor drag loop; pass the section's in-view flag. */
  active?: boolean
  className?: string
}

const HANDLES = [
  { d: 'M 5 37 L 12.2 37.4 L 11.8 44.2 L 4.8 43.8 Z', delay: 0.95 },
  { d: 'M 102.4 36.6 L 109.6 37 L 109.2 43.8 L 102.2 43.4 Z', delay: 1 },
  { d: 'M 4.8 100.6 L 12 101 L 11.6 107.8 L 4.6 107.4 Z', delay: 1.05 },
  { d: 'M 102.6 100.2 L 109.8 100.6 L 109.4 107.4 L 102.4 107 Z', delay: 1.1 },
]

const SCREEN_LINES = [
  { d: 'M 114.6 52.4 C 124 51.4, 140 52.8, 150.6 51.8', delay: 0.6 },
  { d: 'M 114.6 64.4 C 122 63.4, 134 64.8, 142.6 63.8', delay: 0.65 },
  { d: 'M 114.6 76.4 C 126 75.4, 144 76.8, 152.6 75.8', delay: 0.7 },
]

const PANEL_ROWS = [
  { d: 'M 220.6 76.4 C 240 75.2, 274 77, 298.6 75.6', delay: 0.9 },
  { d: 'M 220.6 92.4 C 240 91.4, 276 92.8, 300.2 91.7', delay: 0.95 },
  { d: 'M 220.6 106.4 C 238 105.2, 268 107, 288.6 105.7', delay: 1 },
]

const DRAG_CYCLE = 5.8
const DRAG_DELAY = 1.7
// Rest, reach in, hold, release, rest: half the cycle is the resting pose.
const DRAG_TIMES = [0, 0.34, 0.5, 0.66, 0.82, 1]
const DRAG_X = [0, 0, -8, -8, 0, 0]
const DRAG_Y = [0, 0, -5, -5, 0, 0]
const SELECTION_SCALE = [1, 1, 1.05, 1.05, 1, 1]

/**
 * Digital product design: an app screen on the artboard with its hero block
 * selected, a cursor working it and the properties panel alongside.
 */
export function ProductDesignDoodle({ active = true, className }: ProductDesignDoodleProps) {
  const reduceMotion = useReducedMotion()
  const looping = active && !reduceMotion
  const dragTransition = looping
    ? { duration: DRAG_CYCLE, delay: DRAG_DELAY, repeat: Infinity, ease: 'easeInOut' as const, times: DRAG_TIMES }
    : { duration: 0.2 }

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <DrawPath
        active={active}
        duration={0.9}
        d="M 14 4.6 C 50 3.2, 110 5.4, 160 4.2 C 165.6 3.8, 170.6 6.8, 170 12.6 C 171.2 40, 169.4 86, 170 108 C 170.4 113.4, 166.6 116.2, 161 115.6 C 110 116.9, 50 114.7, 14 116 C 8 116.2, 4 113, 4.7 107.4 C 3.6 86, 5.6 40, 5 12.6 C 4.6 7, 7.8 4.6, 16 4.2"
      />
      <DrawPath
        active={active}
        delay={0.28}
        duration={0.5}
        fill="currentColor"
        d="M 14 4.6 C 50 3.2, 110 5.4, 160 4.2 C 165.6 3.8, 170.6 6.8, 170 12.6 C 170.4 20, 169.6 27.6, 170 34.4 C 110 35.6, 50 33.4, 4.9 34.8 C 4.6 27.6, 5.4 20, 5 12.6 C 4.6 7, 7.8 4.6, 16 4.2 Z"
      />
      <DrawPath
        active={active}
        delay={0.62}
        duration={0.22}
        fill="var(--background)"
        d="M 13 18.8 a 8.2 7.6 0 1 0 16.4 0 a 8.2 7.6 0 1 0 -16.4 0"
      />
      <DrawPath
        active={active}
        delay={0.68}
        duration={0.3}
        fill="var(--background)"
        d="M 42 11.4 C 58 10.6, 86 12, 104 11.2 C 107.6 10.9, 109.2 13, 108.6 15.6 C 109.2 18.2, 107 19.8, 104 19.4 C 86 20.2, 58 18.8, 42.4 19.6 C 38.8 19.9, 37.2 17.8, 37.8 15.2 C 37.2 12.6, 39 11.5, 42.8 11.1 Z"
      />
      <DrawPath
        active={active}
        delay={0.74}
        duration={0.3}
        fill="var(--background)"
        d="M 42 24.4 C 52 23.6, 68 25, 78 24.2 C 81.6 23.9, 83.2 25.8, 82.6 28.2 C 83.2 30.6, 81 32, 78 31.6 C 68 32.4, 52 31, 42.4 31.8 C 38.8 32.1, 37.2 30.2, 37.8 27.8 C 37.2 25.4, 39 24.5, 42.8 24.1 Z"
      />

      <DrawPath
        active={active}
        delay={0.42}
        duration={0.55}
        fill="currentColor"
        d="M 14.6 46.2 C 34 45, 72 47.4, 100.4 46 C 101.2 60, 99.8 82, 100.4 98 C 72 99.2, 34 96.8, 14.2 98.3 C 13.5 82, 15 60, 14.6 46.2 Z"
      />
      <DrawPath
        active={active}
        delay={0.8}
        duration={0.22}
        fill="var(--background)"
        d="M 22.8 57.8 a 5.2 4.8 0 1 0 10.4 0 a 5.2 4.8 0 1 0 -10.4 0"
      />
      <DrawPath
        active={active}
        delay={0.86}
        duration={0.4}
        fill="var(--background)"
        d="M 16.6 95.6 C 25 85, 34.6 73.8, 41 74.6 C 47.4 75.4, 52.2 85.6, 57 91 C 62.4 81.6, 69.4 71, 76 71.8 C 83.4 72.6, 91.6 83.6, 98.2 95.8 C 72 96.8, 40 95, 16.6 95.6 Z"
      />

      <motion.g
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
        animate={looping ? { scale: SELECTION_SCALE } : { scale: 1 }}
        transition={dragTransition}
      >
        <motion.path
          d="M 8.6 40.4 C 34 39.2, 76 41.4, 106 40.2 C 106.8 56, 105.6 88, 106.2 103.8 C 76 105, 34 102.8, 8.4 104.1 C 7.6 88, 8.8 56, 8.6 40.2"
          strokeDasharray="7 7"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: active && !reduceMotion ? 0.9 : 0 }}
        />
        {HANDLES.map((handle) => (
          <DrawPath
            key={handle.d}
            active={active}
            delay={handle.delay}
            duration={0.2}
            fill="var(--background)"
            d={handle.d}
          />
        ))}
      </motion.g>

      {SCREEN_LINES.map((line) => (
        <DrawPath key={line.d} active={active} delay={line.delay} duration={0.3} d={line.d} />
      ))}
      <DrawPath
        active={active}
        delay={0.76}
        duration={0.35}
        fill="currentColor"
        d="M 120 86.2 C 128 85.4, 138 86.6, 142 86.2 C 146.6 85.9, 148.6 88.6, 148 92.6 C 148.6 96.8, 145.8 99.6, 142 99.2 C 138 99.8, 128 98.6, 120.4 99.4 C 115.6 99.7, 113.4 97, 114 93 C 113.4 89, 115.8 86.6, 120.6 86.1 Z"
      />

      <motion.g animate={looping ? { x: DRAG_X, y: DRAG_Y } : { x: 0, y: 0 }} transition={dragTransition}>
        <DrawPath
          active={active}
          delay={1.02}
          duration={0.45}
          fill="currentColor"
          d="M 156.6 45.4 C 157.4 62, 158.6 82, 159.4 100.4 C 163.2 96.4, 167.4 92.2, 171 88.4 C 173.8 95, 177 102, 179.8 108.4 C 183.4 106.8, 187 105, 190.4 103.4 C 187.4 96.8, 184.2 89.8, 181.4 83.4 C 186.8 83, 192.6 82.4, 197.8 81.8 C 184 69.2, 170 56.6, 156.6 45.4 Z"
        />
      </motion.g>

      <DrawPath
        active={active}
        delay={0.35}
        duration={0.7}
        d="M 220 4.6 C 240 3.4, 280 5.4, 298 4.2 C 303.6 3.8, 308.4 6.8, 307.8 12.6 C 308.8 40, 307 86, 307.6 108 C 308 113.4, 304.2 116.2, 298.6 115.6 C 280 116.9, 240 114.7, 220 116 C 214 116.2, 210 113, 210.7 107.4 C 209.6 86, 211.6 40, 211 12.6 C 210.6 7, 213.8 4.6, 222 4.2"
      />
      <DrawPath
        active={active}
        delay={0.66}
        duration={0.3}
        fill="currentColor"
        d="M 224 11.2 C 234 10.4, 250 11.8, 256 11.4 C 260.6 11.1, 262.6 13.6, 262 16.8 C 262.6 20, 259.8 21.8, 256 21.4 C 250 22, 234 20.6, 224.4 21.6 C 219.6 21.9, 217.4 19.4, 218 16.2 C 217.4 13, 219.8 11.6, 224.6 11.1 Z"
      />
      <DrawPath active={active} delay={0.72} duration={0.28} d="M 210.8 28.4 C 226 27.2, 268 29, 307.4 27.6" />
      <DrawPath
        active={active}
        delay={0.78}
        duration={0.28}
        fill="currentColor"
        d="M 220.4 38 L 248.6 38.6 L 248 64.8 L 219.8 64.2 Z"
      />
      <DrawPath active={active} delay={0.84} duration={0.28} d="M 258.4 38.4 L 286.6 39 L 286 65.2 L 257.8 64.6 Z" />
      {PANEL_ROWS.map((row) => (
        <DrawPath key={row.d} active={active} delay={row.delay} duration={0.25} d={row.d} />
      ))}
      <DrawPath
        active={active}
        delay={1.06}
        duration={0.22}
        fill="currentColor"
        d="M 241.6 92 a 6.6 6.4 0 1 0 13.2 0 a 6.6 6.4 0 1 0 -13.2 0"
      />
    </DoodleSvg>
  )
}
