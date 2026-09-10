'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { DoodleSvg, DrawPath } from '@/components/ui/doodles/primitives'

interface SceneProps {
  active: boolean
  className?: string
}

const WINDOW_BANDS = [
  {
    band: 'M 59.6 28 C 74 27.2, 96 28, 110.6 27.4 C 111 31.4, 110.4 35, 110.6 38 C 96 38.8, 74 38, 59.4 38.6 C 59 35, 59.8 31.6, 59.6 28 Z',
    mullions: 'M 76 27.6 L 76.3 38.2 M 94 27.8 L 93.7 38.4',
    delay: 0.55,
  },
  {
    band: 'M 59.6 50 C 74 49.2, 96 50, 110.6 49.4 C 111 53.4, 110.4 57, 110.6 60 C 96 60.8, 74 60, 59.4 60.6 C 59 57, 59.8 53.6, 59.6 50 Z',
    mullions: 'M 76 49.6 L 76.3 60.2 M 94 49.8 L 93.7 60.4',
    delay: 0.62,
  },
  {
    band: 'M 59.6 72 C 74 71.2, 96 72, 110.6 71.4 C 111 75.4, 110.4 79, 110.6 82 C 96 82.8, 74 82, 59.4 82.6 C 59 79, 59.8 75.6, 59.6 72 Z',
    mullions: 'M 76 71.6 L 76.3 82.2 M 94 71.8 L 93.7 82.4',
    delay: 0.69,
  },
]

const SWAY_TIMES = [0, 0.3, 0.46, 0.62, 1]
const SWAY_ROTATE = [0, 0, 2.6, 0, 0]

/** Aeriform, an architecture studio: a tower and its glazed wing, drawn to scale. */
function AeriformStudio({ active, className }: SceneProps) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 280 150" strokeWidth={2.25} className={className}>
      <DrawPath d="M 6 133 C 60 131.6, 140 134, 200 132.4 C 230 131.6, 258 133, 274 132.6" active={active} duration={0.5} />
      <DrawPath d="M 15 28 a 15 14.2 0 1 0 30 0 a 15 14.2 0 1 0 -30 0" active={active} delay={0.15} duration={0.4} />

      <DrawPath
        d="M 53.4 10.6 C 74 8.4, 100 10, 116.6 8.6 C 118 50, 117.4 100, 118 132.6 C 100 133.6, 74 132.4, 52.2 133.2 C 51.8 100, 53.2 50, 53.4 10.6 Z"
        active={active}
        delay={0.1}
        duration={0.8}
        fill="currentColor"
      />
      {WINDOW_BANDS.map((row) => (
        <DrawPath
          key={row.band}
          d={row.band}
          active={active}
          delay={row.delay}
          duration={0.3}
          fill="var(--background)"
          stroke="var(--background)"
        />
      ))}
      {WINDOW_BANDS.map((row) => (
        <DrawPath key={row.mullions} d={row.mullions} active={active} delay={row.delay + 0.3} duration={0.25} />
      ))}
      <DrawPath
        d="M 76.4 133.2 C 76 126, 76.6 116, 76.2 111.4 C 82 110.2, 89 110.8, 94.4 111 C 94 116, 94.6 126, 94.2 133.2 Z"
        active={active}
        delay={0.75}
        duration={0.3}
        fill="var(--background)"
        stroke="var(--background)"
      />

      <DrawPath
        d="M 122 77 C 150 75.6, 200 77, 236.6 76.4 C 237.4 96, 236.6 118, 237 132.8 C 200 133.6, 150 132.4, 122.4 133.2 C 121.6 118, 122.8 96, 122 77 Z"
        active={active}
        delay={0.35}
        duration={0.65}
      />
      <DrawPath
        d="M 146 79 L 146.4 132.4 M 170.4 78.6 L 170 132.6 M 194 79 L 194.4 132.4 M 216.4 78.6 L 216 132.6"
        active={active}
        delay={0.8}
        duration={0.35}
      />
      <DrawPath
        d="M 114 67.6 C 150 66.2, 220 67.6, 250.6 67 C 252 70, 251.2 74, 251.4 76.6 C 220 77.4, 150 76.2, 113.4 77 C 112.2 74, 113 70.2, 114 67.6 Z"
        active={active}
        delay={0.5}
        duration={0.5}
        fill="currentColor"
      />

      <motion.g
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 1 }}
        animate={idle ? { rotate: SWAY_ROTATE } : { rotate: 0 }}
        transition={
          idle
            ? { duration: 6.4, delay: 1.6, repeat: Infinity, ease: 'easeInOut', times: SWAY_TIMES }
            : { duration: 0.2 }
        }
      >
        <DrawPath
          d="M 258 79.4 C 266.2 77.2, 273.8 82.6, 273 89.8 C 278.2 94.4, 275.6 103.2, 268.6 105.4 C 265.6 110.8, 256 111.6, 251.6 107.2 C 243.8 107, 240.8 98.4, 245.4 92.6 C 243.6 84.4, 251 78.2, 258 79.4 Z"
          active={active}
          delay={0.65}
          duration={0.5}
          fill="currentColor"
        />
      </motion.g>
      <DrawPath d="M 259.4 105.4 C 258.6 116, 259.8 126, 259 132.6" active={active} delay={0.95} duration={0.25} />

      <DrawPath d="M 194 17 C 197 12.6, 200.4 12.4, 202.6 16.4 C 205.2 12.4, 208.4 12.6, 211 16.6" active={active} delay={1} duration={0.25} />
      <DrawPath d="M 220 26 C 222 23.4, 224.4 23.2, 226 25.8 C 227.8 23.2, 230 23.4, 231.8 26" active={active} delay={1.06} duration={0.25} />

      <DrawPath
        d="M 33.4 118.6 a 2.9 2.8 0 1 0 5.8 0 a 2.9 2.8 0 1 0 -5.8 0"
        active={active}
        delay={0.95}
        duration={0.2}
        fill="currentColor"
      />
      <DrawPath
        d="M 36.2 121.6 C 35.8 125, 36.4 127.6, 36 129.4 M 31 124.4 C 33.6 123.2, 38.8 123.6, 41.2 124.8 M 36 129.4 L 32.4 132.8 M 36 129.4 L 39.8 132.8"
        active={active}
        delay={1}
        duration={0.3}
      />

      <motion.path
        d="M 52 143 C 100 142.2, 180 143.6, 237 142.8"
        strokeDasharray="5 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, delay: idle ? 1.05 : 0 }}
      />
      <DrawPath d="M 52.4 137.6 L 52 148 M 237.4 137.6 L 237 148" active={active} delay={1.1} duration={0.25} />
    </DoodleSvg>
  )
}

