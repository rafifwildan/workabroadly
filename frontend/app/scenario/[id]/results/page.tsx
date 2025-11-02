"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { BADGES } from "@/lib/badges"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [newBadges, setNewBadges] = useState<string[]>([])

  useEffect(() => {
    // Mock logic - in production, this would check actual user progress
    const earnedBadgeIds = ["first-steps"] // Example: user just earned their first badge
    setNewBadges(earnedBadgeIds)
  }, [])

  const earnedBadges = BADGES.filter((badge) => newBadges.includes(badge.id))

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="soft-card rounded-3xl bg-gradient-to-br from-success/10 to-primary/10 p-10 text-center shadow-2xl">
          <div className="text-7xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Scenario Complete!</h1>
          <p className="text-lg text-muted-foreground mb-2">Job Interview Practice - Japan</p>
          <p className="text-sm text-muted-foreground">Completed in 18 minutes</p>
        </div>

        {earnedBadges.length > 0 && (
          <div className="soft-card rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">🏆 New Badges Earned!</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="soft-card rounded-xl bg-white p-4 text-center animate-bounce">
                  <div className="text-5xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-bold text-foreground">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="soft-card rounded-2xl bg-card shadow-xl p-8 text-center">
          <div className="text-6xl font-bold text-foreground mb-2">85%</div>
          <p className="text-lg text-muted-foreground mb-3">Overall Performance</p>
          <div className="flex justify-center gap-1 text-2xl">
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span className="opacity-30">⭐</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="soft-card rounded-2xl bg-success/5 border-l-4 border-success p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💪</span>
              <h2 className="text-xl font-bold text-success">Strengths</h2>
            </div>
            <ul className="space-y-2 text-sm text-success/90">
              <li className="flex items-start gap-2">
                <span>✅</span>
                <span>Excellent use of formal language</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✅</span>
                <span>Appropriate body language</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✅</span>
                <span>Good response timing</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✅</span>
                <span>Clear communication</span>
              </li>
            </ul>
          </div>

          <div className="soft-card rounded-2xl bg-warning/5 border-l-4 border-warning p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📈</span>
              <h2 className="text-xl font-bold text-warning">Areas to Practice</h2>
            </div>
            <ul className="space-y-2 text-sm text-warning/90">
              <li className="flex items-start gap-2">
                <span>⚡</span>
                <span>Practice more technical vocabulary</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⚡</span>
                <span>Work on keigo (polite speech)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⚡</span>
                <span>Learn more business etiquette</span>
              </li>
            </ul>
          </div>

          <div className="soft-card rounded-2xl bg-info/5 border-l-4 border-info p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💡</span>
              <h2 className="text-xl font-bold text-info">Recommendations</h2>
            </div>
            <ul className="space-y-2 text-sm text-info/90">
              <li className="flex items-start gap-2">
                <span>🎯</span>
                <span>Try 'Morning Meeting' scenario next</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📚</span>
                <span>Review workplace terms</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🗣️</span>
                <span>Practice polite language more</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="soft-card rounded-xl bg-card shadow-md p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-xs text-muted-foreground">Scenarios</div>
          </div>
          <div className="soft-card rounded-xl bg-card shadow-md p-4 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="text-xs text-muted-foreground">Topics</div>
          </div>
          <div className="soft-card rounded-xl bg-card shadow-md p-4 text-center">
            <div className="text-2xl mb-2">💎</div>
            <div className="text-2xl font-bold text-foreground">10</div>
            <div className="text-xs text-muted-foreground">Tokens</div>
          </div>
          <div className="soft-card rounded-xl bg-card shadow-md p-4 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-xs text-muted-foreground mb-2">Next Milestone</div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">3/5 scenarios</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => router.push("/role-play")}
            className="flex-1 rounded-xl bg-primary text-primary-foreground px-6 py-3 shadow-md hover:bg-primary/90 transition-colors"
          >
            Try Another Scenario
          </button>
          <button
            onClick={() => router.push("/progress")}
            className="flex-1 rounded-xl bg-card border-2 border-primary/30 text-primary px-6 py-3 hover:bg-primary/5 transition-colors"
          >
            View Progress
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 rounded-xl bg-muted text-foreground px-6 py-3 hover:bg-muted/80 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground mb-3">Share your achievement</p>
          <div className="flex justify-center gap-3">
            <button className="w-10 h-10 rounded-full bg-info text-primary-foreground flex items-center justify-center hover:bg-info/90 transition-colors">
              𝕏
            </button>
            <button className="w-10 h-10 rounded-full bg-info text-primary-foreground flex items-center justify-center hover:bg-info/90 transition-colors">
              in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
