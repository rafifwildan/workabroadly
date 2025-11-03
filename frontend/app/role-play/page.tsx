"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { fetchScenarios } from "@/lib/scenario"

export default function RolePlayPage() {
  const [selectedCountry, setSelectedCountry] = useState<"japan" | "korea">("japan")
  const [scenarios, setScenarios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadScenarios() {
      try {
        const data = await fetchScenarios()
        const mapped = data.map((s: any) => ({
          _id: s._id,
          title: s.title,
          description: s.description,
          category: s.category,
          language: s.language,
          difficulty:
            s.difficulty === "beginner"
              ? "Easy"
              : s.difficulty === "intermediate"
              ? "Medium"
              : "Hard",
          difficultyColor:
            s.difficulty === "beginner"
              ? "bg-success/10 text-success"
              : s.difficulty === "intermediate"
              ? "bg-warning/10 text-warning"
              : "bg-destructive/10 text-destructive",
          bgColor:
            s.language === "japanese"
              ? "bg-primary/10"
              : "bg-secondary/10",
          tokens: s.steps?.length || 5,
          icon:
            s.category === "interview"
              ? "💼"
              : s.category === "workplace"
              ? "👔"
              : "🏠",
        }))
        setScenarios(mapped)
      } catch (error) {
        console.error("Failed to load scenarios", error)
      } finally {
        setLoading(false)
      }
    }
    loadScenarios()
  }, [])

  if (loading) {
    return <div className="text-center py-20 text-muted-foreground">Loading scenarios...</div>
  }

  const filtered = scenarios.filter(
    s => s.language === (selectedCountry === "japan" ? "japanese" : "korean")
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-primary mb-2">Dashboard &gt; Cultural Role-Play</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Cultural Role-Play Scenarios</h1>
          <p className="text-base text-muted-foreground">
            Practice real-world situations and build confidence
          </p>
        </div>
      </div>

      {/* Country Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedCountry("japan")}
            className={`rounded-xl px-6 py-3 font-medium transition-all ${
              selectedCountry === "japan"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground shadow-md hover:shadow-lg"
            }`}
          >
            Japan 🇯🇵
          </button>
          <button
            onClick={() => setSelectedCountry("korea")}
            className={`rounded-xl px-6 py-3 font-medium transition-all ${
              selectedCountry === "korea"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground shadow-md hover:shadow-lg"
            }`}
          >
            Korea 🇰🇷
          </button>
        </div>

        {/* Render Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((scenario) => (
            <Link key={scenario._id} href={`/scenario/${scenario._id}`}>
              <div className="soft-card rounded-2xl bg-card p-6 hover:shadow-xl cursor-pointer transition-all hover:scale-102">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`${scenario.bgColor} rounded-full w-16 h-16 flex items-center justify-center text-5xl`}
                  >
                    {scenario.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4 text-xs">
                  <span className="text-muted-foreground">🎯 {scenario.category}</span>
                  <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor}`}>
                    {scenario.difficulty}
                  </span>
                  <span className="text-foreground">💎 {scenario.tokens} pts</span>
                </div>
                <button className="soft-button rounded-xl bg-primary text-primary-foreground w-full py-2 hover:bg-primary/90 transition-colors">
                  Start Scenario
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
