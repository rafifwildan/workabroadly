"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Drama, User, MessageSquare, X, LogOut } from "lucide-react"
import UserPlanBadge from "@/components/UserPlanBadge"
import { getMockUserUsage } from "@/lib/usage-calculator"

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const userUsage = getMockUserUsage()

  const navItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/expat-ai", icon: MessageSquare, label: "Expat AI Consultant" },
    { href: "/role-play", icon: Drama, label: "Cultural Role-Play" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          ${isOpen ? "w-60" : "w-0 md:w-0"}
          bg-white border-r border-gray-200
          flex flex-col
          transition-all duration-300 ease-in-out
          overflow-hidden
        `}
      >
        <div className="p-8 border-b border-gray-200 flex items-center justify-between">
          <Link href="/home">
            <img src="/logo.jpeg" alt="WorkAbroadly" className="h-9 w-auto" />
          </Link>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-full p-3 font-medium transition-colors ${
                  isActive ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="pt-3">
            <Link href="/my-plan" className="block">
              <UserPlanBadge usage={userUsage} showDetails={true} />
            </Link>
            <Link
              href="/my-plan"
              className="block text-center text-sm text-gray-600 hover:text-gray-900 mt-2 font-medium"
            >
              Manage Plan
            </Link>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <Link
              href="/logout"
              className="flex items-center gap-3 rounded-full p-3 font-medium transition-colors hover:bg-red-50 text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
        <div className="flex items-center justify-around py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-4 py-2">
                <Icon className={`w-5 h-5 ${isActive ? "text-gray-900" : "text-gray-600"}`} />
                <span className={`text-xs ${isActive ? "font-medium text-gray-900" : "text-gray-600"}`}>
                  {item.label.split(" ")[0]}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
