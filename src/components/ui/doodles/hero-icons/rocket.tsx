'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 23.9 2 C 28.7 5.7 32.5 10 35.2 14.5 C 35.6 18.9 35.1 23.3 35 27.5 C 38.6 31.8 42 36.1 45.4 40.7 C 41.2 38.2 37 35.7 32.8 33.3 C 31.5 35.7 29.9 38 28.4 40.1 C 25.4 40.7 22.3 40.6 19.4 39.9 C 18 37.7 16.6 35.4 15.2 33.1 C 11 35.3 6.8 37.6 2.7 39.8 C 6.2 35.5 9.6 31.4 12.9 27.3 C 12.4 23.1 12.5 18.9 12.7 14.5 C 15.6 10.1 19.4 5.8 23.9 2 Z', fill: 'currentColor' },
  { d: 'M 19 21.1 C 18.9 18.4 21.2 16.3 24.1 16.4 C 27 16.5 29.1 18.9 28.9 21.8 C 28.7 24.6 26.3 26.7 23.5 26.4 C 20.9 26.1 19.1 23.8 19 21.1 Z', fill: 'var(--background)' },
  { d: 'M 21.5 42.4 C 21 43.7 20.5 44.9 19.9 46.1' },
  { d: 'M 27.2 42.2 C 27.7 43.3 28.2 44.5 28.8 45.6' },
]

/** A solid rocket: short nose cone, wide barrel, two notched fins, a knocked-out porthole and two exhaust dashes. Drawn solid because an outline body merged into a plain triangle at hero size. */
export function RocketIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
