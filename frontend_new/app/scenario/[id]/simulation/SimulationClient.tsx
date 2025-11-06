"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStartSimulation } from "./useStartSimulation"
import { useAnswerStep } from "./useAnswerStep"
import { useEndSimulation } from "./useEndSimulation"
import type { ScenarioOption } from "@/lib/api"

export default function SimulationClient({ id }: { id: string }) {
  const router = useRouter()

  // === Hooks for data & API ===
  const { scenario, session, loading, error } = useStartSimulation(id)
  const sessionId = session?._id
  const {
    submitAnswer,
    feedback,
    clearFeedback,
    isSubmitting,
    nextScene,
  } = useAnswerStep({
    sessionId: sessionId ?? "",
  })
  const { endSession } = useEndSimulation()

  // === Local states ===
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const currentScene = scenario?.scenes?.[currentSceneIndex]
  const totalScenes = scenario?.scenes?.length || 0

  // === Handle submit response ===
  const handleSubmitResponse = async () => {
    if (!currentScene || selectedOption === null || !sessionId) return
    const selected = currentScene.options[selectedOption]
    await submitAnswer({
      sceneOrder: currentScene.order,
      selectedOption: selected.text,
      optionNote: selected.note,
      sceneInsight: currentScene.insight,
    })
    setShowFeedback(true)
  }

  // === Continue or next scene ===
  const handleContinue = async () => {
    setShowFeedback(false)
    clearFeedback()
    setSelectedOption(null)

    if (nextScene) {
      setCurrentSceneIndex(nextScene - 1)
    } else if (currentSceneIndex + 1 < totalScenes) {
      setCurrentSceneIndex((prev) => prev + 1)
    } else if (sessionId) {
      await endSession(sessionId, scenario._id)
      router.push(`/scenario/${scenario._id}/results?sessionId=${sessionId}`)
    }
  }

  // === Render UI ===
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading simulation...
      </div>
    )

  if (error || !scenario)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error || "Scenario not found"}
      </div>
    )

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT SIDE */}
        <div className="flex-1 p-6">
          <h2 className="text-lg font-semibold">
            Scene {currentSceneIndex + 1} of {totalScenes}
          </h2>
          <p className="italic text-gray-600 mb-3">{currentScene?.situation}</p>
          <p className="text-lg font-medium mb-3">{currentScene?.dialogue}</p>

          {!showFeedback && (
            <>
              <h3 className="font-semibold mt-4 mb-2 text-lg">Your Response:</h3>
              {currentScene?.options?.map(
                (opt: ScenarioOption, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      selectedOption === idx
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <p>{opt.text}</p>
                    <p className="text-xs text-gray-500 italic">{opt.note}</p>
                  </div>
                )
              )}
              <button
                onClick={handleSubmitResponse}
                disabled={selectedOption === null || isSubmitting}
                className={`mt-4 px-4 py-2 rounded-full ${
                  selectedOption === null
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </>
          )}

          {showFeedback && feedback && (
            <div className="p-4 border rounded-lg bg-green-50 mt-4">
              <h3 className="font-semibold mb-2">Feedback:</h3>
              <p className="text-gray-800">{feedback.message}</p>
              {feedback.insight && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  {feedback.insight}
                </p>
              )}
              <button
                onClick={handleContinue}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Continue →
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l p-6 bg-gray-50">
          <h3 className="font-semibold mb-2">💡 Cultural Note</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {scenario.brief.culturalTips.map((tip: string, i: number) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
