'use client'
import { motion, Variants } from 'framer-motion'

interface ImageRevealProps {
  leftImage: string
  middleImage: string
  rightImage: string
}

export default function ImageReveal({ leftImage, middleImage, rightImage }: ImageRevealProps) {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delay: 0.2, staggerChildren: 0.2 },
    },
  }

  const leftImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -8, x: -110, y: 10,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
    hover: {
      rotate: 1, x: -120, y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  }

  const middleImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: 6, x: 0, y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
    hover: {
      rotate: 0, x: 0, y: -10,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  }

  const rightImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: {
      rotate: -6, x: 110, y: 20,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
    hover: {
      rotate: 3, x: 110, y: 10,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  }

  return (
    <motion.div
      className="relative flex items-center justify-center w-64 h-48"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="absolute w-40 h-36 origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
        variants={leftImageVariants}
        whileHover="hover"
        style={{ zIndex: 30 }}
      >
        <img src={leftImage} alt="" className="w-full h-full object-cover rounded-xl" />
      </motion.div>

      <motion.div
        className="absolute w-40 h-36 origin-bottom-left overflow-hidden rounded-xl shadow-lg bg-white"
        variants={middleImageVariants}
        whileHover="hover"
        style={{ zIndex: 20 }}
      >
        <img src={middleImage} alt="" className="w-full h-full object-cover rounded-xl" />
      </motion.div>

      <motion.div
        className="absolute w-40 h-36 origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
        variants={rightImageVariants}
        whileHover="hover"
        style={{ zIndex: 10 }}
      >
        <img src={rightImage} alt="" className="w-full h-full object-cover rounded-xl" />
      </motion.div>
    </motion.div>
  )
}
