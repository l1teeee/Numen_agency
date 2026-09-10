'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'
import { DoodleSvg, DrawPath } from '../primitives'

interface QuestionMarkDoodleProps {
  active?: boolean
  className?: string
}

const HOOK =
  'M 10.8 20.8 C 11.4 11.4, 18 6.2, 25.4 6.8 C 33.6 7.4, 38.2 13, 36.8 20.2 ' +
  'C 35.6 26.6, 29.8 29, 26.4 33 C 24 35.9, 23.6 40.2, 24.4 46.2'

const DOT =
  'M 22.1 55.4 C 24.9 54.3, 27.2 56.2, 26.7 58.8 C 26.2 61.3, 23.3 62.4, 21.5 60.7 ' +
  'C 19.9 59.1, 20.2 56.1, 22.1 55.4 Z'

/**
 * A wondering "?" that floats next to a founder sticker. It draws itself in,
 * then bobs and tilts once per cycle and spends the rest of the loop still.
 */
export function QuestionMarkDoodle({ active = true, className }: QuestionMarkDoodleProps) {
  const reduceMotion = useReducedMotion()
  const bobbing = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 48 72" strokeWidth={2} className={cn('w-8', className)}>
      <motion.g
        animate={bobbing ? { y: [0, 0, -3, 0.6, 0, 0], rotate: [0, 0, -5, 2.5, 0, 0] } : { y: 0, rotate: 0 }}
        transition={
          bobbing
            ? { duration: 5, times: [0, 0.46, 0.6, 0.72, 0.84, 1], repeat: Infinity, ease: 'easeInOut', delay: 1 }
            : { duration: 0 }
        }
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 1 }}
      >
        <DrawPath d={HOOK} active={active} duration={0.7} />
        <DrawPath d={DOT} active={active} delay={0.55} duration={0.3} fill="currentColor" />
      </motion.g>
    </DoodleSvg>
  )
}
