"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background-50 flex">
      {/* Left Sidebar */}
      <aside className="hidden md:flex md:w-60 bg-white border-r border-primary-100 flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-primary-100">
          <Link href="/dashboard">
            <Image src="/images/logo.png" alt="WorkAbroadly" width={160} height={36} className="h-9 w-auto" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl p-3 bg-primary-100 text-primary-800 font-medium"
          >
            <span className="text-xl">🏠</span>
            <span>Dashboard</span>
          </a>
          <a
            href="/career-coach"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary-50 text-primary-700 transition-colors"
          >
            <span className="text-xl">🎯</span>
            <span>AI Career Coach</span>
          </a>
          <a
            href="/role-play"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary-50 text-primary-700 transition-colors"
          >
            <span className="text-xl">🎭</span>
            <span>Cultural Role-Play</span>
          </a>
          <a
            href="/progress"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary-50 text-primary-700 transition-colors"
          >
            <span className="text-xl">📊</span>
            <span>Progress</span>
          </a>
          <a
            href="/profile"
            className="flex items-center gap-3 rounded-xl p-3 hover:bg-primary-50 text-primary-700 transition-colors"
          >
            <span className="text-xl">👤</span>
            <span>Profile</span>
          </a>
        </nav>

        {/* Token Balance Card */}
        <div className="p-6">
          <div className="soft-card rounded-xl bg-background-100 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💎</span>
              <span className="text-lg font-bold text-primary-800">250</span>
            </div>
            <p className="text-xs text-primary-600 mb-2">tokens remaining</p>
            <a href="/tokens" className="text-xs text-primary-600 underline hover:text-primary-800">
              Buy More
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pb-24 md:pb-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-primary-100 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-800">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-900">Welcome back, Sarah! 👋</h2>
                <p className="text-sm text-primary-600">Tuesday, October 28, 2025</p>
              </div>
            </div>
            <div className="soft-card rounded-xl bg-background-100 px-6 py-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💎</span>
                <div>
                  <div className="text-lg font-bold text-primary-800">250</div>
                  <p className="text-xs text-primary-600">tokens</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-12">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-4xl font-bold text-primary-800 mb-1">12</div>
              <p className="text-sm text-primary-600">Sessions Completed</p>
            </div>

            <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
              <div className="text-3xl mb-2">🎭</div>
              <div className="text-4xl font-bold text-primary-800 mb-1">8</div>
              <p className="text-sm text-primary-600">Role-Play Scenarios</p>
            </div>

            <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-4xl font-bold text-primary-800 mb-1">5 days</div>
              <p className="text-sm text-primary-600">Learning Streak</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Career Coach Card */}
            <div className="soft-card rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-10 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">AI Career Coach</h3>
              <p className="text-primary-700 mb-6">Get guidance on visa requirements, documents, and interviews</p>
              <button
                onClick={() => (window.location.href = "/career-coach")}
                className="rounded-xl bg-primary-500 text-white px-6 py-3 shadow-md hover:bg-primary-600 transition-colors"
              >
                Start Conversation
              </button>
            </div>

            {/* Cultural Role-Play Card */}
            <div className="soft-card rounded-3xl bg-gradient-to-br from-secondary-50 to-accent-50 p-10 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="text-5xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">Cultural Role-Play</h3>
              <p className="text-primary-700 mb-6">Practice workplace scenarios and build confidence</p>
              <button
                onClick={() => (window.location.href = "/role-play")}
                className="rounded-xl bg-secondary-500 text-white px-6 py-3 shadow-md hover:bg-secondary-600 transition-colors"
              >
                Choose Scenario
              </button>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <h3 className="text-xl font-bold text-primary-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="soft-card rounded-xl bg-white shadow-md p-6 flex items-center gap-4">
                <div className="text-2xl">✅</div>
                <div className="flex-1">
                  <p className="text-primary-800 font-medium">Completed 'First Day at Work' scenario</p>
                  <p className="text-xs text-primary-500">2 hours ago</p>
                </div>
              </div>

              <div className="soft-card rounded-xl bg-white shadow-md p-6 flex items-center gap-4">
                <div className="text-2xl">💬</div>
                <div className="flex-1">
                  <p className="text-primary-800 font-medium">Asked about visa requirements</p>
                  <p className="text-xs text-primary-500">Yesterday</p>
                </div>
              </div>

              <div className="soft-card rounded-xl bg-white shadow-md p-6 flex items-center gap-4">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <p className="text-primary-800 font-medium">Completed 'Interview Preparation' session</p>
                  <p className="text-xs text-primary-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Next Steps Card */}
          <div className="soft-card rounded-2xl bg-accent-50 border-l-4 border-accent-500 p-8">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-primary-900 mb-2">Recommended for You</h4>
                <p className="text-primary-700 mb-3">
                  Try the 'Morning Meeting' scenario to practice workplace Japanese
                </p>
                <button className="text-sm text-primary-700 underline hover:text-primary-900">Start Now</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-primary-100 shadow-lg">
        <div className="flex items-center justify-around py-4">
          <a href="/dashboard" className="flex flex-col items-center gap-1 px-4 py-2">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium text-primary-800">Dashboard</span>
          </a>
          <a href="/career-coach" className="flex flex-col items-center gap-1 px-4 py-2">
            <span className="text-xl">🎯</span>
            <span className="text-xs text-primary-600">Coach</span>
          </a>
          <a href="/role-play" className="flex flex-col items-center gap-1 px-4 py-2">
            <span className="text-xl">🎭</span>
            <span className="text-xs text-primary-600">Role-Play</span>
          </a>
          <a href="/profile" className="flex flex-col items-center gap-1 px-4 py-2">
            <span className="text-xl">👤</span>
            <span className="text-xs text-primary-600">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
