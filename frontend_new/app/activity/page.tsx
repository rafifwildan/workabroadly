"use client"

import { useState } from "react"
import Link from "next/link"
import AppSidebar from "@/components/AppSidebar"
import Footer from "@/components/Footer"
import { Menu, ArrowLeft, MessageSquare, Drama, CreditCard } from "lucide-react"

type ActivityFilter = "all" | "chats" | "roleplays" | "purchases"

export default function ActivityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filter, setFilter] = useState<ActivityFilter>("all")

  const activities = [
    {
      id: 1,
      type: "chat",
      title: "Completed Expat AI Chat",
      description: "Discussed visa requirements for Japan",
      timestamp: "2 hours ago",
      date: "Nov 2, 2025",
    },
    {
      id: 2,
      type: "roleplay",
      title: "Completed Role-Play Practice",
      description: "Business Meeting Etiquette in Japan",
      timestamp: "1 day ago",
      date: "Nov 1, 2025",
    },
    {
      id: 3,
      type: "purchase",
      title: "Purchased Credits",
      description: "Added 250 credits to your account",
      timestamp: "3 days ago",
      date: "Oct 30, 2025",
    },
    {
      id: 4,
      type: "chat",
      title: "Completed Expat AI Chat",
      description: "Asked about workplace culture in Korea",
      timestamp: "5 days ago",
      date: "Oct 28, 2025",
    },
    {
      id: 5,
      type: "roleplay",
      title: "Completed Role-Play Practice",
      description: "Email Communication in Korean Business",
      timestamp: "1 week ago",
      date: "Oct 26, 2025",
    },
    {
      id: 6,
      type: "chat",
      title: "Completed Expat AI Chat",
      description: "Discussed job search strategies",
      timestamp: "1 week ago",
      date: "Oct 25, 2025",
    },
    {
      id: 7,
      type: "roleplay",
      title: "Completed Role-Play Practice",
      description: "Networking Event Conversation",
      timestamp: "2 weeks ago",
      date: "Oct 19, 2025",
    },
    {
      id: 8,
      type: "purchase",
      title: "Upgraded to Professional Plan",
      description: "Subscribed to Professional plan ($15/month)",
      timestamp: "2 weeks ago",
      date: "Oct 18, 2025",
    },
  ]

  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true
    if (filter === "chats") return activity.type === "chat"
    if (filter === "roleplays") return activity.type === "roleplay"
    if (filter === "purchases") return activity.type === "purchase"
    return true
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="w-6 h-6 text-white" />
      case "roleplay":
        return <Drama className="w-6 h-6 text-white" />
      case "purchase":
        return <CreditCard className="w-6 h-6 text-white" />
      default:
        return <MessageSquare className="w-6 h-6 text-white" />
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col pb-8">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-900"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <Link
                href="/profile"
                className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Profile</span>
              </Link>
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-black mb-2">Activity History</h1>
              <p className="text-base text-black/70">View all your past activities and interactions</p>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === "all"
                  ? "bg-black text-white"
                  : "bg-white text-black border-2 border-gray-200 hover:border-black"
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setFilter("chats")}
              className={`px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                filter === "chats"
                  ? "bg-black text-white"
                  : "bg-white text-black border-2 border-gray-200 hover:border-black"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chats
            </button>
            <button
              onClick={() => setFilter("roleplays")}
              className={`px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                filter === "roleplays"
                  ? "bg-black text-white"
                  : "bg-white text-black border-2 border-gray-200 hover:border-black"
              }`}
            >
              <Drama className="w-4 h-4" />
              Role-Plays
            </button>
            <button
              onClick={() => setFilter("purchases")}
              className={`px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                filter === "purchases"
                  ? "bg-black text-white"
                  : "bg-white text-black border-2 border-gray-200 hover:border-black"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Purchases
            </button>
          </div>

          {/* Activity List */}
          <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-black">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No activities found for this filter.</p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
