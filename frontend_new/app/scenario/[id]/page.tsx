"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Briefcase, MapPin, Clock, FileText, User, Target, Lightbulb } from "lucide-react"
import Footer from "@/components/Footer"

export default function ScenarioBriefPage({ params }: { params: { id: string } }) {
  const router = useRouter()

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
          {/* Hero Card */}
          <div className="border border-gray-200 rounded-lg bg-white p-10 shadow-sm">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-gray-900" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Interview Practice</h1>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Japan</span>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  15-20 minutes
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-900">Medium</span>
              </div>
            </div>
          </div>

          {/* Scenario Context */}
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Scenario Context</h2>
            </div>
            <p className="text-base text-gray-600 leading-relaxed">
              You are interviewing for a software engineer position at a Japanese tech company in Tokyo. The interviewer
              will ask about your technical skills, work experience, and cultural adaptation. You'll need to demonstrate
              both technical competence and cultural awareness.
            </p>
          </div>

          {/* Your Character */}
          <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Your Character</h2>
            </div>
            <div className="space-y-2 text-base text-gray-600">
              <p>
                <strong className="text-gray-900">Name:</strong> Alex Johnson
              </p>
              <p>
                <strong className="text-gray-900">Background:</strong> Software developer with 3 years experience
              </p>
              <p>
                <strong className="text-gray-900">Goal:</strong> Secure a job offer at a Japanese tech company
              </p>
              <p>
                <strong className="text-gray-900">Current situation:</strong> Preparing to relocate to Tokyo
              </p>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="border border-gray-200 rounded-lg bg-gray-50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">What You'll Learn</h2>
            </div>
            <ul className="space-y-2 text-base text-gray-600">
              <li>• Proper business greetings in Japanese</li>
              <li>• How to answer technical questions respectfully</li>
              <li>• Understanding hierarchy and formality</li>
              <li>• Reading social cues from the interviewer</li>
            </ul>
          </div>

          {/* Cultural Tips */}
          <div className="border border-gray-200 rounded-lg bg-gray-50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Cultural Tips</h2>
            </div>
            <div className="space-y-3 text-base text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-gray-900">•</span>
                <span>Always bow when greeting</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-900">•</span>
                <span>Use formal language (keigo)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-900">•</span>
                <span>Maintain professional demeanor</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-900">•</span>
                <span>Never interrupt the interviewer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg z-40">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            onClick={() => router.push("/role-play")}
            className="rounded-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 hover:bg-gray-50 transition-colors"
          >
            Go back to Scenarios Library
          </button>
          <button
            onClick={() => router.push(`/scenario/${params.id}/simulation`)}
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
