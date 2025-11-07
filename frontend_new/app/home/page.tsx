"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Drama, User, MessageSquare, Menu } from "lucide-react"
//import { getMockUserUsage } from "@/lib/usage-calculator"  Untuk testing, nanti diganti dengan data dari database
import { Button } from "@/components/ui/button"
import AppSidebar from "@/components/AppSidebar"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  //const userUsage = getMockUserUsage()  Untuk testing, nanti diganti dengan data dari database

  // Deteksi scroll untuk efek shadow header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <AppSidebar />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* HEADER sticky */}
        <div
          className={`bg-black p-8 sticky top-0 z-50 transition-shadow ${
            isScrolled ? "shadow-lg shadow-gray-800/30" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors text-white"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Home</h2>
                <p className="text-gray-300">
                  Welcome back! Choose your AI assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <User className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-white">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-xs text-gray-300">
                    Professional Member
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto pb-24 md:pb-0">
          <div className="p-8 space-y-12">
            {/* 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Role-Play Card
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Role-Play Culture Practice
                    </h3>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Drama className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Practice cultural scenarios through interactive role-playing
                  with AI characters from different backgrounds.
                </p>
                <Button
                  onClick={() => (window.location.href = "/role-play")}
                  className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-semibold"
                >
                  Start Practice
                </Button>
              </div> */}

              {/* Expat AI Consultant Card */}
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-200 overflow-hidden">
                {/* Gambar sebagai header */}
                <div className="relative w-full h-[170px] bg-gradient-to-br from-pink-100 to-pink-200 rounded-t-3xl overflow-hidden">
                  <Image
                    src="/images/expat-AI.png"
                    alt="Illustration for Expat AI Consultant"
                    fill
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center 10%' // Fokus ke atas agar kepala terlihat
                    }}
                    className="rounded-t-3xl"
                  />
                </div>
                
                {/* Konten kartu di area putih */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Expat AI Consultant
                      </h3>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-100 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    Get instant help with expat-life challenges, visa questions,
                    and local adaptation advice.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/expat-ai")}
                    className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-semibold"
                  >
                    Subscribe now
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
                <Link
                  href="/activity"
                  className="text-sm text-gray-900 hover:text-gray-700 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Drama className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      Completed Japanese Business Meeting scenario
                    </p>
                    <p className="text-xs text-gray-500">
                      2 hours ago • Role-Play Practice
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      Asked about visa renewal process
                    </p>
                    <p className="text-xs text-gray-500">
                      5 hours ago • Expat AI Chat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-4">
          <Link href="/home" className="flex flex-col items-center gap-1 px-4 py-2">
            <Home className="w-5 h-5 text-gray-900" />
            <span className="text-xs font-medium text-gray-900">Home</span>
          </Link>
          <Link href="/expat-ai" className="flex flex-col items-center gap-1 px-4 py-2">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Chat Bot</span>
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