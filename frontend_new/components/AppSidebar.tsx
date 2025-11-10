"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Drama, User, MessageSquare, LogOut, Menu, X } from "lucide-react"
import UserPlanBadge from "@/components/UserPlanBadge"
 // import { getMockUserUsage } from "@/lib/usage-calculator" diganti yang sudah ada di database

export default function AppSidebar() {
  const pathname = usePathname()
 // const userUsage = getMockUserUsage()  diganti yang sudah ada di database
  const [isOpen, setIsOpen] = useState(true) // <--- Tambah state

  const navItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/expat-ai", icon: MessageSquare, label: "Expat AI Chat Bot" },
    { href: "/role-play", icon: Drama, label: "Cultural Role-Play" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <>
      {/* Tombol toggle di pojok kiri atas */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md border border-gray-200"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar utama */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-40
          bg-white border-r border-gray-200 flex flex-col justify-between
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
          md:w-64 md:translate-x-0
        `}
      >
        {/* Konten sidebar */}
        <div className={`${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} transition-opacity duration-300`}>
          {/* Top: Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link href="/home" className="flex items-center gap-2">
              <img src="/logo.jpeg" alt="WorkAbroadly" className="h-9 w-auto" />
            </Link>
          </div>

          {/* Navigation items */}
          <nav className="p-6 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-full p-3 font-medium transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom section: Plan + Logout */}
        <div className={`p-6 border-t border-gray-200 space-y-4 ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} transition-opacity`}>
          <div>
            {/* <UserPlanBadge usage={userUsage} showDetails={true} /> */}
            <Link
              href="/my-plan"
              className="block mt-2 text-center text-sm text-gray-900 hover:text-gray-700 hover:underline"
            >
              Manage Plan
            </Link>
          </div>

          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-full p-3 font-medium transition-colors hover:bg-red-50 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Overlay saat sidebar terbuka di mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
        />
      )}
    </>
  )
}
