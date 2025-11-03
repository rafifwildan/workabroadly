import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.jpeg" alt="WorkAbroadly Logo" className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
