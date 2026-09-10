'use client'

import { DoodleSvg, DrawPath } from '../primitives'

export interface HeroIconProps {
  active?: boolean
  className?: string
}

export interface HeroIconStroke {
  d: string
  /** Omitted for an outline. 'currentColor' for solid ink, 'var(--background)' for a knockout. */
  fill?: string
}

/**
 * Shared body of every hero icon: one 48 unit box, one pen weight, one quick
 * draw-on. The icons sit in a container that bobs and tilts them, so there is
 * deliberately no idle loop here to fight it.
 */
export function HeroIconFrame({ strokes, active = true, className }: HeroIconProps & { strokes: HeroIconStroke[] }) {
  return (
    <DoodleSvg viewBox="0 0 48 48" strokeWidth={2} className={className}>
      {strokes.map((stroke, index) => (
        <DrawPath key={stroke.d} d={stroke.d} fill={stroke.fill} active={active} delay={index * 0.05} duration={0.38} />
      ))}
    </DoodleSvg>
  )
}
