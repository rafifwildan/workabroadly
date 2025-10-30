"use client"

import { useState } from "react"
import Link from "next/link"

const users = [
  {
    id: 1,
    name: "Sarah Kim",
    email: "sarah.kim@email.com",
    avatar: "SK",
    country: "🇯🇵 Japan",
    status: "Active",
    tokens: 85,
    joinDate: "Oct 15, 2025",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "John Tanaka",
    email: "john.t@email.com",
    avatar: "JT",
    country: "🇰🇷 Korea",
    status: "Active",
    tokens: 42,
    joinDate: "Oct 18, 2025",
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Maria Santos",
    email: "maria.s@email.com",
    avatar: "MS",
    country: "🇯🇵 Japan",
    status: "Active",
    tokens: 120,
    joinDate: "Oct 10, 2025",
    lastActive: "1 day ago",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david.lee@email.com",
    avatar: "DL",
    country: "🇰🇷 Korea",
    status: "Inactive",
    tokens: 8,
    joinDate: "Oct 5, 2025",
    lastActive: "7 days ago",
  },
  {
    id: 5,
    name: "Emma Chen",
    email: "emma.c@email.com",
    avatar: "EC",
    country: "🇯🇵 Japan",
    status: "Active",
    tokens: 65,
    joinDate: "Oct 20, 2025",
    lastActive: "3 hours ago",
  },
]

export default function UserManagement() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleUser = (id: number) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map((u) => u.id))
  }

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
            <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d5f56] m-2 transition">
              <span>📊</span>
              <span>Overview</span>
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-lg bg-[#2d5f56] m-2 transition">
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
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#1a3d36]">User Management</h1>
            <div className="flex gap-3">
              <button className="rounded-xl bg-white border-2 border-[#b3d9d0] text-[#2d5f56] px-4 py-2 hover:bg-gray-50 transition">
                Export Users
              </button>
              <button className="rounded-xl bg-[#55aa99] text-white px-4 py-2 shadow-md hover:bg-[#45baa9] transition">
                + Add User
              </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="rounded-xl bg-white shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search users by name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] pl-10 pr-4 py-2 focus:outline-none focus:border-[#55aa99]"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
              <select className="rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]">
                <option>All Countries</option>
                <option>Japan</option>
                <option>Korea</option>
              </select>
              <select className="rounded-lg border-2 border-[#b3d9d0] bg-[#f0f9f7] px-4 py-2 focus:outline-none focus:border-[#55aa99]">
                <option>All Plans</option>
                <option>Free</option>
                <option>Professional</option>
                <option>Premium</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#e8f4f2] text-[#1a3d36] text-sm font-semibold">
                  <tr>
                    <th className="text-left p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length}
                        onChange={toggleAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="text-left p-4">User</th>
                    <th className="text-left p-4">Target Country</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Tokens</th>
                    <th className="text-left p-4">Join Date</th>
                    <th className="text-left p-4">Last Active</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-[#e8f4f2] hover:bg-[#f0f9f7] transition">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUser(user.id)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#55aa99] text-white flex items-center justify-center font-bold text-sm">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#1a3d36]">{user.name}</div>
                            <div className="text-xs text-[#55aa99]">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{user.country}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-sm font-medium ${
                            user.tokens < 10 ? "text-red-600" : user.tokens < 50 ? "text-yellow-600" : "text-green-600"
                          }`}
                        >
                          💎 {user.tokens}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{user.joinDate}</td>
                      <td className="p-4 text-sm text-gray-500">{user.lastActive}</td>
                      <td className="p-4">
                        <button className="text-[#55aa99] hover:text-[#45baa9] text-sm font-medium">•••</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#e8f4f2]">
              <div className="text-sm text-gray-600">Showing 1-5 of 1,247 users</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-lg bg-[#55aa99] text-white text-sm">1</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm">2</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm">3</button>
                <span className="px-3 py-1 text-gray-400 text-sm">...</span>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm">63</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedUsers.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#55aa99] text-white p-4 shadow-2xl rounded-t-2xl">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <span className="font-medium">{selectedUsers.length} users selected</span>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm">
                    Export
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm">
                    Add Tokens
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm">
                    Send Email
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-sm">
                    Delete
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
