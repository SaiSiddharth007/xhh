"use client"

import { motion } from "framer-motion"
import { Droplet } from "lucide-react"

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-50 dark:bg-black z-50">
      <div className="relative">
        <motion.div
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 opacity-75"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="relative w-20 h-20 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg">
          <Droplet className="h-10 w-10 text-orange-500 dark:text-orange-400" />

          <motion.div
            className="absolute inset-0 rounded-full border-4 border-orange-500 dark:border-orange-400"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              borderTopColor: "transparent",
              borderRightColor: "transparent",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: ["0 0 0 0px rgba(249, 115, 22, 0.4)", "0 0 0 20px rgba(249, 115, 22, 0)"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        </div>
      </div>

      <motion.div
        className="mt-8 text-2xl font-bold text-orange-500 dark:text-orange-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        ByteX-HydroHero
      </motion.div>

      <motion.div
        className="mt-2 text-zinc-500 dark:text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Initializing smart irrigation system...
      </motion.div>
    </div>
  )
}
