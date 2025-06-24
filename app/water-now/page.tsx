"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Droplet, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollingText } from "@/components/scrolling-text"

export default function WaterNowPage() {
  const [wateringStatus, setWateringStatus] = useState<"idle" | "watering" | "complete" | "error">("idle")
  const [selectedPlants, setSelectedPlants] = useState<string[]>(["tomato-plant"])

  const togglePlantSelection = (plantId: string) => {
    if (selectedPlants.includes(plantId)) {
      setSelectedPlants(selectedPlants.filter((id) => id !== plantId))
    } else {
      setSelectedPlants([...selectedPlants, plantId])
    }
  }

  const startWatering = () => {
    if (selectedPlants.length === 0) return

    setWateringStatus("watering")

    // Simulate watering process
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate for demo
      setWateringStatus(success ? "complete" : "error")
    }, 3000)
  }

  const resetWatering = () => {
    setWateringStatus("idle")
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
          <h1 className="font-semibold text-lg">Water Now</h1>
        </div>
      </header>

      <ScrollingText />

      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Manual Watering</h2>
            <p className="text-muted-foreground">
              Select the plants you want to water and adjust the water amount if needed.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Select Plants</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "tomato-plant",
                  name: "Tomato Plant",
                  image: "/tomato-plant.png",
                  lastWatered: "2 days ago",
                  recommendedAmount: "200ml",
                },
                {
                  id: "basil-herb",
                  name: "Basil Herb",
                  image: "/basil-herb.png",
                  lastWatered: "4 days ago",
                  recommendedAmount: "150ml",
                },
                {
                  id: "rose-bush",
                  name: "Rose Bush",
                  image: "/rose-bush.png",
                  lastWatered: "3 days ago",
                  recommendedAmount: "300ml",
                },
              ].map((plant) => (
                <Card
                  key={plant.id}
                  className={`border-2 cursor-pointer transition-all ${
                    selectedPlants.includes(plant.id)
                      ? "border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/20"
                      : "border-transparent"
                  }`}
                  onClick={() => wateringStatus === "idle" && togglePlantSelection(plant.id)}
                >
                  <div className="p-4 flex items-center">
                    <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Image
                        src={plant.image || "/placeholder.svg?height=64&width=64"}
                        alt={plant.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{plant.name}</h4>
                        {selectedPlants.includes(plant.id) && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Last watered: {plant.lastWatered}</p>
                      <div className="flex items-center mt-1">
                        <Droplet className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm">{plant.recommendedAmount}</span>
                        <span className="text-xs text-muted-foreground ml-1">(recommended)</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Water Amount</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedPlants.map((plantId) => {
                const plant = {
                  "tomato-plant": {
                    name: "Tomato Plant",
                    recommendedAmount: 200,
                  },
                  "basil-herb": {
                    name: "Basil Herb",
                    recommendedAmount: 150,
                  },
                  "rose-bush": {
                    name: "Rose Bush",
                    recommendedAmount: 300,
                  },
                }[plantId]

                return (
                  <Card key={plantId} className="p-4">
                    <h4 className="font-medium text-sm mb-2">{plant.name}</h4>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        defaultValue={plant.recommendedAmount}
                        disabled={wateringStatus !== "idle"}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>50ml</span>
                      <span className="text-blue-500">{plant.recommendedAmount}ml</span>
                      <span>500ml</span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="pt-4">
            {wateringStatus === "idle" && (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                onClick={startWatering}
                disabled={selectedPlants.length === 0 || wateringStatus !== "idle"}
              >
                <Droplet className="mr-2 h-4 w-4" />
                Start Watering
              </Button>
            )}

            {wateringStatus === "watering" && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p>Watering in progress...</p>
              </div>
            )}

            {wateringStatus === "complete" && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="mb-4">Watering complete!</p>
                <Button variant="outline" onClick={resetWatering}>
                  Water Again
                </Button>
              </div>
            )}

            {wateringStatus === "error" && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                  <span className="text-red-600 dark:text-red-400 text-xl">!</span>
                </div>
                <p className="mb-4">Error during watering. Please try again.</p>
                <Button variant="outline" onClick={resetWatering}>
                  Try Again
                </Button>
              </div>
            )}
          </div>
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
