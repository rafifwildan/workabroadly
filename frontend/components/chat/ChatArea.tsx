"use client"

import { useRef, useEffect } from "react"
import MessageBubble, { TypingIndicator } from "./MessageBubble"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
}

interface ChatAreaProps {
  messages: Message[]
  isTyping?: boolean
}

export default function ChatArea({ messages, isTyping = false }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <div className="text-center max-w-2xl animate-fade-in">
          {/* Icon */}
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto shadow-md">
            <span className="text-6xl">💬</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-foreground mt-6">Selamat Datang!</h1>

          {/* Welcome Message */}
          <p className="text-lg text-primary mt-4 leading-relaxed">
            Tanyakan apa saja tentang persiapan bekerja di Korea dan Jepang. Saya akan membantu dengan informasi dari
            dokumen resmi.
          </p>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button className="rounded-full bg-primary/5 text-primary px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors">
              Visa requirements
            </button>
            <button className="rounded-full bg-primary/5 text-primary px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors">
              Document checklist
            </button>
            <button className="rounded-full bg-primary/5 text-primary px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors">
              Interview tips
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-card">
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
