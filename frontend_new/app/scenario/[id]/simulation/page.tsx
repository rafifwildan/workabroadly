"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Clock, X, CheckCircle, ArrowRight } from "lucide-react"
import { RoleplayAPI, ScenariosAPI } from "@/lib/api"
import { getUserId } from "@/lib/user"

type ScenarioStep = {
  id: string
  question: string
  options: {
    text: string
    feedback?: string
    nextStep?: string
    score?: number
  }[]
}

export default function SimulationPage() {
  const router = useRouter()
  const params = useParams()
  const scenarioId = Array.isArray(params?.id) ? params.id[0] : params?.id
  const userId = getUserId() // ✅ Ambil dari lib/user

  const [scenario, setScenario] = useState<any>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<ScenarioStep | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  // 🕒 Timer simulasi
  useEffect(() => {
    const t = setInterval(() => setTimeElapsed((v) => v + 1), 1000)
    return () => clearInterval(t)
  }, [])

  // 🚀 Load scenario + start session di backend
  useEffect(() => {
    async function init() {
      if (!scenarioId || scenarioId === "undefined") return

      try {
        console.log("🟢 Starting simulation:", { scenarioId, userId })

        const scenarioData = await ScenariosAPI.get(scenarioId)
        if (!scenarioData?._id && !scenarioData.id) {
          setError("Scenario not found.")
          setLoading(false)
          return
        }
        setScenario(scenarioData)

        const session = await RoleplayAPI.start({
          userId,
          scenarioId: scenarioData._id || scenarioId,
        })
        setSessionId(session._id)
        setCurrentStep(scenarioData.steps?.[0] || null)
      } catch (err: any) {
        console.error("❌ [FE] Error initializing simulation:", err)
        setError("Failed to start simulation. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [scenarioId, userId])

  // 🔘 Saat user memilih opsi
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  // 📤 Submit jawaban
  const handleSubmitResponse = async () => {
    if (!selectedOption || !sessionId || !currentStep) return
    setIsSubmitting(true)

    try {
      const res = await RoleplayAPI.answer({
        sessionId,
        stepId: currentStep.id,
        selectedOption,
      })

      setFeedback(res.feedback || "Good job!")

      // Next step
      const nextId = currentStep.options.find((o) => o.text === selectedOption)?.nextStep
      const nextStep = scenario.steps.find((s: ScenarioStep) => s.id === nextId)

      if (nextStep) {
        setTimeout(() => {
          setCurrentStep(nextStep)
          setSelectedOption(null)
          setFeedback(null)
          setIsSubmitting(false)
        }, 2500)
      } else {
        await RoleplayAPI.end({ sessionId })
        router.push(`/scenario/${scenarioId}/results`)
      }
    } catch (err: any) {
      console.error("❌ [FE] Error submitting answer:", err)
      setFeedback("There was an error submitting your response. Try again.")
      setIsSubmitting(false)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading simulation...
      </div>
    )
  }

  if (error || !scenario || !currentStep) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p>{error || "Scenario not found or invalid."}</p>
        <button
          onClick={() => router.push("/role-play")}
          className="mt-4 rounded-full bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
        >
          Back to Scenarios
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-600 font-medium">Step: {currentStep.id}</h2>
            <p className="text-lg font-bold text-gray-900">{scenario.title || "Roleplay Simulation"}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)}
            </span>
            <button onClick={() => setShowExitConfirm(true)} className="text-gray-600 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 pt-24 pb-36">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">{currentStep.question}</h3>

          <div className="space-y-3">
            {currentStep.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt.text)}
                disabled={isSubmitting}
                className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
                  selectedOption === opt.text
                    ? "border-black bg-gray-50"
                    : "border-gray-200 bg-white hover:border-gray-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    checked={selectedOption === opt.text}
                    onChange={() => handleOptionSelect(opt.text)}
                    className="mt-1"
                  />
                  <p className="text-gray-900 text-sm">{opt.text}</p>
                </div>
              </button>
            ))}
          </div>

          {selectedOption && !feedback && (
            <div className="text-center mt-6">
              <button
                onClick={handleSubmitResponse}
                disabled={isSubmitting}
                className="rounded-full bg-black text-white px-8 py-3 shadow-md hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition"
              >
                Submit
              </button>
            </div>
          )}

          {feedback && (
            <div className="border border-gray-300 rounded-2xl bg-gray-50 p-6 mt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-gray-700 flex-shrink-0" />
                <p className="text-sm text-gray-800">{feedback}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="rounded-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-2.5 hover:bg-gray-50 transition text-sm font-medium"
          >
            Exit
          </button>
          <button
            disabled={!feedback}
            onClick={() => handleSubmitResponse()}
            className="rounded-full bg-black text-white px-6 py-2.5 hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 transition flex items-center gap-2 text-sm font-medium shadow-md"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EXIT CONFIRMATION MODAL */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Exit Simulation?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to stop? Progress will not be saved.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 rounded-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 hover:bg-gray-50"
              >
                Continue
              </button>
              <button
                onClick={() => router.push("/role-play")}
                className="flex-1 rounded-full bg-black text-white px-6 py-3 hover:bg-gray-800"
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
