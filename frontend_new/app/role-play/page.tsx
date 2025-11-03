"use client"

import { useState } from "react"
import Link from "next/link"
import AppSidebar from "@/components/AppSidebar"
import PageHeader from "@/components/PageHeader"
import {
  Briefcase,
  FileText,
  Shirt,
  Coffee,
  UtensilsCrossed,
  Building2,
  ShoppingBag,
  AlertTriangle,
  Ambulance,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { getMockUserUsage } from "@/lib/usage-calculator"
import Footer from "@/components/Footer"

type Country = "japan" | "korea" | "both"
type PlanType = "free" | "premium"
type Topic = "all" | "preDeparture" | "workplace" | "dailyLife" | "emergency"

const scenarios = {
  japan: {
    preDeparture: [
      {
        id: "job-interview",
        icon: "Briefcase",
        title: "Job Interview Practice",
        description: "Practice common interview questions and learn proper business etiquette",
        duration: "15-20 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: true,
        category: "preDeparture", // Added category property
      },
      {
        id: "visa-interview",
        icon: "FileText",
        title: "Visa Interview",
        description: "Prepare for visa application interview and document verification",
        duration: "12-15 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "preDeparture", // Added category property
      },
    ],
    workplace: [
      {
        id: "first-day",
        icon: "Shirt",
        title: "First Day at Work",
        description: "Navigate your first day, introductions, and workplace customs",
        duration: "10-15 min",
        difficulty: "Easy",
        difficultyColor: "bg-gray-100 text-gray-600",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: true,
        category: "workplace", // Added category property
      },
      {
        id: "morning-meeting",
        icon: "Coffee",
        title: "Morning Meeting",
        description: "Participate in daily stand-up meetings and team discussions",
        duration: "10 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "workplace", // Added category property
      },
      {
        id: "team-lunch",
        icon: "UtensilsCrossed",
        title: "Team Lunch",
        description: "Learn dining etiquette and casual conversation topics",
        duration: "12 min",
        difficulty: "Easy",
        difficultyColor: "bg-gray-100 text-gray-600",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: false,
        category: "workplace", // Added category property
      },
    ],
    dailyLife: [
      {
        id: "bank-account",
        icon: "Building2",
        title: "Opening Bank Account",
        description: "Navigate the process of opening a Japanese bank account",
        duration: "15 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "dailyLife", // Added category property
      },
      {
        id: "shopping",
        icon: "ShoppingBag",
        title: "Shopping",
        description: "Practice shopping conversations and payment methods",
        duration: "10 min",
        difficulty: "Easy",
        difficultyColor: "bg-gray-100 text-gray-600",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: false,
        category: "dailyLife", // Added category property
      },
    ],
    emergency: [
      {
        id: "lost-documents",
        icon: "AlertTriangle",
        title: "Lost Documents",
        description: "Report lost passport or important documents to authorities",
        duration: "12 min",
        difficulty: "Hard",
        difficultyColor: "bg-gray-300 text-gray-800",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "emergency", // Added category property
      },
      {
        id: "accident",
        icon: "Ambulance",
        title: "Medical Emergency",
        description: "Handle medical emergencies and communicate with healthcare",
        duration: "15 min",
        difficulty: "Hard",
        difficultyColor: "bg-gray-300 text-gray-800",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "emergency", // Added category property
      },
    ],
  },
  korea: {
    preDeparture: [
      {
        id: "job-interview-kr",
        icon: "Briefcase",
        title: "Job Interview Practice",
        description: "Practice Korean interview etiquette and common questions",
        duration: "15-20 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: false,
        category: "preDeparture", // Added category property
      },
      {
        id: "visa-interview-kr",
        icon: "FileText",
        title: "Visa Interview",
        description: "Prepare for Korean visa application process",
        duration: "12-15 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "preDeparture", // Added category property
      },
    ],
    workplace: [
      {
        id: "first-day-kr",
        icon: "Shirt",
        title: "First Day at Work",
        description: "Learn Korean workplace hierarchy and introduction customs",
        duration: "10-15 min",
        difficulty: "Easy",
        difficultyColor: "bg-gray-100 text-gray-600",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: false,
        category: "workplace", // Added category property
      },
      {
        id: "morning-meeting-kr",
        icon: "Coffee",
        title: "Morning Meeting",
        description: "Participate in Korean team meetings and discussions",
        duration: "10 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "workplace", // Added category property
      },
      {
        id: "team-dinner-kr",
        icon: "UtensilsCrossed",
        title: "Team Dinner",
        description: "Navigate Korean dining culture and after-work socializing",
        duration: "12 min",
        difficulty: "Easy",
        difficultyColor: "bg-gray-100 text-gray-600",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: false,
        category: "workplace", // Added category property
      },
    ],
    dailyLife: [
      {
        id: "bank-account-kr",
        icon: "Building2",
        title: "Opening Bank Account",
        description: "Open a Korean bank account and understand banking system",
        duration: "15 min",
        difficulty: "Medium",
        difficultyColor: "bg-gray-200 text-gray-700",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "dailyLife", // Added category property
      },
      {
        id: "shopping-kr",
        icon: "ShoppingBag",
        title: "Shopping",
        description: "Practice shopping at Korean markets and stores",
        duration: "10 min",
        difficulty: "Easy",
        difficultyColor: "bg-gray-100 text-gray-600",
        isPremium: false,
        planType: "free" as PlanType,
        isCompleted: false,
        category: "dailyLife", // Added category property
      },
    ],
    emergency: [
      {
        id: "lost-documents-kr",
        icon: "AlertTriangle",
        title: "Lost Documents",
        description: "Report lost documents to Korean authorities",
        duration: "12 min",
        difficulty: "Hard",
        difficultyColor: "bg-gray-300 text-gray-800",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "emergency", // Added category property
      },
      {
        id: "accident-kr",
        icon: "Ambulance",
        title: "Medical Emergency",
        description: "Handle emergencies in Korean healthcare system",
        duration: "15 min",
        difficulty: "Hard",
        difficultyColor: "bg-gray-300 text-gray-800",
        isPremium: true,
        planType: "premium" as PlanType,
        isCompleted: false,
        category: "emergency", // Added category property
      },
    ],
  },
}

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, any> = {
    Briefcase,
    FileText,
    Shirt,
    Coffee,
    UtensilsCrossed,
    Building2,
    ShoppingBag,
    AlertTriangle,
    Ambulance,
    Clock,
  }
  const Icon = icons[name]
  return Icon ? <Icon className={className} /> : null
}

