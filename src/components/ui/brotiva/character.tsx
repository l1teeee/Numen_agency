'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { CharacterScene } from './scene-types'
import type { CharacterId } from './scenes'

gsap.registerPlugin(useGSAP)

// The stage is black, so limbs are drawn in a warm white; eyes and mouth sit on the
// saturated body colors and stay dark.
const LIMB_INK = '#f5f3ee'
const FACE_INK = '#15131f'

interface CharacterSpec {
  color: string
  foot: string
  shape: 'flower' | 'round'
  // Resting pose in degrees, applied inside the group GSAP animates, so a scene
  // angle of 0 means the same thing for all four characters.
  armLeft: number
  armRight: number
  legLeft: number
  legRight: number
  torso: number
  // Own proportions. They never touch the angles, so every scene fits every character.
  armLength: number
  eyeRadius: number
  mouthWidth: number
}

const SPECS: Record<CharacterId, CharacterSpec> = {
  'purple-flower': {
    color: '#635bff', foot: '#ffc233', shape: 'flower',
    armLeft: 8, armRight: -14, legLeft: 0, legRight: 0, torso: 0,
    armLength: 1, eyeRadius: 3.6, mouthWidth: 1,
  },
  'coral-flower': {
    color: '#ff5a36', foot: '#ffc233', shape: 'flower',
    armLeft: -12, armRight: 12, legLeft: 6, legRight: -6, torso: 2,
    armLength: 1.12, eyeRadius: 3.4, mouthWidth: 0.88,
  },
  'green-round': {
    color: '#34c77f', foot: '#ffc233', shape: 'round',
    armLeft: 12, armRight: -12, legLeft: -12, legRight: 12, torso: -3,
    armLength: 0.86, eyeRadius: 3.4, mouthWidth: 1.06,
  },
  'yellow-round': {
    color: '#ffc233', foot: '#f0a92a', shape: 'round',
    armLeft: -12, armRight: 10, legLeft: 5, legRight: -5, torso: 4,
    armLength: 0.74, eyeRadius: 4.1, mouthWidth: 0.84,
  },
}

const pose = (degrees: number, pivotX: number, pivotY: number) =>
  `rotate(${degrees} ${pivotX} ${pivotY})`

function Body({ shape, color }: { shape: CharacterSpec['shape']; color: string }) {
  if (shape === 'round') return <circle cx="50" cy="42" r="32" fill={color} />
  return (
    <g fill={color}>
      <circle cx="50" cy="22" r="20" />
      <circle cx="69" cy="34" r="20" />
      <circle cx="64" cy="58" r="20" />
      <circle cx="36" cy="58" r="20" />
      <circle cx="31" cy="34" r="20" />
      <circle cx="50" cy="42" r="24" />
    </g>
  )
}

function buildTimeline(root: SVGSVGElement, scene: CharacterScene) {
  const timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: scene.wait })

  for (const track of scene.tracks) {
    const target = root.querySelector(`[data-part="${track.part}"]`)
    if (!target) throw new Error(`Scene "${scene.id}" animates "${track.part}", which the rig does not have`)

    // svgOrigin without smoothing keeps every matrix an exact rotation around the pivot.
    const origin = track.pivot ? { svgOrigin: track.pivot, smoothOrigin: false } : null

    // A set followed only by `to` tweens: a fromTo snapshots the part state on each
    // repeat and corrupts the pivot when a repeat lands mid-rotation.
    timeline.set(target, { [track.property]: track.segments[0][2], ...origin }, 0)
    for (const [start, end, , to, ease] of track.segments) {
      timeline.to(target, { [track.property]: to, duration: end - start, ease, ...origin }, start)
    }
  }

  // Holds the scene at its full length even when the last track ends earlier.
  timeline.to({}, { duration: 0.01 }, scene.duration)
  return timeline
}

interface CharacterProps {
  character: CharacterId
  /** Without a scene the character stays in its resting pose. */
  scene?: CharacterScene
  playing: boolean
}

