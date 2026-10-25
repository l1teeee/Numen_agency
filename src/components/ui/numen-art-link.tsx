'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

const NUMEN_ART_URL = 'https://art.delta-numen.com'
const CAPTION_EASE = [0.22, 1, 0.36, 1] as const
const LAUNCH_DELAY_MS = 900
const BURST_RING_DELAYS_MS = [0, 120, 240]

function RingsGlyph() {
  return (
    <svg aria-hidden="true" width={16} height={16} viewBox="0 0 16 16" className="shrink-0">
      <circle cx={8} cy={8} r={6.5} fill="none" stroke="currentColor" strokeWidth={1.25} />
      <circle cx={8} cy={8} r={3.25} fill="none" stroke="currentColor" strokeWidth={1.25} />
      <circle cx={8} cy={8} r={0.625} fill="currentColor" />
    </svg>
  )
}

function ArtLinkCaption({ message, reducedMotion }: { message: string | null; reducedMotion: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.span
          key={message}
          aria-hidden="true"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: CAPTION_EASE }}
          className="editorial-note pointer-events-none absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap text-[13px] text-foreground/50"
        >
          {message}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export function NumenArtLink({ className }: { className?: string }) {
  const { t } = useLang()
  const reducedMotion = useReducedMotion()

  const [hovered, setHovered] = useState(false)
  const [focusVisible, setFocusVisible] = useState(false)
  const [launching, setLaunching] = useState(false)
  const effectiveHover = hovered || focusVisible

  const launchingRef = useRef(false)
  const launchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Back/forward cache: a user pressing Back must not land on a frozen
  // "launching" button with a stale timer still pending.
  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (!event.persisted) return
      if (launchTimerRef.current) {
        clearTimeout(launchTimerRef.current)
        launchTimerRef.current = null
      }
      launchingRef.current = false
      setLaunching(false)
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  useEffect(() => {
    return () => {
      if (launchTimerRef.current) clearTimeout(launchTimerRef.current)
    }
  }, [])

  function handlePointerEnter(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
    setHovered(true)
  }

  function handlePointerLeave() {
    setHovered(false)
  }

  function handleFocus(event: React.FocusEvent<HTMLAnchorElement>) {
    if (event.currentTarget.matches(':focus-visible')) setFocusVisible(true)
  }

  function handleBlur() {
    setFocusVisible(false)
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reducedMotion) return // native navigation, no delay
    const isPlainActivation = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
    if (!isPlainActivation) return // modified/middle clicks keep new-tab gestures working

    if (launchingRef.current) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    launchingRef.current = true
    setLaunching(true)
    launchTimerRef.current = setTimeout(() => {
      window.location.assign(NUMEN_ART_URL)
    }, LAUNCH_DELAY_MS)
  }

  const captionMessage = launching ? t.hero.artLink.launch : effectiveHover ? t.hero.artLink.whisper : null

  return (
    <a
      href={NUMEN_ART_URL}
      className={cn('group relative inline-flex min-h-12 items-center justify-center gap-5 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-[opacity,transform] hover:opacity-80', className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      <span aria-hidden="true" className="art-pulse-ring pointer-events-none absolute inset-0 rounded-full border border-foreground" />
      <span aria-hidden="true" className="art-pulse-ring art-pulse-ring-delayed pointer-events-none absolute inset-0 rounded-full border border-foreground" />
      {launching && BURST_RING_DELAYS_MS.map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          className="art-burst-ring pointer-events-none absolute inset-0 rounded-full border border-foreground"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
      <span>{t.hero.artLink.label}</span>
      <RingsGlyph />
      <ArtLinkCaption message={captionMessage} reducedMotion={reducedMotion} />
    </a>
  )
}
