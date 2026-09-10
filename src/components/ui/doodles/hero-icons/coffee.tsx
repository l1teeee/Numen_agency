'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 2.7 18.4 C 2.5 15.1 9.5 12.5 18.4 12.5 C 27.3 12.5 34.3 15.1 34 18.4 C 33.8 21.8 27.1 24.4 18.4 24.4 C 9.7 24.4 3 21.8 2.7 18.4 Z' },
  { d: 'M 2.9 18.9 C 3.8 27.8 5.7 36.2 8.2 42.8 C 12.3 46.8 24.5 46.9 28.8 43 C 31.3 36.4 33.1 28 34 19' },
  { d: 'M 34.7 23.5 C 39.8 22 44.8 24.6 45.3 29.2 C 45.7 33.9 41 37.3 33 36.8' },
  { d: 'M 18 10 C 21.6 7.7 21.8 4.5 18.8 2.2' },
]

/** A mug with a handle and one curl of steam. */
export function CoffeeIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
