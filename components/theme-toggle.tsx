"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  const isDark = theme === "dark"

  return (
    <motion.button
      className="relative w-12 h-6 rounded-full overflow-hidden"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
        border: `1px solid ${isDark ? "#f97316" : "#f97316"}`,
      }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      animate={{ borderColor: isHovered ? "#f97316" : isDark ? "#f97316" : "#f97316" }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 6 : 1,
          backgroundColor: isDark ? "#f97316" : "#fff",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-black"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-orange-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  )
}
