'use client'

import { DoodleSvg, DrawPath } from '../primitives'

export interface CountryMarkProps {
  /** Plays the draw-on; pass the section's in-view flag. */
  active?: boolean
  className?: string
}

/** A flag planted on the capital, so the tile reads as "we work here". */
export interface CapitalFlag {
  pole: string
  pennant: string
  dot: string
}

interface CountryMarkBodyProps extends CountryMarkProps {
  /** Coastline rings in draw order; the first one is the mainland. */
  rings: string[]
  flag: CapitalFlag
}

/**
 * Shared body of the six reach marks: a hand-drawn coastline plus a capital
 * flag, authored in a 0 0 100 100 box and rendered at about 78 px in a tile.
 */
export function CountryMark({ rings, flag, active = true, className }: CountryMarkBodyProps) {
  return (
    <DoodleSvg viewBox="0 0 100 100" strokeWidth={2} className={className}>
      {rings.map((d, index) => (
        <DrawPath key={d} d={d} active={active} delay={index * 0.32} duration={index === 0 ? 0.75 : 0.42} />
      ))}
      <DrawPath d={flag.pole} active={active} delay={0.64} duration={0.22} />
      <DrawPath d={flag.pennant} active={active} delay={0.74} duration={0.26} fill="currentColor" />
      <DrawPath d={flag.dot} active={active} delay={0.72} duration={0.24} fill="currentColor" />
    </DoodleSvg>
  )
}
