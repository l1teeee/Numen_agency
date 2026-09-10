'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'
import { DOODLE_EASE, DoodleSvg, DrawPath } from './primitives'

type BotState = 'idle' | 'thinking' | 'talking'

interface NumenBotProps {
  state?: BotState
  active?: boolean
  className?: string
}

const BODY =
  'M 13.8 32.5 C 14.2 26.5, 20.5 21.6, 27.5 20.9 C 34.5 20.2, 42.5 21.6, 47.4 25.6 ' +
  'C 51.6 29, 52.8 35, 52.2 40.6 C 51.6 46.4, 47.6 51.6, 41.2 53.4 C 35 55.1, 25.5 54.6, 20 51.2 ' +
  'C 14.8 48, 13 42, 13.4 35.4 C 13.5 33.9, 13.6 32.9, 13.9 31.6'

const ANTENNA = 'M 33 20.5 C 33.6 14.6, 32.2 10.2, 28.8 7.8 C 25.2 5.4, 21 7.6, 21.8 11.4 C 22.5 14.6, 26.6 15, 27.6 12.2'

// The two mouths share one M + one C so framer can tween the d attribute.
const MOUTH_CLOSED = 'M 26.8 43.6 C 29.4 46.6, 34.8 46.8, 37.4 43.9'
const MOUTH_OPEN = 'M 26.6 42.6 C 29.2 50.4, 35.2 50.2, 37.6 42.4'

const EYES = [
  { cx: 25.4, cy: 35.6, rx: 2.3, ry: 2.5 },
  { cx: 38.6, cy: 35.3, rx: 2.1, ry: 2.4 },
]

const THINKING_DOTS = [
  { cx: 44.5, cy: 16.5, r: 1.1 },
  { cx: 49.8, cy: 12.2, r: 1.5 },
  { cx: 55, cy: 7.4, r: 1.9 },
]

// One 120 ms blink at the tail of a 4 s cycle, so the eyes rest the rest of it.
const BLINK = { scaleY: [1, 1, 0.1, 1, 1], times: [0, 0.955, 0.97, 0.985, 1], duration: 4 }

/**
 * The Numen assistant: a hand-drawn ink blob with one curly antenna, drawn in
 * the same pen as the founder portraits. Ink is currentColor, so it flips with
 * the theme and inverts inside the filled chat trigger.
 */
export function NumenBot({ state = 'idle', active = true, className }: NumenBotProps) {
  const reduceMotion = useReducedMotion()
  const playing = active && !reduceMotion
  const visible = active || reduceMotion === true
  const thinking = state === 'thinking'

  return (
    <DoodleSvg viewBox="0 0 64 64" className={cn('shrink-0', className)}>
      <motion.g
        animate={playing ? { y: [0, 0, -1.2, 0, 0] } : { y: 0 }}
        transition={
          playing
            ? { duration: 7, times: [0, 0.72, 0.8, 0.9, 1], repeat: Infinity, ease: 'easeInOut' }
            : { duration: reduceMotion ? 0 : 0.3 }
        }
      >
        <DrawPath d={BODY} active={visible} duration={0.7} />
        <DrawPath d={ANTENNA} active={visible} delay={0.12} duration={0.5} />

        <motion.g
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, delay: active && !reduceMotion ? 0.45 : 0 }}
        >
          <motion.g
            style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
            animate={{
              scaleY: playing && !thinking ? BLINK.scaleY : 1,
              x: thinking ? 1.4 : 0,
              y: thinking ? -1.4 : 0,
            }}
            transition={{
              scaleY:
                playing && !thinking
                  ? { duration: BLINK.duration, times: BLINK.times, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: reduceMotion ? 0 : 0.2 },
              x: { duration: reduceMotion ? 0 : 0.45, ease: DOODLE_EASE },
              y: { duration: reduceMotion ? 0 : 0.45, ease: DOODLE_EASE },
            }}
          >
            {EYES.map((eye) => (
              <ellipse key={eye.cx} cx={eye.cx} cy={eye.cy} rx={eye.rx} ry={eye.ry} fill="currentColor" stroke="none" />
            ))}
          </motion.g>

          <motion.path
            d={MOUTH_CLOSED}
            animate={playing && state === 'talking' ? { d: [MOUTH_CLOSED, MOUTH_OPEN, MOUTH_CLOSED] } : { d: MOUTH_CLOSED }}
            transition={
              playing && state === 'talking'
                ? { duration: 0.65, repeat: Infinity, ease: 'easeInOut' }
                : { duration: reduceMotion ? 0 : 0.25, ease: DOODLE_EASE }
            }
          />
        </motion.g>
      </motion.g>

      {THINKING_DOTS.map((dot, i) => (
        <motion.circle
          key={dot.cx}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="currentColor"
          stroke="none"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={
            playing && thinking
              ? { opacity: [0, 1, 1, 0] }
              : { opacity: thinking && active ? 1 : 0 }
          }
          transition={
            playing && thinking
              ? { duration: 1.7, times: [0, 0.16, 0.7, 0.92], delay: i * 0.16, repeat: Infinity, ease: 'easeInOut' }
              : { duration: reduceMotion ? 0 : 0.2 }
          }
        />
      ))}
    </DoodleSvg>
  )
}
