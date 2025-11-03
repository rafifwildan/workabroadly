"use client"

import { useState } from "react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const responseTimeData = [
  { date: "Oct 21", time: 2.1 },
  { date: "Oct 22", time: 1.9 },
  { date: "Oct 23", time: 1.7 },
  { date: "Oct 24", time: 1.8 },
  { date: "Oct 25", time: 1.6 },
  { date: "Oct 26", time: 1.9 },
  { date: "Oct 27", time: 1.8 },
]

const feedbackData = [
  { rating: "5 stars", percentage: 45, count: 561 },
  { rating: "4 stars", percentage: 30, count: 374 },
  { rating: "3 stars", percentage: 15, count: 187 },
  { rating: "2 stars", percentage: 7, count: 87 },
  { rating: "1 star", percentage: 3, count: 37 },
]

const topIssues = [
  { issue: "Slow response time during peak hours", frequency: 23, severity: "High", status: "In Progress" },
  { issue: "Incorrect visa information for E-7 visa", frequency: 15, severity: "Critical", status: "Resolved" },
  { issue: "Chat session timeout too short", frequency: 12, severity: "Medium", status: "Open" },
  { issue: "Translation errors in Korean scenarios", frequency: 8, severity: "Medium", status: "In Progress" },
]

export default function EvaluationMetrics() {
  const [dateRange, setDateRange] = useState("30")

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
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>🎭</span>
              <span>Scenario Manager</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#2d5f56] m-2 transition"
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
            <h1 className="text-3xl font-bold text-[#1a3d36]">Evaluation & Metrics</h1>
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => setDateRange("7")}
                className={`px-3 py-1 rounded-lg ${dateRange === "7" ? "bg-[#55aa99] text-white" : "bg-white"}`}
              >
                Last 7 days
              </button>
              <button
                onClick={() => setDateRange("30")}
                className={`px-3 py-1 rounded-lg ${dateRange === "30" ? "bg-[#55aa99] text-white" : "bg-white"}`}
              >
                Last 30 days
              </button>
              <button
                onClick={() => setDateRange("90")}
                className={`px-3 py-1 rounded-lg ${dateRange === "90" ? "bg-[#55aa99] text-white" : "bg-white"}`}
              >
                Last 90 days
              </button>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Response Quality */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">4.6/5.0</div>
              <div className="text-yellow-500 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <div className="text-sm text-[#55aa99] mb-2">AI Response Quality</div>
              <div className="text-xs text-green-600">+0.3 vs last month</div>
            </div>

            {/* User Satisfaction */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">87%</div>
              <div className="relative w-20 h-20 mx-auto my-2">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#55aa99"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36 * 0.87} ${2 * Math.PI * 36}`}
                  />
                </svg>
              </div>
              <div className="text-sm text-[#55aa99] mb-1">Satisfaction Rate</div>
              <div className="text-xs text-gray-500">Based on 1,245 reviews</div>
            </div>

            {/* Response Time */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">1.8s</div>
              <div className="text-sm text-[#55aa99] mb-2">Avg. Response Time</div>
              <div className="text-xs text-green-600 mb-1">✓ Within target</div>
              <div className="text-xs text-gray-500">Target: &lt; 2.0s</div>
            </div>

            {/* Accuracy Rate */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">94%</div>
              <div className="text-sm text-[#55aa99] mb-2">Information Accuracy</div>
              <div className="text-xs text-gray-500">Based on verification checks</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Response Time Trend */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a3d36] mb-4">Response Time Over Time</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#55aa99"
                    strokeWidth={3}
                    dot={{ fill: "#55aa99", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey={() => 2.0}
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="text-xs text-gray-500 mt-2">Red line indicates target threshold (2.0s)</div>
            </div>

            {/* Feedback Distribution */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a3d36] mb-4">User Feedback Distribution</h2>
              <div className="space-y-3">
                {feedbackData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-gray-700">{item.rating}</span>
                      <span className="text-gray-600">
                        {item.percentage}% ({item.count})
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-[#55aa99] h-3 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Issues Table */}
          <div className="rounded-2xl bg-white shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1a3d36] mb-4">Top Issues Reported</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#e8f4f2] text-[#1a3d36] text-sm font-semibold">
                  <tr>
                    <th className="text-left p-3 rounded-tl-lg">Issue</th>
                    <th className="text-left p-3">Frequency</th>
                    <th className="text-left p-3">Severity</th>
                    <th className="text-left p-3 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topIssues.map((issue, index) => (
                    <tr key={index} className="border-b border-[#e8f4f2] hover:bg-[#f0f9f7] transition">
                      <td className="p-3 text-sm">{issue.issue}</td>
                      <td className="p-3 text-sm font-medium">{issue.frequency}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            issue.severity === "Critical"
                              ? "bg-red-100 text-red-800"
                              : issue.severity === "High"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            issue.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : issue.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat Quality Metrics */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a3d36] mb-4">Chat Quality Metrics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#f0f9f7]">
                  <span className="text-sm font-medium text-gray-700">Avg. Conversation Length</span>
                  <span className="text-lg font-bold text-[#55aa99]">7.3 messages</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#f0f9f7]">
                  <span className="text-sm font-medium text-gray-700">Resolution Rate</span>
                  <span className="text-lg font-bold text-[#55aa99]">82%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#f0f9f7]">
                  <span className="text-sm font-medium text-gray-700">Follow-up Questions</span>
                  <span className="text-lg font-bold text-[#55aa99]">23%</span>
                </div>
              </div>
            </div>

            {/* System Performance */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a3d36] mb-4">System Performance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">API Uptime</span>
                  <span className="text-lg font-bold text-green-700">99.8%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Error Rate</span>
                  <span className="text-lg font-bold text-green-700">0.2%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Cache Hit Rate</span>
                  <span className="text-lg font-bold text-green-700">87%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Database Query Time</span>
                  <span className="text-lg font-bold text-green-700">45ms avg</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
