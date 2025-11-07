"use client"

import Link from "next/link"
import { Menu, User } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle: string
  breadcrumb?: string
  showProfile?: boolean
  sidebarOpen: boolean
  onMenuClick: () => void
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  showProfile = false,
  sidebarOpen,
  onMenuClick,
}: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!sidebarOpen && (
            <button
              onClick={onMenuClick}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-900"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div>
            {breadcrumb && <div className="text-xs text-gray-500 mb-2">{breadcrumb}</div>}
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
            <p className="text-gray-700">{subtitle}</p>
          </div>
        </div>
        {showProfile && (
          <Link href="/profile">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <User className="w-6 h-6 text-gray-900" />
              </div>
              <div className="text-gray-900">
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-xs text-gray-600">Professional Member</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
