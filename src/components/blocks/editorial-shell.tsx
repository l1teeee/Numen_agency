'use client'

import { useRef, type ReactNode, type RefObject } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

const EASE = [0.22, 1, 0.36, 1] as const
// The narrow middle band picks the section the reader is currently crossing.
const FOCUS_BAND = '-45% 0px -45% 0px'

export const EDITORIAL_STRONG = 'text-neutral-900 dark:text-neutral-100'
export const EDITORIAL_MUTED = 'text-neutral-500 dark:text-neutral-400'
export const EDITORIAL_TEXT = 'text-[15px] leading-[1.75]'
export const EDITORIAL_LINK = `-my-3 inline-flex min-h-11 items-center ${EDITORIAL_STRONG} underline decoration-neutral-400 decoration-1 underline-offset-4 transition-colors hover:decoration-current dark:decoration-neutral-600 [&>svg]:mx-0.5 [&>svg]:inline-block [&>svg]:align-[-0.125em]`

// Reveal after an element reaches the viewport so it appears as the reader arrives.
function revealProps(reducedMotion: boolean, delay = 0) {
  return {
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.7, ease: EASE, delay },
  } as const
}

interface EditorialRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function EditorialReveal({ children, className, delay }: EditorialRevealProps) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} {...revealProps(reducedMotion, delay)}>{children}</motion.div>
}

interface SectionFocusFadeProps {
  children: ReactNode
  className?: string
  /** True for content already on screen when the page loads. */
  visibleOnLoad?: boolean
}

export function SectionFocusFade({ children, className, visibleOnLoad = false }: SectionFocusFadeProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isFocused = useInView(ref, { margin: FOCUS_BAND, initial: visibleOnLoad })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: isFocused ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Linked to scroll, with ramps in viewport units so tall and short sections reveal at the same pace.
function useViewportFade(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress: entering } = useScroll({ target: ref, offset: ['start end', 'start 80%'] })
  const { scrollYProgress: leaving } = useScroll({ target: ref, offset: ['end 25%', 'end start'] })
  return useTransform([entering, leaving], ([entered, left]: number[]) => Math.min(entered, 1 - left))
}

interface ViewportFadeProps {
  children: ReactNode
  className?: string
}

export function ViewportFade({ children, className }: ViewportFadeProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const opacity = useViewportFade(ref)
  return <motion.div ref={ref} className={className} style={{ opacity: reducedMotion ? 1 : opacity }}>{children}</motion.div>
}

