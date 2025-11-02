"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Message {
  role: "ai" | "user"
  content: string
}

interface ChatWindowProps {
  messages: Message[]
}

export function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
          <Card
            className={cn(
              "p-4 max-w-[80%]",
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            <p className="text-sm">{message.content}</p>
          </Card>
        </div>
      ))}
    </div>
  )
}
