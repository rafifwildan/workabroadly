"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, X, ArrowRight, CheckCircle, Lightbulb } from "lucide-react"
import { useStartSimulation } from "./useStartSimulationn"
import { useAnswerStep } from "./useAnswerStep"
import { useEndSimulation } from "./useEndSimulation"

export default function SimulationPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // === Hooks for data & API ===
  const { scenario, session, loading, error } = useStartSimulation(params.id)
  const { submitAnswer, feedback, clearFeedback, isSubmitting } = useAnswerStep({
    sessionId: session?._id || "",
  })
  const { endSession } = useEndSimulation()

  // === Local UI States ===
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentScene = scenario?.scenes?.[currentSceneIndex]
  const totalScenes = scenario?.scenes?.length || 0

  // === Handle submit response ===
  const handleSubmitResponse = async () => {
    if (!currentScene || selectedOption === null || !session) return
    const selected = currentScene.options[selectedOption]

    await submitAnswer({
      stepOrder: currentScene.order,
      selectedOption: selected.text,
      optionNote: selected.note,
      sceneInsight: currentScene.insight,
    })

    setShowFeedback(true)
  }

  // === Continue to next scene or end session ===
  const handleContinue = async () => {
    setShowFeedback(false)
    clearFeedback()
    setSelectedOption(null)

    if (currentSceneIndex + 1 < totalScenes) {
      setCurrentSceneIndex((prev) => prev + 1)
    } else if (session?._id) {
      await endSession(session._id, scenario._id)
    }
  }

  const handleSkipScene = async () => {
    if (currentSceneIndex + 1 < totalScenes) {
      setCurrentSceneIndex((prev) => prev + 1)
    } else if (session?._id) {
      await endSession(session._id, scenario._id)
    }
  }

  const handleExitClick = () => setShowExitConfirm(true)
  const handleConfirmExit = () => router.push("/role-play")

  // === Loading & error handling ===
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading simulation...
      </div>
    )
  }

  if (error || !scenario) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error || "Scenario not found"}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-600 mb-1">
              Scene {currentSceneIndex + 1} of {totalScenes}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-300"
                style={{ width: `${((currentSceneIndex + 1) / totalScenes) * 100}%` }}
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

      {/* Main */}
      <div className="flex-1 pt-28 pb-36">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Character Card */}
            <div className="border border-gray-200 rounded-2xl bg-gray-50 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {scenario.language === "japanese" ? "Tanaka-san" : "Mr. Park"}
                  </h3>
                  <p className="text-sm text-gray-600">Manager</p>
                  <span className="inline-block mt-1 text-xs bg-white rounded-full px-3 py-1 border border-gray-200">
                    Professional
                  </span>
                </div>
              </div>
            </div>

            {/* Scene Description */}
            {currentScene && (
              <div className="border border-gray-200 rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 italic whitespace-pre-line">
                    {currentScene.situation}
                  </p>
                </div>
              </div>
            )}

            {/* Response Options */}
            {!showFeedback && !isSubmitting && currentScene && (
              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Your Response:</h3>
                <div className="space-y-3">
                  {currentScene.options.map((opt: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
                        selectedOption === idx
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-md"
                      }`}
                    >
                      <p className="text-sm text-gray-900">{opt.text}</p>
                    </button>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={handleSubmitResponse}
                    disabled={selectedOption === null}
                    className="rounded-full bg-black text-white px-8 py-3 shadow-md hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-base font-medium"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && feedback && (
              <div className="border-2 rounded-2xl p-6 bg-gray-50 border-gray-900">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Cultural Feedback</h4>
                    <p className="text-sm text-gray-700 mb-4 whitespace-pre-line">{feedback.message}</p>
                    {feedback.insight && (
                      <p className="text-sm text-gray-700 italic whitespace-pre-line">💡 {feedback.insight}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-gray-900" />
                <h4 className="text-sm font-bold text-gray-900">Cultural Note</h4>
              </div>
              <ul className="list-disc list-inside text-xs text-gray-600 leading-relaxed space-y-1">
                {scenario?.brief?.culturalTips?.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
            onClick={handleContinue}
            className="rounded-full bg-black text-white px-6 py-2.5 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium shadow-md"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exit Modal */}
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
