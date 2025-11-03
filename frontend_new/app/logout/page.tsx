"use client"
import { ConfirmationModal } from "@/components/ConfirmationModal"

export default function LogoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ConfirmationModal
        title="Do you want to continue using the app?"
        onConfirm={() => (window.location.href = "/home")}
        onCancel={() => (window.location.href = "/")}
        confirmText="Back to Home"
        cancelText="Logout"
      />
    </div>
  )
}
