"use client"

import { useState } from "react"
import { RoleplayAPI } from "@/lib/api"

interface UseAnswerStepProps {
  sessionId: string
}

export function useAnswerStep({ sessionId }: UseAnswerStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ message: string; insight: string } | null>(null)
  const [nextScene, setNextScene] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submitAnswer({
    sceneOrder,
    selectedOption,
    optionNote,
    sceneInsight,
  }: {
    sceneOrder: number
    selectedOption: string
    optionNote?: string
    sceneInsight?: string
  }) {
    try {
      setIsSubmitting(true)
      setError(null)

      if (!sessionId) throw new Error("Missing sessionId")

      // backend mengembalikan { feedback?, culturalInsight?, nextScene?, isLastScene? }
      const res = await RoleplayAPI.answer({
        sessionId,
        sceneOrder,
        selectedOption,
      })

      setFeedback({
        message: res.feedback || optionNote || "Good response!",
        insight: res.culturalInsight || sceneInsight || "",
      })

      // simpan nextScene jika diberikan backend (angka urutan scene berikutnya)
      setNextScene(res.nextScene ?? null)
    } catch (err: any) {
      console.error("❌ Error submitting answer:", err)
      setError(err.message || "Failed to submit answer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function clearFeedback() {
    setFeedback(null)
    setNextScene(null)
  }

  return {
    submitAnswer,
    feedback,
    clearFeedback,
    isSubmitting,
    error,
    nextScene, // <<— penting: expose ke page.tsx
  }
}
