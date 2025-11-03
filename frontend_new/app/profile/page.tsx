"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Footer from "@/components/Footer"
import AppSidebar from "@/components/AppSidebar"
import { Menu, Drama, MessageSquare, User, Edit, CheckCircle, Upload, X, Zap, CreditCard } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getMockUserUsage, getCreditUsage, getRemainingUsage } from "@/lib/usage-calculator"

type SettingsTab = "profile" | "activity" | "account" | "notifications" | "privacy" | "billing" | "help"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    targetCountry: "japan",
    educationLevel: "bachelor",
    yearsOfExperience: "3-5",
    industry: "technology",
    primaryInterest: "both",
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

  const userUsage = getMockUserUsage()
  const creditUsage = getCreditUsage(userUsage)
  const remainingUsage = getRemainingUsage(userUsage)

  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["profile", "activity", "account", "notifications", "privacy", "billing", "help"].includes(tab)) {
      setActiveTab(tab as SettingsTab)
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log("Uploading profile picture:", file)
      setShowProfilePictureModal(false)
    }
  }

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    console.log("Deleting account...")
    setShowDeleteConfirm(false)
  }

  return (
    <div className="min-h-screen bg-white flex">
      <AppSidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">Profile & Settings</h1>
                <p className="text-base text-black/70">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="soft-card rounded-2xl bg-white shadow-md p-4 space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    activeTab === "profile" ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    activeTab === "activity" ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                  }`}
                >
                  Recent Activity
                </button>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    activeTab === "account" ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                  }`}
                >
                  Account Settings
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    activeTab === "notifications" ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                  }`}
                >
                  Notification Preferences
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    activeTab === "privacy" ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                  }`}
                >
                  Privacy & Data
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    activeTab === "billing" ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                  }`}
                >
                  Plan & Billing
                </button>
                <button
                  onClick={() => setActiveTab("help")}
                  className={`w-full text-left rounded-xl p-3 transition-colors ${
                    activeTab === "help" ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                  }`}
                >
                  Help & Support
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {activeTab === "profile" && (
                <>
                  {/* ... (Isi tab profile tidak berubah) ... */}
                  <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-black border-4 border-gray-200 shadow-md flex items-center justify-center">
                          <User className="w-12 h-12 text-white" />
                        </div>
                        <button
                          onClick={() => setShowProfilePictureModal(true)}
                          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:bg-gray-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-black">{formData.fullName}</h2>
                        <p className="text-sm text-black/70">{formData.email}</p>
                        <p className="text-xs text-black/50 mt-1">Member since October 2025</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-black mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Email</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="flex-1 rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                          />
                          <span className="text-xs bg-green-100 text-green-800 rounded-full px-3 py-1 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Primary Interest</label>
                        <select
                          name="primaryInterest"
                          value={formData.primaryInterest}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="expat-ai">AI Expat Consultant</option>
                          <option value="roleplay">Cultural Role-Play Simulation</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Target Country</label>
                        <select
                          name="targetCountry"
                          value={formData.targetCountry}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="japan">Japan</option>
                          <option value="korea">Korea</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Education Level</label>
                        <select
                          name="educationLevel"
                          value={formData.educationLevel}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="">Select education level</option>
                          <option value="high-school">High School</option>
                          <option value="associate">Associate Degree</option>
                          <option value="bachelor">Bachelor's Degree</option>
                          <option value="master">Master's Degree</option>
                          <option value="doctorate">Doctorate</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Years of Experience</label>
                        <select
                          name="yearsOfExperience"
                          value={formData.yearsOfExperience}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="">Select years of experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Industry</label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="">Not specified</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="finance">Finance</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="retail">Retail</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <button className="mt-6 rounded-full bg-black text-white px-6 py-2 shadow-md hover:bg-gray-800 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </>
              )}

              {activeTab === "activity" && (
                <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                  {/* ... (Isi tab activity tidak berubah) ... */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                    <Link href="/activity" className="text-sm text-gray-900 hover:text-gray-700 font-medium">
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

                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Drama className="w-5 h-5 text-gray-900" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">Completed Korean Restaurant Ordering scenario</p>
                        <p className="text-xs text-gray-500">1 day ago • Role-Play Practice</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-gray-900" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">Discussed housing options in Tokyo</p>
                        <p className="text-xs text-gray-500">2 days ago • Expat AI Chat</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <>
                  {/* ... (Isi tab account tidak berubah) ... */}
                  <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                    <h3 className="text-lg font-bold text-black mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        />
                      </div>
                    </div>
                    <button className="mt-6 rounded-full bg-black text-white px-6 py-2 shadow-md hover:bg-gray-800 transition-colors">
                      Update Password
                    </button>
                  </div>

                  <div className="soft-card rounded-2xl bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="rounded-full bg-red-600 text-white px-6 py-2 hover:bg-red-700 transition-colors font-medium"
                    >
                      Delete Account
                    </button>
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                  {/* ... (Isi tab notifications tidak berubah) ... */}
                  <h3 className="text-lg font-bold text-black mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-black">Email Notifications</p>
                        <p className="text-sm text-black/70">Receive email updates about your activity</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle("email")}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notifications.email ? "bg-black" : "bg-black/20"
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
                        <p className="font-medium text-black">Marketing Emails</p>
                        <p className="text-sm text-black/70">Receive promotional content and offers</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle("marketing")}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notifications.marketing ? "bg-black" : "bg-black/20"
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
                        <p className="font-medium text-black">Weekly Progress Reports</p>
                        <p className="text-sm text-black/70">Get weekly summaries of your learning progress</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle("weeklyReports")}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notifications.weeklyReports ? "bg-black" : "bg-black/20"
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
                        <p className="font-medium text-black">New Feature Announcements</p>
                        <p className="text-sm text-black/70">Be notified about new features and updates</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle("newFeatures")}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notifications.newFeatures ? "bg-black" : "bg-black/20"
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

              {activeTab === "privacy" && (
                <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                  {/* ... (Isi tab privacy tidak berubah) ... */}
                  <h3 className="text-lg font-bold text-black mb-6">Privacy & Data</h3>
                  <div className="space-y-4">
                    <button className="w-full text-left rounded-full border-2 border-black/20 p-4 hover:border-black transition-colors">
                      <p className="font-medium text-black">Download Your Data</p>
                      <p className="text-sm text-black/70">Get a copy of all your data</p>
                    </button>
                    <button className="w-full text-left rounded-full border-2 border-black/20 p-4 hover:border-black transition-colors">
                      <p className="font-medium text-black">Privacy Policy</p>
                      <p className="text-sm text-black/70">Read our privacy policy</p>
                    </button>
                    <button className="w-full text-left rounded-full border-2 border-black/20 p-4 hover:border-black transition-colors">
                      <p className="font-medium text-black">Terms of Service</p>
                      <p className="text-sm text-black/70">Read our terms of service</p>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-6">
                  {/* ... (Isi tab billing tidak berubah) ... */}
                  <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-black">Current Plan</h3>
                      <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full">
                        <Zap className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-8 mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-3xl font-bold mb-2">{creditUsage.creditsRemaining}</h4>
                          <p className="text-white/70">Credits Remaining</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{creditUsage.creditsUsed}</div>
                          <p className="text-white/70 text-sm">Credits Used</p>
                        </div>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white rounded-full h-2 transition-all"
                          style={{
                            width: `${(creditUsage.creditsUsed / (typeof creditUsage.creditsRemaining === "number" ? creditUsage.creditsUsed + creditUsage.creditsRemaining : 400)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mb-8">
                      <h4 className="font-bold text-black mb-4">Plan Details</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Plan Type</span>
                          <span className="font-medium text-black">Professional</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Monthly Price</span>
                          <span className="font-medium text-black">$15.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Credits</span>
                          <span className="font-medium text-black">400 credits</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mb-8">
                      <h4 className="font-medium text-black mb-4">Payment Method</h4>
                      <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                        <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-600">Expires 12/2025</p>
                        </div>
                        <button className="text-sm text-black hover:underline">Edit</button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-bold text-blue-900 mb-1">Need More Credits?</h4>
                          <p className="text-sm text-blue-700 mb-3">
                            Purchase additional credit packages or upgrade your plan for more features.
                          </p>
                          <Link href="/my-plan">
                            <button className="rounded-full bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors font-medium">
                              Manage Plan & Buy Credits
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-medium text-black mb-4">Billing History</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-black">Professional Plan</p>
                            <p className="text-xs text-gray-600">Nov 1, 2025</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-black">$15.00</p>
                            <button className="text-xs text-black hover:underline">Download</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-black">Professional Plan</p>
                            <p className="text-xs text-gray-600">Oct 1, 2025</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-black">$15.00</p>
                            <button className="text-xs text-black hover:underline">Download</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "help" && (
                <div className="soft-card rounded-2xl bg-white shadow-lg p-8">
                  <h3 className="text-lg font-bold text-black mb-6">Help & Support</h3>
                  <div className="space-y-4">
                    <Link
                      href="mailto:workabroadlyapp@gmail.com?subject=I%20Like%20to%20Know%20More%20About%20WorkAbroadly&body=Hi%20WorkAbroadly%20Team%2C%0A%0AI%E2%80%99m%20interested%20in%20your%20platform%20and%20would%20love%20to%20know%20more%20about%20how%20you%20can%20help%20me%20grow%20my%20career%20internationally.%0A%0ALooking%20forward%20to%20your%20reply!%0A"
                      className="block w-full text-left rounded-full border-2 border-black/20 p-4 hover:border-black transition-colors"
                    >
                      <p className="font-medium text-black">Contact Support</p>
                      <p className="text-sm text-black/70">Get help with any issues you're facing</p>
                    </Link>

                    {/* --- PERUBAHAN DI SINI --- */}
                    {/* Mengganti <button> menjadi <Link> dengan href="/#faq" */}
                    <Link
                      href="/#faq"
                      className="block w-full text-left rounded-full border-2 border-black/20 p-4 hover:border-black transition-colors"
                    >
                      <p className="font-medium text-black">FAQs</p>
                      <p className="text-sm text-black/70">Find answers to common questions</p>
                    </Link>
                    {/* --- AKHIR PERUBAHAN --- */}

                    <button className="w-full text-left rounded-full border-2 border-black/20 p-4 hover:border-black transition-colors">
                      <p className="font-medium text-black">Feedback</p>
                      <p className="text-sm text-black/70">Send us your thoughts and suggestions</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showProfilePictureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {/* ... (Isi modal profile picture tidak berubah) ... */}
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Change Profile Picture</h3>
              <button onClick={() => setShowProfilePictureModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-4">Click to upload or drag and drop</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                  id="profile-picture-upload"
                />
                <label
                  htmlFor="profile-picture-upload"
                  className="inline-block bg-black text-white px-6 py-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  Choose File
                </label>
              </div>
              <p className="text-xs text-gray-500 text-center">Supported formats: JPG, PNG, GIF (max 5MB)</p>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {/* ... (Isi modal delete confirm tidak berubah) ... */}
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Account?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone. All your data, progress, and
              credits will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-full bg-gray-100 text-gray-900 px-6 py-3 hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 rounded-full bg-red-600 text-white px-6 py-3 hover:bg-red-700 transition-colors font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}