const STEAM = [
  { d: 'M 62 44 C 56 36, 68 30, 62 21 C 58 14, 66 10, 64 4.6', delay: 1 },
  { d: 'M 90 42 C 83 33, 96 27, 89 17 C 85 10, 93 7, 91 3', delay: 1.06 },
  { d: 'M 118 45 C 112 37, 124 32, 118 23 C 114 17, 121 13, 120 8', delay: 1.12 },
]

const BEANS = [
  {
    body: 'M 20 171.6 C 27 168.6, 34.4 173, 33.4 179.8 C 32.4 186.4, 24 188.6, 20 184 C 16.4 180.4, 16.4 174.4, 20 171.6 Z',
    crease: 'M 25.4 170.4 C 23 175.6, 24.8 182, 27.8 186.4',
    delay: 0.9,
  },
  {
    body: 'M 145 172.6 C 152 169.6, 159.4 174, 158.4 180.8 C 157.4 187.4, 149 189.6, 145 185 C 141.4 181.4, 141.4 175.4, 145 172.6 Z',
    crease: 'M 150.4 171.4 C 148 176.6, 149.8 183, 152.8 187.4',
    delay: 0.95,
  },
]

const LEAVES = [
  { d: 'M 22.4 136.6 C 14 132.6, 12 122.4, 20.4 119.6 C 26.4 124, 26.6 132.4, 22.4 136.6 Z', delay: 0.7 },
  { d: 'M 26.6 126.6 C 34.6 122, 43 126.4, 38.6 133.6 C 32.4 136.4, 27.4 132.4, 26.6 126.6 Z', delay: 0.76 },
  { d: 'M 30.4 113.6 C 24 109.6, 24 100.6, 31.4 99.4 C 36.4 103.6, 35.4 110.6, 30.4 113.6 Z', delay: 0.82 },
]

const DRIFT_TIMES = [0, 0.3, 0.5, 0.72, 1]
const DRIFT_Y = [0, 0, -3.5, 0, 0]
const DRIFT_OPACITY = [1, 1, 0.55, 1, 1]

