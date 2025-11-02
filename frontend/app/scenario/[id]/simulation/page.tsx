"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Message = {
  type: "scene" | "character" | "user"
  content: string
  translation?: string
}

type ResponseOption = {
  id: string
  text: string
  translation?: string
  culturalNote?: string
  isAppropriate: boolean
}

const responseOptions: ResponseOption[] = [
  {
    id: "1",
    text: "Hello, my name is John.",
    translation: "こんにちは、私の名前はジョンです。",
    culturalNote: "This is a casual greeting.",
    isAppropriate: false,
  },
  {
    id: "2",
    text: "Good morning, Tanaka-san. My name is John.",
    translation: "おはようございます、田中さん。私の名前はジョンです。",
    culturalNote: "This is a formal greeting.",
    isAppropriate: true,
  },
  // Additional response options can be added here
]

export default function SimulationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState(1)
  const totalScenes = 5
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "scene",
      content: "Tanaka-san enters the room and greets you warmly. She gestures for you to sit down.",
    },
    {
      type: "character",
      content: "Good morning! Thank you for coming today. Could you please introduce yourself?",
    },
  ])
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "suggestion"; message: string } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleResponseSelect = (optionId: string) => {
    setSelectedResponse(optionId)
  }

  const handleSubmitResponse = () => {
    const selected = responseOptions.find((opt) => opt.id === selectedResponse)
    if (!selected) return

    setIsProcessing(true)

    setMessages((prev) => [...prev, { type: "user", content: selected.text, translation: selected.translation }])

    setTimeout(() => {
      // Show feedback
      if (selected.isAppropriate) {
        setFeedback({
          type: "success",
          message:
            "Great job! Your greeting was appropriate. Using formal language shows respect in Japanese business culture. Next time, try adding a bow gesture.",
        })
      } else {
        setFeedback({
          type: "suggestion",
          message:
            "Consider this: While friendly, this greeting is too casual for a Japanese business interview. Try using more formal language like 'おはようございます' or 'Good morning, thank you for this opportunity.'",
        })
      }
      setShowFeedback(true)

      setTimeout(() => {
        setShowFeedback(false)
        setSelectedResponse(null)
        setIsProcessing(false)

        if (currentScene < totalScenes) {
          setCurrentScene((prev) => prev + 1)
          setMessages((prev) => [
            ...prev,
            {
              type: "scene",
              content: "Tanaka-san nods approvingly and leans forward with interest.",
            },
            {
              type: "character",
              content: "Tell me about your experience with React and TypeScript.",
            },
          ])
        } else {
          // Simulation complete
          router.push(`/scenario/${params.id}/results`)
        }
      }, 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-card border-b border-border shadow-sm p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">
              Scene {currentScene} of {totalScenes}
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(currentScene / totalScenes) * 100}%` }}
              />
            </div>
          </div>
          <div className="ml-6 flex items-center gap-4">
            <span className="text-sm text-foreground">⏱️ {formatTime(timeElapsed)}</span>
            <button
              onClick={() => router.push("/role-play")}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 pt-28 pb-36">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="soft-card rounded-2xl bg-gradient-to-br from-secondary/10 to-info/10 p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-card border-4 border-card shadow-md overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl">
                    👩‍💼
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Tanaka-san</h3>
                  <p className="text-sm text-muted-foreground">HR Manager</p>
                  <span className="inline-block mt-1 text-xs bg-card rounded-full px-3 py-1">😊 Friendly</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.type === "scene" && (
                    <div className="soft-card rounded-xl bg-warning/5 p-4 border-l-4 border-warning">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">🎬</span>
                        <p className="text-sm text-foreground italic">{message.content}</p>
                      </div>
                    </div>
                  )}
                  {message.type === "character" && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl flex-shrink-0">
                        👩‍💼
                      </div>
                      <div className="soft-card rounded-2xl rounded-bl-sm bg-muted p-4 shadow-md max-w-2xl">
                        <p className="text-base text-foreground">{message.content}</p>
                      </div>
                    </div>
                  )}
                  {message.type === "user" && (
                    <div className="flex items-start gap-3 justify-end">
                      <div className="soft-card rounded-2xl rounded-br-sm bg-primary p-4 shadow-md max-w-2xl">
                        <p className="text-base text-primary-foreground">{message.content}</p>
                        {message.translation && (
                          <p className="text-xs text-primary-foreground/70 italic mt-1">{message.translation}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isProcessing && !showFeedback && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl flex-shrink-0">
                    👩‍💼
                  </div>
                  <div className="soft-card rounded-2xl rounded-bl-sm bg-muted p-4 shadow-md">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {!showFeedback && !isProcessing && (
                <div className="pt-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Your Response:</h3>
                  <div className="space-y-3">
                    {responseOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleResponseSelect(option.id)}
                        className={`w-full text-left soft-card rounded-xl p-4 border-2 transition-all ${
                          selectedResponse === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/50 hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            checked={selectedResponse === option.id}
                            onChange={() => handleResponseSelect(option.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{option.text}</p>
                            {option.translation && (
                              <p className="text-xs text-muted-foreground italic mt-1">{option.translation}</p>
                            )}
                            {option.culturalNote && (
                              <p className="text-xs text-warning mt-1 flex items-center gap-1">
                                <span>⚠️</span>
                                {option.culturalNote}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <button
                      onClick={handleSubmitResponse}
                      disabled={!selectedResponse}
                      className="rounded-xl bg-primary text-primary-foreground px-8 py-3 shadow-md hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                    >
                      Respond
                    </button>
                  </div>
                </div>
              )}

              {showFeedback && feedback && (
                <div
                  className={`soft-card rounded-2xl p-6 border-l-4 ${
                    feedback.type === "success" ? "bg-success/5 border-success" : "bg-warning/5 border-warning"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{feedback.type === "success" ? "✅" : "💡"}</span>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">
                        {feedback.type === "success" ? "Great job!" : "Consider this..."}
                      </h4>
                      <p className="text-sm text-muted-foreground">{feedback.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block space-y-4">
            <div className="soft-card rounded-xl bg-card shadow-md p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💡</span>
                <h4 className="text-sm font-bold text-foreground">Cultural Note</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                In Japan, formal introductions are important. Always use appropriate honorifics.
              </p>
            </div>

            <div className="soft-card rounded-xl bg-card shadow-md p-4">
              <h4 className="text-sm font-bold text-foreground mb-3">Key Phrases</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>
                  <strong className="text-foreground">おはようございます</strong>
                  <br />
                  Good morning (formal)
                </div>
                <div>
                  <strong className="text-foreground">よろしくお願いします</strong>
                  <br />
                  Please treat me well
                </div>
              </div>
            </div>

            <div className="soft-card rounded-xl bg-card shadow-md p-4">
              <div className="space-y-2 text-xs">
                <div className="text-success">Correct responses: 3/5</div>
                <div className="text-muted-foreground">Scenes completed: {currentScene - 1}/5</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button className="text-sm text-muted-foreground hover:text-foreground">Skip Scene</button>
          <button
            disabled={!showFeedback}
            className="text-sm text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
