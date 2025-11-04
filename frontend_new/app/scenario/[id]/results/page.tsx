"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { RoleplayAPI, type RoleplaySession } from "@/lib/api"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const search = useSearchParams()
  const router = useRouter()
  const sessionId = search.get("sessionId") || ""
  const [session, setSession] = useState<RoleplaySession | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        if (!sessionId) throw new Error("Missing sessionId")
        const s = await RoleplayAPI.session(sessionId)
        setSession(s)
      } catch (e:any) {
        setErr(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [sessionId])

  if (loading) return <div className="p-6">Loading results…</div>
  if (err || !session) return <div className="p-6 text-red-600">Error: {err || "Session not found"}</div>

  const totalAnswers = session.answers.length
  const totalScore = session.totalScore

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="border rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Simulation Complete</h1>
          <div className="text-gray-700">Session ID: {session._id}</div>
          <div className="mt-3">Total Answers: <b>{totalAnswers}</b></div>
          <div>Total Score: <b>{totalScore}</b></div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Your Answers</h2>
          <div className="space-y-2">
            {session.answers.map((a, i) => (
              <div key={i} className="text-sm border rounded p-3">
                <div className="opacity-60 mb-1">Step {a.stepId}</div>
                <div>Chosen: {a.selectedOption}</div>
                {"feedback" in a && a.feedback ? <div className="mt-1 text-gray-600">Feedback: {a.feedback}</div> : null}
                <div className="mt-1">Score +{a.score}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => router.push("/role-play")} className="px-4 py-2 rounded border hover:bg-gray-50">
            Back to Scenarios
          </button>
          <button onClick={() => router.push(`/scenario/${params.id}`)} className="px-4 py-2 rounded bg-gray-900 text-white">
            Retry Scenario
          </button>
        </div>
      </div>
    </div>
  )
}
