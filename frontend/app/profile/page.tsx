"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getCurrentUser, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

type SettingsTab = "profile" | "account" | "notifications" | "privacy" | "billing" | "help"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    targetCountry: "japan",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    weeklyReports: true,
    newFeatures: true,
  })
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await getCurrentUser()
      if (userData) {
        setUser(userData)
        // Update formData dengan real data
        setFormData(prev => ({
          ...prev,
          fullName: userData.name || "",
          email: userData.email || "",
        }))
      }
    } catch (error) {
      console.error("Error fetching user:", error)
    } finally {
      setLoading(false)
    }
  }
  fetchUser()
}, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-base text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="soft-card rounded-2xl bg-white shadow-md p-4 space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left rounded-xl p-3 transition-colors ${
                  activeTab === "profile" ? "bg-teal-100 text-teal-800 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full text-left rounded-xl p-3 transition-colors ${
                  activeTab === "account" ? "bg-teal-100 text-teal-800 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                Account Settings
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full text-left rounded-xl p-3 transition-colors ${
                  activeTab === "notifications"
                    ? "bg-teal-100 text-teal-800 font-medium"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                Notification Preferences
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full text-left rounded-xl p-3 transition-colors ${
                  activeTab === "privacy" ? "bg-teal-100 text-teal-800 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                Privacy & Data
              </button>
              <button
                onClick={() => setActiveTab("billing")}
                className={`w-full text-left rounded-xl p-3 transition-colors ${
                  activeTab === "billing" ? "bg-teal-100 text-teal-800 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                Billing
              </button>
              <button
                onClick={() => setActiveTab("help")}
                className={`w-full text-left rounded-xl p-3 transition-colors ${
                  activeTab === "help" ? "bg-teal-100 text-teal-800 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                Help & Support
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            {activeTab === "profile" && (
              <>
                <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                  {/* Profile Header */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 border-4 border-gray-200 shadow-md flex items-center justify-center text-4xl">
                        👤
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center shadow-md hover:bg-teal-700">
                        ✎
                      </button>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {loading ? "Loading..." : user?.name || formData.fullName}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {loading ? "..." : user?.email || formData.email}
                      </p>
                    </div>
                  </div>

                  {/* Personal Information Form */}
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-gray-300 bg-white p-3 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="flex-1 rounded-xl border-2 border-gray-300 bg-white p-3 focus:border-teal-500 focus:outline-none"
                        />
                        <span className="text-xs bg-green-100 text-green-800 rounded-full px-3 py-1">✅ Verified</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Country</label>
                      <select
                        name="targetCountry"
                        value={formData.targetCountry}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-gray-300 bg-white p-3 focus:border-teal-500 focus:outline-none"
                      >
                        <option value="japan">Japan</option>
                        <option value="korea">Korea</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </div>
                  <button className="mt-6 rounded-xl bg-teal-600 text-white px-6 py-2 shadow-md hover:bg-teal-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <>
                <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-gray-300 bg-white p-3 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-gray-300 bg-white p-3 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border-2 border-gray-300 bg-white p-3 focus:border-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button className="mt-6 rounded-xl bg-teal-600 text-white px-6 py-2 shadow-md hover:bg-teal-700 transition-colors">
                    Update Password
                  </button>
                </div>

                <div className="soft-card rounded-2xl bg-red-50 border-l-4 border-red-500 p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-4">Account Actions</h3>
                  
                  {/* Logout Button */}
                  <button 
                    onClick={async () => {
                      if (confirm("Are you sure you want to logout?")) {
                        await logout()
                      }
                    }}
                    className="rounded-xl bg-gray-600 text-white px-6 py-2 hover:bg-gray-700 transition-colors mr-2"
                  >
                    Logout
                  </button>
                  
                  {/* Delete Account - Disabled for now */}
                  <button 
                    disabled
                    className="rounded-xl bg-red-300 text-white px-6 py-2 cursor-not-allowed"
                  >
                    Delete Account (Coming Soon)
                  </button>
                </div>
              </>
            )}

            {/* Notification Preferences */}
            {activeTab === "notifications" && (
              <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive email updates about your activity</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("email")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.email ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.email ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-600">Receive promotional content and offers</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("marketing")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.marketing ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.marketing ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Weekly Progress Reports</p>
                      <p className="text-sm text-gray-600">Get weekly summaries of your learning progress</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("weeklyReports")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.weeklyReports ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.weeklyReports ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">New Feature Announcements</p>
                      <p className="text-sm text-gray-600">Be notified about new features and updates</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("newFeatures")}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.newFeatures ? "bg-teal-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.newFeatures ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Data */}
            {activeTab === "privacy" && (
              <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Privacy & Data</h3>
                <div className="space-y-4">
                  <button className="w-full text-left rounded-xl border-2 border-gray-300 p-4 hover:border-teal-500 transition-colors">
                    <p className="font-medium text-gray-900">Download Your Data</p>
                    <p className="text-sm text-gray-600">Get a copy of all your data</p>
                  </button>
                  <button className="w-full text-left rounded-xl border-2 border-gray-300 p-4 hover:border-teal-500 transition-colors">
                    <p className="font-medium text-gray-900">Privacy Policy</p>
                    <p className="text-sm text-gray-600">Read our privacy policy</p>
                  </button>
                  <button className="w-full text-left rounded-xl border-2 border-gray-300 p-4 hover:border-teal-500 transition-colors">
                    <p className="font-medium text-gray-900">Terms of Service</p>
                    <p className="text-sm text-gray-600">Read our terms of service</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
