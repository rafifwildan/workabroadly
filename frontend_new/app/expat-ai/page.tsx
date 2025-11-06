"use client"

import { useState } from "react"
import { MessageSquare, Menu, X, Globe, Users } from "lucide-react"
import ChatSidebar from "@/components/ChatSidebar"
import ChatArea from "@/components/ChatArea"
import ChatInputBar from "@/components/ChatInputBar"
import Footer from "@/components/Footer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "ja", name: "Japan", flag: "🇯🇵" },
  { code: "ko", name: "Korea", flag: "🇰🇷" },
]

export default function AIExpatChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentRole, setCurrentRole] = useState<string>("user")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedCulture, setSelectedCulture] = useState("ko")

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
      const conversationHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      const theBody = JSON.stringify({
        message: content,
        role: currentRole,
        language: selectedLanguage,
        culture: selectedCulture
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: theBody,
      })

      if (!response.ok) {
        const errorData = await response.json()
        const userFriendlyMessage = errorData.userMessage || errorData.message || "An error occurred. Please try again."
        throw new Error(userFriendlyMessage)
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[0]
  const currentCulture = languages.find((lang) => lang.code === selectedCulture) || languages[0]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1">
        <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onRoleChange={setCurrentRole} />

        <div className="flex-1 flex flex-col">
          {/* Mobile header */}
          <div className="lg:hidden border-b border-gray-200 bg-white p-4 flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <MessageSquare className="w-5 h-5" />
            <h1 className="text-base font-semibold flex-1">Expat AI Consultant</h1>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full bg-transparent">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentCulture.name} Culture</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedCulture(lang.code)}
                    className={`cursor-pointer ${selectedCulture === lang.code ? "bg-accent" : ""}`}
                  >
                    <span className="text-lg mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full bg-transparent">
                  <Globe className="w-4 h-4" />
                  <span className="text-lg">{currentLanguage.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`cursor-pointer ${selectedLanguage === lang.code ? "bg-accent" : ""}`}
                  >
                    <span className="text-lg mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop header with Menu button to reopen sidebar when closed */}
          <div className="hidden lg:flex border-b border-gray-200 bg-white p-4 items-center justify-between">
            <div className="flex items-center gap-3">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-900"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <MessageSquare className="w-5 h-5" />
              <h1 className="text-lg font-semibold">Expat AI Consultant</h1>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full bg-transparent">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentCulture.name} Culture</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedCulture(lang.code)}
                    className={`cursor-pointer ${selectedCulture === lang.code ? "bg-accent" : ""}`}
                  >
                    <span className="text-lg mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full bg-transparent">
                  <Globe className="w-4 h-4" />
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="hidden sm:inline">{currentLanguage.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`cursor-pointer ${selectedLanguage === lang.code ? "bg-accent" : ""}`}
                  >
                    <span className="text-lg mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ChatArea messages={messages} isTyping={isTyping} />
          <ChatInputBar onSendMessage={handleSendMessage} disabled={isTyping} currentRole={currentRole} />
        </div>
      </div>
    </div>
  )
}
