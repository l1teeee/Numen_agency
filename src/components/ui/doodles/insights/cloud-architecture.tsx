'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '../primitives'

const CLOUD =
  'M 44 137 C 16 136.4, 3 116, 17 100 C 5 72, 28 42, 53 50 C 60 18, 96 6, 113 26 C 133 4, 167 14, 172 44 C 202 40, 218 66, 205 90 C 220 106, 212 136, 190 137 C 140 138.4, 94 136, 44 137 Z'

const GATEWAY =
  'M 76 48.6 C 96 47.4, 132 48.4, 144 48 C 148.6 47.8, 151 50.4, 150.6 54 C 151 58, 150.2 62.4, 150.4 64.4 C 150.6 67.4, 148 68.6, 144 68.2 C 132 69, 96 68, 75.6 68.6 C 72 68.8, 69.4 67, 69.8 63.6 C 69.4 60, 70.2 55.2, 70 52.8 C 70.2 50, 72 48.6, 76.4 48.1 Z'

const FAN_OUT = 'M 96 53.4 L 89 63.6 M 110.4 53 L 110.6 64 M 124.6 53.4 L 131.4 63.6'

// The two services are drawn a unit apart so they read as hand-drawn twins
// rather than one box copied.
const SERVICES = [
  {
    box: 'M 46 92.6 C 62 91.4, 90 92.4, 94 92 C 98 91.8, 100.4 94.4, 100 98 C 100.4 104, 99.6 116, 99.8 119.4 C 100 122.6, 97.6 124.6, 94 124.2 C 90 125, 62 124, 45.6 124.6 C 42 124.8, 39.4 122.6, 39.8 119.2 C 39.4 114, 40.2 102, 40 98.6 C 40.2 95, 42 92.6, 46.4 92.1 Z',
    led: 'M 48.6 101.4 a 3.6 3.4 0 1 0 7.2 0 a 3.6 3.4 0 1 0 -7.2 0',
    rows: 'M 62 101.4 L 92 101 M 48 111 L 92 110.6 M 48 118 L 78 117.6',
    wire: 'M 94 70.6 C 86 75, 78 80.4, 71.6 86.4',
    head: 'M 78.6 84.4 C 76 85.6, 73.4 86.6, 70.6 87.4 C 71.6 84.6, 72.4 81.8, 73 79',
    delay: 0.5,
  },
  {
    box: 'M 129 93.4 C 145 91.8, 172.6 93.2, 176.6 92.6 C 180.6 92.4, 182.8 95, 182.4 98.6 C 182.8 104.6, 182.2 116.4, 182.4 120 C 182.6 123.2, 180 125, 176.4 124.6 C 172.4 125.6, 144.6 124.4, 128.4 125 C 124.8 125.2, 122.4 123, 122.8 119.6 C 122.4 114.4, 123 102.4, 122.8 99 C 123 95.4, 125 93.4, 129.4 92.9 Z',
    led: 'M 131.4 102 a 3.5 3.3 0 1 0 7 0 a 3.5 3.3 0 1 0 -7 0',
    rows: 'M 145 102 L 172 101.6 M 131 111.6 L 175 111.2 M 131 118.6 L 166 118.2',
    wire: 'M 126 70.6 C 134 75, 142 80.4, 148.4 86.4',
    head: 'M 141.4 84.4 C 144 85.6, 146.6 86.6, 149.4 87.4 C 148.4 84.6, 147.6 81.8, 147 79',
    delay: 0.58,
  },
]

const DRIFT_TIMES = [0, 0.24, 0.5, 0.76, 1]
const DRIFT_Y = [0, -2.5, 0, 2.5, 0]

/**
 * Blog 07 card 01: a cloud holding an architecture, a gateway fanning out to
 * two services, drifting the way a cloud does.
 */
export function CloudArchitectureDoodle({ active = true, className }: { active?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 220 150" strokeWidth={2.25} className={className}>
      <motion.g
        animate={idle ? { y: DRIFT_Y } : { y: 0 }}
        transition={
          idle
            ? { duration: 6.5, delay: 1.6, repeat: Infinity, ease: 'easeInOut', times: DRIFT_TIMES }
            : { duration: 0.2 }
        }
      >
        <DrawPath d={CLOUD} active={active} duration={0.85} />
        <DrawPath d={GATEWAY} active={active} delay={0.35} duration={0.5} fill="currentColor" />
        <DrawPath d={FAN_OUT} active={active} delay={0.75} duration={0.3} stroke="var(--background)" />

        {SERVICES.map((service) => (
          <g key={service.box}>
            <DrawPath d={service.box} active={active} delay={service.delay} duration={0.5} fill="currentColor" />
            <DrawPath
              d={service.led}
              active={active}
              delay={service.delay + 0.42}
              duration={0.25}
              fill="var(--background)"
              stroke="var(--background)"
            />
            <DrawPath
              d={service.rows}
              active={active}
              delay={service.delay + 0.48}
              duration={0.3}
              stroke="var(--background)"
            />
            <DrawPath d={service.wire} active={active} delay={service.delay + 0.35} duration={0.3} />
            <DrawPath d={service.head} active={active} delay={service.delay + 0.6} duration={0.22} />
          </g>
        ))}
      </motion.g>
    </DoodleSvg>
  )
}
