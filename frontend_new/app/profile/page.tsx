"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Footer from "@/components/Footer"
import AppSidebar from "@/components/AppSidebar"
import { useAuth } from "@/contexts/AuthContext"
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
import { useSearchParams } from "next/navigation"
import { getMockUserUsage, getCreditUsage, getRemainingUsage } from "@/lib/usage-calculator"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false)

  // ✅ Use dynamic user data from auth context
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",

    // ✅ Cultural + work profile from user data
    originCountry: user?.originCountry || "",
    targetCulture: user?.targetCulture || "",
    employeeType: user?.employeeType || "",
    educationLevel: user?.educationLevel || "",
    industry: user?.industry || "",
    primaryInterest: user?.primaryInterest || "",

    // ✅ account
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // ✅ Update formData when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        originCountry: user.originCountry || "",
        targetCulture: user.targetCulture || "",
        employeeType: user.employeeType || "",
        educationLevel: user.educationLevel || "",
        industry: user.industry || "",
        primaryInterest: user.primaryInterest || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }, [user])

  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    weeklyReports: true,
    newFeatures: true,
  })

  const userUsage = getMockUserUsage()
  const creditUsage = getCreditUsage(userUsage)
  const remainingUsage = getRemainingUsage(userUsage)

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

  const handleDeleteAccount = () => {
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

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-8">
          <div className="space-y-6">
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
                          disabled
                          className="w-full rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
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
                            disabled
                            className="flex-1 rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
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
                          disabled
                          className="w-full rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
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
                          disabled
                          className="w-full rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
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
                          disabled
                          className="w-full rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
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
                          disabled
                          className="w-full rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
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
                          disabled
                          className="w-full rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
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
                          disabled
                          className="w-full rounded-xl border-2 border-black/20 bg-gray-50 p-3 cursor-not-allowed"
                        >
                          <option value="expat-ai">AI Expat Consultant</option>
                          <option value="roleplay">Cultural Role-Play Simulation</option>
                          <option value="both">Both</option>
                        </select>
                      </div>

                    </div>
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
