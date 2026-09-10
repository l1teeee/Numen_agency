'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 23.7 45.3 C 16.9 38.9 8.8 32.5 4 25.4 C -0.1 19.5 0.6 10.4 6.6 5.6 C 12.5 0.9 20.6 3 23.3 9.8 C 23.7 10.7 24 10.7 24.4 9.8 C 27.1 2.7 35.7 0.7 41.6 5.4 C 47.6 10.2 48.2 19.3 43.9 25.2 C 39 32.3 30.6 39 23.7 45.3 Z', fill: 'currentColor' },
]

/** A solid heart. */
export function HeartIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
