"use client"

import { useState, type KeyboardEvent } from "react"
import { Briefcase, ClipboardList } from "lucide-react"
import { getInputPlaceholder, type Language } from "@/lib/translations"

interface ChatInputBarProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  currentRole?: string
  conversationStep?: number  // For Clara's menu system
  language?: Language        // For translated placeholders
  selectedPersona?: string   // To determine if Clara mode
}

export default function ChatInputBar({
  onSendMessage,
  disabled = false,
  currentRole = "default",
  conversationStep = 0,
  language = "en" as Language,
  selectedPersona = ""
}: ChatInputBarProps) {
  const [input, setInput] = useState("")

  // For Clara's menu system, hide input during steps 1-4 (menu selection)
  const isClaraMenuMode = selectedPersona === "clara" && conversationStep >= 1 && conversationStep <= 4
  const isInputDisabled = disabled || isClaraMenuMode

  const handleSend = () => {
    if (input.trim() && !isInputDisabled) {
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
      message = "I would like to consult about career and work opportunities abroad"
    } else if (topic === "visa") {
      message = "I would like to know about visa requirements and documents"
    }
    if (message) {
      onSendMessage(message)
    }
  }

  const isInputEmpty = input.trim().length === 0

  // Get placeholder text based on conversation step and language
  const placeholder = conversationStep > 0
    ? getInputPlaceholder(conversationStep, language)
    : "Ask me..."

  return (
    <div className="border-t border-border bg-card p-4 lg:p-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        {/* Quick Menu Buttons - Only for non-Clara personas or when not in menu mode */}
        {currentRole === "default" && selectedPersona !== "clara" && (
          <div className="flex gap-2 mb-3 flex-wrap">
            <button
              onClick={() => handleQuickMenu("career")}
              disabled={disabled}
              className="px-4 py-2 rounded-full bg-muted hover:bg-card border border-border text-sm text-foreground transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Career Consultation</span>
            </button>
            <button
              onClick={() => handleQuickMenu("visa")}
              disabled={disabled}
              className="px-4 py-2 rounded-full bg-muted hover:bg-card border border-border text-sm text-foreground transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Visa Info</span>
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
            placeholder={placeholder}
            disabled={isInputDisabled}
            rows={1}
            className="flex-1 rounded-full border-2 border-input bg-muted px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring focus:bg-card outline-none resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isInputEmpty || isInputDisabled}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
              ${
                isInputEmpty || isInputDisabled
                  ? "bg-muted cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              }
            `}
          >
            <svg
              className={`w-5 h-5 rotate-90 ${isInputEmpty || isInputDisabled ? "text-muted-foreground" : "text-primary-foreground"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Helper Text - Hide during Clara menu mode */}
        {!isClaraMenuMode && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        )}

        {/* Show menu instruction during Clara menu mode */}
        {isClaraMenuMode && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Please select from the menu options above
          </p>
        )}
      </div>
    </div>
  )
}
