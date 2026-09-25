// Angle convention of the rig (see character.tsx for the geometry):
//   arm-right rotates negative to rise, arm-left positive; the useful arc is 40-75 degrees.
//   Legs swing from the hip up to 45 degrees, the torso leans up to 12, and the
//   character hops up to 10 units (negative y goes up) before it leaves the frame.
export type SceneProperty = 'rotation' | 'x' | 'y' | 'scaleX' | 'scaleY' | 'opacity'

// [start, end, from, to, ease], times in seconds.
export type SceneSegment = [number, number, number, number, string]

export interface SceneTrack {
  /** Value of the data-part attribute of a group inside the rig SVG. */
  part: string
  property: SceneProperty
  /** Transform origin in rig SVG units. Rotations and scales need it. */
  pivot?: string
  /** Contiguous: each segment starts where the previous one ended. */
  segments: SceneSegment[]
}

export interface CharacterScene {
  id: string
  duration: number
  /** Seconds of rest before the scene repeats. */
  wait: number
  tracks: SceneTrack[]
}
