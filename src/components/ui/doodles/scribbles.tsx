'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DOODLE_EASE } from './primitives'

interface ScribbleProps {
  /** false keeps the mark unpainted; flipping to true sweeps it in. */
  active?: boolean
  delay?: number
  className?: string
}

// Marks that stretch to the caller's width render with preserveAspectRatio
// none, which rules out a pathLength reveal: .doodle-ink pins the pen weight to
// CSS pixels, so Chrome resolves the dash array in rendered pixels while framer
// normalises it in user units and the pen stops short of the end. A clip
// rectangle is stretched by the same view box as the ink, so the two stay in
// step whatever the caller's width and height turn out to be.
const SWEEP_SLACK = 6

interface ClipSweepProps {
  id: string
  width: number
  height: number
  active: boolean
  delay: number
  duration: number
}

/** Left-to-right wipe over one stretched mark, measured in view-box units. */
function ClipSweep({ id, width, height, active, delay, duration }: ClipSweepProps) {
  const reduceMotion = useReducedMotion()
  // The slack keeps the wipe clear of the round caps, which sit outside the
  // view box because the pen weight is in CSS pixels rather than user units.
  const swept = width + SWEEP_SLACK * 2

  return (
    <clipPath id={id} clipPathUnits="userSpaceOnUse">
      <motion.rect
        x={-SWEEP_SLACK}
        y={-SWEEP_SLACK}
        height={height + SWEEP_SLACK * 2}
        initial={{ width: 0 }}
        animate={{ width: active ? swept : 0 }}
        transition={{
          duration: reduceMotion ? 0 : duration,
          delay: active && !reduceMotion ? delay : 0,
          ease: DOODLE_EASE,
        }}
      />
    </clipPath>
  )
}

// useId can hand back punctuation that has no business inside url(#...).
function useClipId() {
  return useId().replace(/[^a-zA-Z0-9]/g, '')
}

const UNDERLINE_BOX = { width: 200, height: 14 }
const UNDERLINE_STROKE =
  'M 3 6.8 C 26 12.8, 56 4.6, 88 9.4 C 118 13.8, 146 5.2, 176 8.8 C 184 9.8, 191 8.2, 198 1.8'
const UNDERLINE_ECHO = 'M 12 11.6 C 42 7.8, 74 13.6, 108 10.8 C 136 8.5, 164 12.8, 187 10.6'

interface ScribbleUnderlineProps extends ScribbleProps {
  /** Pen weight in CSS pixels: 2 under a hero word, 1.5 under a small label. */
  strokeWidth?: number
}

/** Two weaving strokes under an inline word, ending in an upward flick. */
export function ScribbleUnderline({ active = true, delay = 0, strokeWidth = 2, className }: ScribbleUnderlineProps) {
  const clipId = useClipId()

  return (
    <DoodleSvg
      viewBox={`0 0 ${UNDERLINE_BOX.width} ${UNDERLINE_BOX.height}`}
      preserveAspectRatio="none"
      strokeWidth={strokeWidth}
      className={className}
    >
      <ClipSweep id={`${clipId}main`} {...UNDERLINE_BOX} active={active} delay={delay} duration={0.5} />
      <ClipSweep id={`${clipId}echo`} {...UNDERLINE_BOX} active={active} delay={delay + 0.14} duration={0.5} />
      <path d={UNDERLINE_STROKE} clipPath={`url(#${clipId}main)`} />
      <path d={UNDERLINE_ECHO} clipPath={`url(#${clipId}echo)`} />
    </DoodleSvg>
  )
}
