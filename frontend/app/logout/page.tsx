"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      // Show confirmation
      const confirmed = window.confirm("Are you sure you want to logout?")
      
      if (confirmed) {
        // Perform logout
        await logout()
        // logout() sudah handle redirect ke /login
      } else {
        // Cancel - go back to previous page
        router.back()
      }
    }

    handleLogout()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg font-medium text-foreground">Logging out...</p>
      </div>
    </div>
  )
}