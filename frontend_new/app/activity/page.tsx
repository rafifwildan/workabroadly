"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ArrowLeft, MessageSquare, Drama, CreditCard, User, LogOut, ChevronDown, Home } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuthHeader } from "@/lib/auth"

type ActivityFilter = "all" | "chats"

interface Activity {
  id: string
  type: "chat"
  title: string
  description: string
  persona: string
  timestamp: string
  date: string
  messageCount: number
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<ActivityFilter>("all")
  const [isScrolled, setIsScrolled] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/sessions`, {
        headers: getAuthHeader(),
      })

      if (!response.ok) {
        console.error("Failed to fetch activities")
        return
      }

      const data = await response.json()

      // Convert sessions to activities format
      const formattedActivities: Activity[] = (data.sessions || []).map((session: any) => ({
        id: session.sessionId,
        type: "chat" as const,
        title: getPersonaName(session.persona) + " Chat",
        description: session.title,
        persona: session.persona,
        timestamp: formatTimestamp(session.lastMessageAt),
        date: new Date(session.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        messageCount: session.messageCount,
      }))

      setActivities(formattedActivities)
    } catch (error) {
      console.error("Error fetching activities:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getPersonaName = (persona: string) => {
    switch (persona) {
      case "clara": return "Clara"
      case "sora": return "Sora"
      case "arlo": return "Arlo"
      default: return "AI"
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    const diffWeeks = Math.floor(diffDays / 7)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true
    if (filter === "chats") return activity.type === "chat"
    return true
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="w-6 h-6 text-gray-600" />
      case "roleplay":
        return <Drama className="w-6 h-6 text-gray-600" />
      case "purchase":
        return <CreditCard className="w-6 h-6 text-gray-600" />
      default:
        return <MessageSquare className="w-6 h-6 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex-1 flex flex-col">
        {/* HEADER sticky */}
        <div
          className={`bg-black p-8 sticky top-0 z-50 transition-shadow ${
            isScrolled ? "shadow-lg shadow-gray-800/30" : ""
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Link href="/home" className="flex items-center gap-2">
                <img src="/logo.jpeg" alt="WorkAbroadly" className="h-9 w-auto" />
              </Link>
              <div className="ml-4">
                <h2 className="text-3xl font-bold text-white mb-1">Activity History</h2>
                <p className="text-gray-300">
                  View all your past activities and interactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <User className="w-6 h-6 text-gray-900" />
                    </div>
                    <div className="text-white hidden md:block text-left">
                      <div className="font-semibold">Sarah Johnson</div>
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

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/home"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === "all"
                  ? "bg-black text-white"
                  : "bg-white text-black border-2 border-gray-200 hover:border-black"
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setFilter("chats")}
              className={`px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                filter === "chats"
                  ? "bg-black text-white"
                  : "bg-white text-black border-2 border-gray-200 hover:border-black"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chats
            </button>
          </div>

          {/* Activity List */}
          <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 animate-pulse" />
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-lg text-gray-600 font-medium mb-2">No activities yet</p>
                <p className="text-sm text-gray-500">Start chatting with our AI coaches to see your activity here</p>
                <Link href="/expat-ai" className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                  Start Chat
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={`/expat-ai?session=${activity.id}`}
                    className="flex items-start gap-4 p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors block"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{getPersonaEmoji(activity.persona)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-medium text-black">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1 truncate">{activity.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-500">{activity.messageCount} messages</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-4">
          <Link href="/home" className="flex flex-col items-center gap-1 px-4 py-2">
            <Home className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Home</span>
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