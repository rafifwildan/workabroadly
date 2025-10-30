"use client"
import { ConfirmationModal } from "@/components/shared/ConfirmationModal"

export default function LogoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ConfirmationModal
        title="Do you want to continue using the app?"
        onConfirm={() => (window.location.href = "/dashboard")}
        onCancel={() => (window.location.href = "/")}
        confirmText="Back to Dashboard"
        cancelText="Logout"
      />
    </div>
  )
}
