"use client"

import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface ScenarioCardProps {
  title: string
  description: string
  onClick?: () => void
}

export function ScenarioCard({ title, description, onClick }: ScenarioCardProps) {
  return (
    <Card className="p-6 cursor-pointer transition-all hover:shadow-md" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>
    </Card>
  )
}
