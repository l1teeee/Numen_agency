'use client'

import { useEffect, useRef, type ReactNode, type Ref } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { ColumnLines } from '@/components/ui/column-lines'

const EASE = [0.22, 1, 0.36, 1] as const

export const EDITORIAL_STRONG = 'text-neutral-900 dark:text-neutral-100'
export const EDITORIAL_MUTED = 'text-neutral-500 dark:text-neutral-400'
export const EDITORIAL_TEXT = 'text-[15px] leading-[1.75]'
export const EDITORIAL_PROSE = `max-w-[32rem] ${EDITORIAL_TEXT} ${EDITORIAL_MUTED}`
export const EDITORIAL_LINK = `inline-flex items-center gap-1 ${EDITORIAL_STRONG} underline-offset-4 hover:underline`
const FRAME = 'relative aspect-[4/3] w-full max-w-[20rem] overflow-hidden rounded-xl md:max-w-none'

// next-themes owns the html class. Lend the page the light palette while focused;
// the provider's later effect still wins if the visitor changes themes meanwhile.
function useLightSpotlight(active: boolean) {
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    if (!active || resolvedTheme !== 'dark') return
    const root = document.documentElement
    root.classList.replace('dark', 'light')
    root.style.colorScheme = 'light'
    return () => {
      root.classList.replace('light', 'dark')
      root.style.colorScheme = 'dark'
    }
  }, [active, resolvedTheme])
}

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

interface EditorialSectionProps {
  id: string
  title: string
  /** Hangs in the left margin like a footnote marker; standalone pages leave it out. */
  number?: number
  sectionRef?: Ref<HTMLElement>
  spotlight?: boolean
  children: ReactNode
}

export function EditorialSection({ id, title, number, sectionRef, spotlight = false, children }: EditorialSectionProps) {
  const reducedMotion = useReducedMotion()
  const focusRef = useRef<HTMLDivElement>(null)
  const isOnScreen = useInView(focusRef)
  // The narrow middle band picks the section the reader is currently crossing.
  const isFocused = useInView(focusRef, { margin: '-45% 0px -45% 0px' })
  useLightSpotlight(spotlight && isFocused)

  return (
    <section ref={sectionRef} id={id} className="relative bg-surface transition-colors duration-700">
      <ColumnLines />
      <motion.div
        ref={focusRef}
        className="relative mx-auto w-full max-w-[46rem] px-6 py-16 sm:px-10 sm:py-20 lg:py-24"
        initial={false}
        // Opacity keeps off-screen links reachable by keyboard focus.
        animate={{ opacity: isFocused ? 1 : isOnScreen ? 0.25 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }}
      >
        <motion.h2 className={`relative font-medium ${EDITORIAL_TEXT} ${EDITORIAL_STRONG}`} {...revealProps(reducedMotion)}>
          {number !== undefined && (
            <span aria-hidden="true" className={`absolute right-full mr-3 font-normal tabular-nums transition-colors duration-500 sm:mr-4 ${isFocused ? EDITORIAL_STRONG : 'text-neutral-400 dark:text-neutral-600'}`}>
              {number}
            </span>
          )}
          <span aria-hidden="true" className={`absolute right-full top-1/2 mr-10 hidden h-px w-8 origin-right bg-neutral-900 dark:bg-neutral-100 lg:block ${reducedMotion ? '' : 'transition-transform duration-500'} ${isFocused ? 'scale-x-100' : 'scale-x-0'}`} />
          {title}
        </motion.h2>
        <div className="mt-6">
          {children}
        </div>
      </motion.div>
    </section>
  )
}

interface EditorialEntryProps {
  title: ReactNode
  subtitle?: ReactNode
  /** A doodle from the site's ink family, padded inside the frame. */
  icon?: ReactNode
  /** Artwork that fills the frame edge to edge. */
  media?: ReactNode
  children?: ReactNode
  delay?: number
}

export function EditorialEntry({ title, subtitle, icon, media, children, delay }: EditorialEntryProps) {
  const reducedMotion = useReducedMotion()
  const visual = media ?? icon
  return (
    <motion.article className={visual ? 'grid gap-6 md:grid-cols-[minmax(0,1fr)_13rem] md:items-start md:gap-10' : 'max-w-[32rem]'} {...revealProps(reducedMotion, delay)}>
      <div className={`min-w-0 ${EDITORIAL_TEXT}`}>
        <h3 className={`font-medium ${EDITORIAL_STRONG}`}>{title}</h3>
        {subtitle && <p className={EDITORIAL_MUTED}>{subtitle}</p>}
        {children && <div className={`mt-3 space-y-3 ${EDITORIAL_MUTED}`}>{children}</div>}
      </div>
      {visual && (
        <div aria-hidden="true" className={FRAME}>
          {media ?? <div className={`absolute inset-0 flex items-center justify-center p-8 ${EDITORIAL_STRONG}`}>{icon}</div>}
        </div>
      )}
    </motion.article>
  )
}

interface EditorialRowProps {
  label: ReactNode
  children: ReactNode
  delay?: number
}

/** Two-column line: a muted label (years, a figure, a field name) beside its content. */
export function EditorialRow({ label, children, delay }: EditorialRowProps) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div className={`grid max-w-[32rem] gap-1 sm:grid-cols-[8rem_1fr] sm:gap-6 ${EDITORIAL_TEXT}`} {...revealProps(reducedMotion, delay)}>
      <div className={`tabular-nums ${EDITORIAL_MUTED}`}>{label}</div>
      <div className="min-w-0">{children}</div>
    </motion.div>
  )
}
