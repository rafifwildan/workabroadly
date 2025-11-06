"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Briefcase, Clock, FileText, MapPin, User, Target, Lightbulb, Loader2 } from "lucide-react"
import { ScenariosAPI, RoleplayAPI } from "@/lib/api"
import Footer from "@/components/Footer"

export default function ScenarioBriefClient({ id }: { id: string }) {
  const router = useRouter()
  const [scenario, setScenario] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchScenario() {
      try {
        const data = await ScenariosAPI.get(id)
        setScenario(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchScenario()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading scenario...
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
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <Link href="/role-play" className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Scenarios
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 pb-32">
          {/* Hero */}
          <div className="border border-gray-200 rounded-lg bg-white p-10 shadow-sm text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-gray-900" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{scenario.title}</h1>
            <div className="flex justify-center gap-2 text-sm text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{scenario.language === "japanese" ? "Japan" : "Korea"}</span>
            </div>
            <div className="flex justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {scenario.duration ?? "10-15 minutes"}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-900 capitalize">
                {scenario.difficulty ?? "Medium"}
              </span>
            </div>
          </div>

          {/* Context */}
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Scenario Context</h2>
            </div>
            <p className="text-base text-gray-600">{scenario.description}</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg z-40">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            onClick={() => router.push("/role-play")}
            className="rounded-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            Go back
          </button>
          <button
            onClick={() => router.push(`/scenario/${id}/simulation`)}
            className="flex-1 rounded-full bg-black text-white px-8 py-3 shadow-md font-semibold hover:bg-gray-800 transition-all"
          >
            Start Simulation
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
