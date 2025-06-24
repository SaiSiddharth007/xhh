"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Camera, RefreshCw, Check, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollingText } from "@/components/scrolling-text"
import { AuthModal } from "@/components/auth-modal"

export default function ScanPage() {
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "complete" | "error">("idle")
  const [scanResults, setScanResults] = useState<Array<{ plant: string; status: string; waterNeeded: string }>>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (cameraActive && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err)
        })
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraActive])

  const startScan = () => {
    setCameraActive(true)
    setScanStatus("scanning")

    // Simulate scanning process
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate for demo

      if (success) {
        setScanResults([
          { plant: "Tomato Plant", status: "Healthy", waterNeeded: "No water needed" },
          { plant: "Basil Herb", status: "Needs Water", waterNeeded: "150ml recommended" },
          { plant: "Rose Bush", status: "Needs Water", waterNeeded: "300ml recommended" },
        ])
        setScanStatus("complete")
      } else {
        setScanStatus("error")
      }

      setCameraActive(false)
    }, 3000)
  }

  const handleGetAnalysis = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    // Proceed with analysis
    startScan()
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setShowAuthModal(false)
    // Start analysis after authentication
    startScan()
  }

  const resetScan = () => {
    setScanStatus("idle")
    setScanResults([])
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-semibold text-lg">Scan Plants</h1>
        </div>
      </header>

      <ScrollingText />

      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Plant Scanner</h2>
            <p className="text-muted-foreground">Use your camera to scan plants and analyze their water needs.</p>
          </div>

          <Card className="overflow-hidden">
            <div className="aspect-video bg-zinc-900 relative">
              {scanStatus === "idle" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Camera className="h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm opacity-70">Camera preview will appear here</p>
                </div>
              )}

              {scanStatus === "scanning" && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 border-4 border-blue-500 dark:border-blue-600 animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2"></div>
                      Scanning...
                    </div>
                  </div>
                </>
              )}

              {scanStatus === "complete" && (
                <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center text-white">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-lg font-medium mb-1">Scan Complete</p>
                  <p className="text-sm opacity-70">Found {scanResults.length} plants</p>
                </div>
              )}

              {scanStatus === "error" && (
                <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center text-white">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                  <p className="text-lg font-medium mb-1">Scan Failed</p>
                  <p className="text-sm opacity-70">Could not detect plants. Please try again.</p>
                </div>
              )}
            </div>
          </Card>

          {scanStatus === "idle" && (
            <div className="space-y-3">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
                onClick={startScan}
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                onClick={handleGetAnalysis}
              >
                Get Analysis {!isAuthenticated && "(Login Required)"}
              </Button>
            </div>
          )}

          {scanStatus === "scanning" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Please hold the camera steady...</p>
            </div>
          )}

          {scanStatus === "complete" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Scan Results</h3>

              <div className="space-y-3">
                {scanResults.map((result, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{result.plant}</h4>
                        <p
                          className={`text-sm ${
                            result.status === "Healthy"
                              ? "text-green-600 dark:text-green-400"
                              : "text-orange-600 dark:text-orange-400"
                          }`}
                        >
                          {result.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{result.waterNeeded}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                  asChild
                >
                  <Link href="/water-now">
                    <Camera className="mr-2 h-4 w-4" />
                    Water Plants
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" onClick={resetScan}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Scan Again
                </Button>
              </div>
            </div>
          )}

          {scanStatus === "error" && (
            <Button variant="outline" className="w-full" onClick={resetScan}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ByteX-HydroHero. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
