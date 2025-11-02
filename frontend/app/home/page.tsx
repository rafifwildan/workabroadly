"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"

interface User {
  id: string
  email: string
  name: string
  picture?: string
  tokens?: number
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
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

  // Get first letter of name for avatar
  const getInitial = () => {
    if (!user?.name) return "U"
    return user.name.charAt(0).toUpperCase()
  }

  // Get first name only
  const getFirstName = () => {
    if (!user?.name) return "User"
    return user.name.split(" ")[0]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/home" className="text-2xl font-bold text-gray-900">
            WorkAbroadly
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold text-gray-900">
                {loading ? "..." : user?.tokens || 250}
              </span>
            </div>
            <Link
              href="/profile"
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold"
            >
              {loading ? "..." : getInitial()}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {loading ? "Welcome back..." : `Welcome back, ${getFirstName()}`}
          </h1>
          <p className="text-xl text-gray-600">
            Ready to continue your journey? Choose what you&apos;d like to do today.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* AI Career Coach */}
          <Link href="/career-coach">
            <div className="border border-gray-200 rounded-2xl p-10 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">AI Career Coach</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Get personalized guidance on visa requirements, job preparation, and interview tips
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <span>Start Conversation</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Cultural Role-Play */}
          <Link href="/role-play">
            <div className="border border-gray-200 rounded-2xl p-10 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer group">
              <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Cultural Role-Play</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Practice real workplace scenarios and build confidence in cultural interactions
              </p>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <span>Choose Scenario</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <p className="text-sm text-gray-600">Sessions Completed</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
            <p className="text-sm text-gray-600">Role-Play Scenarios</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">5 days</div>
            <p className="text-sm text-gray-600">Learning Streak</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/dashboard">
            <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">View Dashboard</h3>
              <p className="text-sm text-gray-600">See your full progress</p>
            </div>
          </Link>

          <Link href="/progress">
            <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor your journey</p>
            </div>
          </Link>

          <Link href="/tokens">
            <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get More Tokens</h3>
              <p className="text-sm text-gray-600">Unlock premium features</p>
            </div>
          </Link>
        </div>

        {/* Recommendation */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recommended for You</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Based on your profile, we recommend trying the &apos;Morning Meeting&apos; scenario to practice
                workplace Japanese communication.
              </p>
              <Link
                href="/role-play"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <span>Start Scenario</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link href="/contact" className="text-blue-600 font-medium hover:text-blue-700">
              Contact Support
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}