/** Savia Cafe, a specialty roastery: a pour-over set with the origin branch beside it. */
function SaviaRoastery({ active, className }: SceneProps) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 180 200" strokeWidth={2.25} className={className}>
      <DrawPath d="M 6 186 C 50 184.6, 120 187, 174 185.6" active={active} duration={0.5} />

      <DrawPath
        d="M 46.6 58 C 60 65.6, 78 67.6, 90 67.2 C 104 67.2, 122 64.8, 133.6 58 C 126.6 76, 114 94, 105.4 104.6 C 96 106.6, 84 106.6, 74.6 104.6 C 66 94, 54 76, 46.6 58 Z"
        active={active}
        delay={0.15}
        duration={0.7}
        fill="currentColor"
      />
      <DrawPath d="M 63 66 C 68 82, 74 96, 79 104.6" active={active} delay={0.7} duration={0.3} stroke="var(--background)" strokeWidth={3} />
      <DrawPath d="M 90 68.4 L 90.4 106" active={active} delay={0.74} duration={0.3} stroke="var(--background)" strokeWidth={3} />
      <DrawPath d="M 117 66 C 112 82, 106 96, 101 104.6" active={active} delay={0.78} duration={0.3} stroke="var(--background)" strokeWidth={3} />
      <DrawPath d="M 45.6 58 a 44.4 9 0 1 0 88.8 0 a 44.4 9 0 1 0 -88.8 0" active={active} delay={0.55} duration={0.4} />

      <DrawPath
        d="M 66 110.4 C 74 109.4, 106 109.6, 114 110.2 C 116 124, 130 132, 129 150 C 130 170, 114 182.6, 90 182.4 C 66 182.6, 50 170, 51 150 C 50 132, 64 124, 66 110.4 Z"
        active={active}
        delay={0.35}
        duration={0.7}
      />
      <DrawPath d="M 128.6 138 C 142.6 138.4, 146 156, 132 164.4" active={active} delay={0.85} duration={0.3} />
      <DrawPath
        d="M 53 150 C 68 146.6, 112 146.6, 127 150 C 128 168, 112 179.4, 90 179.4 C 68 179.4, 52 168, 53 150 Z"
        active={active}
        delay={0.75}
        duration={0.5}
        fill="currentColor"
      />
      <DrawPath d="M 63 157 C 60.6 163, 62.6 170, 67 174" active={active} delay={1.05} duration={0.25} stroke="var(--background)" strokeWidth={3} />

      {BEANS.map((bean) => (
        <g key={bean.body}>
          <DrawPath d={bean.body} active={active} delay={bean.delay} duration={0.35} fill="currentColor" />
          <DrawPath d={bean.crease} active={active} delay={bean.delay + 0.25} duration={0.25} stroke="var(--background)" strokeWidth={3} />
        </g>
      ))}

      <DrawPath d="M 13 154 C 19.6 139, 26 122, 34.6 106" active={active} delay={0.5} duration={0.4} />
      {LEAVES.map((leaf) => (
        <DrawPath key={leaf.d} d={leaf.d} active={active} delay={leaf.delay} duration={0.3} fill="currentColor" />
      ))}
      <DrawPath d="M 36.6 121 a 3.6 3.5 0 1 0 7.2 0 a 3.6 3.5 0 1 0 -7.2 0" active={active} delay={0.92} duration={0.25} fill="currentColor" />
      <DrawPath d="M 17.6 145 a 3.4 3.3 0 1 0 6.8 0 a 3.4 3.3 0 1 0 -6.8 0" active={active} delay={0.97} duration={0.25} fill="currentColor" />

      <motion.g
        animate={idle ? { y: DRIFT_Y, opacity: DRIFT_OPACITY } : { y: 0, opacity: 1 }}
        transition={
          idle
            ? { duration: 6.2, delay: 1.6, repeat: Infinity, ease: 'easeInOut', times: DRIFT_TIMES }
            : { duration: 0.2 }
        }
      >
        {STEAM.map((curl) => (
          <DrawPath key={curl.d} d={curl.d} active={active} delay={curl.delay} duration={0.35} />
        ))}
      </motion.g>
    </DoodleSvg>
  )
}

// Positions taken along the bracelet curve so the beads sit on the strand.
const BEADS = [
  'M 22.6 38 a 3.6 3.4 0 1 0 7.2 0 a 3.6 3.4 0 1 0 -7.2 0',
  'M 27.4 47 a 3.4 3.2 0 1 0 6.8 0 a 3.4 3.2 0 1 0 -6.8 0',
  'M 34.3 53.2 a 3.7 3.5 0 1 0 7.4 0 a 3.7 3.5 0 1 0 -7.4 0',
  'M 46.1 57 a 3.9 3.7 0 1 0 7.8 0 a 3.9 3.7 0 1 0 -7.8 0',
  'M 58.9 55.4 a 3.5 3.3 0 1 0 7 0 a 3.5 3.3 0 1 0 -7 0',
  'M 67 50.8 a 3.6 3.4 0 1 0 7.2 0 a 3.6 3.4 0 1 0 -7.2 0',
  'M 73.6 43.2 a 3.4 3.2 0 1 0 6.8 0 a 3.4 3.2 0 1 0 -6.8 0',
]

