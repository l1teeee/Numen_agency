// Coral flower: a cute wave hello.
import type { CharacterScene } from '../scene-types'

const EASE_IN_OUT = 'power2.inOut'
const EASE_IN = 'power2.in'
const EASE_OUT = 'power2.out'
const SWAY = 'sine.inOut'
const OVERSHOOT = 'back.out(1.1)'

export const waveHello: CharacterScene = {
  id: 'wave-hello',
  duration: 2,
  wait: 2.4,
  tracks: [
    {
      part: 'torso',
      property: 'rotation',
      pivot: '50 78',
      segments: [
        [0.05, 0.2, 0, -2, EASE_OUT],
        [0.2, 0.38, -2, -8, EASE_IN],
        [0.38, 0.62, -8, 11, 'back.out(1.5)'],
        [0.62, 0.74, 11, 8, SWAY],
        [0.74, 0.86, 8, 13, SWAY],
        [0.86, 0.98, 13, 8, SWAY],
        [0.98, 1.1, 8, 13, SWAY],
        [1.1, 1.22, 13, 10, SWAY],
        [1.22, 1.52, 10, -8, EASE_IN_OUT],
        [1.52, 1.9, -8, 0, OVERSHOOT],
      ],
    },
    {
      part: 'arm-right',
      property: 'rotation',
      pivot: '76 52',
      segments: [
        [0.2, 0.38, 0, 18, EASE_IN],
        [0.38, 0.62, 18, -68, 'back.out(1.6)'],
        [0.62, 0.74, -68, -44, SWAY],
        [0.74, 0.86, -44, -72, SWAY],
        [0.86, 0.98, -72, -44, SWAY],
        [0.98, 1.1, -44, -72, SWAY],
        [1.1, 1.22, -72, -48, SWAY],
        [1.22, 1.52, -48, -26, EASE_IN_OUT],
        [1.52, 1.9, -26, 0, OVERSHOOT],
      ],
    },
    {
      part: 'arm-left',
      property: 'rotation',
      pivot: '24 52',
      segments: [
        [0.2, 0.38, 0, -8, EASE_IN],
        [0.38, 0.62, -8, 14, 'back.out(1.3)'],
        [0.74, 0.86, 14, 9, SWAY],
        [0.98, 1.1, 9, 14, SWAY],
        [1.22, 1.52, 14, 6, EASE_IN_OUT],
        [1.52, 1.9, 6, 0, OVERSHOOT],
      ],
    },
    {
      part: 'leg-left',
      property: 'rotation',
      pivot: '42 66',
      segments: [
        [0.2, 0.38, 0, 14, EASE_IN],
        [0.38, 0.56, 14, -6, EASE_OUT],
        [0.62, 0.74, -6, 10, EASE_IN],
        [0.74, 0.92, 10, 0, EASE_OUT],
        [1.22, 1.52, 0, -6, EASE_IN_OUT],
        [1.52, 1.9, -6, 0, OVERSHOOT],
      ],
    },
    {
      part: 'leg-right',
      property: 'rotation',
      pivot: '58 66',
      segments: [
        [0.2, 0.38, 0, -14, EASE_IN],
        [0.38, 0.56, -14, 6, EASE_OUT],
        [0.62, 0.74, 6, -10, EASE_IN],
        [0.74, 0.92, -10, 0, EASE_OUT],
        [1.22, 1.52, 0, 6, EASE_IN_OUT],
        [1.52, 1.9, 6, 0, OVERSHOOT],
      ],
    },
    {
      part: 'body',
      property: 'scaleX',
      pivot: '50 78',
      segments: [
        [0.05, 0.2, 1, 0.97, EASE_OUT],
        [0.2, 0.38, 0.97, 1.06, EASE_IN],
        [0.38, 0.62, 1.06, 0.955, EASE_OUT],
        [0.62, 0.72, 0.955, 1.05, EASE_IN],
        [0.72, 0.9, 1.05, 1, 'back.out(1.2)'],
        [1.22, 1.52, 1, 1.02, EASE_IN_OUT],
        [1.52, 1.9, 1.02, 1, OVERSHOOT],
      ],
    },
    {
      part: 'body',
      property: 'scaleY',
      pivot: '50 78',
      segments: [
        [0.05, 0.2, 1, 1.03, EASE_OUT],
        [0.2, 0.38, 1.03, 0.94, EASE_IN],
        [0.38, 0.62, 0.94, 1.05, EASE_OUT],
        [0.62, 0.72, 1.05, 0.95, EASE_IN],
        [0.72, 0.9, 0.95, 1, 'back.out(1.2)'],
        [1.22, 1.52, 1, 0.98, EASE_IN_OUT],
        [1.52, 1.9, 0.98, 1, OVERSHOOT],
      ],
    },
    {
      part: 'character',
      property: 'y',
      segments: [
        [0.05, 0.2, 0, -3, EASE_OUT],
        [0.2, 0.38, -3, 3, EASE_IN],
        [0.38, 0.58, 3, -10, EASE_OUT],
        [0.58, 0.7, -10, 0, EASE_IN],
        [0.7, 0.86, 0, -2, 'back.out(1.2)'],
        [0.86, 1, -2, 0, EASE_OUT],
      ],
    },
    {
      part: 'face',
      property: 'x',
      segments: [
        [1.22, 1.52, 0, -3.5, EASE_IN_OUT],
        [1.52, 1.86, -3.5, 0, EASE_IN_OUT],
      ],
    },
    {
      part: 'face',
      property: 'y',
      segments: [
        [1.22, 1.52, 0, 1.8, EASE_IN_OUT],
        [1.52, 1.86, 1.8, 0, EASE_IN_OUT],
      ],
    },
    {
      part: 'mouth',
      property: 'scaleX',
      pivot: '50 49',
      segments: [
        [0.44, 0.62, 1, 1.2, EASE_OUT],
        [1.55, 1.85, 1.2, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'cheeks',
      property: 'opacity',
      segments: [
        [0.8, 1.1, 0, 1, EASE_OUT],
        [1.62, 1.88, 1, 0, EASE_IN_OUT],
      ],
    },

    {
      part: 'eye-left-open',
      property: 'opacity',
      segments: [
        [0.5, 0.58, 1, 0, EASE_IN_OUT],
        [1.76, 1.84, 0, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-right-open',
      property: 'opacity',
      segments: [
        [0.5, 0.58, 1, 0, EASE_IN_OUT],
        [1.76, 1.84, 0, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-left-happy',
      property: 'opacity',
      segments: [
        [0.5, 0.58, 0, 1, EASE_IN_OUT],
        [1.76, 1.84, 1, 0, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-right-happy',
      property: 'opacity',
      segments: [
        [0.5, 0.58, 0, 1, EASE_IN_OUT],
        [1.76, 1.84, 1, 0, EASE_IN_OUT],
      ],
    },
  ],
}
