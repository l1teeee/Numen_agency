'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 2.8 1.3 C 4.3 11.4 6.2 24.9 8.1 39.1 C 11 36.3 14 33.7 16.8 31.2 C 19 36.4 21.1 41.6 23.2 46.8 C 25.8 45.6 28.4 44.4 31.1 43.1 C 28.9 38.1 26.7 33 24.5 28 C 31.4 27.1 38.4 26.4 45.3 25.6 C 31.6 16.8 17.5 8.7 2.8 1.3 Z', fill: 'currentColor' },
]

/** A solid mouse pointer, the heaviest outline-free mark in the set. */
export function CursorIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
