"use client"

import { useState } from "react"
import { RoleplayAPI } from "@/lib/api"

interface UseAnswerStepProps {
  sessionId: string
}

export function useAnswerStep({ sessionId }: UseAnswerStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ message: string; insight: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submitAnswer({
    stepOrder,
    selectedOption,
    optionNote,
    sceneInsight,
  }: {
    stepOrder: number
    selectedOption: string
    optionNote?: string
    sceneInsight?: string
  }) {
    try {
      setIsSubmitting(true)
      setError(null)

      // kirim jawaban user ke backend
      await RoleplayAPI.answer({
        sessionId,
        stepId: stepOrder, // sesuai controller backend
        selectedOption,
      })

      // simpan feedback & insight buat ditampilkan di UI
      setFeedback({
        message: optionNote || "Good response!",
        insight: sceneInsight || "",
      })
    } catch (err: any) {
      console.error("❌ Error submitting answer:", err)
      setError(err.message || "Failed to submit answer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function clearFeedback() {
    setFeedback(null)
  }

  return {
    submitAnswer,
    feedback,
    clearFeedback,
    isSubmitting,
    error,
  }
}
