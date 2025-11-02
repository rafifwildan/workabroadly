"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SummaryPanelProps {
  strengths: string[]
  improvements: string[]
  vocabulary: string[]
  onTryAnother: () => void
  onReturnDashboard: () => void
}

export function SummaryPanel({
  strengths,
  improvements,
  vocabulary,
  onTryAnother,
  onReturnDashboard,
}: SummaryPanelProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Scenario Complete!</h2>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">Strengths</h3>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">Areas to Improve</h3>
        <ul className="space-y-2">
          {improvements.map((improvement, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>{improvement}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">Vocabulary Learned</h3>
        <ul className="space-y-2">
          {vocabulary.map((word, index) => (
            <li key={index} className="text-sm">
              {word}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onTryAnother} variant="outline" className="flex-1 bg-transparent" size="lg">
          Try Another Scenario
        </Button>
        <Button onClick={onReturnDashboard} className="flex-1" size="lg">
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
