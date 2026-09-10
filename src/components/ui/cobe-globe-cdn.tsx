'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTheme } from 'next-themes'
import createGlobe, { type COBEOptions } from 'cobe'

export interface GlobeMarker {
  id: string
  location: [number, number]
  label: string
}

export interface GlobeReachProps {
  markers?: GlobeMarker[]
  className?: string
  /** Marker id to turn toward the viewer; null rests at the default view. */
  focus?: string | null
}

/* Marker whose id anchors the arcs — every arc radiates from here. */
const HQ_ID = 'sv'

/* Degrees east of the HQ for the resting view. Rotating past the HQ pulls
   the Atlantic into frame, so the Central-American and the European markers
   sit on the near face at first paint instead of one group facing away. */
const VIEW_LNG_OFFSET = 45

/* Fixed tilt. The markers span Buenos Aires (-34.6) to Berlin (+52.5), so a
   slight northward lean keeps both extremes on the visible cap. */
const THETA = 0.3

/* The globe sways instead of spinning. A full rotation spends half its cycle
   showing the Pacific, where this studio has no clients and the map reads as
   an empty ball. These bounds keep the Americas and Europe on the near face. */
const SWAY_RADIANS = 0.32
const SWAY_PERIOD_MS = 26000

/* Turning toward a clicked country. The globe eases in rather than snapping,
   and it holds still there instead of swaying off the country again. */
const FOCUS_EASING = 0.075
const MAX_FOCUS_TILT = 0.75

/* Shortest way round the sphere, so a click never spins the long way. */
function wrapDelta(delta: number) {
  const turn = Math.PI * 2
  return (((delta % turn) + turn * 1.5) % turn) - Math.PI
}

/* The HQ pin is drawn larger than the client pins. */
const HQ_MARKER_SIZE = 0.05
const CLIENT_MARKER_SIZE = 0.032

const DEFAULT_MARKERS: GlobeMarker[] = [
  { id: 'sv', location: [13.69, -89.22], label: 'SV' },
  { id: 'gt', location: [14.63, -90.51], label: 'GT' },
  { id: 'mx', location: [19.43, -99.13], label: 'MX' },
  { id: 'ar', location: [-34.6, -58.38], label: 'AR' },
  { id: 'gb', location: [51.51, -0.13], label: 'GB' },
  { id: 'de', location: [52.52, 13.4], label: 'DE' },
]

/* cobe's convention for turning a given longitude toward the viewer. */
const lngToPhi = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2)

type GlobePalette = Pick<
  COBEOptions,
  'dark' | 'baseColor' | 'markerColor' | 'glowColor' | 'mapBrightness'
>

/* cobe bakes these at creation, so a theme flip means a full rebuild. */
const PALETTE: Record<'dark' | 'light', GlobePalette> = {
  dark: {
    dark: 1,
    baseColor: [0.42, 0.42, 0.42],
    markerColor: [1, 1, 1],
    glowColor: [0.2, 0.2, 0.2],
    mapBrightness: 11,
  },
  light: {
    dark: 0,
    baseColor: [1, 1, 1],
    markerColor: [0, 0, 0],
    // Light mode paints the land dots by darkening the base, so brightness
    // works the opposite way here: a high value washes them out to white.
    glowColor: [0.72, 0.72, 0.72],
    mapBrightness: 1.15,
  },
}