export default function RolePlayPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<Country>("both")
  const [filterPlan, setFilterPlan] = useState<"all" | PlanType>("all")
  const [filterDifficulty, setFilterDifficulty] = useState<"all" | "Easy" | "Medium" | "Hard">("all")
  const [filterCompletion, setFilterCompletion] = useState<"all" | "completed" | "notCompleted">("all")
  const [filterTopic, setFilterTopic] = useState<Topic>("all")

  const userUsage = getMockUserUsage()

  const getFilteredScenarios = () => {
    if (selectedCountry === "both") {
      return [...Object.values(scenarios.japan).flat(), ...Object.values(scenarios.korea).flat()]
    }
    return Object.values(scenarios[selectedCountry]).flat()
  }

  const allScenarios = getFilteredScenarios()
  const completedCount = allScenarios.filter((s) => s.isCompleted).length
  const notYetCount = allScenarios.length - completedCount
  const totalAvailable = allScenarios.length

  const filterScenarios = (scenarioList: any[]) => {
    let filtered = scenarioList

    if (filterPlan !== "all") {
      filtered = filtered.filter((s) => s.planType === filterPlan)
    }

    if (filterDifficulty !== "all") {
      filtered = filtered.filter((s) => s.difficulty === filterDifficulty)
    }

    if (filterCompletion === "completed") {
      filtered = filtered.filter((s) => s.isCompleted)
    } else if (filterCompletion === "notCompleted") {
      filtered = filtered.filter((s) => !s.isCompleted)
    }

    if (filterTopic !== "all") {
      filtered = filtered.filter((s) => s.category === filterTopic)
    }

    return filtered
  }

  return (
    <div className="min-h-screen bg-white flex">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <PageHeader
          title="Cultural Role-Play Scenarios"
          subtitle="Practice real-world situations and build confidence"
          breadcrumb="Dashboard > Cultural Role-Play"
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Completed</div>
              <div className="text-3xl font-bold text-green-600">{completedCount}</div>
              <div className="text-xs text-gray-500 mt-1">scenarios done</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Not Yet Done</div>
              <div className="text-3xl font-bold text-gray-900">{notYetCount}</div>
              <div className="text-xs text-gray-500 mt-1">scenarios remaining</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Total Available</div>
              <div className="text-3xl font-bold text-gray-900">{totalAvailable}</div>
              <div className="text-xs text-gray-500 mt-1">scenarios in library</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Credits Remaining</div>
              <div className="text-3xl font-bold text-blue-600">250</div>
              <div className="text-xs text-gray-500 mt-1">credits available</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterCompletion("all")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  filterCompletion === "all"
                    ? "bg-black text-white shadow-md"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-900"
                }`}
              >
                All Scenarios
              </button>
              <button
                onClick={() => setFilterCompletion("completed")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  filterCompletion === "completed"
                    ? "bg-black text-white shadow-md"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-900"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterCompletion("notCompleted")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  filterCompletion === "notCompleted"
                    ? "bg-black text-white shadow-md"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-900"
                }`}
              >
                Not Completed
              </button>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as Country)}
                className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 text-sm text-gray-700 focus:border-gray-900 focus:outline-none shadow-sm hover:shadow-md transition-all"
              >
                <option value="both">Both Countries</option>
                <option value="japan">Japan</option>
                <option value="korea">Korea</option>
              </select>
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value as Topic)}
                className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 text-sm text-gray-700 focus:border-gray-900 focus:outline-none shadow-sm hover:shadow-md transition-all"
              >
                <option value="all">All Topics</option>
                <option value="preDeparture">Pre-Departure</option>
                <option value="workplace">Workplace</option>
                <option value="dailyLife">Daily Life</option>
                <option value="emergency">Emergency</option>
              </select>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value as "all" | PlanType)}
                className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 text-sm text-gray-700 focus:border-gray-900 focus:outline-none shadow-sm hover:shadow-md transition-all"
              >
                <option value="all">Type of Scenarios: All</option>
                <option value="free">Type of Scenarios: Free</option>
                <option value="premium">Type of Scenarios: Premium</option>
              </select>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as any)}
                className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 text-sm text-gray-700 focus:border-gray-900 focus:outline-none shadow-sm hover:shadow-md transition-all"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pre-Departure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterScenarios(allScenarios.filter((s) => s.category === "preDeparture")).map((scenario) => (
                <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
                  <div className="bg-white rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all border border-gray-200 relative flex flex-col min-h-[200px]">
                    {scenario.isCompleted && (
                      <div className="absolute top-4 right-4 bg-green-100 text-green-700 rounded-full p-2">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <IconComponent name={scenario.icon} className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{scenario.title}</h3>
                          {scenario.isPremium && (
                            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">Premium</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{scenario.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {scenario.duration}
                      </span>
                      <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor} font-medium`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                    <button className="rounded-full bg-black text-white w-full py-2 hover:bg-gray-800 transition-colors font-medium">
                      {scenario.isCompleted ? "Practice Again" : "Start Scenario"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Workplace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterScenarios(allScenarios.filter((s) => s.category === "workplace")).map((scenario) => (
                <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
                  <div className="bg-white rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all border border-gray-200 relative flex flex-col min-h-[200px]">
                    {scenario.isCompleted && (
                      <div className="absolute top-4 right-4 bg-green-100 text-green-700 rounded-full p-2">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <IconComponent name={scenario.icon} className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{scenario.title}</h3>
                          {scenario.isPremium && (
                            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">Premium</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{scenario.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {scenario.duration}
                      </span>
                      <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor} font-medium`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                    <button className="rounded-full bg-black text-white w-full py-2 hover:bg-gray-800 transition-colors font-medium">
                      {scenario.isCompleted ? "Practice Again" : "Start Scenario"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Life</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterScenarios(allScenarios.filter((s) => s.category === "dailyLife")).map((scenario) => (
                <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
                  <div className="bg-white rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all border border-gray-200 relative flex flex-col min-h-[200px]">
                    {scenario.isCompleted && (
                      <div className="absolute top-4 right-4 bg-green-100 text-green-700 rounded-full p-2">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <IconComponent name={scenario.icon} className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{scenario.title}</h3>
                          {scenario.isPremium && (
                            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">Premium</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{scenario.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {scenario.duration}
                      </span>
                      <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor} font-medium`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                    <button className="rounded-full bg-black text-white w-full py-2 hover:bg-gray-800 transition-colors font-medium">
                      {scenario.isCompleted ? "Practice Again" : "Start Scenario"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency Situations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterScenarios(allScenarios.filter((s) => s.category === "emergency")).map((scenario) => (
                <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
                  <div className="bg-white rounded-2xl p-6 hover:shadow-xl cursor-pointer transition-all border border-gray-200 relative flex flex-col min-h-[200px]">
                    {scenario.isCompleted && (
                      <div className="absolute top-4 right-4 bg-green-100 text-green-700 rounded-full p-2">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <IconComponent name={scenario.icon} className="w-8 h-8 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{scenario.title}</h3>
                          {scenario.isPremium && (
                            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">Premium</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{scenario.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {scenario.duration}
                      </span>
                      <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor} font-medium`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                    <button className="rounded-full bg-black text-white w-full py-2 hover:bg-gray-800 transition-colors font-medium">
                      {scenario.isCompleted ? "Practice Again" : "Start Scenario"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
