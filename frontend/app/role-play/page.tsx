"use client"

import { useState } from "react"
import Link from "next/link"

type Country = "japan" | "korea"

const scenarios = {
  japan: {
    preDeparture: [
      {
        id: "job-interview",
        icon: "💼",
        title: "Job Interview Practice",
        description: "Practice common interview questions and learn proper business etiquette",
        duration: "15-20 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 10,
        bgColor: "bg-primary/10",
      },
      {
        id: "visa-interview",
        icon: "🛂",
        title: "Visa Interview",
        description: "Prepare for visa application interview and document verification",
        duration: "12-15 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 8,
        bgColor: "bg-primary/10",
      },
    ],
    workplace: [
      {
        id: "first-day",
        icon: "👔",
        title: "First Day at Work",
        description: "Navigate your first day, introductions, and workplace customs",
        duration: "10-15 min",
        difficulty: "Easy",
        difficultyColor: "bg-success/10 text-success",
        tokens: 5,
        bgColor: "bg-secondary/10",
      },
      {
        id: "morning-meeting",
        icon: "☕",
        title: "Morning Meeting",
        description: "Participate in daily stand-up meetings and team discussions",
        duration: "10 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 8,
        bgColor: "bg-secondary/10",
      },
      {
        id: "team-lunch",
        icon: "🍱",
        title: "Team Lunch",
        description: "Learn dining etiquette and casual conversation topics",
        duration: "12 min",
        difficulty: "Easy",
        difficultyColor: "bg-success/10 text-success",
        tokens: 5,
        bgColor: "bg-secondary/10",
      },
    ],
    dailyLife: [
      {
        id: "bank-account",
        icon: "🏦",
        title: "Opening Bank Account",
        description: "Navigate the process of opening a Japanese bank account",
        duration: "15 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 7,
        bgColor: "bg-info/10",
      },
      {
        id: "shopping",
        icon: "🛍️",
        title: "Shopping",
        description: "Practice shopping conversations and payment methods",
        duration: "10 min",
        difficulty: "Easy",
        difficultyColor: "bg-success/10 text-success",
        tokens: 5,
        bgColor: "bg-accent/10",
      },
    ],
    emergency: [
      {
        id: "lost-documents",
        icon: "📄",
        title: "Lost Documents",
        description: "Report lost passport or important documents to authorities",
        duration: "12 min",
        difficulty: "Hard",
        difficultyColor: "bg-destructive/10 text-destructive",
        tokens: 10,
        bgColor: "bg-destructive/5",
        badge: "Important",
      },
      {
        id: "accident",
        icon: "🚨",
        title: "Medical Emergency",
        description: "Handle medical emergencies and communicate with healthcare",
        duration: "15 min",
        difficulty: "Hard",
        difficultyColor: "bg-destructive/10 text-destructive",
        tokens: 12,
        bgColor: "bg-destructive/5",
        badge: "Important",
      },
    ],
  },
  korea: {
    preDeparture: [
      {
        id: "job-interview-kr",
        icon: "💼",
        title: "Job Interview Practice",
        description: "Practice Korean interview etiquette and common questions",
        duration: "15-20 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 10,
        bgColor: "bg-primary/10",
      },
      {
        id: "visa-interview-kr",
        icon: "🛂",
        title: "Visa Interview",
        description: "Prepare for Korean visa application process",
        duration: "12-15 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 8,
        bgColor: "bg-primary/10",
      },
    ],
    workplace: [
      {
        id: "first-day-kr",
        icon: "👔",
        title: "First Day at Work",
        description: "Learn Korean workplace hierarchy and introduction customs",
        duration: "10-15 min",
        difficulty: "Easy",
        difficultyColor: "bg-success/10 text-success",
        tokens: 5,
        bgColor: "bg-secondary/10",
      },
      {
        id: "morning-meeting-kr",
        icon: "☕",
        title: "Morning Meeting",
        description: "Participate in Korean team meetings and discussions",
        duration: "10 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 8,
        bgColor: "bg-secondary/10",
      },
      {
        id: "team-dinner-kr",
        icon: "🍖",
        title: "Team Dinner",
        description: "Navigate Korean dining culture and after-work socializing",
        duration: "12 min",
        difficulty: "Easy",
        difficultyColor: "bg-success/10 text-success",
        tokens: 5,
        bgColor: "bg-secondary/10",
      },
    ],
    dailyLife: [
      {
        id: "bank-account-kr",
        icon: "🏦",
        title: "Opening Bank Account",
        description: "Open a Korean bank account and understand banking system",
        duration: "15 min",
        difficulty: "Medium",
        difficultyColor: "bg-warning/10 text-warning",
        tokens: 7,
        bgColor: "bg-info/10",
      },
      {
        id: "shopping-kr",
        icon: "🛍️",
        title: "Shopping",
        description: "Practice shopping at Korean markets and stores",
        duration: "10 min",
        difficulty: "Easy",
        difficultyColor: "bg-success/10 text-success",
        tokens: 5,
        bgColor: "bg-accent/10",
      },
    ],
    emergency: [
      {
        id: "lost-documents-kr",
        icon: "📄",
        title: "Lost Documents",
        description: "Report lost documents to Korean authorities",
        duration: "12 min",
        difficulty: "Hard",
        difficultyColor: "bg-destructive/10 text-destructive",
        tokens: 10,
        bgColor: "bg-destructive/5",
        badge: "Important",
      },
      {
        id: "accident-kr",
        icon: "🚨",
        title: "Medical Emergency",
        description: "Handle emergencies in Korean healthcare system",
        duration: "15 min",
        difficulty: "Hard",
        difficultyColor: "bg-destructive/10 text-destructive",
        tokens: 12,
        bgColor: "bg-destructive/5",
        badge: "Important",
      },
    ],
  },
}

