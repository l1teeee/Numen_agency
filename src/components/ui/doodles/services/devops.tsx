'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

interface DevOpsDoodleProps {
  /** Plays the draw-on and the status light sweep; pass the section's in-view flag. */
  active?: boolean
  className?: string
}

// The cloud and the rack were authored stacked in a tall box. The card slot is
// wide and short, so each keeps its own drawing and is placed by a transform:
// .doodle-ink pins the pen to CSS pixels, so scaling a group here does not
// thin its ink.
const CLOUD_PLACEMENT = 'translate(1.34 3.19) scale(0.579)'
const RACK_PLACEMENT = 'translate(141.46 -47.09) scale(0.804)'

const RACK_UNITS = [
  {
    box: 'M 64 94.4 C 90 93.4, 160 95.2, 196 94 C 201.4 93.6, 204.6 96.6, 204 101.2 C 204.4 105, 203.6 110, 204 113.2 C 204.4 116.4, 201 117.8, 196 117.2 C 160 118.4, 90 116.6, 64 117.7 C 58.6 117.9, 55.4 115, 56 110.4 C 55.6 106.6, 56.4 101.6, 56 98.4 C 55.6 95.2, 59 94.6, 65.6 94',
    led: 'M 63.8 105.6 a 4.4 4.2 0 1 0 8.8 0 a 4.4 4.2 0 1 0 -8.8 0',
    vents: ['M 84 101.6 C 104 100.6, 142 102.2, 162.6 101.2', 'M 84 110.4 C 100 109.4, 128 111, 144.6 110'],
    drawDelay: 0.4,
    blinkStart: 0.5,
  },
  {
    box: 'M 64 119.4 C 90 118.4, 160 120.2, 196 119 C 201.4 118.6, 204.6 121.6, 204 126.2 C 204.4 130, 203.6 135, 204 138.2 C 204.4 141.4, 201 142.8, 196 142.2 C 160 143.4, 90 141.6, 64 142.7 C 58.6 142.9, 55.4 140, 56 135.4 C 55.6 131.6, 56.4 126.6, 56 123.4 C 55.6 120.2, 59 119.6, 65.6 119',
    led: 'M 63.8 130.6 a 4.4 4.2 0 1 0 8.8 0 a 4.4 4.2 0 1 0 -8.8 0',
    vents: ['M 84 126.6 C 104 125.6, 142 127.2, 162.6 126.2', 'M 84 135.4 C 100 134.4, 128 136, 144.6 135'],
    drawDelay: 0.5,
    blinkStart: 0.57,
  },
  {
    box: 'M 64 144.4 C 90 143.4, 160 145.2, 196 144 C 201.4 143.6, 204.6 146.6, 204 151.2 C 204.4 155, 203.6 160, 204 163.2 C 204.4 166.4, 201 167.8, 196 167.2 C 160 168.4, 90 166.6, 64 167.7 C 58.6 167.9, 55.4 165, 56 160.4 C 55.6 156.6, 56.4 151.6, 56 148.4 C 55.6 145.2, 59 144.6, 65.6 144',
    led: 'M 63.8 155.6 a 4.4 4.2 0 1 0 8.8 0 a 4.4 4.2 0 1 0 -8.8 0',
    vents: ['M 84 151.6 C 104 150.6, 142 152.2, 162.6 151.2', 'M 84 160.4 C 100 159.4, 128 161, 144.6 160'],
    drawDelay: 0.6,
    blinkStart: 0.64,
  },
]

const BLINK_CYCLE = 6
const BLINK_OPACITY = [1, 1, 0.12, 1, 1]

/** One light dips, then the next, so the rack ticks over once per cycle and rests. */
function blinkTimes(start: number) {
  return [0, start, start + 0.035, start + 0.07, 1]
}

/**
 * DevOps and infrastructure: a heavy cloud carrying a deploy arrow, wired
 * across to a server rack and looped back underneath.
 */
export function DevOpsDoodle({ active = true, className }: DevOpsDoodleProps) {
  const reduceMotion = useReducedMotion()
  const looping = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 312 120" strokeWidth={2.25} className={className}>
      <g transform={CLOUD_PLACEMENT}>
        <DrawPath
          active={active}
          duration={1}
          fill="currentColor"
          d="M 30 87.6 C 14 88.4, 4.6 76.4, 11.4 64.4 C 5.4 50.4, 18.6 35.4, 33.6 40 C 37.4 19.4, 62.6 8.4, 80 20.4 C 92.6 2.4, 122.6 1.4, 136 18.4 C 152.6 4.4, 180 10.4, 186.6 30.4 C 206.6 22.4, 230 36.4, 227 57.4 C 245.4 58.4, 256.6 74.4, 244 85.4 C 232 92.4, 200 87.4, 170 88.2 C 120 89, 70 87, 30 87.6 Z"
        />
        <DrawPath
          active={active}
          delay={0.6}
          duration={0.5}
          fill="var(--background)"
          d="M 130 22.4 C 138.6 31.4, 147.4 40, 155.4 47.4 C 151.6 47.8, 147.4 48, 143.6 48.2 C 144 56.4, 143.2 66, 143.6 76.4 C 136 77.2, 123 76.4, 116.4 76.8 C 116.8 66, 116 56.4, 116.4 48.2 C 112.4 48, 108.4 47.8, 104.6 47.4 C 112.6 40, 121.4 31.4, 130 22.4 Z"
        />
      </g>

      <g transform={RACK_PLACEMENT}>
        {RACK_UNITS.map((unit) => (
          <DrawPath key={unit.box} active={active} delay={unit.drawDelay} duration={0.55} d={unit.box} />
        ))}
        {RACK_UNITS.map((unit) =>
          unit.vents.map((vent, index) => (
            <DrawPath
              key={vent}
              active={active}
              delay={unit.drawDelay + 0.45 + index * 0.05}
              duration={0.28}
              d={vent}
            />
          ))
        )}
        {RACK_UNITS.map((unit) => (
          <motion.g
            key={unit.led}
            animate={looping ? { opacity: BLINK_OPACITY } : { opacity: 1 }}
            transition={
              looping
                ? {
                    duration: BLINK_CYCLE,
                    delay: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: blinkTimes(unit.blinkStart),
                  }
                : { duration: 0.2 }
            }
          >
            <DrawPath
              active={active}
              delay={unit.drawDelay + 0.55}
              duration={0.22}
              fill="currentColor"
              d={unit.led}
            />
          </motion.g>
        ))}
      </g>

      {/* Deploy: cloud out to the rack. */}
      <motion.path
        d="M 152 34 C 162 27.6, 172 28.8, 181 34.2"
        strokeDasharray="7.5 7.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: active && !reduceMotion ? 1.15 : 0 }}
      />
      <DrawPath
        active={active}
        delay={1.2}
        duration={0.25}
        d="M 175.6 27.6 C 178.4 30, 180.8 32, 183.4 34.4 C 180.6 36, 178 37.8, 175.4 40.2"
      />

      {/* Telemetry: rack back under the card and up into the cloud. */}
      <motion.path
        d="M 248 92.4 C 242 107, 190 116.6, 120 112.4 C 84 109.6, 58.6 95.4, 53 74 C 51 66.6, 51 60.4, 52.6 54.4"
        strokeDasharray="7.5 7.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: active && !reduceMotion ? 1.2 : 0 }}
      />
      <DrawPath
        active={active}
        delay={1.25}
        duration={0.25}
        d="M 46.6 61 C 49 58.4, 51 55.6, 52.8 52.6 C 54.8 55.4, 57 58, 59.4 60.4"
      />
    </DoodleSvg>
  )
}
