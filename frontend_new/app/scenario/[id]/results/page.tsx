"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, TrendingUp, Lightbulb, Award, ArrowRight } from "lucide-react"

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const correctAnswers = Number.parseInt(searchParams.get("correct") || "4")
  const totalAnswers = Number.parseInt(searchParams.get("total") || "5")
  const percentage = Math.round((correctAnswers / totalAnswers) * 100)

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="border border-gray-200 rounded-3xl bg-white p-10 text-center shadow-lg">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Scenario Complete!</h1>
          <p className="text-lg text-gray-600 mb-2">Job Interview Practice - Japan</p>
          <p className="text-sm text-gray-500">Completed in 18 minutes</p>
        </div>

        <div className="border border-gray-200 rounded-2xl bg-white shadow-xl p-8 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {correctAnswers}/{totalAnswers} Correct Answers
          </div>
          <div className="text-6xl font-bold text-gray-900 mb-2">{percentage}%</div>
          <p className="text-lg text-gray-600 mb-3">Overall Performance</p>
          <div className="flex justify-center gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={percentage >= star * 20 ? "" : "opacity-30"}>
                ⭐
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-2xl bg-gray-50 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Strengths</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Excellent use of formal language</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Appropriate body language</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Good response timing</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Clear communication</span>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl bg-gray-50 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Areas to Practice</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Practice more technical vocabulary</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Work on keigo (polite speech)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Learn more business etiquette</span>
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-2xl bg-gray-50 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Next Scenario</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Morning Meeting</h3>
                <p className="text-xs text-gray-600 mb-2">Practice daily stand-up meetings and team discussions</p>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Medium</span>
                <button
                  onClick={() => router.push("/scenario/2")}
                  className="w-full mt-3 rounded-full bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Start Scenario
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => router.push("/role-play")}
            className="flex-1 rounded-full bg-black text-white px-6 py-3 shadow-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            Go back to Scenarios Library
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push("/home")}
            className="flex-1 rounded-full bg-white border-2 border-gray-300 text-gray-900 px-6 py-3 hover:bg-gray-50 transition-colors font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  )
}
