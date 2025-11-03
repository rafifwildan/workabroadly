"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface ChatSession {
  sessionId: string
  title: string
  messageCount: number
  lastMessageAt: string
  createdAt: string
}

interface ChatSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  onRoleChange?: (role: string) => void
  sessions?: ChatSession[]
  currentSessionId?: string | null
  onLoadSession?: (sessionId: string) => void
  onNewSession?: () => void
  onDeleteSession?: (sessionId: string) => void
  credits?: number
  isLoading?: boolean
}

export default function ChatSidebar({ 
  isOpen = true, 
  onClose, 
  onRoleChange,
  sessions = [],
  currentSessionId,
  onLoadSession,
  onNewSession,
  onDeleteSession,
  credits = 0,
  isLoading = false,
}: ChatSidebarProps) {
  const [selectedRole, setSelectedRole] = useState<string>("default")

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    if (onRoleChange) {
      onRoleChange(role)
    }
  }

  const handleNewSession = () => {
    if (onNewSession) {
      onNewSession()
    }
  }

  const handleLoadSession = (sessionId: string) => {
    if (onLoadSession) {
      onLoadSession(sessionId)
    }
  }

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering load session
    
    if (confirm("Are you sure you want to delete this conversation?")) {
      if (onDeleteSession) {
        onDeleteSession(sessionId)
      }
    }
  }

  const roles = [
    { id: "default", name: "Expat AI", icon: "🤖", description: "Asisten komprehensif untuk bekerja di luar negeri" },
  ]

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return diffMins <= 1 ? "Just now" : `${diffMins} mins ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
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
          <Link href="/dashboard">
            <Image src="/images/logo.png" alt="WorkAbroadly" width={160} height={36} className="h-9 w-auto" />
          </Link>
        </div>

        {/* Credits Display */}
        <div className="p-4 border-b border-border">
          <div className="soft-card rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💎</span>
              <div className="flex-1">
                <div className="text-2xl font-bold text-foreground">{credits}</div>
                <p className="text-xs text-muted-foreground">credits remaining</p>
              </div>
            </div>
            <Link 
              href="/tokens" 
              className="block mt-3 text-xs text-primary font-medium hover:underline text-center"
            >
              Buy More Credits →
            </Link>
          </div>
        </div>

        {/* New Session Button */}
        <div className="p-4">
          <button
            onClick={handleNewSession}
            className="soft-button w-full text-white p-3 text-center font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl">+</span>
            <span>New Session</span>
          </button>
        </div>

        <div className="px-4 pb-4">
          <h3 className="text-xs text-primary uppercase mb-2 font-medium">AI Persona</h3>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id)}
                className={`
                  w-full text-left rounded-lg p-3 transition-all
                  hover:bg-card cursor-pointer
                  ${selectedRole === role.id ? "bg-card border-l-4 border-primary" : "bg-muted/50"}
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{role.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">{role.name}</p>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-xs text-primary uppercase px-4 mb-2 font-medium">History</h3>

          {isLoading ? (
            <div className="text-center p-4">
              <div className="text-2xl mb-2">⏳</div>
              <p className="text-sm text-muted-foreground italic">Loading conversations...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center p-4">
              <div className="text-4xl opacity-40 mb-2">💬</div>
              <p className="text-sm text-muted-foreground italic">No conversation history yet</p>
              <p className="text-xs text-muted-foreground mt-1">Start a new chat to begin!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  className={`
                    relative group
                    w-full text-left rounded-lg p-3 mx-2 transition-all
                    hover:bg-card cursor-pointer
                    ${currentSessionId === session.sessionId ? "bg-card border-l-4 border-primary" : ""}
                  `}
                  onClick={() => handleLoadSession(session.sessionId)}
                >
                  <div className="pr-8">
                    <p className="text-sm text-foreground font-medium truncate">{session.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(session.lastMessageAt)}
                      </p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">
                        {session.messageCount} msg{session.messageCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDeleteSession(session.sessionId, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                    title="Delete conversation"
                  >
                    <svg 
                      className="w-4 h-4 text-destructive" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="border-t border-border p-4 bg-muted">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 text-primary w-10 h-10 flex items-center justify-center font-bold">
              U
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">User</p>
              <Link
                href="/logout"
                className="text-xs text-destructive hover:text-destructive/80 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>🚪</span>
                <span>Keluar</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}