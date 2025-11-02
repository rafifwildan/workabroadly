"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ScenarioBriefPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [checklist, setChecklist] = useState({
    resume: true,
    company: true,
    phrases: false,
    questions: false,
  })

  const toggleChecklistItem = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/role-play" className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-2">
          ← Back to Scenarios
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="soft-card rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-10 shadow-2xl">
          <div className="text-center">
            <div className="text-7xl mb-4">💼</div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Job Interview Practice</h1>
            <p className="text-base text-muted-foreground mb-4">🇯🇵 Japan</p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>⏱️ 15-20 minutes</span>
              <span className="px-3 py-1 rounded-full bg-warning/10 text-warning">Medium</span>
              <span>💎 10 tokens</span>
            </div>
          </div>
        </div>

        <div className="soft-card rounded-2xl bg-card shadow-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-bold text-foreground">Scenario Context</h2>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            You are interviewing for a software engineer position at a Japanese tech company in Tokyo. The interviewer
            will ask about your technical skills, work experience, and cultural adaptation. You'll need to demonstrate
            both technical competence and cultural awareness.
          </p>
        </div>

        <div className="soft-card rounded-2xl bg-card shadow-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">👤</span>
            <h2 className="text-xl font-bold text-foreground">Your Character</h2>
          </div>
          <div className="space-y-2 text-base text-muted-foreground">
            <p>
              <strong className="text-foreground">Name:</strong> Alex Johnson
            </p>
            <p>
              <strong className="text-foreground">Background:</strong> Software developer with 3 years experience
            </p>
            <p>
              <strong className="text-foreground">Goal:</strong> Secure a job offer at a Japanese tech company
            </p>
            <p>
              <strong className="text-foreground">Current situation:</strong> Preparing to relocate to Tokyo
            </p>
          </div>
        </div>

        <div className="soft-card rounded-2xl bg-warning/5 border-l-4 border-warning p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-bold text-foreground">What You'll Learn</h2>
          </div>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li>• Proper business greetings in Japanese</li>
            <li>• How to answer technical questions respectfully</li>
            <li>• Understanding hierarchy and formality</li>
            <li>• Reading social cues from the interviewer</li>
          </ul>
        </div>

        <div className="soft-card rounded-2xl bg-info/5 border-l-4 border-info p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold text-foreground">Cultural Tips</h2>
          </div>
          <div className="space-y-3 text-base text-muted-foreground">
            <div className="flex items-start gap-3">
              <span>🙇</span>
              <span>Always bow when greeting</span>
            </div>
            <div className="flex items-start gap-3">
              <span>🗣️</span>
              <span>Use formal language (keigo)</span>
            </div>
            <div className="flex items-start gap-3">
              <span>👔</span>
              <span>Maintain professional demeanor</span>
            </div>
            <div className="flex items-start gap-3">
              <span>⏰</span>
              <span>Never interrupt the interviewer</span>
            </div>
          </div>
        </div>

        <div className="soft-card rounded-2xl bg-card shadow-lg p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Preparation Checklist</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.resume}
                onChange={() => toggleChecklistItem("resume")}
                className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
              />
              <span className={checklist.resume ? "text-foreground" : "text-muted-foreground"}>Review your resume</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.company}
                onChange={() => toggleChecklistItem("company")}
                className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className={checklist.company ? "text-gray-700" : "text-gray-500"}>Research the company</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.phrases}
                onChange={() => toggleChecklistItem("phrases")}
                className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className={checklist.phrases ? "text-gray-700" : "text-gray-500"}>Practice key phrases</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.questions}
                onChange={() => toggleChecklistItem("questions")}
                className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className={checklist.questions ? "text-gray-700" : "text-gray-500"}>Prepare questions to ask</span>
            </label>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6 shadow-lg z-50">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-xl bg-card border-2 border-primary/30 text-primary px-6 py-3 hover:bg-primary/5 transition-colors"
          >
            Not Ready
          </button>
          <button
            onClick={() => router.push(`/scenario/${params.id}/simulation`)}
            className="flex-1 rounded-xl bg-primary text-primary-foreground px-8 py-3 shadow-md font-bold hover:bg-primary/90 transition-all animate-pulse"
          >
            Start Simulation
          </button>
        </div>
      </div>
    </div>
  )
}
