'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BubbleSide = 'left' | 'right'

interface SpeechBubbleProps {
  children: ReactNode
  /** Side of the speaker the bubble hangs on; the tail points back at them. */
  side?: BubbleSide
  active?: boolean
  delay?: number
  className?: string
}

const OUTLINE =
  'M 8 2.5 C 30 1.8, 60 2.2, 92 2.6 C 96.5 2.8, 98.4 5, 98.2 9 C 98.6 17, 98.1 25, 97.8 31 ' +
  'C 97.6 35.5, 95.5 37.6, 91 37.4 C 70 37.9, 45 37.5, 22 37.7 L 17 37.6 C 15 41, 12 45, 9 48.5 ' +
  'C 9.6 44.5, 9.2 41, 8.5 37.7 C 5 37.8, 2.4 36, 2.2 32 C 1.7 24, 2.3 16, 2 9 C 1.8 5, 3.8 2.7, 8 2.5 Z'

export function SpeechBubble({ children, side = 'right', active = true, delay = 0.5, className }: SpeechBubbleProps) {
  const reduceMotion = useReducedMotion()
  const tailOnLeft = side === 'right'
  const hidden = { opacity: 0, scale: reduceMotion ? 1 : 0.92, y: reduceMotion ? 0 : 4 }
  const shown = { opacity: 1, scale: 1, y: 0 }

  return (
    <motion.div
      initial={reduceMotion ? false : hidden}
      animate={active ? shown : hidden}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 21, delay: active ? delay : 0 }}
      aria-hidden={!active}
      style={{ transformOrigin: tailOnLeft ? 'left bottom' : 'right bottom' }}
      className={cn(
        'pointer-events-none absolute z-10 whitespace-nowrap px-3.5 py-1.5 text-xs font-medium text-foreground',
        className,
      )}
    >
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={cn('doodle-ink absolute inset-0 h-full w-full overflow-visible', !tailOnLeft && '-scale-x-100')}
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={OUTLINE} />
      </svg>
      <span className="relative">{children}</span>
    </motion.div>
  )
}
