"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FeedbackModalProps {
  culturalNote: string
  languageTip: string
  onContinue: () => void
}

export function FeedbackModal({ culturalNote, languageTip, onContinue }: FeedbackModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="p-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-6">Feedback</h2>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Cultural Note</h3>
            <p className="text-sm">{culturalNote}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Language Tip</h3>
            <p className="text-sm">{languageTip}</p>
          </div>
        </div>

        <Button onClick={onContinue} className="w-full" size="lg">
          Continue
        </Button>
      </Card>
    </div>
  )
}
