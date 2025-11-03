"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { fetchScenarioById } from "@/lib/scenario"

interface Option {
  text: string
  score: number
  feedback?: string
  nextStep?: number
}

interface Step {
  id: number
  speaker: "assistant" | "user"
  script: string
  options?: Option[]
}

interface Scenario {
  _id: string
  title: string
  description: string
  category: string
  language: string
  difficulty: string
  steps: Step[]
}

export default function ScenarioDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [totalScore, setTotalScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    async function loadScenario() {
      try {
        const data = await fetchScenarioById(id as string)
        setScenario(data)
      } catch (error) {
        console.error("Failed to load scenario", error)
      } finally {
        setLoading(false)
      }
    }
    loadScenario()
  }, [id])

  const handleBack = () => {
    router.push("/role-play")
  }

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.text)
    setFeedback(option.feedback || null)
    setTotalScore((prev) => prev + option.score)

    setTimeout(() => {
      if (option.nextStep !== undefined) {
        const nextIndex = scenario?.steps.findIndex((s) => s.id === option.nextStep)
        if (nextIndex !== undefined && nextIndex !== -1) {
          setCurrentStepIndex(nextIndex)
          setSelectedOption(null)
          setFeedback(null)
          return
        }
      }

      setCurrentStepIndex((prev) => prev + 1)
      setSelectedOption(null)
      setFeedback(null)
    }, 1500)
  }

  const handleToggleHint = () => {
    setShowHint((prev) => !prev)
  }

  if (loading) {
    return <div className="text-center py-20 text-muted-foreground">Loading scenario...</div>
  }

  if (!scenario) {
    return <div className="text-center py-20 text-destructive">Scenario not found.</div>
  }

  const currentStep = scenario.steps[currentStepIndex]
  const isFinished = currentStepIndex >= scenario.steps.length

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* 🔹 Back Button di atas */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            ← Back to Scenarios
          </button>
          <div className="text-sm text-muted-foreground">
            💎 Score: {totalScore}
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground mb-2">{scenario.title}</h1>
        <p className="text-muted-foreground mb-6">{scenario.description}</p>
        <div className="flex items-center gap-3 mb-8 text-sm text-muted-foreground">
          <span>🎯 {scenario.category}</span>
          <span>🈶 {scenario.language}</span>
          <span>⚙️ {scenario.difficulty}</span>
        </div>

        {/* Hint Button */}
        {!isFinished && (
          <button
            onClick={handleToggleHint}
            className="mb-6 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90 transition"
          >
            {showHint ? "Hide Hint ❌" : "Show Hint 💡 (Translate to English)"}
          </button>
        )}

        {/* Main Section */}
        {!isFinished ? (
          <div className="border border-border rounded-2xl p-6 bg-card shadow-sm">
            <div className="mb-6">
              <p
                className={`text-lg ${
                  currentStep.speaker === "assistant" ? "text-primary" : "text-foreground"
                }`}
              >
                <strong>
                  {currentStep.speaker === "assistant" ? "Assistant" : "You"}:
                </strong>{" "}
                {showHint
                  ? translateToEnglish(currentStep.script)
                  : currentStep.script}
              </p>
            </div>

            {currentStep.options && (
              <div className="space-y-3">
                {currentStep.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left border rounded-xl px-4 py-3 transition-all ${
                      selectedOption === option.text
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-primary/10"
                    }`}
                  >
                    {showHint ? translateToEnglish(option.text) : option.text}
                  </button>
                ))}
              </div>
            )}

            {feedback && (
              <div className="mt-4 p-3 bg-muted rounded-lg text-muted-foreground italic">
                💬 {feedback}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">🎉 Roleplay Finished!</h2>
            <p className="text-muted-foreground mb-8">
              You’ve completed this scenario! Great job 🎯
            </p>

            {/* 🔹 Tombol Back juga di akhir */}
            <button
              onClick={handleBack}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              ← Back to Scenarios
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* Dummy translate */
function translateToEnglish(text: string) {
  return `${text} (English version)`
}