export function Character({ character, scene, playing }: CharacterProps) {
  const rootRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const spec = SPECS[character]

  // An arm gets longer by moving its tip, not by scaling the stroke, so the line
  // weight is identical across characters.
  const armLeftPath = `M24 52 ${24 - 21 * spec.armLength} ${52 + 12 * spec.armLength}`
  const armRightPath = `M76 52 ${76 + 21 * spec.armLength} ${52 - 12 * spec.armLength}`

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root || !scene) return
      timelineRef.current = buildTimeline(root, scene)
      return () => {
        timelineRef.current = null
      }
    },
    { scope: rootRef, dependencies: [scene] },
  )

  useEffect(() => {
    timelineRef.current?.paused(!playing)
  }, [playing, scene])

  return (
    <svg ref={rootRef} viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* Headroom for the hops: the drawing shrinks toward the ground line. */}
      <g transform="translate(5.4 10.26) scale(0.892)">
        <g data-part="character">
          <g data-part="legs">
            <g data-part="leg-left">
              <g transform={pose(spec.legLeft, 42, 66)}>
                <path d="M42 66 38 90" stroke={LIMB_INK} strokeWidth="5" strokeLinecap="round" fill="none" />
              </g>
            </g>
            <g data-part="leg-right">
              <g transform={pose(spec.legRight, 58, 66)}>
                <path d="M58 66 62 90" stroke={LIMB_INK} strokeWidth="5" strokeLinecap="round" fill="none" />
              </g>
            </g>
            {/* Feet swing around the hip, not the ankle, so they follow their leg. */}
            <g data-part="foot-left">
              <g transform={pose(spec.legLeft, 42, 66)}>
                <ellipse cx="35" cy="93" rx="8" ry="4.5" fill={spec.foot} />
              </g>
            </g>
            <g data-part="foot-right">
              <g transform={pose(spec.legRight, 58, 66)}>
                <ellipse cx="65" cy="93" rx="8" ry="4.5" fill={spec.foot} />
              </g>
            </g>
          </g>

          <g data-part="torso">
            <g transform={pose(spec.torso, 50, 78)}>
              <g data-part="body">
                <Body shape={spec.shape} color={spec.color} />
              </g>

              {/* Arms sit in front of the body: behind it they vanish once raised. */}
              <g data-part="arm-left">
                <g transform={pose(spec.armLeft, 24, 52)}>
                  <path d={armLeftPath} stroke={LIMB_INK} strokeWidth="5" strokeLinecap="round" fill="none" />
                </g>
              </g>
              <g data-part="arm-right">
                <g transform={pose(spec.armRight, 76, 52)}>
                  <path d={armRightPath} stroke={LIMB_INK} strokeWidth="5" strokeLinecap="round" fill="none" />
                </g>
              </g>

              <g data-part="face">
                <g data-part="eye-left">
                  <circle data-part="eye-left-open" cx="42" cy="39" r={spec.eyeRadius} fill={FACE_INK} />
                  <path
                    data-part="eye-left-happy"
                    d="M38.6 40.4c1.9-3 5-3 6.8 0"
                    fill="none"
                    stroke={FACE_INK}
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0"
                  />
                </g>
                <g data-part="eye-right">
                  <circle data-part="eye-right-open" cx="58" cy="39" r={spec.eyeRadius} fill={FACE_INK} />
                  <path
                    data-part="eye-right-happy"
                    d="M54.6 40.4c1.9-3 5-3 6.8 0"
                    fill="none"
                    stroke={FACE_INK}
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0"
                  />
                </g>
                <g data-part="mouth">
                  <g transform={`translate(50 49) scale(${spec.mouthWidth} 1) translate(-50 -49)`}>
                    <path d="M43 49c3 4 11 4 14 0" fill="none" stroke={FACE_INK} strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                </g>
                <g data-part="cheeks" opacity="0">
                  <circle cx="36" cy="46" r="3" fill="#ff8fb1" />
                  <circle cx="64" cy="46" r="3" fill="#ff8fb1" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
