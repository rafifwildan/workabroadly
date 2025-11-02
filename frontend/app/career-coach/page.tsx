"use client"

import { useState } from "react"
import ChatSidebar from "@/components/ChatSidebar"
import ChatArea from "@/components/ChatArea"
import ChatInputBar from "@/components/ChatInputBar"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
}

export default function CareerCoachPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentRole, setCurrentRole] = useState<string>("default")

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
      console.log("[v0] Sending message to API:", { content, role: currentRole })

      // Build conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          role: currentRole,
          conversationHistory,
        }),
      })

      console.log("[v0] API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] API error response:", errorData)

        const userFriendlyMessage =
          errorData.userMessage || errorData.message || "Terjadi kesalahan. Silakan coba lagi."

        throw new Error(userFriendlyMessage)
      }

      const data = await response.json()
      console.log("[v0] API response data:", data)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          error instanceof Error ? error.message : "❌ Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onRoleChange={setCurrentRole} />

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
        </div>

        {/* Chat Messages Area */}
        <ChatArea messages={messages} isTyping={isTyping} />

        {/* Input Bar */}
        <ChatInputBar onSendMessage={handleSendMessage} disabled={isTyping} currentRole={currentRole} />
      </div>
    </div>
  )
}
