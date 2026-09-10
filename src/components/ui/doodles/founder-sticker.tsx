'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FounderAvatar, type FounderName } from '@/components/ui/founder-avatar'
import { SpeechBubble } from './speech-bubble'

interface FounderStickerProps {
  figure: FounderName
  active?: boolean
  tilt?: number
  delay?: number
  bubble?: ReactNode
  bubbleSide?: 'left' | 'right'
  bubbleClassName?: string
  size?: string
  className?: string
}

export function FounderSticker({
  figure,
  active = true,
  tilt = -4,
  delay = 0,
  bubble,
  bubbleSide = 'right',
  bubbleClassName,
  size = 'w-24',
  className,
}: FounderStickerProps) {
  const reduceMotion = useReducedMotion()
  const hidden = { opacity: 0, scale: 0.94, rotate: tilt - 4, y: 8 }
  const shown = { opacity: 1, scale: 1, rotate: tilt, y: 0 }

  return (
    <motion.div
      initial={reduceMotion ? false : hidden}
      animate={reduceMotion || active ? shown : hidden}
      whileHover={reduceMotion ? undefined : { rotate: tilt + 2, y: -3 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 21, delay: active ? delay : 0 }}
      className={cn('relative inline-block', className)}
    >
      <FounderAvatar figure={figure} active={active} className={size} />
      {bubble && (
        <SpeechBubble
          side={bubbleSide}
          active={active}
          delay={delay + 0.45}
          className={cn(bubbleSide === 'right' ? '-top-3 left-[78%]' : '-top-3 right-[78%]', bubbleClassName)}
        >
          {bubble}
        </SpeechBubble>
      )}
    </motion.div>
  )
}
