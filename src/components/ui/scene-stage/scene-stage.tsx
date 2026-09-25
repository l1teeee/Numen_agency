'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/use-reduced-motion'

// Position is the top-left corner: x in % of the stage width, y in % of its height.
// Size is in % of the shorter side, so a piece keeps its proportions whatever
// shape the card gives the stage and only the gaps between pieces stretch.
export interface Placement {
  x: number
  y: number
  size: number
}

export interface StagePiece {
  placement: Placement
  art: (playing: boolean) => ReactNode
}

interface PieceProps {
  index: number
  placement: Placement
  active: boolean
  playing: boolean
  reducedMotion: boolean
  tilt: boolean
  children: ReactNode
}

// Outer layer places and pops the piece in, inner layer floats it: two layers so
// the entrance and the float never fight over the same transform.
function Piece({ index, placement, active, playing, reducedMotion, tilt, children }: PieceProps) {
  const floatSeconds = 5 + ((index * 7) % 9) * 0.45
  const floatLift = 4 + ((index * 5) % 4) * 2
  const floatTilt = tilt ? (index % 2 ? 1 : -1) * (2 + ((index * 3) % 3)) : 0
  const floatStagger = (index * 0.37) % 2

  return (
    <motion.span
      className="absolute block"
      style={{ left: `${placement.x}cqw`, top: `${placement.y}cqh`, width: `${placement.size}cqmin`, height: `${placement.size}cqmin` }}
      // `initial` must not depend on reducedMotion: that value is false on the server and
      // flips after hydration, and framer never animates out of a flipped `initial={false}`.
      initial={{ opacity: 0, scale: 0.6 }}
      animate={active ? { opacity: 1, scale: 1 } : undefined}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 150, damping: 20, delay: 0.05 + index * 0.04 }}
    >
      <motion.span
        className="block size-full"
        animate={playing ? { y: ['0%', `-${floatLift}%`, '0%'], rotate: [0, floatTilt, 0] } : { y: '0%', rotate: 0 }}
        transition={playing ? { duration: floatSeconds, delay: floatStagger, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

interface SceneStageProps {
  /** True once the section has been revealed. */
  active: boolean
  /** Drawn back to front. */
  pieces: StagePiece[]
  style?: CSSProperties
  /** Rocking while floating. Off for pixel art, whose crisp edges alias when rotated. */
  tilt?: boolean
  /** True while a later sticky section paints over this one. It still counts as in view, so the stage has to be told. */
  covered?: boolean
}

// Decorative art that fills the media area of a project card. It relies on the card
// being a `group` for the hover zoom.
export function SceneStage({ active, pieces, style, tilt = true, covered = false }: SceneStageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const playing = active && visible && !reducedMotion && !covered

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden [container-type:size]" style={style}>
      <div className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]">
        {pieces.map((piece, index) => (
          <Piece key={index} index={index} placement={piece.placement} active={active} playing={playing} reducedMotion={reducedMotion} tilt={tilt}>
            {piece.art(playing)}
          </Piece>
        ))}
      </div>
    </div>
  )
}