export default function RolePlayPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>("japan")
  const currentScenarios = scenarios[selectedCountry]

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-primary mb-2">Dashboard &gt; Cultural Role-Play</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Cultural Role-Play Scenarios</h1>
          <p className="text-base text-muted-foreground">Practice real-world situations and build confidence</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country Selector */}
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

        {/* Filter/Sort Options */}
        <div className="flex justify-end gap-4 mb-8">
          <select className="rounded-lg border-2 border-input bg-card px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select className="rounded-lg border-2 border-input bg-card px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            <option>Sort by: Popular</option>
            <option>Sort by: Duration</option>
            <option>Sort by: Difficulty</option>
          </select>
        </div>

        {/* Pre-Departure Scenarios */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Pre-Departure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentScenarios.preDeparture.map((scenario) => (
              <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
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
                    <span className="text-muted-foreground">⏱️ {scenario.duration}</span>
                    <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor}`}>{scenario.difficulty}</span>
                    <span className="text-foreground">💎 {scenario.tokens} tokens</span>
                  </div>
                  <button className="soft-button rounded-xl bg-primary text-primary-foreground w-full py-2 hover:bg-primary/90 transition-colors">
                    Start Scenario
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Workplace Scenarios */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Workplace</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentScenarios.workplace.map((scenario) => (
              <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
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
                    <span className="text-muted-foreground">⏱️ {scenario.duration}</span>
                    <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor}`}>{scenario.difficulty}</span>
                    <span className="text-foreground">💎 {scenario.tokens} tokens</span>
                  </div>
                  <button className="soft-button rounded-xl bg-primary text-primary-foreground w-full py-2 hover:bg-primary/90 transition-colors">
                    Start Scenario
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Daily Life Scenarios */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Daily Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentScenarios.dailyLife.map((scenario) => (
              <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
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
                    <span className="text-muted-foreground">⏱️ {scenario.duration}</span>
                    <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor}`}>{scenario.difficulty}</span>
                    <span className="text-foreground">💎 {scenario.tokens} tokens</span>
                  </div>
                  <button className="soft-button rounded-xl bg-primary text-primary-foreground w-full py-2 hover:bg-primary/90 transition-colors">
                    Start Scenario
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Emergency Scenarios */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Emergency Situations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentScenarios.emergency.map((scenario) => (
              <Link key={scenario.id} href={`/scenario/${scenario.id}`}>
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
                    <span className="text-muted-foreground">⏱️ {scenario.duration}</span>
                    <span className={`rounded-full px-3 py-1 ${scenario.difficultyColor}`}>{scenario.difficulty}</span>
                    {scenario.badge && (
                      <span className="rounded-full px-3 py-1 bg-destructive/10 text-destructive">
                        {scenario.badge}
                      </span>
                    )}
                    <span className="text-foreground">💎 {scenario.tokens} tokens</span>
                  </div>
                  <button className="soft-button rounded-xl bg-primary text-primary-foreground w-full py-2 hover:bg-primary/90 transition-colors">
                    Start Scenario
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
