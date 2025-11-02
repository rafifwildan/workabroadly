"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DialogueBox } from "@/components/DialogueBox"
import { FeedbackModal } from "@/components/FeedbackModal"
import { SummaryPanel } from "@/components/SummaryPanel"
import { ArrowLeft } from "lucide-react"

type Stage = "brief" | "simulation" | "feedback" | "summary"

export default function ScenarioPage() {
  const [stage, setStage] = useState<Stage>("brief")
  const [currentDialogue, setCurrentDialogue] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  // Mock scenario data
  const scenarioData = {
    title: "Job Interview",
    context:
      "You are interviewing for a position at a manufacturing company in Japan. The interviewer will ask you about your experience and motivation.",
    dialogues: [
      {
        character: "Interviewer",
        text: "Good morning. Please tell me about yourself.",
        options: [
          "Good morning. I have 5 years of experience in manufacturing.",
          "Hello. I'm very excited to be here today.",
          "Hi. I want to work in Japan.",
        ],
      },
      {
        character: "Interviewer",
        text: "Why do you want to work in Japan?",
        options: [
          "I want to learn Japanese culture and improve my skills.",
          "Japan has good salary.",
          "My friend works here.",
        ],
      },
    ],
  }

  const handleStartSimulation = () => {
    setStage("simulation")
  }

  const handleResponseSelect = () => {
    setShowFeedback(true)
  }

  const handleContinue = () => {
    setShowFeedback(false)
    if (currentDialogue < scenarioData.dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1)
    } else {
      setStage("summary")
    }
  }

  const handleTryAnother = () => {
    window.location.href = "/role-play"
  }

  const handleReturnDashboard = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/role-play")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">{scenarioData.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {stage === "brief" && (
          <div>
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-4">{scenarioData.title}</h2>
              <p className="text-muted-foreground mb-6">{scenarioData.context}</p>
              <Button onClick={handleStartSimulation} size="lg" className="w-full">
                Start Simulation
              </Button>
            </Card>
          </div>
        )}

        {stage === "simulation" && (
          <div>
            <DialogueBox
              character={scenarioData.dialogues[currentDialogue].character}
              text={scenarioData.dialogues[currentDialogue].text}
              options={scenarioData.dialogues[currentDialogue].options}
              onSelectOption={handleResponseSelect}
            />
          </div>
        )}

        {stage === "summary" && (
          <SummaryPanel
            strengths={["Good eye contact", "Clear pronunciation", "Appropriate responses"]}
            improvements={["Use more formal language", "Provide more specific examples"]}
            vocabulary={["製造業 (manufacturing)", "経験 (experience)", "動機 (motivation)"]}
            onTryAnother={handleTryAnother}
            onReturnDashboard={handleReturnDashboard}
          />
        )}
      </main>

      {showFeedback && (
        <FeedbackModal
          culturalNote="In Japanese job interviews, it's important to show humility and enthusiasm for learning."
          languageTip="Use 'です・ます' form for polite conversation in professional settings."
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}
