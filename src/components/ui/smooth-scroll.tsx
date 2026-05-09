'use client'
import { ReactLenis } from 'lenis/react'
import React, { forwardRef } from 'react'

const SmoothScroll = forwardRef<HTMLElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <ReactLenis root>
        <main ref={ref}>{children}</main>
      </ReactLenis>
    )
  }
)

SmoothScroll.displayName = 'SmoothScroll'
export default SmoothScroll
