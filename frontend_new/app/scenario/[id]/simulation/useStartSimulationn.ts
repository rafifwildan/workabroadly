"use client"

import { useState, useEffect } from "react"
import { ScenariosAPI, RoleplayAPI } from "@/lib/api"
import { getUserId } from "@/lib/user"

export function useStartSimulation(scenarioId: string) {
  const [scenario, setScenario] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        setError(null)

        // Ambil data skenario dari backend
        const fetchedScenario = await ScenariosAPI.get(scenarioId)
        setScenario(fetchedScenario)

        // Mulai sesi roleplay
        const userId = getUserId()
        const newSession = await RoleplayAPI.start({
          userId,
          scenarioId: fetchedScenario._id,
        })
        setSession(newSession)
      } catch (err: any) {
        console.error("❌ Error starting simulation:", err)
        setError(err.message || "Failed to start simulation.")
      } finally {
        setLoading(false)
      }
    }

    if (scenarioId) init()
  }, [scenarioId])

  return { scenario, session, loading, error }
}
