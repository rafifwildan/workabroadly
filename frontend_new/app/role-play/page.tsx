"use client"

import { useState, useEffect } from "react"
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
import { ScenariosAPI, RoleplayAPI, type Scenario } from "@/lib/api"
import { getUserId } from "@/lib/user"
import Footer from "@/components/Footer"

export default function RolePlayPage() {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  const [filterCompletion, setFilterCompletion] = useState<"all" | "completed" | "notCompleted">("all")
  const [filterDifficulty, setFilterDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")
  const [selectedCountry, setSelectedCountry] = useState<"both" | "japanese" | "korean">("both")

  useEffect(() => {
    async function loadData() {
      try {
        const userId = getUserId()
        const [sc, prog] = await Promise.all([
          ScenariosAPI.list(),
          RoleplayAPI.progress(userId).catch(() => ({ completedScenarioIds: [] })),
        ])
        setScenarios(sc)
        setCompletedIds(new Set(prog?.completedScenarioIds ?? []))
      } catch (e) {
        console.error("Error loading data:", e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // ===============================
  // 🔧 FILTER LOGIC (updated)
  // ===============================
  const allFiltered = scenarios.filter((s) => {
    let ok = true
    // filter by culture (was: language)
    if (selectedCountry !== "both" && s.culture !== selectedCountry) ok = false

    // difficulty optional fallback
    if (filterDifficulty !== "all" && s.difficulty !== filterDifficulty) ok = false

    // filter by completion status
    if (filterCompletion === "completed" && !completedIds.has(s._id)) ok = false
    if (filterCompletion === "notCompleted" && completedIds.has(s._id)) ok = false

    return ok
  })

  const completedCount = [...completedIds].length
  const totalAvailable = scenarios.length
  const notYetCount = totalAvailable - completedCount

  // no more categories in schema — show as one group
  const groupedByCategory = {
    general: allFiltered,
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 ml-64 flex items-center justify-center text-gray-500 text-sm">
          Loading scenarios…
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      <AppSidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <PageHeader
          title="Cultural Role-Play Scenarios"
          subtitle="Practice real-world situations and build confidence"
          breadcrumb="Dashboard > Cultural Role-Play"
          sidebarOpen={false}                // default closed
          onMenuClick={() => {}}     
        />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* ===== Stats cards ===== */}
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

          {/* ===== Filter Bar ===== */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              {[
                { label: "All Scenarios", value: "all" },
                { label: "Completed", value: "completed" },
                { label: "Not Completed", value: "notCompleted" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilterCompletion(btn.value as any)}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    filterCompletion === btn.value
                      ? "bg-black text-white shadow-md"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-900"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as any)}
                className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 text-sm text-gray-700 focus:border-gray-900 focus:outline-none shadow-sm hover:shadow-md transition-all"
              >
                <option value="both">Both Countries</option>
                <option value="japanese">Japan</option>
                <option value="korean">Korea</option>
              </select>
              {/* <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as any)}
                className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 text-sm text-gray-700 focus:border-gray-900 focus:outline-none shadow-sm hover:shadow-md transition-all"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select> */}
            </div>
          </div>

          {/* ====== Scenario List ====== */}
          {Object.entries({
            general: "All Cultural Scenarios",
          }).map(([key, title]) => {
            const section = groupedByCategory[key as keyof typeof groupedByCategory]
            if (!section.length) return null

            return (
              <section key={key} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.map((s) => {
                    const isCompleted = completedIds.has(s._id)
                    const iconMap: Record<string, any> = {
                      Briefcase,
                      FileText,
                      Shirt,
                      Coffee,
                      UtensilsCrossed,
                      Building2,
                      ShoppingBag,
                      AlertTriangle,
                      Ambulance,
                    }
                    const Icon = iconMap[s.icon ?? "FileText"] ?? FileText

                    return (
                      <Link
                        key={s._id}
                        href={`/scenario/${s._id}`}
                        className="block bg-white rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-200 relative min-h-[200px]"
                      >
                        {isCompleted && (
                          <div className="absolute top-4 right-4 bg-green-100 text-green-700 rounded-full p-2">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                            <Icon className="w-8 h-8 text-gray-700" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{s.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-4 text-xs">
                          <span className="text-gray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {s.duration ?? "10-15 min"}
                          </span>
                          <span className="rounded-full px-3 py-1 bg-gray-200 text-gray-700 font-medium">
                            {s.difficulty ?? "General"}
                          </span>
                        </div>
                        <div className="rounded-full bg-black text-white w-full py-2 text-center font-medium">
                          {isCompleted ? "View & Practice Again" : "View & Start"}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </main>

        <Footer />
      </div>
    </div>
  )
}
