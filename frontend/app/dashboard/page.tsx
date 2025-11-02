"use client"

import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Fixed */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-col fixed left-0 top-0 bottom-0">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="WorkAbroadly" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            <a
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-100 text-gray-900 font-medium"
            >
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </a>
            <a
              href="/voices"
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
            >
              <span className="text-lg">🎤</span>
              <span>Voices</span>
            </a>
          </nav>

          {/* Playground Section */}
          <div className="px-4 pb-4">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Playground</div>
            <div className="space-y-1">
              <a
                href="/career-coach"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <span className="text-lg">🎯</span>
                <span>AI Career Coach</span>
              </a>
              <a
                href="/role-play"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <span className="text-lg">🎭</span>
                <span>Cultural Role-Play</span>
              </a>
              <a
                href="/progress"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <span className="text-lg">📊</span>
                <span>Progress</span>
              </a>
            </div>
          </div>

          {/* Products Section */}
          <div className="px-4 pb-4">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">Products</div>
            <div className="space-y-1">
              <a
                href="/studio"
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎬</span>
                  <span>Studio</span>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">New</span>
              </a>
              <a
                href="/audio"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <span className="text-lg">🎵</span>
                <span>Audio Native</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200">
          <a
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold">
              S
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{loading ? "..." : user?.name?.split(" ")[0] || "User"}</div>
              <div className="text-xs text-gray-500">My Workspace</div>
            </div>
          </a>
        </div>
      </aside>

      {/* Main Content Area - Scrollable with margin for sidebar */}
      <main className="flex-1 md:ml-64 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">My Workspace</div>
              <h1 className="text-3xl font-bold text-gray-900">Good afternoon, {loading ? "..." : user?.name?.split(" ")[0] || "User"}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-700">Have a question?</span>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Talk to AI</span>
                </div>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 max-w-7xl">
          {/* Stats Cards Grid - dari dashboard asli */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Sessions Completed */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">12</div>
              <p className="text-sm text-gray-600">Sessions Completed</p>
            </div>

            {/* Role-Play Scenarios */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">8</div>
              <p className="text-sm text-gray-600">Role-Play Scenarios</p>
            </div>

            {/* Learning Streak */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">5 days</div>
              <p className="text-sm text-gray-600">Learning Streak</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions - Modern Card Style */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-6">
                {/* AI Career Coach - Large Modern Card */}
                <a
                  href="/career-coach"
                  className="group bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden relative"
                >
                  {/* Icon/Illustration Area */}
                  <div className="flex items-center justify-center mb-6 relative h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center transform -rotate-12">
                        <span className="text-4xl">🤖</span>
                      </div>
                      <div className="w-16 h-16 bg-blue-400 rounded-xl flex items-center justify-center absolute -right-4 -top-2 transform rotate-12">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center absolute -left-2 bottom-4">
                        <span className="text-xl">📝</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Career Coach</h3>
                    <p className="text-sm text-gray-600 mb-4">Get guidance on visa requirements, documents, and interviews</p>
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      <span>Start Conversation</span>
                      <span>→</span>
                    </div>
                  </div>
                </a>

                {/* Cultural Role-Play - Large Modern Card */}
                <a
                  href="/role-play"
                  className="group bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden relative"
                >
                  {/* Icon/Illustration Area */}
                  <div className="flex items-center justify-center mb-6 relative h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center transform rotate-6">
                        <span className="text-4xl">🎭</span>
                      </div>
                      <div className="w-16 h-16 bg-purple-400 rounded-xl flex items-center justify-center absolute -left-4 -top-2 transform -rotate-12">
                        <span className="text-2xl">🎬</span>
                      </div>
                      <div className="w-12 h-12 bg-purple-300 rounded-lg flex items-center justify-center absolute -right-2 bottom-4">
                        <span className="text-xl">✨</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Cultural Role-Play</h3>
                    <p className="text-sm text-gray-600 mb-4">Practice workplace scenarios and build confidence</p>
                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                      <span>Choose Scenario</span>
                      <span>→</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Recent Activity - Clean List Style */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {/* Activity Item 1 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✓</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        Completed 'First Day at Work' scenario
                      </h3>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        Asked about visa requirements
                      </h3>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        Completed 'Interview Preparation' session
                      </h3>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Card - Modern Style */}
              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-l-4 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Recommended for You</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Try the 'Morning Meeting' scenario to practice workplace Japanese
                    </p>
                    <button className="inline-flex items-center gap-2 text-sm text-orange-600 font-semibold hover:gap-3 transition-all">
                      <span>Start Now</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}