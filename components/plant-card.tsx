"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Droplet, Clock, Settings, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PlantCardProps {
  name: string
  status: "Healthy" | "Needs Water" | "Overwatered"
  lastWatered: string
  waterLevel: "High" | "Medium" | "Low"
  image: string
  nextWatering: string
}

export function PlantCard({ name, status, lastWatered, waterLevel, image, nextWatering }: PlantCardProps) {
  const statusColor =
    status === "Healthy"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
      : status === "Needs Water"
        ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800"
        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800"

  const waterLevelColor =
    waterLevel === "High" ? "text-blue-500" : waterLevel === "Medium" ? "text-amber-500" : "text-red-500"

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Image
                src={image || "/placeholder.svg?height=64&width=64"}
                alt={name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={statusColor}>
                  {status}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Droplet className={`h-3 w-3 mr-1 ${waterLevelColor}`} />
                  {waterLevel}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Droplet className="h-4 w-4 mr-2 text-blue-500" />
              <span>Last watered: {lastWatered}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-orange-500" />
              <span>Next watering: {nextWatering}</span>
            </div>
          </div>
        </div>

        <div className="flex border-t border-zinc-200 dark:border-zinc-800">
          <Button variant="ghost" className="flex-1 rounded-none h-12 text-xs">
            <Settings className="h-3 w-3 mr-1" />
            Settings
          </Button>
          <Button variant="ghost" className="flex-1 rounded-none h-12 text-xs">
            <Droplet className="h-3 w-3 mr-1" />
            Water Now
          </Button>
          <Button variant="ghost" className="flex-1 rounded-none h-12 text-xs">
            <ArrowRight className="h-3 w-3 mr-1" />
            Details
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
