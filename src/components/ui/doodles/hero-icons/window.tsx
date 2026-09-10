'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 5.8 3 C 3.7 3.4 2.5 4.9 2.6 6.9 C 2.5 18.4 2.5 29.9 2.7 41.4 C 2.9 43.6 4.3 45 6.6 45.1 C 18.3 45.4 29.9 45.4 41.6 45.1 C 43.9 45 45.3 43.5 45.4 41.3 C 45.6 29.8 45.6 18.3 45.4 6.8 C 45.3 4.7 43.8 3.3 41.6 3 C 29.7 2.7 17.6 2.7 5.8 3 Z' },
  { d: 'M 2.9 14.5 C 17 15.1 31.2 15.1 45.2 14.4' },
  { d: 'M 6.9 8.8 a 2.2 2.2 0 1 0 4.3 0 a 2.2 2.2 0 1 0 -4.3 0', fill: 'currentColor' },
  { d: 'M 14.1 8.8 a 2.2 2.2 0 1 0 4.3 0 a 2.2 2.2 0 1 0 -4.3 0', fill: 'currentColor' },
  { d: 'M 9 25.6 C 17.6 26.4 26.7 26.4 35.3 25.6' },
  { d: 'M 9.2 35 C 15.2 35.8 21.3 35.8 27.1 35' },
]

/** A browser window: title bar, two buttons, two lines of content. */
export function WindowIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
