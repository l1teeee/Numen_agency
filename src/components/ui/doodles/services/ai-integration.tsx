'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

interface AiIntegrationDoodleProps {
  /** Plays the draw-on and the reply typing loop; pass the section's in-view flag. */
  active?: boolean
  className?: string
}

const QUESTION_LINES = [
  { d: 'M 19.6 24.4 C 40 23, 80 25, 118.6 23.6', delay: 0.5 },
  { d: 'M 19.6 42.4 C 38 41, 72 43, 102.6 41.6', delay: 0.56 },
  { d: 'M 19.6 60.4 C 34 59, 62 61, 84.6 59.6', delay: 0.62 },
]

const REPLY_LINES = [
  'M 180.6 46.4 C 206 45, 254 47, 291.6 45.6',
  'M 180.6 62.4 C 204 61, 246 63, 280.6 61.6',
  'M 180.6 78.4 C 202 77, 240 79, 270.6 77.6',
  'M 180.6 94.4 C 198 93, 228 95, 252.6 93.6',
]

const REPLY_CYCLE = 6.6
const REPLY_SCALE = [0, 0, 1, 1, 0, 0]

/** Each line waits its turn, writes itself in, then the whole reply clears together. */
function replyTimes(index: number) {
  const start = (0.15 + index * 0.22) / REPLY_CYCLE
  return [0, start, start + 0.28 / REPLY_CYCLE, 0.86, 0.92, 1]
}

/**
 * AI integration: a question in solid ink answered by a bigger assistant
 * bubble that keeps writing its reply, with sparks around the exchange.
 */
export function AiIntegrationDoodle({ active = true, className }: AiIntegrationDoodleProps) {
  const reduceMotion = useReducedMotion()
  const looping = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <DrawPath
        active={active}
        duration={0.85}
        fill="currentColor"
        d="M 14 4.4 C 44 3, 92 5.4, 124 4 C 131 3.4, 136.6 7.4, 136 14.4 C 137 26, 135.4 54, 136 68.6 C 136.6 75, 132 78.4, 124.6 77.8 C 98 79, 64 76.8, 38 77.6 C 32 84, 24.6 91.6, 15.4 97.6 C 18.6 90.4, 21.4 83.4, 23.6 77 C 13 76, 4.4 72.6, 5 66 C 4 52, 5.6 26, 5 14.4 C 4.4 7.4, 9 4.6, 15.6 4 Z"
      />
      {QUESTION_LINES.map((line) => (
        <DrawPath
          key={line.d}
          active={active}
          delay={line.delay}
          duration={0.3}
          stroke="var(--background)"
          d={line.d}
        />
      ))}

      <DrawPath
        active={active}
        delay={0.72}
        duration={0.3}
        fill="currentColor"
        d="M 196 3.4 C 197.2 10.4, 199.4 13.4, 207.6 15.4 C 199.4 17.4, 197.2 20.6, 196 27.4 C 194.8 20.6, 192.6 17.4, 184.4 15.4 C 192.6 13.4, 194.8 10.4, 196 3.4 Z"
      />
      <DrawPath
        active={active}
        delay={0.78}
        duration={0.28}
        fill="currentColor"
        d="M 268 3.6 C 269 9.2, 270.4 11.4, 278.6 13.6 C 270.4 15.8, 269 18.2, 268 23.6 C 267 18.2, 265.6 15.8, 257.4 13.6 C 265.6 11.4, 267 9.2, 268 3.6 Z"
      />

      <DrawPath
        active={active}
        delay={0.35}
        duration={0.9}
        fill="var(--background)"
        d="M 136 28.4 C 170 27, 240 29.4, 288 28 C 296.4 27.4, 301.4 31.6, 300.8 39 C 301.8 56, 300.2 84, 300.8 96.4 C 301.4 103.6, 296.4 106.4, 289 105.8 C 286 106.2, 280 105.8, 273.6 106.1 C 277 110.6, 281.4 114, 286.4 117.4 C 276 114.6, 265 110.8, 255.6 106.4 C 210 106.8, 168 104.6, 136 105.8 C 128.6 106.4, 123.6 102.4, 124.2 95.2 C 123.2 84, 124.8 56, 124.2 39 C 123.6 31.6, 127.6 28.6, 137.4 28 Z"
      />
      <DrawPath
        active={active}
        delay={0.95}
        duration={0.35}
        fill="currentColor"
        d="M 152 52.4 C 153.8 61.6, 156.8 66.4, 170 70 C 156.8 73.6, 153.8 78.6, 152 87.6 C 150.2 78.6, 147.2 73.6, 134 70 C 147.2 66.4, 150.2 61.6, 152 52.4 Z"
      />
      {REPLY_LINES.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          style={{ transformBox: 'fill-box', originX: 0, originY: 0.5 }}
          initial={{ scaleX: 0 }}
          animate={looping ? { scaleX: REPLY_SCALE } : { scaleX: active ? 1 : 0 }}
          transition={
            looping
              ? {
                  duration: REPLY_CYCLE,
                  delay: 1.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: replyTimes(index),
                }
              : { duration: 0.2 }
          }
        />
      ))}

      <DrawPath
        active={active}
        delay={0.84}
        duration={0.3}
        fill="currentColor"
        d="M 86 87.4 C 87.6 96, 90.4 100, 101 102 C 90.4 104, 87.6 108.4, 86 116.6 C 84.4 108.4, 81.6 104, 71 102 C 81.6 100, 84.4 96, 86 87.4 Z"
      />
      <DrawPath
        active={active}
        delay={0.9}
        duration={0.28}
        fill="currentColor"
        d="M 42 100.4 C 42.8 105, 44 106.8, 50.6 108.6 C 44 110.4, 42.8 112.4, 42 117.6 C 41.2 112.4, 40 110.4, 33.4 108.6 C 40 106.8, 41.2 105, 42 100.4 Z"
      />
    </DoodleSvg>
  )
}
