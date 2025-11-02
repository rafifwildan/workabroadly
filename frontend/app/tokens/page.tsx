"use client"

import { useState } from "react"
import Link from "next/link"

type Package = {
  id: string
  name: string
  tokens: number
  price: number
  perToken: number
  savings?: string
  features: string[]
  badge?: string
  popular?: boolean
}

const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tokens: 100,
    price: 9.99,
    perToken: 0.1,
    features: ["10 career coach sessions", "2 role-play scenarios"],
  },
  {
    id: "professional",
    name: "Professional",
    tokens: 500,
    price: 39.99,
    perToken: 0.08,
    savings: "20% savings!",
    features: ["50 career coach sessions", "10 role-play scenarios", "Document generation included"],
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    tokens: 1000,
    price: 69.99,
    perToken: 0.07,
    savings: "30% savings!",
    features: ["Everything included", "Priority support", "Unlimited document generation"],
    badge: "Best Value",
  },
  {
    id: "subscription",
    name: "Subscription",
    tokens: 200,
    price: 19.99,
    perToken: 0.1,
    features: ["200 tokens/month", "Auto-refill", "Cancel anytime"],
    badge: "Save More",
  },
]

const usageHistory = [
  { date: "Oct 27, 2025", activity: "Career Coach Session", tokens: -5 },
  { date: "Oct 26, 2025", activity: "Role-Play: First Day", tokens: -10 },
  { date: "Oct 25, 2025", activity: "Document Generation", tokens: -3 },
  { date: "Oct 24, 2025", activity: "Career Coach Session", tokens: -5 },
  { date: "Oct 23, 2025", activity: "Role-Play: Interview", tokens: -10 },
]

export default function TokensPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)

  const handlePurchase = (pkg: Package) => {
    setSelectedPackage(pkg)
    setShowPaymentModal(true)
  }

  const handleCloseModal = () => {
    setShowPaymentModal(false)
    setSelectedPackage(null)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="hidden md:flex md:w-60 bg-card border-r border-border flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-primary">WorkAbroadly</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted text-foreground transition-colors"
          >
            <span className="text-xl">🏠</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/career-coach"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted text-foreground transition-colors"
          >
            <span className="text-xl">🎯</span>
            <span>AI Career Coach</span>
          </Link>
          <Link
            href="/role-play"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted text-foreground transition-colors"
          >
            <span className="text-xl">🎭</span>
            <span>Cultural Role-Play</span>
          </Link>
          <Link
            href="/progress"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted text-foreground transition-colors"
          >
            <span className="text-xl">📊</span>
            <span>Progress</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted text-foreground transition-colors"
          >
            <span className="text-xl">👤</span>
            <span>Profile</span>
          </Link>
        </nav>

        <div className="p-4">
          <div className="soft-card rounded-xl bg-muted p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💎</span>
              <span className="text-lg font-bold text-foreground">250</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">tokens remaining</p>
            <Link href="/tokens/buy" className="text-xs text-primary underline hover:text-primary/80">
              Buy More
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-12">
          {/* Page Header */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-3">Token Management</h2>
            <p className="text-base text-muted-foreground">Manage your tokens and purchase more</p>
          </div>

          {/* Current Balance Card */}
          <div className="soft-card rounded-3xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-10 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="text-6xl">💎</div>
              <div className="flex-1">
                <div className="text-5xl font-bold mb-2">250 tokens</div>
                <p className="text-lg opacity-90">≈ $12.50 remaining</p>
              </div>
            </div>
          </div>

          {/* Token Packages Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Purchase Token Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`soft-card rounded-2xl bg-card p-8 relative transition-all ${
                    pkg.popular
                      ? "shadow-2xl border-2 border-primary scale-105"
                      : "shadow-lg hover:shadow-xl hover:scale-105"
                  }`}
                >
                  {pkg.badge && (
                    <div
                      className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                        pkg.popular ? "bg-accent" : "bg-secondary"
                      }`}
                    >
                      {pkg.badge}
                    </div>
                  )}

                  <div className="text-3xl font-bold text-foreground mb-1">{pkg.tokens} tokens</div>
                  <div className="text-2xl text-foreground mb-2">${pkg.price}</div>
                  <div className="text-xs text-muted-foreground mb-4">
                    ${pkg.perToken.toFixed(2)}/token
                    {pkg.savings && <span className="text-accent ml-1">({pkg.savings})</span>}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-success">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/tokens/buy"
                    className={`block w-full text-center rounded-xl py-2 font-medium transition-colors ${
                      pkg.popular
                        ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Purchase
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Usage History Section */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Recent Token Usage</h3>
            <div className="soft-card rounded-2xl bg-card shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="text-left p-6 text-sm font-medium text-foreground">Date</th>
                      <th className="text-left p-6 text-sm font-medium text-foreground">Activity</th>
                      <th className="text-right p-6 text-sm font-medium text-foreground">Tokens Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageHistory.map((item, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-6 text-sm text-muted-foreground">{item.date}</td>
                        <td className="p-6 text-sm text-foreground font-medium">{item.activity}</td>
                        <td className="p-6 text-sm text-right text-destructive font-medium">{item.tokens} tokens</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
