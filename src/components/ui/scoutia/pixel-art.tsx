'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Globe, Phone, type LucideIcon } from 'lucide-react'

// ScoutIA's own look: square corners, 2px ink borders, hard offset shadows and flat
// state colors (see leadscout-ai app/globals.css). Drawn as SVG so it scales with the piece.
export const INK = '#1c1917'
export const SURFACE = '#ffffff'
export const SURFACE_SOFT = '#e7e7de'
export const CREAM = '#efefe8'
const STREET = '#d6d2c4'
// The site's ink shadow would vanish on a black stage, so the hard shadow is a lighter gray.
const SHADOW = '#3f3f46'

export const BLUE = '#2f80ed'
export const GREEN = '#00a86b'
export const LIME = '#3fae2a'
export const RED = '#e63946'
export const BROWN = '#7a6b5d'
export const GOLD = '#ffc233'

interface PieceProps {
  playing: boolean
}

function PixelSvg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" shapeRendering="crispEdges" aria-hidden="true">
      {children}
    </svg>
  )
}

function PixelFrame({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <>
      <rect x={x + 4} y={y + 4} width={width} height={height} fill={SHADOW} />
      <rect x={x} y={y} width={width} height={height} fill={SURFACE} stroke={INK} strokeWidth={3} />
    </>
  )
}

// x and y are the top-left corner of the pin head.
const PINS = [
  { x: 40, y: 50 },
  { x: 58, y: 62 },
  { x: 30, y: 68 },
  { x: 62, y: 44 },
]
const PIN_HOP_SECONDS = 1.6

function Pin({ x, y, index, playing }: { x: number; y: number; index: number; playing: boolean }) {
  return (
    <motion.g
      animate={playing ? { y: [0, -4, 0, 0] } : { y: 0 }}
      transition={playing ? { duration: PIN_HOP_SECONDS, delay: index * 0.35, repeat: Infinity, times: [0, 0.25, 0.5, 1], ease: 'easeOut' } : { duration: 0.3 }}
    >
      <rect x={x + 3} y={y + 7} width={3} height={5} fill={INK} />
      <rect x={x} y={y} width={9} height={9} fill={RED} stroke={INK} strokeWidth={2} />
      <rect x={x + 3} y={y + 3} width={3} height={3} fill={SURFACE} />
    </motion.g>
  )
}

