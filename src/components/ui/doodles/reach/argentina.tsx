'use client'

import { CountryMark, type CapitalFlag, type CountryMarkProps } from './country-mark'

const RINGS = [
  'M 51.2 51 C 51.1 54.3, 49.6 57.3, 48.2 60.2 C 46.4 62.9, 45.7 66.1, 44.6 69.1 C 42 72.7, 40.2 76.7, 39.2 80.9 C 37.9 83.7, 37.6 86.7, 37.5 89.7 C 40 93.7, 43.6 96.8, 47.3 99.6 C 45.4 99.5, 44 98.4, 42.7 97.1 C 40.9 98, 38.9 97.9, 36.9 97.5 C 36.3 94.7, 34.9 92.3, 32.7 90.4 C 32.5 86.3, 30.7 82.4, 29.3 78.6 C 30.1 74.9, 30.3 71, 29.7 67.1 C 29.6 63.8, 29.8 60.3, 30.6 57.1 C 30.5 53.1, 31.2 49.2, 32.4 45.5 C 32.4 42.1, 32.9 38.7, 34 35.5 C 33.4 29.9, 34.4 24.6, 36.9 19.6 C 38.7 16.5, 39.5 13, 40.1 9.6 C 38.5 7.5, 37.5 5.2, 37.2 2.6 C 40.2 2, 43.2 2.3, 46.2 2.6 C 47.6 2.4, 49 2.1, 50.4 2.5 C 54.4 4.4, 57.9 7.2, 60.5 10.8 C 61.1 11.1, 61.4 11.7, 61.8 12.1 C 65.7 14.2, 70 15.3, 74.4 15.6 C 72.8 15.9, 71 15.9, 69.4 16 C 68.9 17, 68.1 18, 67 18.5 C 67.1 21.1, 66.1 23.5, 65.4 26 C 65 30, 63.1 33.4, 60.9 36.6 C 60.1 38.6, 59.4 40.6, 58.1 42.3 C 59 41.6, 59.9 40.8, 60.9 40.4 C 62.1 41.3, 63.1 42.5, 63.8 43.8 C 63.4 45.5, 62.7 47.1, 61.9 48.6 C 58.5 50.2, 54.9 51.2, 50.3 53.9',
]

// The flag is smaller and sits inland of Buenos Aires: the country is only about
// 41 view-box units wide, so a full-size marker would swallow the coastline.
const FLAG: CapitalFlag = {
  pole: 'M 55.2 37.9 C 54.5 33.1, 55.8 29.8, 55.2 26.5',
  pennant: 'M 55.2 26.7 C 52.1 27.7, 49.3 28.8, 48.2 29.7 C 50.9 30.9, 53.4 31.7, 55.1 32.4 Z',
  dot: 'M 52.6 37.5 a 2.6 2.6 0 1 0 5.2 0 a 2.6 2.6 0 1 0 -5.2 0',
}

/** Argentina tapering to Tierra del Fuego, flag on Buenos Aires. */
export function ArgentinaMark(props: CountryMarkProps) {
  return <CountryMark rings={RINGS} flag={FLAG} {...props} />
}
