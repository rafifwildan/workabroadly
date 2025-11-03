"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Drama, User, MessageSquare } from "lucide-react"
import { getMockUserUsage } from "@/lib/usage-calculator"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer"
import AppSidebar from "@/components/AppSidebar"
import PageHeader from "@/components/PageHeader"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const userUsage = getMockUserUsage()

  return (
    <div className="min-h-screen bg-white flex">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto pb-24 md:pb-0">
          <PageHeader
            title="Home"
            subtitle="Welcome back! Let's continue your journey"
            showProfile={true}
            sidebarOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <div className="p-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Role-Play Culture Practice</h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Drama className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Practice cultural scenarios through interactive role-playing characters from different backgrounds.
                </p>
                <Button
                  onClick={() => (window.location.href = "/role-play")}
                  className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-semibold"
                >
                  Start Practice
                </Button>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Expat AI Consultant</h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get instant help with expat-life challenges, visa questions, and local adaptation advice.
                </p>
                <Button
                  onClick={() => (window.location.href = "/expat-ai")}
                  className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-semibold"
                >
                  Start Chat
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <Link href="/profile?tab=activity" className="text-sm text-gray-900 hover:text-gray-700 font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Drama className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Completed Japanese Business Meeting scenario</p>
                    <p className="text-xs text-gray-500">2 hours ago • Role-Play Practice</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">Asked about visa renewal process</p>
                    <p className="text-xs text-gray-500">5 hours ago • Expat AI Chat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-4">
          <Link href="/home" className="flex flex-col items-center gap-1 px-4 py-2">
            <Home className="w-5 h-5 text-gray-900" />
            <span className="text-xs font-medium text-gray-900">Home</span>
          </Link>
          <Link href="/expat-ai" className="flex flex-col items-center gap-1 px-4 py-2">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Consultant</span>
          </Link>
          <Link href="/role-play" className="flex flex-col items-center gap-1 px-4 py-2">
            <Drama className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Role-Play</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 px-4 py-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
