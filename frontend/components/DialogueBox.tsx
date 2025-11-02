"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DialogueBoxProps {
  character: string
  text: string
  options: string[]
  onSelectOption: (option: string) => void
}

export function DialogueBox({ character, text, options, onSelectOption }: DialogueBoxProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [customResponse, setCustomResponse] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    if (selectedOption !== null) {
      onSelectOption(options[selectedOption])
    } else if (customResponse.trim()) {
      onSelectOption(customResponse)
    }
  }

  return (
    <div className="space-y-6">
      {/* Character Avatar */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{character[0]}</span>
        </div>
      </div>

      {/* Dialogue */}
      <Card className="p-6">
        <p className="text-sm text-muted-foreground mb-2">{character}</p>
        <p className="text-lg">{text}</p>
      </Card>

      {/* Response Options */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">Your response:</p>
        {options.map((option, index) => (
          <Card
            key={index}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-md",
              selectedOption === index && "ring-2 ring-primary",
            )}
            onClick={() => handleOptionClick(index)}
          >
            <p className="text-sm">{option}</p>
          </Card>
        ))}

        {/* Custom Response */}
        {!showCustomInput ? (
          <Button variant="outline" onClick={() => setShowCustomInput(true)} className="w-full">
            Custom response
          </Button>
        ) : (
          <Input
            value={customResponse}
            onChange={(e) => {
              setCustomResponse(e.target.value)
              setSelectedOption(null)
            }}
            placeholder="Type your custom response..."
            className="w-full"
          />
        )}
      </div>

      {/* Next Button */}
      <Button
        onClick={handleNext}
        disabled={selectedOption === null && !customResponse.trim()}
        className="w-full"
        size="lg"
      >
        Next
      </Button>
    </div>
  )
}
