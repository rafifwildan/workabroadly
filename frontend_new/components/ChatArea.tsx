"use client"

import { useRef, useEffect } from "react"
import { MessageSquare } from "lucide-react"
import MessageBubble, { TypingIndicator } from "./MessageBubble"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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

  // ✅ Kondisi saat belum ada pesan
  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <div className="text-center max-w-2xl animate-fade-in">
          {/* Icon */}
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto shadow-md">
            <MessageSquare className="w-12 h-12 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-foreground mt-6">Welcome!</h1>

          {/* Welcome Message */}
          <p className="text-lg text-primary mt-4 leading-relaxed">
            Ask me anything about preparing to work in Korea and Japan. I will help you with information from official
            documents.
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

  // ✅ Saat sudah ada pesan
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-card">
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            {message.sender === "ai" ? (
              <div className="bg-gray-100 text-gray-900 rounded-2xl p-4 w-fit max-w-[80%] mr-auto">
                {/* Render markdown untuk balasan AI */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-2 leading-relaxed" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-semibold" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic text-gray-800" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc ml-5 mb-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal ml-5 mb-2" {...props} />
                    ),
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    a: ({ node, ...props }) => (
                      <a
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    code: ({ node, inline, ...props }) => (
                      <code
                        className={`${
                          inline
                            ? "bg-gray-200 px-1 rounded text-sm"
                            : "block bg-gray-200 p-2 rounded-md text-sm my-2 overflow-x-auto"
                        } text-gray-800 font-mono`}
                        {...props}
                      />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                <div className="text-xs text-gray-500 mt-2 text-right">
                  {message.timestamp}
                </div>
              </div>
            ) : (
              // Untuk pesan user, gunakan komponen MessageBubble bawaan
              <MessageBubble message={message} />
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
