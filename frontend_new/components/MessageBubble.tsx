"use client";


import ReactMarkdown from "react-markdown";


interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  messageType?: "normal" | "selection" | "navigation";
  insight?: string;  // Cultural insight from Clara
  hasInsight?: boolean;  // Flag for rendering insight
}


interface MessageBubbleProps {
  message: Message;
}


export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const messageType = message.messageType || "normal";
  const isSelectionMessage = messageType === "selection";
  const isNavigationMessage = messageType === "navigation";


  // Special styling for selection/navigation messages
  const getBubbleStyle = () => {
    if (isUser) {
      if (isSelectionMessage) {
        return "bg-blue-100 text-blue-900 border-2 border-blue-300 rounded-2xl rounded-br-md shadow-sm";
      }
      if (isNavigationMessage) {
        return "bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-2xl rounded-br-md shadow-sm";
      }
      return "bg-primary text-primary-foreground rounded-2xl rounded-br-md shadow-md";
    }
    return "bg-muted text-foreground rounded-2xl rounded-bl-md shadow-sm border";
  };


  return (
    <div className={`flex mb-6 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
          <span className="text-sm">🤖</span>
        </div>
      )}


      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%] lg:max-w-2xl w-full`}>
        {/* Message Bubble */}
        <div className={`px-4 py-3 w-full ${getBubbleStyle()}`}>
          {isUser ? (
            // User messages: plain text with whitespace preserved
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
          ) : (
            // AI messages: render markdown with enhanced styling
            <div className="text-sm prose prose-sm max-w-none break-words overflow-hidden">
              <ReactMarkdown
                components={{
                  // Headers
                  h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-2 text-foreground first:mt-0 break-words">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-2 text-foreground first:mt-0 break-words">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1.5 text-foreground first:mt-0 break-words">{children}</h3>,


                  // Paragraphs
                  p: ({ children }) => <p className="mb-2.5 leading-relaxed text-foreground last:mb-0 break-words">{children}</p>,


                  // Lists
                  ul: ({ children }) => <ul className="my-2.5 ml-4 list-disc space-y-1.5 break-words">{children}</ul>,
                  ol: ({ children }) => <ol className="my-2.5 ml-4 list-decimal space-y-1.5 break-words">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed text-foreground break-words">{children}</li>,


                  // Emphasis
                  strong: ({ children }) => <strong className="font-bold text-foreground break-words">{children}</strong>,
                  em: ({ children }) => <em className="italic text-foreground break-words">{children}</em>,


                  // Blockquotes
                  blockquote: ({ children }) => <blockquote className="border-l-3 border-primary/50 pl-3 my-2.5 italic text-muted-foreground break-words">{children}</blockquote>,


                  // Code
                  code: ({ children, className }) => {
                    const isInline = !className;
                    if (isInline) {
                      return <code className="bg-muted-foreground/20 px-1.5 py-0.5 rounded text-xs font-mono break-all">{children}</code>;
                    }
                    return <code className="block bg-muted-foreground/10 p-3 rounded my-2.5 text-xs font-mono whitespace-pre-wrap break-words overflow-auto max-w-full">{children}</code>;
                  },

                  // Pre (for code blocks)
                  pre: ({ children }) => <pre className="bg-muted-foreground/10 p-3 rounded my-2.5 text-xs font-mono overflow-x-auto break-words whitespace-pre-wrap max-w-full">{children}</pre>,


                  // Links
                  a: ({ children, href }) => (
                    <a href={href} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors break-all" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),


                  // Horizontal Rule
                  hr: () => <hr className="my-3 border-t border-border" />,


                  // Tables
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-3">
                      <table className="min-w-full border-collapse border border-border rounded">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
                  tbody: ({ children }) => <tbody>{children}</tbody>,
                  tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
                  th: ({ children }) => <th className="border border-border px-3 py-2 text-left font-bold text-sm bg-muted/30 break-words">{children}</th>,
                  td: ({ children }) => <td className="border border-border px-3 py-2 text-sm break-words">{children}</td>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Cultural Insight Block (only for AI messages with insight) */}
        {!isUser && message.hasInsight && message.insight && (
          <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg w-full shadow-sm">
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-blue-800 mb-2 uppercase tracking-wide">
                  Cultural Insight from Clara
                </p>
                <div className="text-sm text-blue-900 prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      // Custom styling for insight markdown
                      p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
                      code: ({ children }) => <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
                      pre: ({ children }) => <pre className="bg-blue-100 p-3 rounded my-2 text-xs font-mono overflow-x-auto whitespace-pre-wrap">{children}</pre>,
                      strong: ({ children }) => <strong className="font-bold text-blue-950">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    }}
                  >
                    {message.insight}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timestamp */}
        <span className={`text-xs mt-1.5 ${isUser ? "text-primary/60" : "text-muted-foreground"}`}>{message.timestamp}</span>
      </div>


      {/* User Avatar (optional) */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ml-2 flex-shrink-0 mt-1">
          <span className="text-sm">👤</span>
        </div>
      )}
    </div>
  );
}


interface TypingIndicatorProps {
  personaName?: string;
}

export function TypingIndicator({ personaName = "AI" }: TypingIndicatorProps) {
  // Capitalize first letter
  const displayName = personaName.charAt(0).toUpperCase() + personaName.slice(1);

  return (
    <div className="flex justify-start mb-6">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
        <span className="text-sm">🤖</span>
      </div>
      <div className="flex flex-col max-w-[85%] lg:max-w-2xl">
        <div className="bg-muted rounded-2xl rounded-bl-md shadow-sm px-4 py-3 border">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
        <span className="text-xs mt-1.5 text-muted-foreground">{displayName} is thinking...</span>
      </div>
    </div>
  );
}


