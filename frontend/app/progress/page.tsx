"use client"
import Link from "next/link"
import { BADGES, LEARNING_PATHS } from "@/lib/badges"

// Mock user progress data - in production, this would come from a database
const userProgress = {
  level: 5,
  xp: 680,
  xpToNextLevel: 1000,
  completedScenarios: 12,
  totalSessions: 24,
  currentStreak: 7,
  longestStreak: 14,
  earnedBadges: ["first-steps", "conversation-starter", "culture-explorer"],
  skills: [
    { name: "Visa Knowledge", percentage: 80 },
    { name: "Cultural Awareness", percentage: 60 },
    { name: "Interview Skills", percentage: 70 },
    { name: "Language Proficiency", percentage: 40 },
  ],
  completedScenarioIds: ["1", "2", "3", "4"],
}

const recentActivity = [
  { icon: "✅", activity: "Completed 'Job Interview' scenario", time: "3 hours ago" },
  { icon: "📚", activity: "Reviewed visa requirements", time: "Yesterday" },
  { icon: "🎯", activity: "Earned 'Culture Explorer' badge", time: "2 days ago" },
  { icon: "💬", activity: "Started AI Career Coach session", time: "3 days ago" },
]

export default function ProgressTracking() {
  const xpPercentage = (userProgress.xp / userProgress.xpToNextLevel) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
            WorkAbroadly
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/career-coach" className="text-muted-foreground hover:text-primary">
              AI Coach
            </Link>
            <Link href="/role-play" className="text-muted-foreground hover:text-primary">
              Role-Play
            </Link>
            <Link href="/progress" className="text-primary font-medium">
              Progress
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Hero Progress Card */}
        <div className="soft-card rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-10 shadow-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-card text-primary flex items-center justify-center font-bold text-2xl">
              SK
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sarah Kim</h1>
              <p className="text-primary-foreground/80">Keep up the great work!</p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle cx="96" cy="96" r="88" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="white"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88 * (xpPercentage / 100)} ${2 * Math.PI * 88}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold">Level {userProgress.level}</div>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-xl font-medium">
              {userProgress.xp} XP / {userProgress.xpToNextLevel} XP to next level
            </div>
          </div>
          <div className="w-full bg-primary-foreground/20 rounded-full h-3">
            <div
              className="bg-primary-foreground h-3 rounded-full transition-all"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-primary-foreground/80">
            {Math.round(xpPercentage)}% to Level {userProgress.level + 1}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="soft-card rounded-2xl bg-card shadow-xl p-6">
            <div className="text-4xl mb-2">💬</div>
            <div className="text-3xl font-bold text-foreground mb-1">{userProgress.totalSessions}</div>
            <div className="text-sm text-primary">Sessions Completed</div>
            <div className="mt-3 h-16">
              <div className="flex items-end gap-1 h-full">
                {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                  <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${height}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="soft-card rounded-2xl bg-card shadow-xl p-6">
            <div className="text-4xl mb-2">🎭</div>
            <div className="text-3xl font-bold text-foreground mb-1">{userProgress.completedScenarios}</div>
            <div className="text-sm text-primary">Role-Play Scenarios</div>
          </div>

          <div className="soft-card rounded-2xl bg-card shadow-xl p-6">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-3xl font-bold text-foreground mb-1">{userProgress.currentStreak} days</div>
            <div className="text-sm text-primary mb-1">Current Streak</div>
            <div className="text-xs text-muted-foreground">Longest: {userProgress.longestStreak} days</div>
          </div>
        </div>

        <div className="soft-card rounded-2xl bg-card shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Your Achievements</h2>
            <div className="text-sm text-muted-foreground">
              {userProgress.earnedBadges.length} / {BADGES.length} earned
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {BADGES.map((badge) => {
              const isEarned = userProgress.earnedBadges.includes(badge.id)
              const rarityColors = {
                bronze: "from-orange-400 to-orange-600",
                silver: "from-gray-300 to-gray-500",
                gold: "from-yellow-400 to-yellow-600",
                platinum: "from-purple-400 to-purple-600",
              }

              return (
                <div
                  key={badge.id}
                  className={`soft-card rounded-xl p-4 text-center transition-all hover:scale-105 ${
                    isEarned ? `bg-gradient-to-br ${rarityColors[badge.rarity]} shadow-lg` : "bg-muted/50 opacity-60"
                  }`}
                >
                  <div className="text-4xl mb-2">{isEarned ? badge.icon : "🔒"}</div>
                  <div className={`text-sm font-bold mb-1 ${isEarned ? "text-white" : "text-muted-foreground"}`}>
                    {badge.name}
                  </div>
                  <div className={`text-xs mb-2 ${isEarned ? "text-white/90" : "text-muted-foreground"}`}>
                    {badge.description}
                  </div>
                  <div className={`text-xs ${isEarned ? "text-white/80" : "text-muted-foreground"}`}>
                    {badge.requirement}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="soft-card rounded-2xl bg-card shadow-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Skills Progress</h2>
          <div className="space-y-6">
            {userProgress.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-sm font-bold text-primary">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="soft-card rounded-2xl bg-card shadow-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Learning Paths</h2>
          <div className="space-y-6">
            {LEARNING_PATHS.map((path) => {
              const completedCount = path.scenarios.filter((s) =>
                userProgress.completedScenarioIds.includes(s.id),
              ).length
              const progress = (completedCount / path.scenarios.length) * 100

              return (
                <div key={path.id} className="soft-card rounded-xl bg-muted/30 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{path.name}</h3>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      {completedCount}/{path.scenarios.length}
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                  </div>

                  <div className="space-y-3">
                    {path.scenarios.map((scenario, index) => {
                      const isCompleted = userProgress.completedScenarioIds.includes(scenario.id)
                      const isCurrent = index === completedCount && !isCompleted

                      return (
                        <div key={scenario.id} className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted
                                ? "bg-success text-white"
                                : isCurrent
                                  ? "bg-primary text-primary-foreground animate-pulse"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isCompleted ? "✓" : index + 1}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium text-sm ${isCurrent ? "text-primary" : "text-foreground"}`}>
                              {scenario.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {scenario.category} • {scenario.difficulty}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="soft-card rounded-2xl bg-card shadow-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{item.activity}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="soft-card rounded-2xl bg-card shadow-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Total XP Earned</span>
                <span className="text-lg font-bold text-primary">
                  {userProgress.xp + (userProgress.level - 1) * 1000}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Badges Earned</span>
                <span className="text-lg font-bold text-primary">{userProgress.earnedBadges.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Average Score</span>
                <span className="text-lg font-bold text-primary">85%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium text-foreground">Time Practiced</span>
                <span className="text-lg font-bold text-primary">12.5 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="soft-card rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-3">Continue Your Learning</h2>
          <p className="text-muted-foreground mb-4">Based on your progress, we recommend:</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/role-play"
              className="soft-button rounded-xl bg-card text-primary px-6 py-3 font-medium hover:shadow-md transition"
            >
              Try Interview Scenario
            </Link>
            <Link
              href="/career-coach"
              className="soft-button rounded-xl bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition"
            >
              Ask AI Coach
            </Link>
            <Link
              href="/tokens/buy"
              className="soft-button rounded-xl bg-success text-white px-6 py-3 font-medium hover:bg-success/90 transition"
            >
              Buy More Tokens
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
