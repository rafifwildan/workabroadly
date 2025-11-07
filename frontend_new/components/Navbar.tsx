import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    // Ini adalah kode navbar 'fixed' Anda
    <nav className="border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="WorkAbroadly Logo" className="h-12 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300 hover:bg-gray-50 rounded-full px-8 py-6 text-base"
            >
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 text-base">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

