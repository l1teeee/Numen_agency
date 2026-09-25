// Green round: gets ready, claps four times, settles back.
import type { CharacterScene } from '../scene-types'

const EASE_IN_OUT = 'power2.inOut'
const EASE_IN = 'power2.in'
const EASE_OUT = 'power2.out'
const SWAY = 'sine.inOut'
const OVERSHOOT = 'back.out(1.3)'

export const clap: CharacterScene = {
  id: 'clap',
  duration: 1.8,
  wait: 2.2,
  tracks: [
    {
      part: 'torso',
      property: 'rotation',
      pivot: '50 78',
      segments: [
        [0, 0.08, 0, -3, EASE_IN],
        [0.08, 0.18, -3, 5, 'back.out(1.2)'],
        [0.18, 0.9, 5, 6, SWAY],
        [0.9, 1.14, 6, 3, EASE_OUT],
        [1.14, 1.49, 3, -2, EASE_IN_OUT],
        [1.49, 1.8, -2, 0, OVERSHOOT],
      ],
    },
    {
      part: 'arm-right',
      property: 'rotation',
      pivot: '76 52',
      segments: [
        [0, 0.08, 0, 12, EASE_IN],
        [0.08, 0.18, 12, -55, 'back.out(1.2)'],
        [0.18, 0.3, -55, -80, EASE_IN],
        [0.3, 0.42, -80, -55, EASE_OUT],
        [0.42, 0.54, -55, -80, EASE_IN],
        [0.54, 0.66, -80, -55, EASE_OUT],
        [0.66, 0.78, -55, -80, EASE_IN],
        [0.78, 0.9, -80, -55, EASE_OUT],
        [0.9, 1.02, -55, -80, EASE_IN],
        [1.02, 1.14, -80, -55, EASE_OUT],
        [1.14, 1.49, -55, -10, EASE_IN_OUT],
        [1.49, 1.8, -10, 0, OVERSHOOT],
      ],
    },
    {
      part: 'arm-left',
      property: 'rotation',
      pivot: '24 52',
      segments: [
        [0, 0.08, 0, -12, EASE_IN],
        [0.11, 0.21, -12, 55, 'back.out(1.2)'],
        [0.21, 0.33, 55, 80, EASE_IN],
        [0.33, 0.45, 80, 55, EASE_OUT],
        [0.45, 0.57, 55, 80, EASE_IN],
        [0.57, 0.69, 80, 55, EASE_OUT],
        [0.69, 0.81, 55, 80, EASE_IN],
        [0.81, 0.93, 80, 55, EASE_OUT],
        [0.93, 1.05, 55, 80, EASE_IN],
        [1.05, 1.17, 80, 55, EASE_OUT],
        [1.17, 1.52, 55, 10, EASE_IN_OUT],
        [1.52, 1.8, 10, 0, OVERSHOOT],
      ],
    },
    {
      part: 'leg-left',
      property: 'rotation',
      pivot: '42 66',
      segments: [
        [0, 0.08, 0, 6, EASE_IN],
        [0.08, 0.18, 6, -3, EASE_OUT],
        [0.18, 0.3, -3, 0, EASE_OUT],
        [1.14, 1.49, 0, 3, EASE_IN_OUT],
        [1.49, 1.8, 3, 0, OVERSHOOT],
      ],
    },
    {
      part: 'leg-right',
      property: 'rotation',
      pivot: '58 66',
      segments: [
        [0, 0.08, 0, -6, EASE_IN],
        [0.08, 0.18, -6, 3, EASE_OUT],
        [0.18, 0.3, 3, 0, EASE_OUT],
        [1.14, 1.49, 0, -3, EASE_IN_OUT],
        [1.49, 1.8, -3, 0, OVERSHOOT],
      ],
    },
    {
      part: 'body',
      property: 'scaleX',
      pivot: '50 78',
      segments: [
        [0, 0.08, 1, 1.02, EASE_IN],
        [0.08, 0.18, 1.02, 0.97, EASE_OUT],
        [0.18, 0.3, 0.97, 1, EASE_OUT],
        [0.3, 0.32, 1, 1.04, EASE_IN],
        [0.32, 0.34, 1.04, 1, EASE_OUT],
        [0.54, 0.56, 1, 1.04, EASE_IN],
        [0.56, 0.58, 1.04, 1, EASE_OUT],
        [0.78, 0.8, 1, 1.04, EASE_IN],
        [0.8, 0.82, 1.04, 1, EASE_OUT],
        [1.02, 1.04, 1, 1.04, EASE_IN],
        [1.04, 1.06, 1.04, 1, EASE_OUT],
      ],
    },
    {
      part: 'body',
      property: 'scaleY',
      pivot: '50 78',
      segments: [
        [0, 0.08, 1, 0.98, EASE_IN],
        [0.08, 0.18, 0.98, 1.03, EASE_OUT],
        [0.18, 0.3, 1.03, 1, EASE_OUT],
        [0.3, 0.32, 1, 0.96, EASE_IN],
        [0.32, 0.34, 0.96, 1, EASE_OUT],
        [0.54, 0.56, 1, 0.96, EASE_IN],
        [0.56, 0.58, 0.96, 1, EASE_OUT],
        [0.78, 0.8, 1, 0.96, EASE_IN],
        [0.8, 0.82, 0.96, 1, EASE_OUT],
        [1.02, 1.04, 1, 0.96, EASE_IN],
        [1.04, 1.06, 0.96, 1, EASE_OUT],
      ],
    },
    {
      part: 'character',
      property: 'y',
      segments: [
        [0, 0.08, 0, 2, EASE_IN],
        [0.08, 0.18, 2, -3, 'back.out(1.2)'],
        [0.18, 0.3, -3, 0, EASE_OUT],
        [0.3, 0.32, 0, -2, EASE_IN],
        [0.32, 0.34, -2, 0, EASE_OUT],
        [0.54, 0.56, 0, -2, EASE_IN],
        [0.56, 0.58, -2, 0, EASE_OUT],
        [0.78, 0.8, 0, -2, EASE_IN],
        [0.8, 0.82, -2, 0, EASE_OUT],
        [1.02, 1.04, 0, -2, EASE_IN],
        [1.04, 1.06, -2, 0, EASE_OUT],
      ],
    },
    {
      part: 'mouth',
      property: 'scaleX',
      pivot: '50 49',
      segments: [
        [0.08, 0.22, 1, 1.15, EASE_OUT],
        [0.22, 0.9, 1.15, 1.2, SWAY],
        [1.14, 1.49, 1.2, 1.05, EASE_IN_OUT],
        [1.49, 1.8, 1.05, 1, EASE_IN_OUT],
      ],
    },

    {
      part: 'eye-left-open',
      property: 'opacity',
      segments: [
        [0.14, 0.22, 1, 0, EASE_IN_OUT],
        [1.3, 1.38, 0, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-right-open',
      property: 'opacity',
      segments: [
        [0.14, 0.22, 1, 0, EASE_IN_OUT],
        [1.3, 1.38, 0, 1, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-left-happy',
      property: 'opacity',
      segments: [
        [0.14, 0.22, 0, 1, EASE_IN_OUT],
        [1.3, 1.38, 1, 0, EASE_IN_OUT],
      ],
    },
    {
      part: 'eye-right-happy',
      property: 'opacity',
      segments: [
        [0.14, 0.22, 0, 1, EASE_IN_OUT],
        [1.3, 1.38, 1, 0, EASE_IN_OUT],
      ],
    },
  ],
}
