"use client"

import { useState } from "react"
import Link from "next/link"

const scenarios = [
  {
    id: 1,
    title: "Job Interview Practice",
    country: "🇯🇵 Japan",
    category: "Pre-Departure",
    difficulty: "Medium",
    duration: "15-20 min",
    tokens: 10,
    completions: 234,
    status: "Published",
    icon: "💼",
  },
  {
    id: 2,
    title: "Workplace Communication",
    country: "🇰🇷 Korea",
    category: "Workplace",
    difficulty: "Easy",
    duration: "10-15 min",
    tokens: 8,
    completions: 189,
    status: "Published",
    icon: "💬",
  },
  {
    id: 3,
    title: "Emergency Situations",
    country: "🇯🇵 Japan",
    category: "Emergency",
    difficulty: "Hard",
    duration: "20-25 min",
    tokens: 15,
    completions: 98,
    status: "Draft",
    icon: "🚨",
  },
]

export default function ScenarioManager() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showEditor, setShowEditor] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="bg-[#2d5f56] text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Workabroadly Admin</h1>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/admin" className="hover:text-[#ffe100] transition">
              Dashboard
            </Link>
            <Link href="/admin/users" className="hover:text-[#ffe100] transition">
              Users
            </Link>
            <Link href="/admin/content" className="hover:text-[#ffe100] transition">
              Content
            </Link>
            <Link href="/admin/analytics" className="hover:text-[#ffe100] transition">
              Analytics
            </Link>
            <Link href="/admin/settings" className="hover:text-[#ffe100] transition">
              Settings
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ffe100] text-[#2d5f56] flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-[#1a3d36] text-white h-[calc(100vh-64px)] sticky top-16">
          <nav className="p-2">
            <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition">
              <span>📊</span>
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>👥</span>
              <span>User Management</span>
            </Link>
            <Link
              href="/admin/content"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>📝</span>
              <span>Content Management</span>
            </Link>
            <Link
              href="/admin/scenarios"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#2d5f56] m-2 transition"
            >
              <span>🎭</span>
              <span>Scenario Manager</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>📈</span>
              <span>Evaluation & Metrics</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>⚙️</span>
              <span>System Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#1a3d36]">Scenario Manager</h1>
            <button
              onClick={() => setShowEditor(true)}
              className="rounded-xl bg-[#55aa99] text-white px-6 py-3 shadow-md hover:bg-[#45baa9] transition"
            >
              + Create New Scenario
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === "grid" ? "bg-[#55aa99] text-white" : "bg-white text-gray-600"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition ${
                viewMode === "list" ? "bg-[#55aa99] text-white" : "bg-white text-gray-600"
              }`}
            >
              List View
            </button>
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      scenario.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {scenario.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="text-[#55aa99] hover:text-[#45baa9]">✏️</button>
                    <button className="text-red-600 hover:text-red-700">🗑️</button>
                  </div>
                </div>

                <div className="text-4xl mb-3">{scenario.icon}</div>
                <h3 className="text-xl font-bold text-[#1a3d36] mb-2">{scenario.title}</h3>
                <div className="text-sm text-gray-600 mb-4">
                  {scenario.country} • {scenario.category}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        scenario.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : scenario.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{scenario.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Token cost:</span>
                    <span className="font-medium">💎 {scenario.tokens}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completions:</span>
                    <span className="font-medium">{scenario.completions} users</span>
                  </div>
                </div>

                <div className="flex gap-2 text-sm">
                  <button className="flex-1 text-[#55aa99] hover:underline">Edit</button>
                  <button className="flex-1 text-[#55aa99] hover:underline">Preview</button>
                  <button className="flex-1 text-[#55aa99] hover:underline">Duplicate</button>
                </div>
              </div>
            ))}
          </div>

          {/* Scenario Editor Modal */}
          {showEditor && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1a3d36]">Create New Scenario</h2>
                  <button onClick={() => setShowEditor(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
                    ×
                  </button>
                </div>

                {/* Basic Information */}
                <div className="rounded-2xl bg-white shadow-lg p-6 mb-6">
                  <h3 className="font-bold text-[#1a3d36] mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Scenario name"
                      className="w-full rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select className="rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]">
                        <option>Select Country</option>
                        <option>Japan</option>
                        <option>Korea</option>
                      </select>
                      <select className="rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]">
                        <option>Select Category</option>
                        <option>Pre-Departure</option>
                        <option>Workplace</option>
                        <option>Daily Life</option>
                        <option>Emergency</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Short description"
                      rows={3}
                      className="w-full rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]"
                    />
                  </div>
                </div>

                {/* Scenario Details */}
                <div className="rounded-2xl bg-white shadow-lg p-6 mb-6">
                  <h3 className="font-bold text-[#1a3d36] mb-4">Scenario Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 rounded-lg bg-[#e8f4f2] text-[#55aa99] hover:bg-[#55aa99] hover:text-white transition">
                          Easy
                        </button>
                        <button className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-[#55aa99] hover:text-white transition">
                          Medium
                        </button>
                        <button className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-[#55aa99] hover:text-white transition">
                          Hard
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                        <input
                          type="number"
                          placeholder="15"
                          className="w-full rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Token Cost</label>
                        <input
                          type="number"
                          placeholder="10"
                          className="w-full rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditor(false)}
                    className="rounded-xl bg-white border-2 border-[#b3d9d0] text-[#2d5f56] px-6 py-2 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button className="rounded-xl bg-white border-2 border-[#b3d9d0] text-[#2d5f56] px-6 py-2 hover:bg-gray-50 transition">
                    Save as Draft
                  </button>
                  <button className="rounded-xl bg-[#55aa99] text-white px-6 py-2 shadow-md hover:bg-[#45baa9] transition">
                    Publish Scenario
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
