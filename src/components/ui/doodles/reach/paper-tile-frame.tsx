'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DOODLE_EASE, DoodleSvg } from '../primitives'

interface PaperTileFrameProps {
  /** Sweeps the sheet in; pass the section's in-view flag. */
  active?: boolean
  className?: string
}

const SHEET =
  'M 5 4.4 C 16.7 3.6, 28.3 3.4, 40 3.2 C 53.3 3.7, 66.7 4, 80 4.4 C 93.3 4.3, 106.7 3.9, 120 3 C 133.3 3, 146.7 4.1, 160 4.2 C 171.8 3.5, 183.7 4.3, 195.5 3.4 C 196.5 8.2, 196.7 13.1, 197.2 18 C 197 23.1, 195.1 27.9, 194.6 33 C 196 37.9, 197 42.9, 197.6 48 C 197.3 51.4, 195.9 54.6, 195.4 58 C 196.2 60.6, 197 63.2, 196.8 66 C 185.3 76.4, 173.6 86.5, 162 96.8 C 154.7 95.8, 147.4 95.1, 140 95.2 C 128.3 95.5, 116.7 96.5, 105 97 C 93.4 96.1, 81.6 96.3, 70 95.4 C 58.4 96.5, 46.7 96.6, 35 96.8 C 25.2 95.9, 15.3 96, 5.4 95.8 C 4.4 92.9, 3 90, 2.2 87 C 3 84.1, 5.2 81.9, 6 79 C 4.4 76.5, 2.8 73.9, 2 71 C 3.6 68.4, 5.4 66, 6.2 63 C 4.3 60.6, 3.6 57.6, 2.2 55 C 3.4 52.3, 4.8 49.7, 5.8 47 C 5.3 44.1, 3 41.9, 2.4 39 C 3.2 36.2, 4.8 33.7, 6 31 C 4.3 28.6, 3.7 25.6, 2.2 23 C 3.3 20.4, 4.8 17.9, 5.2 15 C 4.5 11.5, 5 7.9, 6.6 4.3'

/** The corner lifted off the sheet, drawn as a flap lying over the torn diagonal. */
const FOLD = 'M 196.4 67 C 187.6 68.4, 177.6 70.4, 172.6 74.4 C 170 80.2, 167.4 88.4, 162.6 96.5 Z'

const CREASE = 'M 3.4 23.5 C 11 18.6, 18.6 12.8, 26.4 4.2'

const HIDDEN = { opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }
const SWEPT = { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }

/**
 * A torn sheet of paper sized to whatever tile it is placed in. It stretches
 * with preserveAspectRatio="none", so it reveals with a clip sweep instead of a
 * DrawPath: under .doodle-ink the pen would measure its dashes in rendered
 * pixels and stop short of the end of a stretched path.
 */
export function PaperTileFrame({ active = true, className }: PaperTileFrameProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={HIDDEN}
      animate={active ? SWEPT : HIDDEN}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { clipPath: { duration: 0.7, ease: DOODLE_EASE }, opacity: { duration: 0.25 } }
      }
    >
      <DoodleSvg viewBox="0 0 200 100" preserveAspectRatio="none" strokeWidth={1.5} className="block h-full w-full">
        <path d={SHEET} fill="var(--background)" />
        <path d={FOLD} fill="var(--background)" />
        <path d={CREASE} strokeWidth={1.1} strokeDasharray="4 5" />
      </DoodleSvg>
    </motion.div>
  )
}