export function MapArt({ playing }: PieceProps) {
  return (
    <PixelSvg>
      <PixelFrame x={4} y={4} width={88} height={88} />
      <rect x={4} y={4} width={88} height={22} fill={SURFACE_SOFT} stroke={INK} strokeWidth={3} />
      <rect x={10} y={9} width={12} height={12} fill={INK} />
      <rect x={14} y={12} width={4} height={4} fill={SURFACE} />
      <rect x={14} y={16} width={4} height={2} fill={SURFACE} />
      <rect x={62} y={11} width={24} height={8} fill={SURFACE} stroke={INK} strokeWidth={2} />

      <rect x={10} y={32} width={76} height={54} fill={CREAM} stroke={INK} strokeWidth={2} />
      <g fill={SURFACE_SOFT}>
        <rect x={14} y={36} width={16} height={12} />
        <rect x={36} y={36} width={22} height={8} />
        <rect x={64} y={36} width={18} height={14} />
        <rect x={14} y={54} width={12} height={14} />
        <rect x={68} y={56} width={14} height={12} />
        <rect x={36} y={74} width={24} height={8} />
      </g>
      <g stroke={STREET} strokeWidth={3}>
        <line x1={10} y1={51} x2={86} y2={51} />
        <line x1={10} y1={71} x2={86} y2={71} />
        <line x1={33} y1={32} x2={33} y2={86} />
        <line x1={61} y1={32} x2={61} y2={86} />
      </g>

      <motion.circle
        cx={48}
        cy={59}
        r={21}
        fill={BLUE}
        fillOpacity={0.14}
        stroke={BLUE}
        strokeWidth={2.5}
        strokeDasharray="5 4"
        initial={{ strokeDashoffset: 0 }}
        animate={playing ? { strokeDashoffset: [0, -18] } : { strokeDashoffset: 0 }}
        transition={playing ? { duration: 2.4, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
      />
      {PINS.map((pin, index) => (
        <Pin key={index} x={pin.x} y={pin.y} index={index} playing={playing} />
      ))}
    </PixelSvg>
  )
}

interface LeadCardArtProps {
  tone: string
  /** Share of the score bar that is filled, 0 to 1. */
  score: number
}

const SCORE_BAR_WIDTH = 64

export function LeadCardArt({ tone, score }: LeadCardArtProps) {
  return (
    <PixelSvg>
      <PixelFrame x={4} y={4} width={88} height={88} />
      <rect x={12} y={12} width={26} height={7} fill={tone} />
      <rect x={12} y={26} width={54} height={8} fill={INK} />
      <rect x={12} y={39} width={38} height={6} fill={STREET} />
      <rect x={68} y={12} width={18} height={16} fill={tone} stroke={INK} strokeWidth={2} />
      <g fill={SURFACE}>
        <rect x={72} y={17} width={3} height={6} />
        <rect x={77} y={17} width={3} height={6} />
      </g>
      <rect x={12} y={52} width={16} height={16} fill={SURFACE_SOFT} stroke={INK} strokeWidth={2} />
      <rect x={32} y={52} width={16} height={16} fill={SURFACE_SOFT} stroke={INK} strokeWidth={2} />
      <Globe x={14.5} y={54.5} size={11} color={INK} strokeWidth={2.5} />
      <Phone x={34.5} y={54.5} size={11} color={INK} strokeWidth={2.5} />
      <rect x={12} y={75} width={SCORE_BAR_WIDTH + 4} height={9} fill={SURFACE_SOFT} stroke={INK} strokeWidth={2} />
      <rect x={14} y={77} width={SCORE_BAR_WIDTH * score} height={5} fill={tone} />
    </PixelSvg>
  )
}

const BOARD_COLUMNS = [
  { tone: BLUE, cards: 3 },
  { tone: GREEN, cards: 2 },
  { tone: LIME, cards: 1 },
  { tone: BROWN, cards: 1 },
]
const COLUMN_WIDTH = 16
const COLUMN_STEP = 18.5
const CARD_HEIGHT = 8
const CARD_STEP = 11
const CARD_TOP = 43
// The highlighted lead walks from the first column to the third, the way a lead moves through the pipeline.
const LEAD_WALK = {
  x: [0, COLUMN_STEP, COLUMN_STEP * 2, COLUMN_STEP * 2, 0],
  y: [0, -CARD_STEP, -CARD_STEP * 2, -CARD_STEP * 2, 0],
}

export function BoardArt({ playing }: PieceProps) {
  return (
    <PixelSvg>
      <PixelFrame x={4} y={4} width={88} height={88} />
      <rect x={4} y={4} width={88} height={22} fill={SURFACE_SOFT} stroke={INK} strokeWidth={3} />
      <rect x={10} y={9} width={12} height={12} fill={INK} />
      <rect x={26} y={12} width={30} height={6} fill={INK} />
      {BOARD_COLUMNS.map((column, columnIndex) => {
        const x = 10 + columnIndex * COLUMN_STEP
        return (
          <g key={columnIndex}>
            <rect x={x} y={32} width={COLUMN_WIDTH} height={5} fill={column.tone} />
            {Array.from({ length: column.cards }, (_, cardIndex) => (
              <rect key={cardIndex} x={x} y={CARD_TOP + cardIndex * CARD_STEP} width={COLUMN_WIDTH} height={CARD_HEIGHT} fill={SURFACE_SOFT} stroke={INK} strokeWidth={1.5} />
            ))}
          </g>
        )
      })}
      <motion.rect
        x={10}
        y={CARD_TOP + 2 * CARD_STEP}
        width={COLUMN_WIDTH}
        height={CARD_HEIGHT}
        fill={SURFACE}
        stroke={RED}
        strokeWidth={2}
        animate={playing ? LEAD_WALK : { x: 0, y: 0 }}
        transition={playing ? { duration: 6, repeat: Infinity, times: [0, 0.3, 0.6, 0.85, 1], ease: 'easeInOut' } : { duration: 0 }}
      />
    </PixelSvg>
  )
}

export function WorkflowTileArt({ tone, icon: Icon }: { tone: string; icon: LucideIcon }) {
  return (
    <PixelSvg>
      <rect x={10} y={10} width={84} height={84} fill={SHADOW} />
      <rect x={6} y={6} width={84} height={84} fill={tone} stroke={INK} strokeWidth={5} />
      <Icon x={24} y={24} size={48} color={SURFACE} strokeWidth={2.5} />
    </PixelSvg>
  )
}

// A five-pixel cross.
export function PixelSparkleArt({ tone }: { tone: string }) {
  return (
    <PixelSvg>
      <g fill={tone}>
        <rect x={40} y={0} width={20} height={20} />
        <rect x={40} y={40} width={20} height={20} />
        <rect x={40} y={80} width={20} height={20} />
        <rect x={0} y={40} width={20} height={20} />
        <rect x={80} y={40} width={20} height={20} />
      </g>
    </PixelSvg>
  )
}
