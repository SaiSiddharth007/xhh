"use client"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface InitialAuthPopupProps {
  onAuthChoice: (choice: "login" | "signup" | "later") => void
}

export function InitialAuthPopup({ onAuthChoice }: InitialAuthPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative"
      >
        <Card className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 border-none shadow-xl">
          <button
            onClick={() => onAuthChoice("later")}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Welcome to ByteX-HydroHero</h2>
            <p className="text-sm text-muted-foreground">Get started with your smart irrigation system</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => onAuthChoice("signup")}
              className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
            >
              Sign Up
            </Button>

            <Button onClick={() => onAuthChoice("login")} variant="outline" className="w-full">
              Login
            </Button>

            <Button
              onClick={() => onAuthChoice("later")}
              variant="ghost"
              className="w-full text-sm text-muted-foreground"
            >
              I'll do later
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
