"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { RoleplayAPI, ScenariosAPI } from "@/lib/api"

export default function ResultsClient({ scenarioId }: { scenarioId: string }) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("sessionId") || ""
  const router = useRouter()

  const [session, setSession] = useState<any>(null)
  const [scenario, setScenario] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResults() {
      try {
        if (!sessionId) throw new Error("Missing sessionId")

        setLoading(true)
        setError(null)

        // ✅ Fetch session + scenario paralel
        const [sess, scen] = await Promise.all([
          RoleplayAPI.session(sessionId),
          ScenariosAPI.get(scenarioId),
        ])

        setSession(sess)
        setScenario(scen)
      } catch (err: any) {
        console.error("❌ Error loading results:", err)
        setError(err.message || "Failed to load results.")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [sessionId, scenarioId])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading results...
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Error: {error}
      </div>
    )

  if (!session || !scenario)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        No results available.
      </div>
    )

  const totalScenes = scenario.scenes?.length ?? session.answers?.length ?? 0

  const getInsight = (order: number): string =>
    scenario.scenes?.find((s: any) => s.order === order)?.insight ||
    "No cultural insight available."

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">Simulation Complete</h1>
            <p className="text-gray-600">
                <strong>Total Answers:</strong> {session.answers?.length ?? 0}
            </p>
        </div>


      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
        <div className="space-y-4">
            {session.answers?.map(
                (ans: { sceneOrder: number; selectedOption: string }, idx: number) => {
                const scene = scenario.scenes?.find((s: any) => s.order === ans.sceneOrder)

                // 🔍 Coba ambil teks scene dari berbagai kemungkinan field
                const sceneDialogue =
                    scene?.prompt ||
                    scene?.dialogue ||
                    scene?.text ||
                    scene?.description ||
                    scene?.situation ||
                    ""

                return (
                    <div
                    key={idx}
                    className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                    >
                    <h3 className="font-semibold text-gray-800 mb-2">
                        Scene {ans.sceneOrder} / {totalScenes}
                    </h3>

                    {/* Tampilkan dialog jika ada */}
                    {sceneDialogue && (
                        <p className="italic text-gray-700 mb-2">“{sceneDialogue}”</p>
                    )}

                    <p className="text-gray-700 mb-2">
                        <strong>Chosen:</strong> {ans.selectedOption}
                    </p>

                    <p className="text-gray-600 italic">{scene?.insight}</p>
                    </div>
                )
                }
            )}
            </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => router.push("/role-play")}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          ← Back to Scenarios
        </button>
        <button
          onClick={() => router.push(`/scenario/${scenarioId}/simulation`)}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          Retry Scenario ↻
        </button>
      </div>
    </div>
  )
}
