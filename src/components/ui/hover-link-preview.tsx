"use client"

import * as React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

interface HoverLinkPreviewProps {
  href?: string
  previewImage: string
  imageAlt?: string
  children: React.ReactNode
  anchorClassName?: string
}

const HoverLinkPreview: React.FC<HoverLinkPreviewProps> = ({
  href = "#",
  previewImage,
  imageAlt = "Link preview",
  children,
  anchorClassName,
}) => {
  const [showPreview, setShowPreview] = useState(false)
  const prevX = useRef<number | null>(null)

  const motionTop = useMotionValue(0)
  const motionLeft = useMotionValue(0)
  const motionRotate = useMotionValue(0)

  const springTop = useSpring(motionTop, { stiffness: 300, damping: 30 })
  const springLeft = useSpring(motionLeft, { stiffness: 300, damping: 30 })
  const springRotate = useSpring(motionRotate, { stiffness: 300, damping: 20 })

  const handleMouseEnter = () => {
    setShowPreview(true)
    prevX.current = null
  }

  const handleMouseLeave = () => {
    setShowPreview(false)
    prevX.current = null
    motionRotate.set(0)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const PREVIEW_WIDTH = 192
    const PREVIEW_HEIGHT = 112
    const OFFSET_Y = 16
    const viewportHeight = window.innerHeight

    const spaceBelow = viewportHeight - e.clientY
    const top = spaceBelow > PREVIEW_HEIGHT + OFFSET_Y + 8
      ? e.clientY + OFFSET_Y
      : e.clientY - PREVIEW_HEIGHT - OFFSET_Y

    motionTop.set(top)
    motionLeft.set(e.clientX - PREVIEW_WIDTH / 2)

    if (prevX.current !== null) {
      const deltaX = e.clientX - prevX.current
      const newRotate = Math.max(-15, Math.min(15, deltaX * 1.2))
      motionRotate.set(newRotate)
    }
    prevX.current = e.clientX
  }

  return (
    <>
      <a
        href={href}
        target={href !== "#" ? "_blank" : undefined}
        rel={href !== "#" ? "noopener noreferrer" : undefined}
        className={anchorClassName ?? "relative inline-block cursor-pointer text-blue-600 underline"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10, rotate: 0 }}
            style={{
              position: "fixed",
              top: springTop,
              left: springLeft,
              rotate: springRotate,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <div className="rounded-2xl border border-foreground/[0.08] bg-background p-2 shadow-2xl shadow-black/40">
              <img
                src={previewImage}
                alt={imageAlt}
                draggable={false}
                className="h-28 w-48 rounded-xl object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { HoverLinkPreview }
