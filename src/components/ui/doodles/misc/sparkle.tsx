'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'
import { DoodleSvg, DrawPath } from '../primitives'

interface SparkleDoodleProps {
  active?: boolean
  /** Offsets the twinkle so a group of sparkles never blinks in unison. */
  delay?: number
  className?: string
}

const STAR_LONG = 'M 18.4 4.8 C 16.6 8.8, 15.7 12.6, 16 16 C 16.3 19.6, 15.4 23.4, 13.6 27.2'
const STAR_SHORT = 'M 6.4 13.8 C 10.3 15.6, 13.3 16, 16 16 C 18.9 16, 21.8 16.5, 25.6 18.2'
const SPECK_UPPER = 'M 26.9 5.4 C 28 5.1, 28.9 5.9, 28.6 6.9 C 28.3 7.9, 27 8.1, 26.5 7.3 C 26.1 6.7, 26.2 5.7, 26.9 5.4 Z'
const SPECK_LOWER = 'M 4.5 24.5 C 5.5 24.2, 6.3 24.9, 6.1 25.8 C 5.8 26.7, 4.7 26.9, 4.2 26.3 C 3.8 25.7, 3.9 24.8, 4.5 24.5 Z'

/**
 * A tiny twinkling star for hover accents beside arrows and calls to action.
 */
export function SparkleDoodle({ active = true, delay = 0, className }: SparkleDoodleProps) {
  const reduceMotion = useReducedMotion()
  const twinkling = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 32 32" strokeWidth={1.5} className={cn('w-4', className)}>
      <motion.g
        animate={
          twinkling
            ? { scale: [0.85, 0.85, 1.1, 0.92, 0.85, 0.85], opacity: [0.6, 0.6, 1, 0.8, 0.6, 0.6] }
            : { scale: 1, opacity: 1 }
        }
        transition={
          twinkling
            ? {
                duration: 4.5,
                times: [0, 0.5, 0.62, 0.74, 0.86, 1],
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5 + delay,
              }
            : { duration: 0 }
        }
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
      >
        <DrawPath d={STAR_LONG} active={active} delay={delay} duration={0.35} />
        <DrawPath d={STAR_SHORT} active={active} delay={delay + 0.1} duration={0.35} />
        <DrawPath d={SPECK_UPPER} active={active} delay={delay + 0.28} duration={0.2} fill="currentColor" />
        <DrawPath d={SPECK_LOWER} active={active} delay={delay + 0.34} duration={0.2} fill="currentColor" />
      </motion.g>
    </DoodleSvg>
  )
}
