"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Globe, Users } from "lucide-react"
import ChatSidebar from "@/components/ChatSidebar"
import ChatArea from "@/components/ChatArea"
import ChatInputBar from "@/components/ChatInputBar"
import CultureSelector from "@/components/CultureSelector"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getAuthHeader } from "@/lib/auth"
import { Language } from "@/lib/clara-menu-config"
import { formatSelectionMessage, getTranslation } from "@/lib/translations"
import { getCategoryById, getScenarioById, getRoleById } from "@/lib/clara-menu-config"

export const dynamic = 'force-dynamic';

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  messageType?: "normal" | "selection" | "navigation"
  insight?: string
  hasInsight?: boolean
}

interface ConversationState {
  step: number
  selectedCulture?: string
  selectedCategory?: string
  selectedScenario?: string
  selectedRole?: string
  isInRoleplay: boolean
}

const cultures = [
  { code: "en", name: "English", flag: "🌎" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
]

function AIExpatChatPage() {
  const searchParams = useSearchParams()
  const sessionIdFromUrl = searchParams.get("session")

  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentRole, setCurrentRole] = useState<string>("user")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedCulture, setSelectedCulture] = useState("ko")
  const [selectedPersona, setSelectedPersona] = useState("clara")
  const [showPersonaModal, setShowPersonaModal] = useState(true) // Show modal on initial load
  const [hasSelectedPersona, setHasSelectedPersona] = useState(false) // Track if persona has been selected
  const [hasCultureSelected, setHasCultureSelected] = useState(false) // Track if culture selected (for Sora/Arlo)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null) // Track current session
  const [conversationState, setConversationState] = useState<ConversationState>({
    step: 1,
    isInRoleplay: false
  })

  // Load session from URL parameter on mount
  useEffect(() => {
    if (sessionIdFromUrl) {
      handleLoadSession(sessionIdFromUrl)
    }
  }, [sessionIdFromUrl])

  // Clara menu handlers
  const handleMenuSelect = async (type: string, value: string) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    let selectionText = ""
    let newState = { ...conversationState }

    // Build selection message and update state
    if (type === "culture") {
      // NEW: Culture selection (Step 1)
      const culture = cultures.find(c => c.code === value)
      if (culture) {
        selectionText = `${culture.flag} ${culture.name}`
        newState = {
          ...newState,
          step: 2,
          selectedCulture: value,
        }
        // Update the selectedCulture state for the chat
        setSelectedCulture(value)
      }
    } else if (type === "category") {
      const category = getCategoryById(value)
      if (category) {
        selectionText = `${category.icon} ${getTranslation(category.translations, selectedLanguage as Language)}`
        newState = {
          ...newState,
          step: 3,
          selectedCategory: value,
        }
      }
    } else if (type === "scenario") {
      const scenario = getScenarioById(conversationState.selectedCategory!, value)
      if (scenario) {
        selectionText = getTranslation(scenario.translations, selectedLanguage as Language)
        newState = {
          ...newState,
          step: 4,
          selectedScenario: value,
        }
      }
    } else if (type === "role") {
      const role = getRoleById(conversationState.selectedCategory!, conversationState.selectedScenario!, value)
      if (role) {
        selectionText = getTranslation(role.translations, selectedLanguage as Language)
        newState = {
          ...newState,
          step: 5,
          selectedRole: value,
          isInRoleplay: true,
        }
      }
    }

    // Create selection message
    const selectionMessage: Message = {
      id: Date.now().toString(),
      content: formatSelectionMessage(selectionText, selectedLanguage as Language),
      sender: "user",
      timestamp,
      messageType: "selection",
    }

    setMessages((prev) => [...prev, selectionMessage])
    setConversationState(newState)

    // For role selection (step 5), trigger AI to start scene
    if (type === "role") {
      await handleSendMessage("", "ROLE_SELECT", newState)
    }
  }


  const handleSendMessage = async (content: string, messageType: string = "NORMAL", stateOverride?: ConversationState) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // Only add user message if content is not empty (menu selections already added)
    if (content.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: "user",
        timestamp,
      }
      setMessages((prev) => [...prev, userMessage])
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      sender: "ai",
      timestamp,
    }

    setIsTyping(true)

    try {
      const currentState = stateOverride || conversationState

      const theBody = JSON.stringify({
        message: content,
        sessionId: currentSessionId,
        persona: selectedPersona,
        language: selectedLanguage,
        culture: selectedCulture,
        messageType,
        conversationState: selectedPersona === "clara" ? currentState : undefined,
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: theBody,
      })

      if (!response.ok) {
        const errorData = await response.json()
        const userFriendlyMessage =
          errorData.userMessage ||
          errorData.message ||
          "An error occurred. Please try again."
        throw new Error(userFriendlyMessage)
      }

      // Check for new session ID in headers (for first message)
      const newSessionId = response.headers.get("X-Session-Id")
      if (newSessionId && !currentSessionId) {
        setCurrentSessionId(newSessionId)
        console.log(`[Chat] New session created: ${newSessionId}`)
      }

      // Check for updated conversation state (Clara only)
      const conversationStateHeader = response.headers.get("X-Conversation-State")
      if (conversationStateHeader && selectedPersona === "clara") {
        try {
          const updatedState = JSON.parse(conversationStateHeader)
          setConversationState(updatedState)
          console.log(`[Chat] Conversation state synced from backend:`, updatedState)
        } catch (e) {
          console.error("[Chat] Failed to parse conversation state header:", e)
        }
      }

      if (!response.body) throw new Error("Response body is null")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ""

      setIsTyping(false)
      setMessages((prev) => [...prev, aiMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        fullText += chunk

        setMessages((prev) => {
          const updated = [...prev]
          const lastIndex = updated.length - 1

          // Try to parse JSON for Clara responses
          let messageUpdate: Partial<Message> = { content: fullText }

          if (selectedPersona === "clara") {
            try {
              const parsed = JSON.parse(fullText)

              // Check if it's Clara's dialog/insight format
              if (parsed && typeof parsed === 'object' && parsed.dialog && parsed.insight) {
                messageUpdate = {
                  content: parsed.dialog,
                  insight: parsed.insight,
                  hasInsight: true
                }
              }
            } catch (error) {
              // Not valid JSON yet (streaming incomplete) or not Clara format
              // Keep as plain text
            }
          }

          updated[lastIndex] = { ...updated[lastIndex], ...messageUpdate }
          return updated
        })
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          error instanceof Error
            ? error.message
            : "An unknown error occurred. Please try again.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleNewSession = () => {
    // Clear current session and show persona selection modal
    setMessages([])
    setCurrentSessionId(null)
    setShowPersonaModal(true)
    setHasSelectedPersona(false)
    setHasCultureSelected(false)
    // Reset conversation state
    setConversationState({
      step: 1,
      isInRoleplay: false,
    })
  }

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona)
    setShowPersonaModal(false)
    setHasSelectedPersona(true)
    // Clear messages to show welcome screen
    setMessages([])
    // Initialize conversation state for Clara
    if (persona === "clara") {
      setConversationState({
        step: 1,
        isInRoleplay: false,
      })
      setHasCultureSelected(true) // Clara uses multi-step flow, doesn't need culture selector
    } else {
      // For Sora/Arlo, culture must be selected first
      setHasCultureSelected(false)
    }
  }

  const handleCultureSelect = (cultureCode: string) => {
    setSelectedCulture(cultureCode)
    setHasCultureSelected(true)
  }

  const handleSuggestionClick = (suggestion: string) => {
    // When user clicks a suggestion, send it as a message
    handleSendMessage(suggestion)
  }

  const handleLoadSession = async (sessionId: string) => {
    try {
      // Fetch session data from backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/sessions/${sessionId}`, {
        headers: getAuthHeader(),
      })

      if (!response.ok) {
        console.error("Failed to load session")
        return
      }

      const data = await response.json()
      const session = data.session

      // Set session state
      setCurrentSessionId(session.sessionId)
      setSelectedPersona(session.persona)
      setHasSelectedPersona(true)
      setShowPersonaModal(false)
      setHasCultureSelected(true) // If loading a session, culture was already selected

      // Load conversation state for Clara
      if (session.persona === "clara" && session.conversationState) {
        setConversationState(session.conversationState)
      }

      // Convert session messages to UI format
      const loadedMessages: Message[] = session.messages.map((msg: any, index: number) => ({
        id: `${session.sessionId}-${index}`,
        content: msg.content,
        sender: msg.role === "user" ? "user" : "ai",
        timestamp: new Date(msg.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }))

      setMessages(loadedMessages)
      console.log(`[Chat] Loaded session: ${sessionId} with ${loadedMessages.length} messages`)
    } catch (error) {
      console.error("Error loading session:", error)
    }
  }

  const currentLanguage = cultures.find((culture) => culture.code === selectedLanguage) || cultures[0]
  const currentCulture = cultures.find((culture) => culture.code === selectedCulture) || cultures[0]

  const personas = [
    {
      id: "clara",
      name: "Clara",
      image: "/images/Group 240.svg",
      title: "Cultural Role-Play Coach",
      description: "Social & Cultural adaptation",
      details: "Get help with understanding cultural norms, social etiquette, and building relationships by role-play practices."
    },
    {
      id: "sora",
      name: "Sora",
      image: "/images/Frame 123.svg",
      title: "Multi-Cultural Workplace Strategist",
      description: "Workplace & Career strategy",
      details: "Navigate workplace dynamics, negotiate offers, manage conflicts, and advance your career strategically."
    },
    {
      id: "arlo",
      name: "Arlo",
      image: "/images/Frame 122.svg",
      title: "Multi-Cultural Daily Life Guide",
      description: "Daily Life & Social Etiquette",
      details: "Your friendly guide for navigating daily social life. Get help with etiquette, invitations, dining, and building casual friendships."
    }
  ]

  const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0]

  return (
    // 🔴 PERUBAHAN 1: Ganti min-h-screen dengan h-screen + overflow-hidden
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Static Sidebar - tidak scroll */}
      <ChatSidebar
        onRoleChange={setCurrentRole}
        onNewSession={handleNewSession}
        onLoadSession={handleLoadSession}
        currentSessionId={currentSessionId}
      />

      {/* Main Content Area - struktur column dengan height penuh */}
      <div className="flex-1 flex flex-col h-full">
        {/* 🔴 PERUBAHAN 2: Fixed Header - tidak scroll */}
        <div className="flex-shrink-0 border-b border-gray-200 bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img
                src={currentPersona.image}
                alt={currentPersona.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{currentPersona.name}</h1>
              <p className="text-xs text-muted-foreground">{currentPersona.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selection Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full bg-transparent">
                  <Globe className="w-4 h-4" />
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="hidden sm:inline">{currentLanguage.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {cultures.map((culture) => (
                  <DropdownMenuItem
                    key={culture.code}
                    onClick={() => setSelectedLanguage(culture.code)}
                    className={`cursor-pointer ${selectedLanguage === culture.code ? "bg-accent" : ""}`}
                  >
                    <span className="text-lg mr-2">{culture.flag}</span>
                    <span>{culture.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 🔴 PERUBAHAN 3: Scrollable Chat Area - HANYA ini yang scroll */}
        <div className="flex-1 overflow-y-auto">
          {/* Show CultureSelector for Sora/Arlo if culture not selected yet */}
          {!hasCultureSelected && (selectedPersona === "sora" || selectedPersona === "arlo") && hasSelectedPersona ? (
            <div className="flex items-center justify-center h-full p-8">
              <CultureSelector
                onCultureSelect={handleCultureSelect}
                selectedLanguage={selectedLanguage}
                disabled={isTyping}
              />
            </div>
          ) : (
            <ChatArea
              messages={messages}
              isTyping={isTyping}
              showPersonaSelection={false}
              selectedPersona={selectedPersona}
              onPersonaSelect={handlePersonaSelect}
              selectedCulture={selectedCulture}
              selectedLanguage={selectedLanguage as Language}
              onSuggestionClick={handleSuggestionClick}
              conversationState={conversationState}
              onMenuSelect={handleMenuSelect}
            />
          )}
        </div>

        {/* 🔴 PERUBAHAN 4: Fixed Input Bar - tidak scroll */}
        {/* Hide input bar for Sora/Arlo until culture is selected */}
        {(hasCultureSelected || selectedPersona === "clara" || !hasSelectedPersona) && (
          <div className="flex-shrink-0">
            <ChatInputBar
              onSendMessage={(msg) => handleSendMessage(msg)}
              disabled={isTyping || !hasSelectedPersona}
              currentRole={currentRole}
              conversationStep={conversationState.step}
              language={selectedLanguage as Language}
              selectedPersona={selectedPersona}
            />
          </div>
        )}
      </div>

      {/* Persona Selection Overlay */}
      {showPersonaModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-3">Choose Your AI Coach</h2>
              <p className="text-gray-200 text-lg">Select the coach that best fits your needs</p>
            </div>

            {/* Persona Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => handlePersonaSelect(persona.id)}
                  className="bg-white rounded-2xl p-8 text-left transition-all hover:scale-105 hover:shadow-2xl group"
                >
                  {/* Avatar Profile Image */}
                  <div className="w-14 h-14 rounded-full overflow-hidden mb-6 group-hover:scale-110 transition-transform flex items-center justify-center bg-white">
                    <img
                      src={persona.image}
                      alt={persona.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{persona.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-4 uppercase tracking-wide">{persona.description}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{persona.details}</p>

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                      Start with {persona.name} →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Helper Text */}
            <p className="text-sm text-gray-200 text-center mt-8">
              💡 You can change language and culture settings anytime during the conversation
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AIExpatChatPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AIExpatChatPage />
    </Suspense>
  )
}
