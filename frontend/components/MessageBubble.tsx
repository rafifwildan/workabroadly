"use client"

import ReactMarkdown from 'react-markdown'

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
            text-sm leading-relaxed
          `}
        >
          {isUser ? (
            // User messages: plain text with whitespace preserved
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            // AI messages: render markdown
            <ReactMarkdown
              components={{
                div: ({ children }) => (
                  <div className="prose prose-sm max-w-none
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h1:text-xl prose-h1:mb-2 prose-h1:mt-3
                    prose-h2:text-lg prose-h2:mb-2 prose-h2:mt-3
                    prose-h3:text-base prose-h3:mb-1 prose-h3:mt-2
                    prose-p:mb-2 prose-p:leading-relaxed prose-p:text-foreground
                    prose-ul:my-2 prose-ul:list-disc prose-ul:pl-5
                    prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-5
                    prose-li:mb-1 prose-li:text-foreground
                    prose-strong:font-bold prose-strong:text-foreground
                    prose-em:italic prose-em:text-foreground
                    prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                    prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic"
                  >
                    {children}
                  </div>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
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