// Purple flower: thinks it over, then has an idea.
import type { CharacterScene } from '../scene-types'

const EASE_IN_OUT = 'power2.inOut'
const EASE_IN = 'power2.in'
const EASE_OUT = 'power2.out'
const SWAY = 'sine.inOut'
const OVERSHOOT = 'back.out(1.1)'

export const ponder: CharacterScene = {
  id: 'ponder',
  duration: 2.4,
  wait: 2.6,
  tracks: [
    {
      part: 'torso',
      property: 'rotation',
      pivot: '50 78',
      segments: [
        [0, 0.15, 0, 1.5, EASE_IN],
        [0.15, 0.45, 1.5, -6, EASE_OUT],
        [0.75, 1.1, -6, -7, SWAY],
        [1.1, 1.45, -7, -6, SWAY],
        [1.55, 1.8, -6, 2, 'back.out(1.5)'],
        [1.9, 2.15, 2, -1, EASE_IN_OUT],
        [2.15, 2.4, -1, 0, OVERSHOOT],
      ],
    },
    {
      part: 'arm-right',
      property: 'rotation',
      pivot: '76 52',
      segments: [
        [0.3, 0.4, 0, 4, EASE_IN_OUT],
        [0.4, 0.7, 4, -60, EASE_IN_OUT],
        [1.5, 1.88, -60, 8, 'back.out(1.4)'],
        [1.88, 2.2, 8, 0, OVERSHOOT],
      ],
    },
    {
      part: 'foot-right',
      property: 'rotation',
      pivot: '62 90',
      segments: [
        [0.7, 0.82, 0, 8, EASE_IN],
        [0.82, 0.95, 8, 0, EASE_OUT],
        [1.05, 1.17, 0, 8, EASE_IN],
        [1.17, 1.3, 8, 0, EASE_OUT],
      ],
    },
    {
      part: 'character',
      property: 'y',
      segments: [
        [1.5, 1.62, 0, -6, 'back.out(1.4)'],
        [1.62, 1.8, -6, 0, EASE_IN],
      ],
    },
    {
      part: 'face',
      property: 'x',
      segments: [
        [0.1, 0.45, 0, -3, EASE_OUT],
        [0.75, 1.05, -3, -4.5, SWAY],
        [1.05, 1.35, -4.5, -2.5, SWAY],
        [1.45, 1.85, -2.5, 0, EASE_IN_OUT],
      ],
    },
    {
      part: 'face',
      property: 'y',
      segments: [
        [0.1, 0.45, 0, -3, EASE_OUT],
        [1.45, 1.85, -3, 0, EASE_IN_OUT],
      ],
    },
    {
      part: 'mouth',
      property: 'scaleX',
      pivot: '50 49',
      segments: [
        [0.15, 0.45, 1, 0.8, EASE_IN_OUT],
        [1.5, 1.75, 0.8, 1.15, 'back.out(1.6)'],
        [1.85, 2.15, 1.15, 1, OVERSHOOT],
      ],
    },
    {
      part: 'eye-left-open',
      property: 'scaleY',
      pivot: '42 39',
      segments: [
        [1.5, 1.62, 1, 1.25, 'back.out(1.6)'],
        [1.75, 2.05, 1.25, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-right-open',
      property: 'scaleY',
      pivot: '58 39',
      segments: [
        [1.5, 1.62, 1, 1.25, 'back.out(1.6)'],
        [1.75, 2.05, 1.25, 1, EASE_IN_OUT],
      ],
    },

    {
      part: 'eye-left-open',
      property: 'opacity',
      segments: [
        [1.85, 1.95, 1, 0, EASE_IN_OUT],
        [2.15, 2.3, 0, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-right-open',
      property: 'opacity',
      segments: [
        [1.85, 1.95, 1, 0, EASE_IN_OUT],
        [2.15, 2.3, 0, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-left-happy',
      property: 'opacity',
      segments: [
        [1.85, 1.95, 0, 1, EASE_IN_OUT],
        [2.15, 2.3, 1, 0, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-right-happy',
      property: 'opacity',
      segments: [
        [1.85, 1.95, 0, 1, EASE_IN_OUT],
        [2.15, 2.3, 1, 0, EASE_IN_OUT],
      ],
    },
  ],
}
