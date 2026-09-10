'use client'

import { CountryMark, type CapitalFlag, type CountryMarkProps } from './country-mark'

const RINGS = [
  'M 65.5 83.9 C 62.2 89, 57.4 92.6, 52.6 96 C 42.6 92.6, 32 91.6, 21.6 91.1 C 16.1 85.3, 9.5 80.9, 2.2 77.9 C 3.2 78.3, 4.4 78.2, 5.5 78.1 C 7.2 72.6, 7.4 66.7, 7.1 61 C 10.2 54.1, 15.4 48.6, 21.6 44.3 C 27.5 42.6, 33.5 43, 39.4 44.3 C 39.1 37, 36.9 30, 32.7 23.9 C 34.3 17.4, 33.6 10.6, 32.9 4 C 47.7 6.1, 63 6, 77.8 4 C 76.5 4.6, 75.3 5.4, 74 5.9 C 76.2 20, 76 34.4, 73.7 48.5 C 82.1 48.6, 90.5 50, 98.4 52.9 C 96.8 53.8, 95 54, 93.2 53.3 C 89.2 55.1, 85.9 58, 82.9 61 C 81.1 67.6, 78 73.8, 73.7 79.1 C 71.4 81.3, 68.4 82.6, 63.3 86',
]

const FLAG: CapitalFlag = {
  pole: 'M 43.6 78.1 C 42.9 72.1, 44.2 67.9, 43.6 63.7',
  pennant: 'M 43.6 63.9 C 39.9 64.9, 36.6 66, 35.4 66.9 C 38.5 68.1, 41.5 68.9, 43.5 69.6 Z',
  dot: 'M 40.5 77.7 a 3.1 3.1 0 1 0 6.2 0 a 3.1 3.1 0 1 0 -6.2 0',
}

/** Guatemala with the Peten block on top, flag on Guatemala City. */
export function GuatemalaMark(props: CountryMarkProps) {
  return <CountryMark rings={RINGS} flag={FLAG} {...props} />
}
