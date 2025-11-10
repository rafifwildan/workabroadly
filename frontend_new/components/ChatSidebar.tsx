"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { LogOut, Bot, MessageSquare, Trash2 } from "lucide-react"
import UserPlanBadge from "./UserPlanBadge"
import { getMockUserUsage } from "@/lib/usage-calculator"
import { getAuthHeader } from "@/lib/auth"
import { useAuth } from "@/contexts/AuthContext"

interface ChatSession {
  sessionId: string
  title: string
  persona: string
  messageCount: number
  lastMessageAt: string
  createdAt: string
}

interface ChatSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  onRoleChange?: (role: string) => void
  onNewSession?: () => void
  onLoadSession?: (sessionId: string) => void
  currentSessionId?: string | null
}

export default function ChatSidebar({
  isOpen = true,
  onClose,
  onRoleChange,
  onNewSession,
  onLoadSession,
  currentSessionId
}: ChatSidebarProps) {
  const { user, logout } = useAuth()
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeSession, setActiveSession] = useState<string | null>(currentSessionId || null)

  const userUsage = getMockUserUsage()

  // Fetch sessions on mount
  useEffect(() => {
    fetchSessions()
  }, [])

  // Update active session when currentSessionId changes
  useEffect(() => {
    setActiveSession(currentSessionId || null)
  }, [currentSessionId])

  const fetchSessions = async () => {
    try {
      setIsLoading(true)
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
      setIsLoading(false)
    }
  }

  const handleNewSession = () => {
    // Call parent handler to reset messages and prepare for new session
    if (onNewSession) {
      onNewSession()
    }
  }

  const handleLoadSession = async (sessionId: string) => {
    setActiveSession(sessionId)
    if (onLoadSession) {
      onLoadSession(sessionId)
    }
  }

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering session load

    if (!confirm("Are you sure you want to delete this conversation?")) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/sessions/${sessionId}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      })

      if (!response.ok) {
        console.error("Failed to delete session")
        return
      }

      // Refresh sessions list
      await fetchSessions()

      // If deleted session was active, clear it
      if (activeSession === sessionId) {
        setActiveSession(null)
        if (onNewSession) {
          onNewSession()
        }
      }
    } catch (error) {
      console.error("Error deleting session:", error)
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

    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-60 lg:w-64 h-full
          bg-muted border-r border-border
          flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 border-b border-border">
          <Link href="/home">
            <Image src="/images/logo.png" alt="WorkAbroadly" width={160} height={36} className="h-9 w-auto" />
          </Link>
        </div>

        {/* New Session Button */}
        <div className="p-4">
          <button
            onClick={handleNewSession}
            className="soft-button w-full text-white p-3 text-center font-medium flex items-center justify-center gap-2 rounded-xl hover:scale-105 transition-transform"
          >
            <span className="text-xl font-bold">+</span>
            <span>New Session</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xs text-primary uppercase px-4 mb-2 font-medium">History</h3>

          {isLoading ? (
            <div className="text-center p-4">
              <MessageSquare className="w-12 h-12 mx-auto opacity-40 mb-2 text-muted-foreground animate-pulse" />
              <p className="text-sm text-muted-foreground italic">Loading...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center p-4">
              <MessageSquare className="w-12 h-12 mx-auto opacity-40 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground italic">No chat history yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  className={`
                    relative w-full text-left rounded-lg p-3 mx-2 transition-all
                    hover:bg-card cursor-pointer group
                    ${activeSession === session.sessionId ? "bg-card border-l-4 border-primary" : ""}
                  `}
                  onClick={() => handleLoadSession(session.sessionId)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{getPersonaEmoji(session.persona)}</span>
                        <p className="text-sm text-foreground font-medium truncate">{session.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(session.lastMessageAt)} • {session.messageCount} messages
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSession(session.sessionId, e)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* <div className="p-4 border-t border-border">
          <UserPlanBadge usage={userUsage} showDetails={true} />
          <Link
            href="/my-plan"
            className="block mt-3 text-center text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Manage Plan
          </Link>
        </div> */}

        {/* User Profile */}
        <div className="border-t border-border p-4 bg-muted">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 text-primary w-10 h-10 flex items-center justify-center font-bold overflow-hidden">
              {user?.picture ? (
                <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || "User"}</p>
              <Link
                href="/home"
                className="text-xs text-primary hover:text-primary/80 hover:underline cursor-pointer flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