const CROP_MARKS = [
  'M 106 18 L 106 5 L 119 5.4',
  'M 171 5.4 L 184 5 L 184 18',
  'M 106 65 L 106 78 L 119 77.6',
  'M 171 77.6 L 184 78 L 184 65',
]

const GLINT_TIMES = [0, 0.55, 0.63, 0.71, 1]
const GLINT_OPACITY = [0.25, 0.25, 1, 0.25, 0.25]
const GLINT_SCALE = [0.75, 0.75, 1.15, 0.75, 0.75]

/** Luvre, a fine jewelry atelier: a display row with the ring framed like a macro shot. */
function LuvreAtelier({ active, className }: SceneProps) {
  const reduceMotion = useReducedMotion()
  const idle = active && !reduceMotion

  return (
    <DoodleSvg viewBox="0 0 280 80" strokeWidth={2} className={className}>
      <DrawPath d="M 6 70 C 40 68.8, 70 70.6, 100 69.8" active={active} duration={0.4} />
      <DrawPath d="M 190 69.8 C 220 70.6, 250 68.8, 274 70" active={active} delay={0.05} duration={0.4} />

      <DrawPath d="M 26 38 C 33 61, 66 64, 77 43" active={active} delay={0.2} duration={0.4} />
      {BEADS.map((bead, i) => (
        <DrawPath key={bead} d={bead} active={active} delay={0.45 + i * 0.05} duration={0.22} fill="currentColor" />
      ))}

      <DrawPath
        d="M 145.4 18.2 C 162.6 17.6, 175.8 30.4, 175.2 45 C 175.8 60.2, 161.8 71.8, 144.6 71.2 C 128 71.6, 114.4 59.4, 115 44.4 C 114.4 29.4, 128.8 17.8, 145.4 18.2 Z"
        active={active}
        delay={0.15}
        duration={0.7}
        fill="currentColor"
      />
      <DrawPath
        d="M 145.6 26.6 C 157.4 26.2, 167.8 34.2, 167 44.8 C 167.6 55.2, 156.6 63.2, 144.6 62.8 C 132.4 63.2, 122.4 54.2, 123.2 44.2 C 122.6 34.4, 133.6 26.2, 145.6 26.6 Z"
        active={active}
        delay={0.7}
        duration={0.45}
        fill="var(--background)"
        stroke="var(--background)"
      />
      <DrawPath d="M 132 12.4 L 137.4 4.6 L 153.4 4.4 L 158.4 12 L 145.2 28.6 Z" active={active} delay={0.9} duration={0.35} fill="currentColor" />
      <DrawPath
        d="M 132 12.4 L 158.4 12 M 137.4 4.6 L 145 12.2 L 153.4 4.4 M 145 12.2 L 145.2 28.6"
        active={active}
        delay={1.15}
        duration={0.25}
        stroke="var(--background)"
      />

      <DrawPath d="M 206 13 C 212.6 30, 224 42.6, 234 45 C 244.4 42.6, 256 30, 262 13.4" active={active} delay={0.4} duration={0.5} />
      <DrawPath
        d="M 234 45 C 242.4 52.6, 244.6 62.4, 238.4 67.4 C 232 70.6, 225.6 65.4, 226.8 57.4 C 228 51.4, 231 47.4, 234 45 Z"
        active={active}
        delay={0.75}
        duration={0.4}
        fill="currentColor"
      />

      {CROP_MARKS.map((mark, i) => (
        <DrawPath key={mark} d={mark} active={active} delay={0.95 + i * 0.05} duration={0.3} />
      ))}

      <motion.g
        style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.5 }}
        animate={idle ? { opacity: GLINT_OPACITY, scale: GLINT_SCALE } : { opacity: 1, scale: 1 }}
        transition={
          idle
            ? { duration: 6.2, delay: 1.6, repeat: Infinity, ease: 'easeInOut', times: GLINT_TIMES }
            : { duration: 0.2 }
        }
      >
        <DrawPath
          d="M 166 4 C 167.2 8.4, 168.8 10, 173 11.2 C 168.8 12.4, 167.2 14, 166 18.4 C 164.8 14, 163.2 12.4, 159 11.2 C 163.2 10, 164.8 8.4, 166 4 Z"
          active={active}
          delay={1.25}
          duration={0.25}
        />
      </motion.g>
    </DoodleSvg>
  )
}

/** Section 04 brand concepts. kind is the tile index, each with its own viewBox. */
export function EditorialConceptArt({ kind, active, className }: { kind: number; active: boolean; className?: string }) {
  if (kind === 0) return <AeriformStudio active={active} className={className} />
  if (kind === 1) return <SaviaRoastery active={active} className={className} />
  return <LuvreAtelier active={active} className={className} />
}
