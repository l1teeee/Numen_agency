'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 23.2 2.7 Q 26.6 9.9 29.6 18.1 Q 37.8 18.4 45.6 18.6 Q 39 24.3 33.1 29.2 Q 34 37.1 35.8 44.2 Q 29.5 39.1 23.8 34.9 Q 17.4 40.4 10.4 45.4 Q 13 37.6 14.7 29 Q 9 24 2.5 18.5 Q 9.6 17.7 17.8 17.3 Q 20.2 10.1 23.2 2.7 Z', fill: 'currentColor' },
]

/** A solid five-point star with uneven arms. */
export function StarIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
