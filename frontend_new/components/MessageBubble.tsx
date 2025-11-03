"use client"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex mb-4 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-sm">🤖</span>
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Message Bubble */}
        <div
          className={`
            px-5 py-3.5 max-w-[70%] lg:max-w-xl
            ${
              isUser
                ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-md"
                : "bg-muted text-foreground rounded-2xl rounded-bl-sm shadow-sm"
            }
            text-sm leading-relaxed whitespace-pre-wrap
          `}
        >
          {message.content}
        </div>

        {/* Timestamp */}
        <span className={`text-xs mt-1 ${isUser ? "text-primary/60" : "text-muted-foreground"}`}>
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
        <span className="text-sm">🤖</span>
      </div>
      <div className="bg-muted rounded-2xl rounded-bl-sm shadow-sm px-5 py-3.5">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
