'use client'

import { motion, type SVGMotionProps } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const DOODLE_EASE = [0.22, 1, 0.36, 1] as const

interface DoodleSvgProps extends ComponentProps<'svg'> {
  viewBox: string
  /** Pen weight in CSS pixels. It stays constant at any render size, see .doodle-ink in globals.css. */
  strokeWidth?: number
  children: ReactNode
}

/**
 * Root of every hand-drawn illustration. Ink follows currentColor, so the same
 * drawing is white on the dark theme and black on the light one.
 */
export function DoodleSvg({ viewBox, strokeWidth = 1.75, className, children, ...rest }: DoodleSvgProps) {
  return (
    <svg
      viewBox={viewBox}
      className={cn('doodle-ink', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

interface DrawPathProps extends Omit<SVGMotionProps<SVGPathElement>, 'd'> {
  d: string
  /** false keeps the stroke hidden; flipping to true draws it in like a pen tracing the line. */
  active?: boolean
  delay?: number
  duration?: number
}

/**
 * A path that draws itself in. A filled path fades its fill in once most of
 * the outline has landed, so the ink always leads the shape.
 */
export function DrawPath({
  d,
  active = true,
  delay = 0,
  duration = 0.8,
  fill,
  transition,
  ...rest
}: DrawPathProps) {
  const reduceMotion = useReducedMotion()
  const hasFill = fill !== undefined && fill !== 'none'

  if (reduceMotion) {
    return <motion.path key="static" d={d} fill={fill} initial={false} animate={{ pathLength: 1, opacity: active ? 1 : 0, fillOpacity: 1 }} transition={{ duration: 0 }} {...rest} />
  }

  const hidden = hasFill ? { pathLength: 0, opacity: 0, fillOpacity: 0 } : { pathLength: 0, opacity: 0 }
  const drawn = hasFill ? { pathLength: 1, opacity: 1, fillOpacity: 1 } : { pathLength: 1, opacity: 1 }

  return (
    <motion.path
      d={d}
      fill={fill}
      initial={hidden}
      animate={active ? drawn : hidden}
      transition={{
        pathLength: { duration, delay: active ? delay : 0, ease: DOODLE_EASE },
        // Round caps paint a dot even at zero length, so the stroke stays
        // transparent until the pen actually starts moving.
        opacity: { duration: 0.01, delay: active ? delay : 0 },
        fillOpacity: { duration: 0.35, delay: active ? delay + duration * 0.75 : 0 },
        ...transition,
      }}
      {...rest}
    />
  )
}
