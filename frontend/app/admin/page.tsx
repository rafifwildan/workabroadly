"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const userGrowthData = [
  { date: "Oct 21", users: 1180 },
  { date: "Oct 22", users: 1195 },
  { date: "Oct 23", users: 1210 },
  { date: "Oct 24", users: 1225 },
  { date: "Oct 25", users: 1235 },
  { date: "Oct 26", users: 1242 },
  { date: "Oct 27", users: 1247 },
]

const featureUsageData = [
  { name: "AI Career Coach", value: 60, color: "#55aa99" },
  { name: "Cultural Role-Play", value: 35, color: "#45baa9" },
  { name: "Other", value: 5, color: "#ffe100" },
]

const recentActivity = [
  {
    user: "Sarah Kim",
    avatar: "SK",
    activity: "Completed Job Interview scenario",
    time: "2 minutes ago",
    status: "Success",
  },
  {
    user: "John Tanaka",
    avatar: "JT",
    activity: "Started AI Career Coach session",
    time: "5 minutes ago",
    status: "Active",
  },
  { user: "Maria Santos", avatar: "MS", activity: "Purchased 100 tokens", time: "12 minutes ago", status: "Success" },
  {
    user: "David Lee",
    avatar: "DL",
    activity: "Completed Workplace scenario",
    time: "18 minutes ago",
    status: "Success",
  },
  { user: "Emma Chen", avatar: "EC", activity: "Updated profile settings", time: "25 minutes ago", status: "Success" },
]

const topScenarios = [
  { rank: 1, name: "Job Interview Practice", completions: 234, percentage: 100 },
  { rank: 2, name: "Workplace Communication", completions: 189, percentage: 81 },
  { rank: 3, name: "Visa Application Help", completions: 156, percentage: 67 },
  { rank: 4, name: "Daily Life Situations", completions: 142, percentage: 61 },
  { rank: 5, name: "Emergency Scenarios", completions: 98, percentage: 42 },
]

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState("30")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-[#2d5f56] text-white p-6 shadow-lg">
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
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg bg-[#2d5f56] m-2 transition">
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
              href="/admin/tokens"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition"
            >
              <span>💎</span>
              <span>Token Management</span>
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
        <main className="flex-1 p-8 max-w-7xl mx-auto space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl mb-2">👥</div>
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">1,247</div>
              <div className="text-sm text-[#55aa99] mb-2">Total Users</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span>↗</span>
                <span>+12% this month</span>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl mb-2">💬</div>
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">342</div>
              <div className="text-sm text-[#55aa99] mb-2">Active Sessions Today</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span>↗</span>
                <span>+8%</span>
              </div>
            </div>

            {/* Token Usage */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl mb-2">💎</div>
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">15,430</div>
              <div className="text-sm text-[#55aa99] mb-2">Tokens Used This Week</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span>↗</span>
                <span>+25%</span>
              </div>
            </div>

            {/* Revenue */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <div className="text-4xl mb-2">💰</div>
              <div className="text-4xl font-bold text-[#1a3d36] mb-1">$4,250</div>
              <div className="text-sm text-[#55aa99] mb-2">Monthly Revenue</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span>↗</span>
                <span>+15%</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#1a3d36]">User Growth</h2>
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => setTimeFilter("7")}
                    className={`px-3 py-1 rounded-lg ${timeFilter === "7" ? "bg-[#55aa99] text-white" : "bg-gray-100"}`}
                  >
                    Last 7 days
                  </button>
                  <button
                    onClick={() => setTimeFilter("30")}
                    className={`px-3 py-1 rounded-lg ${timeFilter === "30" ? "bg-[#55aa99] text-white" : "bg-gray-100"}`}
                  >
                    Last 30 days
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#55aa99"
                    strokeWidth={3}
                    dot={{ fill: "#55aa99", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Feature Usage Distribution */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a3d36] mb-4">Feature Usage</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={featureUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {featureUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="rounded-2xl bg-white shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1a3d36] mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#e8f4f2] text-[#1a3d36] text-sm font-semibold">
                  <tr>
                    <th className="text-left p-3 rounded-tl-lg">User</th>
                    <th className="text-left p-3">Activity</th>
                    <th className="text-left p-3">Time</th>
                    <th className="text-left p-3 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((item, index) => (
                    <tr key={index} className="border-b border-[#e8f4f2] hover:bg-[#f0f9f7] transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#55aa99] text-white flex items-center justify-center font-bold text-sm">
                            {item.avatar}
                          </div>
                          <span className="font-medium text-[#1a3d36]">{item.user}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-600">{item.activity}</td>
                      <td className="p-3 text-sm text-gray-500">{item.time}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === "Success" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.status}
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
            {/* Top Scenarios */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a3d36] mb-4">Most Popular Scenarios</h2>
              <div className="space-y-4">
                {topScenarios.map((scenario) => (
                  <div key={scenario.rank}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[#55aa99]">{scenario.rank}.</span>
                        <span className="text-sm font-medium text-[#1a3d36]">{scenario.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{scenario.completions} completions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#55aa99] h-2 rounded-full" style={{ width: `${scenario.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a3d36] mb-4">System Health</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">API Status</span>
                  <span className="text-sm font-bold text-green-700 flex items-center gap-2">
                    <span>✅</span>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Database</span>
                  <span className="text-sm font-bold text-green-700 flex items-center gap-2">
                    <span>✅</span>
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                  <span className="text-sm font-medium text-gray-700">AI Service</span>
                  <span className="text-sm font-bold text-yellow-700 flex items-center gap-2">
                    <span>⚠️</span>
                    Slow Response
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Storage</span>
                  <span className="text-sm font-bold text-green-700 flex items-center gap-2">
                    <span>✅</span>
                    85% available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
