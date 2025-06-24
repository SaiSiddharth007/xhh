"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Droplet, TreesIcon as Plant, Thermometer, Calendar, Settings, BarChart2, PlusCircle, RefreshCw, Zap, Leaf, Menu, X, Users, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollingText } from "@/components/scrolling-text"
import { LoadingAnimation } from "@/components/loading-animation"
import { PlantCard } from "@/components/plant-card"
import { BentoGrid } from "@/components/bento-grid"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { InitialAuthPopup } from "@/components/initial-auth-popup"
import { AuthModal } from "@/components/auth-modal"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const [showInitialPopup, setShowInitialPopup] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleInitialAuthChoice = (choice: 'login' | 'signup' | 'later') => {
    setShowInitialPopup(false)
    if (choice === 'login') {
      setAuthModalMode('login')
      setShowAuthModal(true)
    } else if (choice === 'signup') {
      setAuthModalMode('signup')
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setShowAuthModal(false)
  }

  const handleAuthRequired = () => {
    setShowAuthModal(true)
  }

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-lg overflow-hidden flex items-center justify-center">
              <Droplet className="h-5 w-5 text-white" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50"></div>
            </div>
            <span className="font-bold text-xl tracking-tight">ByteX-HydroHero</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </header>

      <ScrollingText />

      <main className="flex-1">
        <div className="container py-4 md:py-8">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Sidebar - Desktop */}
            {!isMobile && (
              <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <div className="sticky top-24 space-y-2">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm",
                      activeTab === "dashboard" && "bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400",
                    )}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <Leaf className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm",
                      activeTab === "schedule" && "bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400",
                    )}
                    onClick={() => setActiveTab("schedule")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm",
                      activeTab === "analytics" && "bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400",
                    )}
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm",
                      activeTab === "settings" && "bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400",
                    )}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm",
                      activeTab === "team" && "bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400",
                    )}
                    onClick={() => setActiveTab("team")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Team Info
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm",
                      activeTab === "about" && "bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400",
                    )}
                    onClick={() => setActiveTab("about")}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    About
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            {isMobile && mobileMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-white dark:bg-black z-40 pt-16"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="container py-8 space-y-4">
                  {[
                    { id: "dashboard", label: "Dashboard", icon: Leaf },
                    { id: "schedule", label: "Schedule", icon: Calendar },
                    { id: "analytics", label: "Analytics", icon: BarChart2 },
                    { id: "settings", label: "Settings", icon: Settings },
                    { id: "team", label: "Team Info", icon: Users },
                    { id: "about", label: "About", icon: Info },
                  ].map((tab) => (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-lg",
                        activeTab === tab.id && "bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400",
                      )}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <tab.icon className="mr-2 h-5 w-5" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Main Content */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "dashboard" && (
                    <div className="space-y-4 md:space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <Card className="p-4 md:p-6 border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white">
                          <div className="flex items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4">
                              <Plant className="h-5 w-5 md:h-6 md:w-6" />
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-medium opacity-80">Total Plants</p>
                              <h3 className="text-2xl md:text-3xl font-bold">3</h3>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4 md:p-6 border-none shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-600 dark:to-cyan-700 text-white">
                          <div className="flex items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4">
                              <Droplet className="h-5 w-5 md:h-6 md:w-6" />
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-medium opacity-80">Need Water</p>
                              <h3 className="text-2xl md:text-3xl font-bold">2</h3>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4 md:p-6 border-none shadow-lg bg-gradient-to-br from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-700 text-white">
                          <div className="flex items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center mr-3 md:mr-4">
                              <Thermometer className="h-5 w-5 md:h-6 md:w-6" />
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-medium opacity-80">Temperature</p>
                              <h3 className="text-2xl md:text-3xl font-bold">75°F</h3>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        <Button
                          className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-sm"
                          asChild
                        >
                          <Link href="/scan">
                            <Zap className="mr-2 h-4 w-4" />
                            Scan Plants
                          </Link>
                        </Button>
                        <Button
                          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm"
                          asChild
                        >
                          <Link href="/water-now">
                            <Droplet className="mr-2 h-4 w-4" />
                            Water Now
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Refresh Data
                        </Button>
                        <Button variant="outline" size="sm">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Plant
                        </Button>
                      </div>

                      {/* Plants */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl md:text-2xl font-bold">Your Plants</h2>
                          <Button variant="ghost" size="sm">
                            View All
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                          <PlantCard
                            name="Tomato Plant"
                            status="Healthy"
                            lastWatered="2 days ago"
                            waterLevel="Medium"
                            image="/tomato-plant.png"
                            nextWatering="Tomorrow, 07:00"
                          />
                          <PlantCard
                            name="Basil Herb"
                            status="Needs Water"
                            lastWatered="4 days ago"
                            waterLevel="Low"
                            image="/basil-herb.png"
                            nextWatering="Today, 08:30"
                          />
                          <PlantCard
                            name="Rose Bush"
                            status="Needs Water"
                            lastWatered="3 days ago"
                            waterLevel="Low"
                            image="/rose-bush.png"
                            nextWatering="Today, 19:00"
                          />
                        </div>
                      </div>

                      {/* Bento Grid */}
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-4">System Features</h2>
                        <BentoGrid />
                      </div>
                    </div>
                  )}

                  {activeTab === "schedule" && (
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl md:text-2xl font-bold">Watering Schedule</h2>
                        <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-sm">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          New Schedule
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                        {/* Calendar View */}
                        <div className="col-span-1 lg:col-span-2 space-y-4">
                          <Card className="border-none shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 p-3 md:p-4 text-white">
                              <h3 className="font-semibold text-sm md:text-base">Calendar</h3>
                            </div>
                            <div className="p-3 md:p-4 bg-white dark:bg-zinc-950">
                              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                                  <div key={i} className="py-1 font-medium text-muted-foreground">
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center">
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                                  <div
                                    key={date}
                                    className={cn(
                                      "aspect-square flex items-center justify-center rounded-full text-xs",
                                      date === 15 && "bg-orange-500 dark:bg-orange-600 text-white font-medium",
                                      [3, 7, 10, 14, 17, 21, 24, 28].includes(date) &&
                                        "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium",
                                    )}
                                  >
                                    {date}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-orange-500 dark:bg-orange-600"></div>
                                  <span className="text-xs">Today</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-600"></div>
                                  <span className="text-xs">Watering Day</span>
                                </div>
                              </div>
                            </div>
                          </Card>

                          <Card className="border-none shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-3 md:p-4 text-white">
                              <h3 className="font-semibold text-sm md:text-base">Water Usage</h3>
                            </div>
                            <div className="p-3 md:p-4 bg-white dark:bg-zinc-950">
                              <div className="space-y-2">
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Daily Average</span>
                                    <span className="font-medium">650ml</span>
                                  </div>
                                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 dark:bg-blue-600 w-[65%]"></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Weekly Total</span>
                                    <span className="font-medium">1950ml</span>
                                  </div>
                                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 dark:bg-blue-600 w-[45%]"></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Monthly Total</span>
                                    <span className="font-medium">7800ml</span>
                                  </div>
                                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 dark:bg-blue-600 w-[78%]"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>

                        {/* Schedule List */}
                        <Card className="col-span-1 lg:col-span-5 border-none shadow-lg overflow-hidden">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 p-3 md:p-4 text-white">
                            <div className="flex space-x-2">
                              <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white text-sm">
                                Week View
                              </Button>
                              <Button
                                variant="ghost"
                                className="bg-white/20 text-white hover:bg-white/30 hover:text-white text-sm"
                              >
                                List View
                              </Button>
                            </div>
                          </div>
                          <div className="p-4 md:p-6 bg-white dark:bg-zinc-950">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">Active Watering Schedules</h3>

                            <div className="space-y-3 md:space-y-4">
                              {[
                                {
                                  time: "07:00",
                                  name: "Tomato Plant",
                                  amount: "200ml",
                                  days: ["Mon", "Thu", "Sun"],
                                },
                                {
                                  time: "08:30",
                                  name: "Basil Herb",
                                  amount: "150ml",
                                  days: ["Tue", "Fri", "Sun"],
                                },
                                {
                                  time: "19:00",
                                  name: "Rose Bush",
                                  amount: "300ml",
                                  days: ["Mon", "Wed", "Sat"],
                                },
                              ].map((schedule, index) => (
                                <div
                                  key={index}
                                  className="group relative flex items-center bg-zinc-50 dark:bg-zinc-900 p-3 md:p-4 rounded-lg overflow-hidden"
                                >
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 dark:bg-blue-600"></div>
                                  <div className="w-12 md:w-16 text-center">
                                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                      {schedule.time}
                                    </p>
                                  </div>
                                  <div className="flex-1 ml-3 md:ml-4">
                                    <p className="font-medium text-sm md:text-base">{schedule.name}</p>
                                    <div className="flex items-center mt-1">
                                      <Droplet className="h-3 w-3 md:h-4 md:w-4 text-blue-500 mr-1" />
                                      <span className="text-xs md:text-sm">{schedule.amount}</span>
                                      <div className="ml-2 md:ml-4 flex items-center gap-1 text-xs text-muted-foreground">
                                        {schedule.days.map((day) => (
                                          <span
                                            key={day}
                                            className="px-1 md:px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-xs"
                                          >
                                            {day}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="relative inline-flex h-5 w-9 md:h-6 md:w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 dark:bg-zinc-700 transition-colors duration-200 ease-in-out focus:outline-none">
                                    <span className="translate-x-4 md:translate-x-5 pointer-events-none relative inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                                      <span className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-100 duration-200 ease-in">
                                        <svg
                                          className="h-2 w-2 md:h-3 md:w-3 text-blue-600"
                                          fill="currentColor"
                                          viewBox="0 0 12 12"
                                        >
                                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                        </svg>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                              <div>
                                <p className="text-xs md:text-sm text-muted-foreground">Active Schedules</p>
                                <p className="font-bold text-lg md:text-xl">3</p>
                              </div>
                              <div>
                                <p className="text-xs md:text-sm text-muted-foreground">Weekly Water</p>
                                <p className="font-bold text-lg md:text-xl text-blue-500">1950ml</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}

                  {activeTab === "analytics" && (
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl md:text-2xl font-bold">Analytics</h2>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Week
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400"
                          >
                            Month
                          </Button>
                          <Button variant="outline" size="sm">
                            Year
                          </Button>
                        </div>
                      </div>

                      {/* Environmental Data */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">Weather Forecast</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Today</span>
                                <div className="flex items-center">
                                  <span className="text-lg font-bold">75°F</span>
                                  <span className="ml-2 text-sm text-blue-500">☀️</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Tomorrow</span>
                                <div className="flex items-center">
                                  <span className="text-lg font-bold">72°F</span>
                                  <span className="ml-2 text-sm text-blue-500">🌧️</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Day 3</span>
                                <div className="flex items-center">
                                  <span className="text-lg font-bold">78°F</span>
                                  <span className="ml-2 text-sm text-blue-500">⛅</span>
                                </div>
                              </div>
                              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                <p className="text-xs text-blue-600 dark:text-blue-400">
                                  Rain expected tomorrow. Watering schedule adjusted automatically.
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <Card className="border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">Soil Analysis</h3>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">pH Level</span>
                                  <span className="text-sm font-medium text-green-600 dark:text-green-400">6.8</span>
                                </div>
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 dark:bg-green-600 w-[68%]"></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Nitrogen</span>
                                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">85%</span>
                                </div>
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500 dark:bg-blue-600 w-[85%]"></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Phosphorus</span>
                                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">72%</span>
                                </div>
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-orange-500 dark:bg-orange-600 w-[72%]"></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Potassium</span>
                                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">91%</span>
                                </div>
                                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-purple-500 dark:bg-purple-600 w-[91%]"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <Card className="border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">Moisture Data</h3>
                            <div className="space-y-3">
                              <div className="text-center">
                                <div className="relative w-20 h-20 mx-auto mb-2">
                                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="40"
                                      fill="none"
                                      stroke="#e2e8f0"
                                      strokeWidth="8"
                                      className="dark:stroke-zinc-800"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="40"
                                      fill="none"
                                      stroke="#3b82f6"
                                      strokeWidth="8"
                                      strokeDasharray="251.2"
                                      strokeDashoffset="75.36"
                                      className="dark:stroke-blue-600"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-blue-500">70%</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">Soil Moisture</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Humidity</span>
                                  <span className="text-sm font-medium">65%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Air Quality</span>
                                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Good</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Light Level</span>
                                  <span className="text-sm font-medium">8500 lux</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                        <Card className="col-span-1 lg:col-span-2 border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">Water Consumption</h3>
                            <div className="aspect-[2/1] bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 relative">
                              {/* Chart Background Grid */}
                              <div className="absolute inset-x-4 bottom-4 top-8 grid grid-rows-4 gap-0">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="border-t border-zinc-200 dark:border-zinc-800 flex items-center"
                                  >
                                    <span className="text-xs text-muted-foreground -mt-2 w-8">{(4 - i) * 250}ml</span>
                                  </div>
                                ))}
                              </div>

                              {/* X-Axis Labels */}
                              <div className="absolute left-12 right-4 bottom-0 flex justify-between">
                                {["Week 1", "Week 2", "Week 3", "Week 4"].map((label, i) => (
                                  <span key={i} className="text-xs text-muted-foreground">
                                    {label}
                                  </span>
                                ))}
                              </div>

                              {/* Chart */}
                              <div className="absolute inset-x-12 bottom-4 top-8 flex items-end justify-between">
                                {[650, 850, 750, 950].map((value, i) => (
                                  <div key={i} className="w-8 md:w-12 flex flex-col items-center">
                                    <div
                                      className="w-6 md:w-8 bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-t-sm"
                                      style={{ height: `${(value / 1000) * 100}%` }}
                                    ></div>
                                    <span className="text-xs font-medium mt-1">{value}ml</span>
                                  </div>
                                ))}
                              </div>

                              {/* Trend Line */}
                              <svg
                                className="absolute inset-x-12 bottom-4 top-8 w-[calc(100%-3rem)]"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                              >
                                <path
                                  d="M0,35 L33.33,15 L66.66,25 L100,5"
                                  fill="none"
                                  stroke="rgb(249, 115, 22)"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeDasharray="1 3"
                                />
                              </svg>
                            </div>
                          </div>
                        </Card>

                        <div className="col-span-1 space-y-4 md:space-y-6">
                          <Card className="border-none shadow-lg">
                            <div className="p-4 md:p-6">
                              <h3 className="font-semibold mb-4 text-sm md:text-base">Plant Health</h3>
                              <div className="space-y-3 md:space-y-4">
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Tomato Plant</span>
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">92%</span>
                                  </div>
                                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 dark:bg-green-600 w-[92%]"></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Basil Herb</span>
                                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                      68%
                                    </span>
                                  </div>
                                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 dark:bg-orange-600 w-[68%]"></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">Rose Bush</span>
                                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                      74%
                                    </span>
                                  </div>
                                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 dark:bg-orange-600 w-[74%]"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>

                          <Card className="border-none shadow-lg">
                            <div className="p-4 md:p-6">
                              <h3 className="font-semibold mb-4 text-sm md:text-base">Water Distribution</h3>
                              <div className="aspect-square relative">
                                {/* Pie Chart */}
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#e2e8f0"
                                    strokeWidth="20"
                                    className="dark:stroke-zinc-800"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="20"
                                    strokeDasharray="75.4 125.6"
                                    strokeDashoffset="125.6"
                                    className="dark:stroke-blue-600"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="20"
                                    strokeDasharray="37.7 163.3"
                                    strokeDashoffset="50.2"
                                    className="dark:stroke-green-600"
                                  />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#f97316"
                                    strokeWidth="20"
                                    strokeDasharray="37.7 163.3"
                                    strokeDashoffset="12.5"
                                    className="dark:stroke-orange-600"
                                  />
                                </svg>

                                {/* Center Text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <p className="text-lg md:text-2xl font-bold">1950ml</p>
                                    <p className="text-xs text-muted-foreground">Weekly Total</p>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-600 mr-2"></div>
                                    <span className="text-sm">Rose Bush</span>
                                  </div>
                                  <span className="text-sm font-medium">900ml (46%)</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-600 mr-2"></div>
                                    <span className="text-sm">Tomato Plant</span>
                                  </div>
                                  <span className="text-sm font-medium">600ml (31%)</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-orange-500 dark:bg-orange-600 mr-2"></div>
                                    <span className="text-sm">Basil Herb</span>
                                  </div>
                                  <span className="text-sm font-medium">450ml (23%)</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>

                      <Card className="border-none shadow-lg">
                        <div className="p-4 md:p-6">
                          <h3 className="font-semibold mb-4 text-sm md:text-base">Water Savings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-1">This Month</p>
                              <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">32%</p>
                              <p className="text-xs text-muted-foreground">vs. Traditional Irrigation</p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-1">Water Saved</p>
                              <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">4.2L</p>
                              <p className="text-xs text-muted-foreground">This Month</p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                              <p className="text-sm text-muted-foreground mb-1">Efficiency</p>
                              <p className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">89%</p>
                              <p className="text-xs text-muted-foreground">Water Utilization</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <div className="space-y-4 md:space-y-6">
                      <h2 className="text-xl md:text-2xl font-bold">Settings</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Card className="border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">System Settings</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">System Name</label>
                                <input
                                  type="text"
                                  defaultValue="ByteX-HydroHero"
                                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-950 text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Temperature Unit</label>
                                <div className="flex">
                                  <button className="px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-l-md bg-orange-50 text-orange-600 dark:bg-zinc-800 dark:text-orange-400 font-medium text-sm">
                                    Fahrenheit (°F)
                                  </button>
                                  <button className="px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-r-md border-l-0 text-sm">
                                    Celsius (°C)
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Notification Preferences</label>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Low Water Level Alerts</span>
                                    <div className="relative inline-flex h-5 w-9 md:h-6 md:w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 dark:bg-zinc-700 transition-colors duration-200 ease-in-out focus:outline-none">
                                      <span className="translate-x-4 md:translate-x-5 pointer-events-none relative inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                                        <span className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-100 duration-200 ease-in">
                                          <svg
                                            className="h-2 w-2 md:h-3 md:w-3 text-orange-600"
                                            fill="currentColor"
                                            viewBox="0 0 12 12"
                                          >
                                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Watering Completion</span>
                                    <div className="relative inline-flex h-5 w-9 md:h-6 md:w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 dark:bg-zinc-700 transition-colors duration-200 ease-in-out focus:outline-none">
                                      <span className="translate-x-4 md:translate-x-5 pointer-events-none relative inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                                        <span className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-100 duration-200 ease-in">
                                          <svg
                                            className="h-2 w-2 md:h-3 md:w-3 text-orange-600"
                                            fill="currentColor"
                                            viewBox="0 0 12 12"
                                          >
                                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                          </svg>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">System Updates</span>
                                    <div className="relative inline-flex h-5 w-9 md:h-6 md:w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 dark:bg-zinc-700 transition-colors duration-200 ease-in-out focus:outline-none">
                                      <span className="translate-x-0 pointer-events-none relative inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                                        <span className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-100 duration-200 ease-in">
                                          <svg
                                            className="h-2 w-2 md:h-3 md:w-3 text-zinc-400"
                                            fill="none"
                                            viewBox="0 0 12 12"
                                          >
                                            <path
                                              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <Card className="border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">Device Settings</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Device ID</label>
                                <div className="flex">
                                  <input
                                    type="text"
                                    defaultValue="BX-HH-2025-0521"
                                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-l-md bg-white dark:bg-zinc-950 text-sm"
                                    disabled
                                  />
                                  <button className="px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-r-md border-l-0 bg-zinc-100 dark:bg-zinc-800 text-sm">
                                    Copy
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Firmware Version</label>
                                <div className="flex items-center">
                                  <span className="px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-950 w-full text-sm">
                                    v2.3.5
                                  </span>
                                  <Button variant="ghost" size="sm" className="ml-2 text-xs">
                                    Check for Updates
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Connection Status</label>
                                <div className="flex items-center px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-950">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                  <span className="text-sm">Connected</span>
                                  <span className="text-xs text-muted-foreground ml-2">Last sync: 2 minutes ago</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Water Pump Calibration</label>
                                <div className="flex items-center">
                                  <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Low Flow</span>
                                  <span>Medium</span>
                                  <span>High Flow</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <Card className="border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">AI Settings</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">ML Model</label>
                                <select className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-950 text-sm">
                                  <option>MobileNet V3 (Recommended)</option>
                                  <option>BiLSTM</option>
                                  <option>YOLO v5</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Detection Sensitivity</label>
                                <div className="flex items-center">
                                  <input type="range" min="1" max="10" defaultValue="7" className="w-full" />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Low</span>
                                  <span>Medium</span>
                                  <span>High</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Auto-Learning</span>
                                <div className="relative inline-flex h-5 w-9 md:h-6 md:w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 dark:bg-zinc-700 transition-colors duration-200 ease-in-out focus:outline-none">
                                  <span className="translate-x-4 md:translate-x-5 pointer-events-none relative inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                                    <span className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-100 duration-200 ease-in">
                                      <svg
                                        className="h-2 w-2 md:h-3 md:w-3 text-orange-600"
                                        fill="currentColor"
                                        viewBox="0 0 12 12"
                                      >
                                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <Card className="border-none shadow-lg">
                          <div className="p-4 md:p-6">
                            <h3 className="font-semibold mb-4 text-sm md:text-base">Account Settings</h3>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                  type="email"
                                  defaultValue="user@example.com"
                                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-950 text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Password</label>
                                <input
                                  type="password"
                                  defaultValue="••••••••"
                                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-950 text-sm"
                                />
                              </div>
                              <div className="pt-2">
                                <Button className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white text-sm">
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}

                  {activeTab === "team" && (
                    <div className="space-y-4 md:space-y-6">
                      <h2 className="text-xl md:text-2xl font-bold">Team Info</h2>

                      <Card className="border-none shadow-lg">
                        <div className="p-4 md:p-6">
                          <div className="text-center mb-6">
                            <h3 className="text-lg md:text-xl font-bold mb-2">Byte X</h3>
                            <p className="text-muted-foreground">HydroHero Smart Irrigation System</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Sai Siddharth */}
                            <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                              <div className="text-center mb-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white font-bold text-lg md:text-xl">SS</span>
                                </div>
                                <h4 className="font-bold text-lg">Sai Siddharth</h4>
                              </div>

                              <div className="space-y-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none hover:from-pink-600 hover:to-purple-700"
                                  asChild
                                >
                                  <a
                                    href="https://www.instagram.com/sai_siddharth1/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    📷 Instagram
                                  </a>
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-blue-600 text-white border-none hover:bg-blue-700"
                                  asChild
                                >
                                  <a
                                    href="https://in.linkedin.com/in/m-v-sai-siddharth-2a3a23208"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    💼 LinkedIn
                                  </a>
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-green-600 text-white border-none hover:bg-green-700"
                                  asChild
                                >
                                  <a href="https://wa.me/919550853472" target="_blank" rel="noopener noreferrer">
                                    💬 WhatsApp
                                  </a>
                                </Button>
                              </div>
                            </Card>

                            {/* Chirag Nahar */}
                            <Card className="p-4 md:p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200 dark:border-orange-800">
                              <div className="text-center mb-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500 dark:bg-orange-600 flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white font-bold text-lg md:text-xl">CN</span>
                                </div>
                                <h4 className="font-bold text-lg">Chirag Nahar</h4>
                              </div>

                              <div className="space-y-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-blue-600 text-white border-none hover:bg-blue-700"
                                  asChild
                                >
                                  <a href="tel:+918306380139">📞 Call: +91 83063 80139</a>
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-green-600 text-white border-none hover:bg-green-700"
                                  asChild
                                >
                                  <a href="https://wa.me/918306380139" target="_blank" rel="noopener noreferrer">
                                    💬 WhatsApp
                                  </a>
                                </Button>
                              </div>
                            </Card>
                          </div>

                          <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                            <h4 className="font-semibold mb-2">About the Team</h4>
                            <p className="text-sm text-muted-foreground">
                              Byte X is a dynamic duo passionate about sustainable technology and smart agriculture.
                              Together, we're revolutionizing irrigation systems with AI-powered precision watering that
                              conserves water while maximizing plant health.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}

                  {activeTab === "about" && (
                    <div className="space-y-4 md:space-y-6">
                      <h2 className="text-xl md:text-2xl font-bold">About ByteX-HydroHero</h2>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4 md:space-y-6">
                          <Card className="border-none shadow-lg">
                            <div className="p-4 md:p-6">
                              <h3 className="font-semibold mb-4 text-sm md:text-base">Our Mission</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                At ByteX-HydroHero, we're revolutionizing agriculture through intelligent irrigation.
                                Our AI-powered system combines computer vision, machine learning, and IoT technology to
                                create the most efficient watering solution for modern gardening.
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                  <span className="text-sm">Water Conservation</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                  <span className="text-sm">Smart Automation</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                                  <span className="text-sm">Sustainable Farming</span>
                                </div>
                              </div>
                            </div>
                          </Card>

                          <Card className="border-none shadow-lg">
                            <div className="p-4 md:p-6">
                              <h3 className="font-semibold mb-4 text-sm md:text-base">Technology Stack</h3>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">AI Models</span>
                                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    MobileNet V3, BiLSTM{"{with 2 Branches}"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Hardware</span>
                                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                    Arduino and Camera
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Frontend</span>
                                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                    React, Next.js
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Computer Vision</span>
                                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                    OpenCV, TensorFlow
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>

                          <Card className="border-none shadow-lg">
                            <div className="p-4 md:p-6">
                              <h3 className="font-semibold mb-4 text-sm md:text-base">Key Features</h3>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-blue-600 dark:text-blue-400 text-xs">🤖</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">AI Plant Recognition</h4>
                                    <p className="text-xs text-muted-foreground">
                                      Advanced computer vision identifies plant types and health status
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-green-600 dark:text-green-400 text-xs">💧</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">Precision Watering</h4>
                                    <p className="text-xs text-muted-foreground">
                                      Targeted irrigation based on individual plant needs
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-orange-600 dark:text-orange-400 text-xs">📱</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">Mobile Control</h4>
                                    <p className="text-xs text-muted-foreground">
                                      Remote monitoring and control from anywhere
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>

                          <Card className="border-none shadow-lg" id="contact">
                            <div className="p-4 md:p-6">
                              <h3 className="font-semibold mb-4 text-sm md:text-base">Contact Us</h3>
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Get in Touch</h4>
                                  <p className="text-xs text-muted-foreground mb-3">
                                    Have questions about HydroHero? We'd love to hear from you!
                                  </p>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                  <Button variant="outline" size="sm" className="justify-start" asChild>
                                    <a href="mailto:bytex.hydrohero@gmail.com">📧 bytex.hydrohero@gmail.com</a>
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start" asChild>
                                    <a href="tel:+919550853472">📞 +91 95508 53472</a>
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start" asChild>
                                    <a href="https://wa.me/919550853472" target="_blank" rel="noopener noreferrer">
                                      💬 WhatsApp Support
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>

                        {/* How it Works Section */}
                        <div className="space-y-4 md:space-y-6">
                          <Card className="border-none shadow-lg">
                            <div className="p-4 md:p-6">
                              <h3 className="font-semibold mb-4 text-sm md:text-base">How it Works</h3>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-sm mb-2 text-blue-600 dark:text-blue-400">
                                    Pipeline for ML Processing
                                  </h4>
                                  <div className="space-y-3 text-xs text-muted-foreground">
                                    <div className="flex items-start">
                                      <span className="font-medium text-orange-500 mr-2">Step 1:</span>
                                      <span>Take a new image of the plant (using RGB camera).</span>
                                    </div>
                                    <div className="flex items-start">
                                      <span className="font-medium text-orange-500 mr-2">Step 2:</span>
                                      <span>
                                        MobileNet V3 (CNN): Instantly classifies the image for current plant
                                        stress/watering need (reactive decision).
                                      </span>
                                    </div>
                                    <div className="flex items-start">
                                      <span className="font-medium text-orange-500 mr-2">Step 3:</span>
                                      <span>
                                        Feature Extraction: Save the CNN's feature vector (not just the prediction) for
                                        each image in a time-ordered database.
                                      </span>
                                    </div>
                                    <div className="flex items-start">
                                      <span className="font-medium text-orange-500 mr-2">Step 4:</span>
                                      <span>
                                        BiLSTM: Periodically (in 2 branches ..hourly input and daily input), feed the
                                        sequence of recent feature vectors as in Historical Database{" "}
                                        {"{So called Multi Temporal Imagery}"} into the BiLSTM. The BiLSTM analyzes the
                                        trend—detecting subtle, persistent, or emerging stress that a single image might
                                        miss.
                                      </span>
                                    </div>
                                    <div className="flex items-start">
                                      <span className="font-medium text-orange-500 mr-2">Step 5:</span>
                                      <span>
                                        Decision Fusion: If either the CNN or BiLSTM detects stress, trigger watering or
                                        alert. Optionally, use BiLSTM output to adjust thresholds or anticipate future
                                        stress.
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                                  <h4 className="font-medium text-sm mb-2 text-green-600 dark:text-green-400">
                                    Machine Learning Components
                                  </h4>
                                  <div className="space-y-3 text-xs text-muted-foreground">
                                    <div>
                                      <span className="font-medium text-blue-600 dark:text-blue-400">
                                        Core CNN (MobileNet V3):
                                      </span>
                                      <br />
                                      Fast, lightweight image classifier for real-time plant health/stress detection.
                                      Processes each RGB image for immediate watering decisions.
                                    </div>
                                    <div>
                                      <span className="font-medium text-purple-600 dark:text-purple-400">
                                        BiLSTM Modules:
                                      </span>
                                      <br />
                                      Analyze sequences of CNN feature vectors over time.
                                      <br />
                                      Two branches:
                                      <br />• Short-term (5-hour window): Captures rapid stress changes.
                                      <br />• Long-term (6-day window): Detects chronic or cumulative stress.
                                      <br />
                                      Outputs fused for robust, multi-scale decision making.
                                    </div>
                                    <div>
                                      <span className="font-medium text-orange-600 dark:text-orange-400">
                                        Why Multi-Branch?
                                      </span>
                                      <br />
                                      Prevents confusion from mixed time windows. Each branch specializes in its own
                                      temporal dynamics.
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                      After this ML pipeline and outcome being triggered will be sent to Arduino which
                                      will have Water Projection from sprinklers algorithms optimized for this task.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-4 md:py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ByteX-HydroHero. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("about")}>
              About
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("about")}>
              Contact
            </Button>
            <Button variant="ghost" size="sm">
              Privacy
            </Button>
          </div>
        </div>
      </footer>
      {showInitialPopup && (
        <InitialAuthPopup onAuthChoice={handleInitialAuthChoice} />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  )
}
