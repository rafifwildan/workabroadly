"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, X, ArrowRight, CheckCircle, AlertCircle, Lightbulb } from "lucide-react"

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
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAnswers, setTotalAnswers] = useState(0)

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
    setTotalAnswers((prev) => prev + 1)
    if (selected.isAppropriate) {
      setCorrectAnswers((prev) => prev + 1)
    }

    setMessages((prev) => [...prev, { type: "user", content: selected.text, translation: selected.translation }])

    setTimeout(() => {
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
            "Let's improve this together: While your response shows good intent, in Japanese business culture, formal language is essential. Try using 'おはようございます' (Good morning) with the person's name and an honorific like '-san'. This shows respect and professionalism. You're learning - keep practicing!",
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
          router.push(`/scenario/${params.id}/results?correct=${correctAnswers}&total=${totalAnswers}`)
        }
      }, 5000)
    }, 2000)
  }

  const handleSkipScene = () => {
    if (currentScene < totalScenes) {
      setCurrentScene((prev) => prev + 1)
      setShowFeedback(false)
      setSelectedResponse(null)
      setIsProcessing(false)
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
      router.push(`/scenario/${params.id}/results?correct=${correctAnswers}&total=${totalAnswers}`)
    }
  }

  const handleExitClick = () => {
    setShowExitConfirm(true)
  }

  const handleConfirmExit = () => {
    router.push("/role-play")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-1">
              Scene {currentScene} of {totalScenes}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-300"
                style={{ width: `${(currentScene / totalScenes) * 100}%` }}
              />
            </div>
          </div>
          <div className="ml-6 flex items-center gap-4">
            <span className="text-sm text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)}
            </span>
            <button
              onClick={handleExitClick}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Exit simulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 pt-28 pb-36">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Character Card */}
            <div className="border border-gray-200 rounded-2xl bg-gray-50 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center text-2xl">
                  👩‍💼
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Tanaka-san</h3>
                  <p className="text-sm text-gray-600">HR Manager</p>
                  <span className="inline-block mt-1 text-xs bg-white rounded-full px-3 py-1 border border-gray-200">
                    Friendly
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.type === "scene" && (
                    <div className="border border-gray-200 rounded-xl bg-gray-50 p-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 italic">{message.content}</p>
                      </div>
                    </div>
                  )}
                  {message.type === "character" && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl flex-shrink-0">
                        👩‍💼
                      </div>
                      <div className="border border-gray-200 rounded-2xl rounded-bl-sm bg-gray-50 p-4 shadow-sm max-w-2xl">
                        <p className="text-base text-gray-900">{message.content}</p>
                      </div>
                    </div>
                  )}
                  {message.type === "user" && (
                    <div className="flex items-start gap-3 justify-end">
                      <div className="border border-black rounded-2xl rounded-br-sm bg-black p-4 shadow-sm max-w-2xl">
                        <p className="text-base text-white">{message.content}</p>
                        {message.translation && (
                          <p className="text-xs text-gray-300 italic mt-1">{message.translation}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isProcessing && !showFeedback && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl flex-shrink-0">
                    👩‍💼
                  </div>
                  <div className="border border-gray-200 rounded-2xl rounded-bl-sm bg-gray-50 p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {!showFeedback && !isProcessing && (
                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Your Response:</h3>
                  <div className="space-y-3">
                    {responseOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleResponseSelect(option.id)}
                        className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
                          selectedResponse === option.id
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-md"
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
                            <p className="text-sm text-gray-900">{option.text}</p>
                            {option.translation && (
                              <p className="text-xs text-gray-600 italic mt-1">{option.translation}</p>
                            )}
                            {option.culturalNote && (
                              <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
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
                      className="rounded-full bg-black text-white px-8 py-3 shadow-md hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-base font-medium"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {showFeedback && feedback && (
                <div
                  className={`border-2 rounded-2xl p-6 ${
                    feedback.type === "success" ? "bg-gray-50 border-gray-900" : "bg-gray-50 border-gray-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {feedback.type === "success" ? (
                      <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0" />
                    ) : (
                      <Lightbulb className="w-6 h-6 text-gray-700 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {feedback.type === "success" ? "Great job!" : "Consider this..."}
                      </h4>
                      <p className="text-sm text-gray-700">{feedback.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-gray-900" />
                <h4 className="text-sm font-bold text-gray-900">Cultural Note</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                In Japan, formal introductions are important. Always use appropriate honorifics.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-4">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Key Phrases</h4>
              <div className="space-y-2 text-xs text-gray-600">
                <div>
                  <strong className="text-gray-900">おはようございます</strong>
                  <br />
                  Good morning (formal)
                </div>
                <div>
                  <strong className="text-gray-900">よろしくお願いします</strong>
                  <br />
                  Please treat me well
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-4">
              <div className="space-y-2 text-xs">
                <div className="text-gray-900 font-semibold">Correct responses: {correctAnswers}/5</div>
                <div className="text-gray-600">Scenes completed: {currentScene - 1}/5</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={handleSkipScene}
            className="rounded-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Skip Scene
          </button>
          <button
            disabled={!showFeedback}
            className="rounded-full bg-black text-white px-6 py-2.5 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium shadow-md"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showExitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Exit Practice?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to stop the practice? Your progress will not be saved.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 rounded-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Practice
              </button>
              <button
                onClick={handleConfirmExit}
                className="flex-1 rounded-full bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors font-medium"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
