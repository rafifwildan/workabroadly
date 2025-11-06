"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RoleplayAPI } from "@/lib/api"

export function useEndSimulation() {
  const router = useRouter()
  const [isEnding, setIsEnding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function endSession(sessionId: string, scenarioId: string) {
    try {
      setIsEnding(true)
      setError(null)

      await RoleplayAPI.end({ sessionId })

      // redirect ke halaman hasil simulasi
      router.push(`/scenario/${scenarioId}/results`)
    } catch (err: any) {
      console.error("❌ Error ending session:", err)
      setError(err.message || "Failed to end simulation.")
    } finally {
      setIsEnding(false)
    }
  }

  return {
    endSession,
    isEnding,
    error,
  }
}