export function GlobeReach({ markers = DEFAULT_MARKERS, className = '', focus = null }: GlobeReachProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  const origin = markers.find((m) => m.id === HQ_ID) ?? markers[0]

  /* Rotation lives in refs so it survives the rebuild on a theme flip —
     otherwise the globe visibly snaps back to its starting longitude. */
  const phiRef = useRef(origin ? lngToPhi(origin.location[1] + VIEW_LNG_OFFSET) : 0)
  const thetaOffset = useRef(0)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const onScreen = useRef(true)
  const reducedMotion = useRef(false)
  const focusTarget = useRef<{ phi: number; theta: number } | null>(null)

  const arcs = useMemo(() => {
    if (!origin) return []
    return markers
      .filter((m) => m.id !== origin.id)
      .map((m) => ({ from: origin.location, to: m.location, id: `${origin.id}-${m.id}` }))
  }, [markers, origin])

  useEffect(() => {
    const marker = focus ? markers.find((m) => m.id === focus) : null
    if (!marker) {
      focusTarget.current = null
      return
    }
    const [lat, lng] = marker.location
    focusTarget.current = {
      phi: lngToPhi(lng),
      theta: Math.max(-MAX_FOCUS_TILT, Math.min(MAX_FOCUS_TILT, (lat * Math.PI) / 180)),
    }
  }, [focus, markers])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      reducedMotion.current = mq.matches
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragStart.current) return
      dragOffset.current = {
        phi: (e.clientX - dragStart.current.x) / 300,
        theta: (e.clientY - dragStart.current.y) / 1000,
      }
    }
    const onUp = () => {
      if (dragStart.current) {
        phiRef.current += dragOffset.current.phi
        thetaOffset.current += dragOffset.current.theta
        dragOffset.current = { phi: 0, theta: 0 }
      }
      dragStart.current = null
      if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    /* next-themes reports undefined until it has read the stored theme;
       creating the globe before then bakes in the wrong palette. It is also
       what keeps this off the server and the first client render. */
    if (!canvas || !resolvedTheme) return

    const palette = PALETTE[resolvedTheme === 'dark' ? 'dark' : 'light']
    let globe: ReturnType<typeof createGlobe> | null = null
    let frame = 0
    let painted = false
    let resizeObserver: ResizeObserver | null = null

    const init = () => {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        ...palette,
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
        width,
        height: width,
        phi: phiRef.current,
        theta: THETA,
        diffuse: 1.5,
        mapSamples: 8000,
        markerElevation: 0.035,
        markers: markers.map((m) => ({
          location: m.location,
          size: m.id === HQ_ID ? HQ_MARKER_SIZE : CLIENT_MARKER_SIZE,
          id: m.id,
        })),
        arcs,
        arcColor: palette.markerColor,
        arcWidth: 0.9,
        arcHeight: 0.32,
        opacity: 1,
      })

      const startedAt = performance.now()

      const animate = () => {
        frame = requestAnimationFrame(animate)
        /* Scrolled away: keep the loop alive but skip the WebGL draw. This
           section sits mid-page, so it would otherwise render forever. */
        if (!onScreen.current) return
        const target = focusTarget.current
        if (target && !dragStart.current) {
          phiRef.current += wrapDelta(target.phi - phiRef.current) * FOCUS_EASING
          thetaOffset.current += (target.theta - THETA - thetaOffset.current) * FOCUS_EASING
        }
        const sway =
          target || dragStart.current || reducedMotion.current
            ? 0
            : Math.sin(((performance.now() - startedAt) / SWAY_PERIOD_MS) * Math.PI * 2) * SWAY_RADIANS
        globe?.update({
          phi: phiRef.current + sway + dragOffset.current.phi,
          theta: THETA + thetaOffset.current + dragOffset.current.theta,
        })
        if (!painted) {
          painted = true
          canvas.style.opacity = '1'
        }
      }
      animate()
    }

    /* Both breakpoint variants mount; the one in a `display:none` wrapper
       reports width 0 and stays uninitialised until its breakpoint hits,
       so only one WebGL context is ever live. */
    if (canvas.offsetWidth > 0) {
      init()
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if ((entries[0]?.contentRect.width ?? 0) > 0) {
          resizeObserver?.disconnect()
          resizeObserver = null
          init()
        }
      })
      resizeObserver.observe(canvas)
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen.current = entry?.isIntersecting ?? true
    })
    intersectionObserver.observe(canvas)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      intersectionObserver.disconnect()
      globe?.destroy()
    }
  }, [markers, arcs, resolvedTheme])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        tabIndex={-1}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1.2s ease',
          borderRadius: '50%',
          /* Keeps a drag on the globe from fighting the page's Lenis scroll. */
          touchAction: 'none',
        }}
      />
    </div>
  )
}
