"use client"

import { useState, type KeyboardEvent } from "react"

interface ChatInputBarProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  currentRole?: string
}

export default function ChatInputBar({ onSendMessage, disabled = false, currentRole = "default" }: ChatInputBarProps) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickMenu = (topic: string) => {
    let message = ""
    if (topic === "career") {
      message = "Saya ingin konsultasi tentang karir dan pekerjaan di luar negeri"
    } else if (topic === "visa") {
      message = "Saya ingin tahu tentang persyaratan visa dan dokumen"
    }
    if (message) {
      onSendMessage(message)
    }
  }

  const isInputEmpty = input.trim().length === 0

  return (
    <div className="border-t border-border bg-card p-4 lg:p-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        {currentRole === "default" && (
          <div className="flex gap-2 mb-3 flex-wrap">
            <button
              onClick={() => handleQuickMenu("career")}
              disabled={disabled}
              className="px-4 py-2 rounded-full bg-muted hover:bg-card border border-border text-sm text-foreground transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💼 Konsultasi Karir
            </button>
            <button
              onClick={() => handleQuickMenu("visa")}
              disabled={disabled}
              className="px-4 py-2 rounded-full bg-muted hover:bg-card border border-border text-sm text-foreground transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📋 Info Visa
            </button>
          </div>
        )}

        {/* Input Row */}
        <div className="flex items-center gap-3">
          {/* Text Input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan tentang bekerja di Korea atau Jepang..."
            disabled={disabled}
            rows={1}
            className="flex-1 rounded-full border-2 border-input bg-muted px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring focus:bg-card outline-none resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isInputEmpty || disabled}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
              ${
                isInputEmpty || disabled
                  ? "bg-muted cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              }
            `}
          >
            <svg
              className={`w-5 h-5 ${isInputEmpty || disabled ? "text-muted-foreground" : "text-primary-foreground"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-muted-foreground text-center mt-2">
          Tekan Enter untuk kirim, Shift + Enter untuk baris baru
        </p>
      </div>
    </div>
  )
}
