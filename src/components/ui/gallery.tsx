'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Direction = 'left' | 'right'

function getRandomRotation(min: number, max: number, direction: Direction) {
  const val = Math.random() * (max - min) + min
  return direction === 'left' ? -val : val
}

const BASE_3 = [
  { xRatio: -0.30, y: 20,  zIndex: 30, direction: 'left' as Direction },
  { xRatio:  0,    y: -10, zIndex: 50, direction: 'right' as Direction },
  { xRatio:  0.30, y: 20,  zIndex: 40, direction: 'right' as Direction },
]

const BASE_5 = [
  { xRatio: -0.44, y: 10, zIndex: 50, direction: 'left' as Direction },
  { xRatio: -0.22, y: 22, zIndex: 40, direction: 'left' as Direction },
  { xRatio:  0,    y: 5,  zIndex: 30, direction: 'right' as Direction },
  { xRatio:  0.22, y: 18, zIndex: 20, direction: 'right' as Direction },
  { xRatio:  0.44, y: 30, zIndex: 10, direction: 'left' as Direction },
]

function Photo({
  src,
  direction,
  width = 180,
  height = 240,
  dimmed = false,
}: {
  src: string
  direction: Direction
  width?: number
  height?: number
  dimmed?: boolean
}) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setRotation(getRandomRotation(1, 4, direction))
  }, [direction])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.15, zIndex: 9999, opacity: 1 }}
      whileHover={{ scale: 1.08, rotateZ: 2 * (direction === 'left' ? -1 : 1), zIndex: 9999, opacity: 1 }}
      whileDrag={{ scale: 1.1, zIndex: 9999, opacity: 1 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation, opacity: dimmed ? 0.45 : 1 }}
      transition={{ opacity: { duration: 0.25 } }}
      style={{ width, height, touchAction: 'none', userSelect: 'none' }}
      className="relative shrink-0 cursor-grab active:cursor-grabbing"
      draggable={false}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
        <img
          src={src}
          alt=""
          draggable={false}
          className="h-full w-full rounded-2xl object-cover invert dark:invert-0"
        />
      </div>
    </motion.div>
  )
}

export function PhotoSpread({
  images,
  width = 150,
  height = 240,
  centerWidth,
}: {
  images: string[]
  width?: number
  height?: number
  centerWidth?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(t)
  }, [])

  const base = images.length <= 3 ? BASE_3 : BASE_5.slice(0, images.length)
  const cw = centerWidth ?? width
  const maxZIndex = Math.max(...base.map(p => p.zIndex))

  // compute x so each image is centered at xRatio * containerW
  // initial left edge of the anchor div = (containerW - cw) / 2
  const getX = (i: number) => {
    const pos = base[i]
    const isCentre = pos?.zIndex === maxZIndex
    const imgW = isCentre ? cw : width
    const targetCenter = (pos?.xRatio ?? 0) * containerW + containerW / 2
    const targetLeft = targetCenter - imgW / 2
    const initialLeft = (containerW - cw) / 2
    return targetLeft - initialLeft
  }

  const photoVariants = {
    hidden: { x: 0, y: 0, opacity: 0 },
    visible: (i: number) => ({
      x: containerW > 0 ? getX(i) : 0,
      y: base[i]?.y ?? 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 70, damping: 12, delay: i * 0.12 },
    }),
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: height + 40 }}>
      <div className="absolute" style={{ left: (containerW - cw) / 2, top: 20, width: cw, height }}>
        {[...images].reverse().map((src, ri) => {
          const i = images.length - 1 - ri
          const pos = base[i]
          const isCentre = pos?.zIndex === maxZIndex
          return (
            <motion.div
              key={src + i}
              className="absolute left-0 top-0"
              style={{ zIndex: pos?.zIndex ?? 10 }}
              variants={photoVariants}
              custom={i}
              initial="hidden"
              animate={loaded && containerW > 0 ? 'visible' : 'hidden'}
            >
              <Photo
                src={src}
                direction={pos?.direction ?? 'right'}
                width={isCentre ? cw : width}
                height={height}
                dimmed={!isCentre}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
