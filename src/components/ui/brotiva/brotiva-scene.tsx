'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { SceneStage, type Placement, type StagePiece } from '@/components/ui/scene-stage/scene-stage'
import { SCENE_OF, type CharacterId } from './scenes'

// GSAP only drives the characters, and the card sits below the fold, so its ~30 KB
// stays out of the first-load bundle.
const Character = dynamic(() => import('./character').then((module) => module.Character), { ssr: false })

// A black stage like the rest of the site: the pale circles of the Brotiva brand become
// dark gray discs with a hairline, and only the characters and props carry color.
const STAGE = '#050505'
const RING = '#151515'
const RING_SOFT = '#0f0f0f'
const STAR_GHOST = '#1d1d1d'
const GOLD = '#ffc233'

type PropName = 'open-book' | 'magnifier' | 'rocket' | 'chat' | 'heart' | 'book-stack' | 'pencil-ruler' | 'clipboard'

type Sticker =
  | (Placement & { kind: 'ring'; tone: string })
  | (Placement & { kind: 'star'; tone: string })
  | (Placement & { kind: 'character'; character: CharacterId })
  | (Placement & { kind: 'prop'; prop: PropName })

// Drawn back to front: dark rings, then characters, then props and stars.
const STICKERS: Sticker[] = [
  { kind: 'ring', tone: RING, x: -14, y: -12, size: 62 },
  { kind: 'ring', tone: RING, x: 58, y: -16, size: 56 },
  { kind: 'ring', tone: RING_SOFT, x: 56, y: 50, size: 44 },
  { kind: 'ring', tone: RING_SOFT, x: -4, y: 70, size: 30 },
  { kind: 'star', tone: STAR_GHOST, x: 36, y: 44, size: 10 },
  { kind: 'character', character: 'purple-flower', x: 9, y: 27, size: 46 },
  { kind: 'character', character: 'coral-flower', x: 60, y: 24, size: 36 },
  { kind: 'character', character: 'green-round', x: 50, y: 60, size: 24 },
  { kind: 'character', character: 'yellow-round', x: 80, y: 64, size: 19 },
  { kind: 'prop', prop: 'open-book', x: 27, y: 5, size: 20 },
  { kind: 'prop', prop: 'magnifier', x: 44, y: 12, size: 17 },
  { kind: 'prop', prop: 'chat', x: 63, y: 5, size: 14 },
  { kind: 'prop', prop: 'rocket', x: 80, y: 6, size: 18 },
  { kind: 'prop', prop: 'heart', x: 45, y: 38, size: 14 },
  { kind: 'prop', prop: 'book-stack', x: 27, y: 74, size: 19 },
  { kind: 'prop', prop: 'pencil-ruler', x: 5, y: 78, size: 16 },
  { kind: 'prop', prop: 'clipboard', x: 64, y: 72, size: 15 },
  { kind: 'star', tone: GOLD, x: 37, y: 22, size: 7 },
  { kind: 'star', tone: GOLD, x: 40, y: 90, size: 7 },
  { kind: 'star', tone: GOLD, x: 12, y: 64, size: 6 },
]

function StickerArt({ sticker, playing }: { sticker: Sticker; playing: boolean }) {
  switch (sticker.kind) {
    case 'ring':
      return <span className="block h-full w-full rounded-full border border-white/10" style={{ background: sticker.tone }} />
    case 'star':
      return <Star className="size-full" style={{ color: sticker.tone }} fill="currentColor" strokeWidth={5} strokeLinejoin="round" />
    case 'character':
      return (
        <Character character={sticker.character} scene={SCENE_OF[sticker.character]} playing={playing} />
      )
    case 'prop':
      return <Image src={`/brotiva/props/${sticker.prop}.svg`} alt="" width={512} height={512} unoptimized className="size-full object-contain" />
  }
}

const PIECES: StagePiece[] = STICKERS.map((sticker) => ({
  placement: sticker,
  art: (playing) => <StickerArt sticker={sticker} playing={playing} />,
}))

export function BrotivaScene({ active, covered }: { active: boolean; covered: boolean }) {
  return <SceneStage active={active} covered={covered} pieces={PIECES} style={{ background: STAGE }} />
}
