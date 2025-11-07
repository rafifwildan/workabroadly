"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { LogOut, Bot, MessageSquare } from "lucide-react"
import UserPlanBadge from "./UserPlanBadge"
// import { getMockUserUsage } from "@/lib/usage-calculator"

interface ChatSession {
  id: string
  title: string
  timestamp: string
}

interface ChatSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  onRoleChange?: (role: string) => void
}

export default function ChatSidebar({ isOpen = true, onClose, onRoleChange }: ChatSidebarProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: "1", title: "Conversation about visa requirements", timestamp: "2 hours ago" },
    { id: "2", title: "Interview preparation tips", timestamp: "1 day ago" },
    { id: "3", title: "Document checklist for Japan", timestamp: "3 days ago" },
  ])
  const [activeSession, setActiveSession] = useState<string>("1")
  const [selectedRole, setSelectedRole] = useState<string>("default")

  // const userUsage = getMockUserUsage()

  const handleNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New conversation",
      timestamp: "Just now",
    }
    setSessions([newSession, ...sessions])
    setActiveSession(newSession.id)
  }

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    if (onRoleChange) {
      onRoleChange(role)
    }
  }

  const roles = [{ id: "default", name: "Expat AI", description: "Comprehensive assistant for working abroad" }]

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
                  <Bot className="w-5 h-5 text-primary" />
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

          {sessions.length === 0 ? (
            <div className="text-center p-4">
              <MessageSquare className="w-12 h-12 mx-auto opacity-40 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground italic">No chat history yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setActiveSession(session.id)}
                  className={`
                    w-full text-left rounded-lg p-3 mx-2 transition-all
                    hover:bg-card cursor-pointer
                    ${activeSession === session.id ? "bg-card border-l-4 border-primary" : ""}
                  `}
                >
                  <p className="text-sm text-foreground font-medium truncate">{session.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{session.timestamp}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border">
          {/* <UserPlanBadge usage={userUsage} showDetails={true} /> */}
          <Link
            href="/my-plan"
            className="block mt-3 text-center text-sm text-primary hover:text-primary/80 hover:underline"
          >
            Manage Plan
          </Link>
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
