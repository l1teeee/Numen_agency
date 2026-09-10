'use client'

import { HeroIconFrame, type HeroIconProps, type HeroIconStroke } from './icon-frame'

const STROKES: HeroIconStroke[] = [
  { d: 'M 16.1 8.8 C 11.7 13 7.3 17.2 2.6 21.4 C 2 22.7 2.1 24.1 3 25.2 C 7.5 29.5 11.9 33.8 16.5 38' },
  { d: 'M 32 8.6 C 36.4 12.8 40.8 17 45.5 21.2 C 46.1 22.5 46 23.8 45.2 25 C 40.6 29.3 36.2 33.6 31.6 37.8' },
  { d: 'M 29.9 2.7 C 28.1 9.9 26.2 17 24.2 24.2 C 22.4 31.1 20.4 38 18.4 45.4' },
]

/** The angle-bracket-slash mark, drawn rather than typeset. */
export function CodeIcon(props: HeroIconProps) {
  return <HeroIconFrame strokes={STROKES} {...props} />
}
