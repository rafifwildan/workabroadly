"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  title: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

export function ConfirmationModal({
  title,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationModalProps) {
  return (
    <Card className="p-8 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
      <div className="flex gap-4">
        <Button onClick={onConfirm} className="flex-1" size="lg">
          {confirmText}
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent" size="lg">
          {cancelText}
        </Button>
      </div>
    </Card>
  )
}
