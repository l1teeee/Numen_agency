// Yellow round: spots something, jumps, eyes wide, cheeks flush.
import type { CharacterScene } from '../scene-types'

const EASE_IN_OUT = 'power2.inOut'
const EASE_IN = 'power2.in'
const EASE_OUT = 'power2.out'
const OVERSHOOT = 'back.out(1.4)'

export const surprise: CharacterScene = {
  id: 'surprise',
  duration: 1.8,
  wait: 2.8,
  tracks: [
    {
      part: 'body',
      property: 'scaleX',
      pivot: '50 78',
      segments: [
        [0.02, 0.1, 1, 1.05, EASE_IN],
        [0.1, 0.24, 1.05, 0.95, EASE_OUT],
        [0.24, 0.34, 0.95, 1.015, EASE_IN],
        [0.34, 0.44, 1.015, 1, OVERSHOOT],
      ],
    },
    {
      part: 'body',
      property: 'scaleY',
      pivot: '50 78',
      segments: [
        [0.02, 0.1, 1, 0.95, EASE_IN],
        [0.1, 0.24, 0.95, 1.05, EASE_OUT],
        [0.24, 0.34, 1.05, 0.985, EASE_IN],
        [0.34, 0.44, 0.985, 1, OVERSHOOT],
      ],
    },
    {
      part: 'character',
      property: 'y',
      segments: [
        [0.1, 0.24, 0, -8, EASE_OUT],
        [0.24, 0.34, -8, 1, EASE_IN],
        [0.34, 0.44, 1, 0, OVERSHOOT],
      ],
    },
    {
      part: 'torso',
      property: 'rotation',
      pivot: '50 78',
      segments: [
        [0.02, 0.1, 0, -6, EASE_IN],
        [0.1, 0.24, -6, 9, EASE_OUT],
        [0.24, 0.34, 9, -3, EASE_IN],
        [0.34, 0.44, -3, 4, OVERSHOOT],
        [1.14, 1.3, 4, -2, EASE_IN],
        [1.3, 1.48, -2, 0, OVERSHOOT],
      ],
    },
    {
      part: 'arm-right',
      property: 'rotation',
      pivot: '76 52',
      segments: [
        [0.14, 0.28, 0, -58, 'back.out(1.6)'],
        [0.28, 0.4, -58, -50, EASE_OUT],
        [1.16, 1.48, -50, 0, OVERSHOOT],
      ],
    },
    {
      part: 'arm-left',
      property: 'rotation',
      pivot: '24 52',
      segments: [
        [0.14, 0.28, 0, 58, 'back.out(1.6)'],
        [0.28, 0.4, 58, 50, EASE_OUT],
        [1.16, 1.48, 50, 0, OVERSHOOT],
      ],
    },
    {
      part: 'leg-left',
      property: 'rotation',
      pivot: '42 66',
      segments: [
        [0.03, 0.11, 0, 10, EASE_IN],
        [0.11, 0.24, 10, -6, 'back.out(1.5)'],
        [0.24, 0.34, -6, 2, EASE_OUT],
        [0.34, 0.44, 2, 0, OVERSHOOT],
      ],
    },
    {
      part: 'leg-right',
      property: 'rotation',
      pivot: '58 66',
      segments: [
        [0.03, 0.11, 0, -10, EASE_IN],
        [0.11, 0.24, -10, 6, 'back.out(1.5)'],
        [0.24, 0.34, 6, -2, EASE_OUT],
        [0.34, 0.44, -2, 0, OVERSHOOT],
      ],
    },
    {
      part: 'eye-left-open',
      property: 'scaleX',
      pivot: '42 39',
      segments: [
        [0, 0.13, 1, 1.35, 'back.out(1.6)'],
        [1.28, 1.5, 1.35, 1, OVERSHOOT],
      ],
    },
    {
      part: 'eye-left-open',
      property: 'scaleY',
      pivot: '42 39',
      segments: [
        [0, 0.13, 1, 1.35, 'back.out(1.6)'],
        [1.28, 1.5, 1.35, 1, OVERSHOOT],
      ],
    },
    {
      part: 'eye-right-open',
      property: 'scaleX',
      pivot: '58 39',
      segments: [
        [0, 0.13, 1, 1.35, 'back.out(1.6)'],
        [1.28, 1.5, 1.35, 1, OVERSHOOT],
      ],
    },
    {
      part: 'eye-right-open',
      property: 'scaleY',
      pivot: '58 39',
      segments: [
        [0, 0.13, 1, 1.35, 'back.out(1.6)'],
        [1.28, 1.5, 1.35, 1, OVERSHOOT],
      ],
    },
    {
      part: 'mouth',
      property: 'scaleX',
      pivot: '50 49',
      segments: [
        [0.18, 0.3, 1, 0.6, EASE_OUT],
        [1.24, 1.46, 0.6, 1, OVERSHOOT],
      ],
    },
    {
      part: 'cheeks',
      property: 'opacity',
      segments: [
        [0.24, 0.42, 0, 1, EASE_OUT],
        [1.58, 1.8, 1, 0, EASE_IN_OUT],
      ],
    },
  ],
}
