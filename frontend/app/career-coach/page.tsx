"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ChatSidebar from "@/components/ChatSidebar"
import ChatArea from "@/components/ChatArea"
import ChatInputBar from "@/components/ChatInputBar"
import { apiClient } from "@/lib/api"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
}

interface ChatSession {
  sessionId: string
  title: string
  messageCount: number
  lastMessageAt: string
  createdAt: string
}

export default function CareerCoachPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentRole, setCurrentRole] = useState<string>("default")
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [credits, setCredits] = useState<number>(0)
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)

  // Fetch user's credit balance
  const fetchCredits = async () => {
    try {
      const response = await apiClient.get<{ credits: number }>("/api/user/credits")
      setCredits(response.credits)
    } catch (error) {
      console.error("[Credits] Error fetching credits:", error)
    }
  }

  // Fetch all chat sessions
  const fetchSessions = async () => {
    try {
      setIsLoadingSessions(true)
      const response = await apiClient.get<{ sessions: ChatSession[] }>("/api/chat/sessions")
      setSessions(response.sessions)
    } catch (error) {
      console.error("[Sessions] Error fetching sessions:", error)
    } finally {
      setIsLoadingSessions(false)
    }
  }

  // Load a specific session
  const loadSession = async (sessionId: string) => {
    try {
      const response = await apiClient.get<{ 
        session: { 
          messages: Array<{ role: string; content: string; timestamp: string }> 
        } 
      }>(`/api/chat/sessions/${sessionId}`)
      
      // Convert backend messages to frontend format
      const loadedMessages: Message[] = response.session.messages.map((msg, idx) => ({
        id: `${sessionId}-${idx}`,
        content: msg.content,
        sender: msg.role === "user" ? "user" : "ai",
        timestamp: new Date(msg.timestamp).toLocaleTimeString("en-US", { 
          hour: "2-digit", 
          minute: "2-digit" 
        }),
      }))

      setMessages(loadedMessages)
      setCurrentSessionId(sessionId)
    } catch (error) {
      console.error("[Sessions] Error loading session:", error)
      alert("Failed to load conversation. Please try again.")
    }
  }

  // Create new session
  const createNewSession = async () => {
    try {
      // Clear current messages
      setMessages([])
      setCurrentSessionId(null)
      
      // Optionally create empty session in backend
      // Or wait until first message is sent
      console.log("[Sessions] Starting new session")
    } catch (error) {
      console.error("[Sessions] Error creating session:", error)
    }
  }

  // Delete session
  const deleteSession = async (sessionId: string) => {
    try {
      await apiClient.delete(`/api/chat/sessions/${sessionId}`)
      
      // Remove from local state
      setSessions(sessions.filter(s => s.sessionId !== sessionId))
      
      // If deleted session was active, clear messages
      if (currentSessionId === sessionId) {
        setMessages([])
        setCurrentSessionId(null)
      }
      
      console.log("[Sessions] Session deleted:", sessionId)
    } catch (error) {
      console.error("[Sessions] Error deleting session:", error)
      alert("Failed to delete session. Please try again.")
    }
  }

  // Initial load
  useEffect(() => {
    fetchCredits()
    fetchSessions()
  }, [])

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setIsTyping(true)

    try {
      console.log("[Chat] Sending message to backend:", { content, sessionId: currentSessionId })

      // Call Express backend (NOT Next.js API route)
      const response = await apiClient.post<{
        reply: string
        sessionId: string
        creditsRemaining: number
        creditsUsed: number
      }>("/api/chat", {
        message: content,
        sessionId: currentSessionId,
      })

      console.log("[Chat] Backend response:", response)

      // Update session ID if this was first message
      if (!currentSessionId && response.sessionId) {
        setCurrentSessionId(response.sessionId)
        // Refresh sessions list to show new session
        fetchSessions()
      }

      // Update credits
      setCredits(response.creditsRemaining)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.reply,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error: any) {
      console.error("[Chat] Error sending message:", error)

      let errorMessage = "❌ Terjadi kesalahan. Silakan coba lagi."

      // Handle specific errors
      if (error.message?.includes("Insufficient credits")) {
        errorMessage = "❌ Credits tidak cukup! Silakan beli credits terlebih dahulu."
      } else if (error.message?.includes("Unauthorized")) {
        errorMessage = "❌ Sesi login Anda telah berakhir. Silakan login kembali."
        // Redirect to login after 2 seconds
        setTimeout(() => router.push("/login"), 2000)
      }

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onRoleChange={setCurrentRole}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onLoadSession={loadSession}
        onNewSession={createNewSession}
        onDeleteSession={deleteSession}
        credits={credits}
        isLoading={isLoadingSessions}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header with Menu Toggle */}
        <div className="lg:hidden border-b border-primary-100 bg-white p-6 flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-teal-50 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-teal-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-teal-900">AI Career Coach</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-2xl">💎</span>
            <span className="text-sm font-bold">{credits}</span>
          </div>
        </div>

        {/* Chat Messages Area */}
        <ChatArea messages={messages} isTyping={isTyping} />

        {/* Input Bar */}
        <ChatInputBar onSendMessage={handleSendMessage} disabled={isTyping} currentRole={currentRole} />
      </div>
    </div>
  )
}