"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, User, MessageSquare, LogOut, ChevronDown } from "lucide-react"
import { getMockUserUsage } from "@/lib/usage-calculator"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthHeader } from "@/lib/auth"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

interface ChatSession {
  sessionId: string
  title: string
  persona: string
  messageCount: number
  lastMessageAt: string
  createdAt: string
}

function DashboardContent() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)
  const { user, isLoading } = useAuth()
  const userUsage = getMockUserUsage()
  const router = useRouter()

  // ⚡ CRITICAL: Protect page - redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      console.log("[Home] User tidak authenticated, redirect ke /login")
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Fetch chat sessions
  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      setIsLoadingSessions(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/sessions`, {
        headers: getAuthHeader(),
      })

      if (!response.ok) {
        console.error("Failed to fetch sessions")
        return
      }

      const data = await response.json()
      setSessions(data.sessions || [])
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setIsLoadingSessions(false)
    }
  }

  const getPersonaEmoji = (persona: string) => {
    switch (persona) {
      case "clara": return "🤝"
      case "sora": return "💼"
      case "arlo": return "📋"
      default: return "💬"
    }
  }

  const getPersonaName = (persona: string) => {
    switch (persona) {
      case "clara": return "Clara"
      case "sora": return "Sora"
      case "arlo": return "Arlo"
      default: return "Chat"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* HEADER sticky */}
      <div className="bg-black p-8 flex-shrink-0 z-50">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center">
              <Link href="/home" className="flex items-center gap-2">
                <img src="/images/logoIMG_BLACK.png" alt="WorkAbroadly" className="h-16 w-auto" />
              </Link>
              <div className="ml-4">
                <h2 className="text-3xl font-bold text-white mb-1">Home</h2>
                <p className="text-gray-300">
                  Welcome back, {user?.name || "User"}!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      {user?.picture ? (
                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-gray-900" />
                      )}
                    </div>
                    <div className="text-white hidden md:block text-left">
                      <div className="font-semibold">{user?.name || "User"}</div>
                      <div className="text-xs text-gray-300">
                        Professional Member
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white hidden md:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout" className="flex items-center gap-2 cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-hidden pb-4">
          <div className="max-w-7xl mx-auto px-8 py-6 h-full">
            {/* Main Grid: Expat AI Card (Left) + Chat History (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              {/* Left Side - Cultural Inteligence Coach Card */}
              <div className="lg:col-span-2 flex flex-col min-h-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">Start Chatting</h3>

                {/* Cultural Inteligence Coach Card - Full Height */}
                <div className="bg-white rounded-[60px] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden flex-1 flex flex-col min-h-0">
                  <div className="relative w-[110%] -translate-x-[5%] flex-1">
                    <Image
                      src="/images/expat-AI.png"
                      alt="Illustration for Cultural Inteligence Coach"
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'top'
                      }}
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-shrink-0 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Cultural Inteligence Coach
                        </h3>
                      </div>
                      <div className="p-2 rounded-lg bg-gray-100 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-gray-900" />
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      Get instant help with expat-life challenges, visa questions,
                      and local adaptation advice from our specialized AI assistants.
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/expat-ai")}
                      className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-semibold py-3"
                    >
                      Start New Chat
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Chat History */}
              <div className="lg:col-span-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Chat History
                  </h3>
                  {sessions.length > 0 && (
                    <Link
                      href="/expat-ai"
                      className="text-sm text-gray-900 hover:text-gray-700 font-medium"
                    >
                      View All
                    </Link>
                  )}
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 flex-1 overflow-hidden flex flex-col min-h-0">
                  {isLoadingSessions ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <MessageSquare className="w-16 h-16 mx-auto opacity-40 mb-4 text-gray-400 animate-pulse" />
                      <p className="text-sm text-gray-500 italic">Loading your conversations...</p>
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <MessageSquare className="w-16 h-16 mx-auto opacity-40 mb-4 text-gray-400" />
                      <p className="text-base text-gray-600 font-medium mb-2">No conversations yet</p>
                      <p className="text-sm text-gray-500">Start your first chat to see it here</p>
                    </div>
                  ) : (
                    <div className="space-y-3 overflow-y-auto flex-1">
                      {sessions.slice(0, 6).map((session) => (
                        <Link
                          key={session.sessionId}
                          href={`/expat-ai?session=${session.sessionId}`}
                          className="block group"
                        >
                          <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-md">
                            <div className="flex items-start gap-3">
                              <div className="text-2xl flex-shrink-0">{getPersonaEmoji(session.persona)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-black">
                                    {session.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span className="font-medium">{getPersonaName(session.persona)}</span>
                                  <span>•</span>
                                  <span>{session.messageCount} messages</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatTimestamp(session.lastMessageAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-4">
          <Link href="/home" className="flex flex-col items-center gap-1 px-4 py-2">
            <Home className="w-5 h-5 text-gray-900" />
            <span className="text-xs font-medium text-gray-900">Home</span>
          </Link>
          <Link href="/expat-ai" className="flex flex-col items-center gap-1 px-4 py-2">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Chat</span>
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

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}