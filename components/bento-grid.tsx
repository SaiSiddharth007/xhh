"use client"

import { motion } from "framer-motion"
import { Camera, Cpu, Droplet, LineChart, Smartphone, Zap, Cloud, Leaf } from "lucide-react"

export function BentoGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-xl p-6 text-white overflow-hidden relative"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute right-10 bottom-10 w-20 h-20 bg-white/10 rounded-full blur-md"></div>

        <div className="h-full flex flex-col relative z-10">
          <div className="mb-4">
            <Camera className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold mb-2">Smart Plant Monitoring</h3>
            <p className="opacity-90">
              Our advanced camera system continuously monitors your plants, capturing high-resolution images to analyze
              their health and water needs in real-time.
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-white/20">
            <p className="text-sm opacity-80">
              "ByteX-HydroHero reduced my garden water usage by 40% while improving plant health." — Garden Enthusiast
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-6 text-white relative overflow-hidden"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <Cpu className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-bold mb-2">AI-Powered Analysis</h3>
          <p className="text-sm opacity-90">
            Our ML models (YOLO, CNN) analyze plant images to determine water needs with precision, eliminating
            guesswork.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white relative overflow-hidden"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <Smartphone className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-bold mb-2">Mobile Control</h3>
          <p className="text-sm opacity-90">
            Control your irrigation system from anywhere with our intuitive mobile app interface.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl p-6 text-white relative overflow-hidden"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <Droplet className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-bold mb-2">Precision Watering</h3>
          <p className="text-sm opacity-90">
            Target specific plants with exactly the right amount of water, reducing waste and improving plant health.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl p-6 text-white relative overflow-hidden"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <LineChart className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-bold mb-2">Data Insights</h3>
          <p className="text-sm opacity-90">
            Track water usage and plant health over time with detailed analytics and recommendations.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 rounded-xl p-6 text-white relative overflow-hidden"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <Cloud className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-bold mb-2">Weather Integration</h3>
          <p className="text-sm opacity-90">
            Automatically adjusts watering schedules based on local weather forecasts to optimize water usage.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-xl p-6 text-white relative overflow-hidden"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <Zap className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-bold mb-2">Energy Efficient</h3>
          <p className="text-sm opacity-90">
            Low-power components and smart scheduling ensure minimal energy consumption for sustainable operation.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 rounded-xl p-6 text-white relative overflow-hidden"
        variants={item}
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <Leaf className="h-8 w-8 mb-2" />
          <h3 className="text-lg font-bold mb-2">Eco-Friendly</h3>
          <p className="text-sm opacity-90">
            Conserve water and promote sustainable gardening practices with our smart irrigation technology.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
