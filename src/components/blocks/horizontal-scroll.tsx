'use client'

import { Children, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { motion, transform, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'
import { EditorialHeading, EditorialReveal, EDITORIAL_MUTED } from './editorial-shell'

const DESKTOP_QUERY = '(min-width: 768px)'
const DEFAULT_PANEL = 'w-[min(36rem,70vw)] border-l border-neutral-200 pl-10 dark:border-neutral-800'

function subscribeDesktop(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function matchesDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches
}

export function twoDigits(value: number) {
  return String(value).padStart(2, '0')
}

interface HorizontalPanelProps {
  progress: MotionValue<number>
  index: number
  count: number
  className: string
  children: ReactNode
}

// A panel is full at the scroll point where it reaches the column and dims on both sides of it.
function HorizontalPanel({ progress, index, count, className, children }: HorizontalPanelProps) {
  const step = 1 / Math.max(1, count - 1)
  const center = index * step
  const range = [center - step, center, center + step]
  // Function form stays on the JS thread: the accelerated scroll timeline rejects ranges outside 0-1.
  const opacity = useTransform(progress, transform(range, [0.35, 1, 0.35]))
  const scale = useTransform(progress, transform(range, [0.94, 1, 0.94]))
  return <motion.div className={className} style={{ opacity, scale }}>{children}</motion.div>
}

interface HorizontalScrollProps {
  intro?: ReactNode
  panelClassName?: string
  children: ReactNode
}

export function HorizontalScroll({ intro, panelClassName, children }: HorizontalScrollProps) {
  const reducedMotion = useReducedMotion()
  const desktop = useSyncExternalStore(subscribeDesktop, matchesDesktop, () => false)
  const enabled = desktop && !reducedMotion

  const outerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const panels = Children.toArray(children)

  // ResizeObserver reports once on observe, so no synchronous measure is needed.
  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!enabled || !viewport || !track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth))
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [enabled])

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })
  // Function form also re-reads distance on every render, so a re-measured track applies at once.
  const x = useTransform(scrollYProgress, (progress) => -progress * distance)
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setActiveIndex(Math.round(progress * Math.max(0, panels.length - 1)))
  })
  const pinnedDistance = enabled ? distance : 0

  return (
    <div
      ref={outerRef}
      className={cn('relative', enabled && 'ml-[calc(50%-50vw)] w-screen')}
      style={enabled ? { height: `calc(100svh + ${pinnedDistance}px)` } : undefined}
    >
      <div ref={viewportRef} className={enabled ? 'sticky top-0 flex h-svh flex-col overflow-hidden' : undefined}>
        <div className={enabled ? 'px-[calc(50vw-19.5rem)] pt-16' : undefined}>
          <div className="flex items-end justify-between gap-8">
            <div className="min-w-0">
              <EditorialHeading />
              {intro && <EditorialReveal className="mt-6">{intro}</EditorialReveal>}
            </div>
            {enabled && (
              <span aria-hidden="true" className={`shrink-0 text-[12px] tabular-nums ${EDITORIAL_MUTED}`}>
                {twoDigits(activeIndex + 1)} / {twoDigits(panels.length)}
              </span>
            )}
          </div>
          {enabled && (
            <div aria-hidden="true" className="mt-6 h-px bg-neutral-200 dark:bg-neutral-800">
              <motion.div className="h-px origin-left bg-neutral-900 dark:bg-neutral-100" style={{ scaleX: scrollYProgress }} />
            </div>
          )}
        </div>
        <div className={enabled ? 'flex flex-1 items-center' : 'mt-10 md:mt-12'}>
          {/* Side padding calc(50vw - 19.5rem) lines the first and last panel up with the editorial column (46rem container, 3.5rem gutter). */}
          <motion.div
            ref={trackRef}
            style={enabled ? { x } : undefined}
            className={enabled ? 'flex w-max items-start gap-16 px-[calc(50vw-19.5rem)]' : 'space-y-10 md:space-y-12'}
          >
            {panels.map((panel, i) =>
              enabled ? (
                <HorizontalPanel key={i} progress={scrollYProgress} index={i} count={panels.length} className={cn('shrink-0', panelClassName ?? DEFAULT_PANEL)}>
                  {panel}
                </HorizontalPanel>
              ) : (
                <div key={i}>{panel}</div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
