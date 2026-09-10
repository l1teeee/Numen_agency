'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 2.7 45.4 C 5.9 44.2 9.2 43.2 12.6 42.2 C 23.1 31.7 34.4 20.9 45.4 9.4 C 43.1 7.2 40.9 4.9 38.7 2.7 C 27.7 13.7 16.8 24.8 5.9 35.5 C 4.9 38.8 3.9 42.1 2.7 45.4 Z' },
  { d: 'M 5.9 35.6 C 8.3 37.9 10.4 40 12.5 42.2' },
  { d: 'M 32.9 8.6 C 35.2 10.8 37.3 13 39.6 15.3' },
]

/** A pencil on the diagonal, sharpened tip at the bottom left. */
export function PencilIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
