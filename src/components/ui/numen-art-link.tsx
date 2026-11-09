'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/lang'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

const NUMEN_ART_URL = 'https://art.delta-numen.com'
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

export function NumenArtLink({ className }: { className?: string }) {
  const { t } = useLang()
  const reducedMotion = useReducedMotion()

  const [launching, setLaunching] = useState(false)

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

  return (
    <a
      href={NUMEN_ART_URL}
      className={cn('art-link relative inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-black px-5 text-[13px] font-medium text-white transition-[background-color,transform] hover:bg-neutral-800', className)}
      onClick={handleClick}
    >
      {launching && BURST_RING_DELAYS_MS.map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          className="art-burst-ring pointer-events-none absolute inset-0 rounded-full border"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
      <span>{t.hero.artLink.label}</span>
      <RingsGlyph />
    </a>
  )
}
