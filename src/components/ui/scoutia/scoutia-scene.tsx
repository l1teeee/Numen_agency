'use client'

import { MapPinned, Radar, Rows3, SquareCheck } from 'lucide-react'
import { SceneStage, type StagePiece } from '@/components/ui/scene-stage/scene-stage'
import { BLUE, BoardArt, GOLD, INK, LeadCardArt, LIME, MapArt, PixelSparkleArt, RED, WorkflowTileArt } from './pixel-art'

// The stage is black like the rest of the site; a faint 24px grid echoes the one on scoutia.dev.
const STAGE_STYLE = {
  background: '#050505',
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}

// Drawn back to front. The four tiles are the four steps of the ScoutIA workflow:
// zone, category, signals, pipeline, in the icons and colors of the landing hero.
const PIECES: StagePiece[] = [
  { placement: { x: 1, y: 8, size: 76 }, art: (playing) => <MapArt playing={playing} /> },
  { placement: { x: 36, y: 3, size: 40 }, art: () => <LeadCardArt tone={RED} score={0.18} /> },
  { placement: { x: 47, y: 52, size: 40 }, art: () => <LeadCardArt tone={LIME} score={0.86} /> },
  { placement: { x: 66, y: 4, size: 64 }, art: (playing) => <BoardArt playing={playing} /> },
  { placement: { x: 68, y: 80, size: 14 }, art: () => <WorkflowTileArt tone={BLUE} icon={MapPinned} /> },
  { placement: { x: 75, y: 80, size: 14 }, art: () => <WorkflowTileArt tone={LIME} icon={Radar} /> },
  { placement: { x: 82, y: 80, size: 14 }, art: () => <WorkflowTileArt tone={RED} icon={SquareCheck} /> },
  { placement: { x: 89, y: 80, size: 14 }, art: () => <WorkflowTileArt tone={INK} icon={Rows3} /> },
  { placement: { x: 30, y: 84, size: 6 }, art: () => <PixelSparkleArt tone={GOLD} /> },
  { placement: { x: 58, y: 42, size: 5 }, art: () => <PixelSparkleArt tone="#3f3f46" /> },
]

export function ScoutiaScene({ active, covered }: { active: boolean; covered: boolean }) {
  return <SceneStage active={active} covered={covered} pieces={PIECES} style={STAGE_STYLE} tilt={false} />
}
