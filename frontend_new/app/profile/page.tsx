"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Footer from "@/components/Footer"
import AppSidebar from "@/components/AppSidebar"
import {
  Menu,
  Drama,
  MessageSquare,
  User,
  Edit,
  CheckCircle,
  Upload,
  X,
  Zap,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { getAuthHeader } from "@/lib/auth"
import { CurrentPlanCard } from "@/components/profile/billing/CurrentPlanCard"
import { PaymentMethodCard } from "@/components/profile/billing/PaymentMethodCard"
import { BillingHistoryTable } from "@/components/profile/billing/BillingHistoryTable"

type SettingsTab = "profile" | "billing"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false)

  // ✅ UPDATED formData
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@example.com",

    // ✅ NEW cultural + work profile
    originCountry: "indonesia",
    targetCulture: "japan",
    employeeType: "expat",
    educationLevel: "bachelor",
    industry: "technology",
    primaryInterest: "both",

    // ✅ account
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

  // Auth and routing
  const { user, isLoading: authLoading, refreshUser } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["profile", "billing"].includes(tab)) {
      setActiveTab(tab as SettingsTab)
    }
  }, [searchParams])

  // Auth guard and profile fetching
  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    fetchUserProfile()
  }, [user, authLoading])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        headers: getAuthHeader()
      })

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      const data = await response.json()

      setFormData({
        fullName: data.user.name || "",
        email: data.user.email || "",
        originCountry: data.user.originCountry || "indonesia",
        targetCulture: data.user.targetCulture || "japan",
        employeeType: data.user.employeeType || "expat",
        educationLevel: data.user.educationLevel || "bachelor",
        industry: data.user.industry || "",
        primaryInterest: data.user.primaryInterest || "both",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("Uploading profile picture:", file)
      setShowProfilePictureModal(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify({
          name: formData.fullName,
          // Add other fields that the backend accepts
        })
      })

      if (!response.ok) {
        throw new Error("Failed to save profile")
      }

      await refreshUser()
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to save profile:", error)
      alert("Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = () => {
    console.log("Deleting account...")
    setShowDeleteConfirm(false)
  }

  // Loading and auth guards
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
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
            
            {/* LEFT NAV */}
            <div className="lg:col-span-1">
              <div className="soft-card rounded-2xl bg-white shadow-md p-4 space-y-2">
                {["profile", "billing"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as SettingsTab)}
                    className={`w-full text-left rounded-xl p-3 transition-colors ${
                      activeTab === tab ? "bg-black text-white font-medium" : "hover:bg-black/5 text-black"
                    }`}
                  >
                    {tab
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>


            {/* RIGHT CONTENT */}
            <div className="lg:col-span-3 space-y-6">

              {activeTab === "profile" && (
                <>
                  <div className="soft-card rounded-2xl bg-white shadow-lg p-8">

                    {/* Profile picture + name */}
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

                    {/* FORM START */}
                    <h3 className="text-lg font-bold text-black mb-4">Personal Information</h3>
                    <div className="space-y-4">

                      {/* Full Name */}
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

                      {/* Email */}
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

                      {/* NEW — Where are you from? */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Where are you from?</label>
                        <select
                          name="originCountry"
                          value={formData.originCountry}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="">Select country</option>
                          <option value="indonesia">Indonesia</option>
                          <option value="japan">Japan</option>
                          <option value="korea">Korea</option>
                          <option value="usa">United States</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* NEW — Culture of interest */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Which culture are you most interested in?
                        </label>
                        <select
                          name="targetCulture"
                          value={formData.targetCulture}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="">Select a culture</option>
                          <option value="japan">Japan</option>
                          <option value="korea">Korea</option>
                          <option value="english-western">English / Western</option>
                          <option value="indonesia">Indonesia</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* NEW — Employee Type */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          What best describes you?
                        </label>
                        <select
                          name="employeeType"
                          value={formData.employeeType}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border-2 border-black/20 bg-white p-3 focus:border-black focus:outline-none"
                        >
                          <option value="">Select one</option>
                          <option value="expat">Expat (working / studying abroad)</option>
                          <option value="local-mnc">Local — multinational company</option>
                          <option value="job-seeker">Job Seeker</option>
                          <option value="student">Student</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Education Level */}
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

                      {/* Industry */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Industry <span className="text-gray-400">(optional)</span>
                        </label>
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

                      {/* Primary Interest */}
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

                    </div>

                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="mt-6 rounded-full bg-black text-white px-6 py-2 shadow-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </>
              )}

              {/* ===== BILLING TAB ===== */}
              {activeTab === "billing" && (
                <div className="space-y-6">
                  <CurrentPlanCard />
                  <PaymentMethodCard />
                  <BillingHistoryTable />
                </div>
              )}

              {/* ===== OTHER TABS LEFT UNMODIFIED ===== */}
              {/*
                activity
                account
                notifications
                privacy
                help
                remain unchanged
              */}

            </div>
          </div>
        </main>
      </div>

      {/* === Profile Picture Modal === */}
      {showProfilePictureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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

      {/* === DELETE CONFIRM MODAL === */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Account?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
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
