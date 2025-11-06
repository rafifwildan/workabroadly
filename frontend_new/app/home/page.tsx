"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Home, Drama, User, MessageSquare, Menu } from "lucide-react"
import { getMockUserUsage } from "@/lib/usage-calculator"
import { Button } from "@/components/ui/button"
import AppSidebar from "@/components/AppSidebar"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const router = useRouter()
  const params = useSearchParams()
  const userUsage = getMockUserUsage()

  // ✅ 1. Handle token dari Google callback
  useEffect(() => {
    const token = params.get("token")
    if (token) {
      localStorage.setItem("token", token)
      router.replace("/home") // bersihkan query param
    }
  }, [params, router])

  // ✅ 2. Ambil data user dari backend (/auth/me)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch("http://localhost:3010/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch user info")

        const data = await res.json()
        setUser(data) // backend mengembalikan objek user langsung
      } catch (err: any) {
        console.error(err)
        setError("Failed to load user info")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // ✅ 3. Logout handler
  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    try {
      await fetch("http://localhost:3010/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      localStorage.removeItem("token")
      router.push("/login")
    }
  }

  // Efek shadow pada scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <AppSidebar user={user} onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* HEADER */}
        <div
          className={`bg-black p-8 sticky top-0 z-50 transition-shadow ${
            isScrolled ? "shadow-lg shadow-gray-800/30" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors text-white"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Home</h2>
                <p className="text-gray-300">
                  {loading
                    ? "Loading user..."
                    : user
                    ? `Welcome back, ${user.name || "User"}!`
                    : "Welcome back! Choose your AI assistant"}
                </p>
              </div>
            </div>

            {/* User info + Logout */}
            <div className="flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="text-white">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-gray-300">
                      {user.planTier || "Starter"} • {user.credits ?? 0} credits
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-white text-sm">Not logged in</div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto pb-24 md:pb-0">
          <div className="p-8 space-y-12">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Role-Play Card */}
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Role-Play Culture Practice
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Drama className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Practice cultural scenarios through interactive role-playing
                  with AI characters from different backgrounds.
                </p>
                <Button
                  onClick={() => (window.location.href = "/role-play")}
                  className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-semibold"
                >
                  Start Practice
                </Button>
              </div>

              {/* Expat AI Chat Bot Card */}
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Expat AI Chat Bot
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get instant help with expat-life challenges, visa questions,
                  and local adaptation advice.
                </p>
                <Button
                  onClick={() => (window.location.href = "/expat-ai")}
                  className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-semibold"
                >
                  Start Chat
                </Button>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
                <Link
                  href="/profile?tab=activity"
                  className="text-sm text-gray-900 hover:text-gray-700 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Drama className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      Completed Japanese Business Meeting scenario
                    </p>
                    <p className="text-xs text-gray-500">
                      2 hours ago • Role-Play Practice
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      Asked about visa renewal process
                    </p>
                    <p className="text-xs text-gray-500">
                      5 hours ago • Expat AI Chat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-4">
          <Link href="/home" className="flex flex-col items-center gap-1 px-4 py-2">
            <Home className="w-5 h-5 text-gray-900" />
            <span className="text-xs font-medium text-gray-900">Home</span>
          </Link>
          <Link href="/expat-ai" className="flex flex-col items-center gap-1 px-4 py-2">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Chat Bot</span>
          </Link>
          <Link href="/role-play" className="flex flex-col items-center gap-1 px-4 py-2">
            <Drama className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Role-Play</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 px-4 py-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
