"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"

export function ScrollingText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 45, // Slowed down further from 30 to 45 seconds
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    })
  }, [controls])

  return (
    <div className="relative overflow-hidden py-2 md:py-3 text-zinc-800 dark:text-white">
      {/* Removed orange background as requested */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-[30%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"></div>
      </div>

      <div ref={containerRef} className="flex whitespace-nowrap relative z-0">
        <motion.div className="flex items-center space-x-6 md:space-x-8 px-4" animate={controls}>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="text-xs md:text-sm font-medium">
                • Smart irrigation for the modern garden • AI-powered plant monitoring • Save water, save money •
                Precision watering technology • Automated plant care • Sustainable gardening
              </span>
            ))}
        </motion.div>
      </div>
    </div>
  )
}
