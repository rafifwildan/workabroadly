"use client"

import { useState } from "react"
import { Bot, Drama, MessageSquare } from "lucide-react"

type Step = 1 | 2

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    // Step 1: What brings you here
    primaryInterest: "",
    // Step 2: Personal Information
    targetCountry: "",
    educationLevel: "",
    yearsOfExperience: "",
    industry: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 2) setStep((step + 1) as Step)
  }

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as Step)
  }

  const handleComplete = () => {
    window.location.href = "/home"
  }

  const progress = (step / 2) * 100

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-12 text-center">
          <p className="text-xs text-gray-600 mb-2">Step {step} of 2</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-black h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {step === 1 && (
          <div className="soft-card max-w-2xl mx-auto rounded-2xl bg-white shadow-lg p-12">
            <h2 className="text-3xl font-bold text-black text-center mb-3">What brings you here?</h2>
            <p className="text-base text-gray-600 text-center mb-10">Choose what you're most interested in</p>

            {/* Primary Interest Selection */}
            <div className="space-y-4">
              <button
                onClick={() => handleInputChange("primaryInterest", "expat-ai")}
                className={`w-full rounded-xl bg-white border-2 p-5 cursor-pointer transition-all text-left ${
                  formData.primaryInterest === "expat-ai"
                    ? "border-black bg-gray-50 shadow-lg"
                    : "border-gray-200 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-black mt-1" />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-black mb-1">AI Expat Consultant</h4>
                    <p className="text-sm text-gray-600">I want to learn about visa requirements and job preparation</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleInputChange("primaryInterest", "roleplay")}
                className={`w-full rounded-xl bg-white border-2 p-5 cursor-pointer transition-all text-left ${
                  formData.primaryInterest === "roleplay"
                    ? "border-black bg-gray-50 shadow-lg"
                    : "border-gray-200 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  <Drama className="w-6 h-6 text-black mt-1" />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-black mb-1">Cultural Role-Play Simulation</h4>
                    <p className="text-sm text-gray-600">I want to practice workplace and cultural scenarios</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleInputChange("primaryInterest", "both")}
                className={`w-full rounded-xl bg-white border-2 p-5 cursor-pointer transition-all text-left ${
                  formData.primaryInterest === "both"
                    ? "border-black bg-gray-50 shadow-lg"
                    : "border-gray-200 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  <Bot className="w-6 h-6 text-black mt-1" />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-black mb-1">Explore Both</h4>
                    <p className="text-sm text-gray-600">I want to try everything</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Navigation Button */}
            <button
              onClick={handleNext}
              disabled={!formData.primaryInterest}
              className="w-full mt-10 rounded-full bg-black text-white px-8 py-3 shadow-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="soft-card max-w-2xl mx-auto rounded-2xl bg-white shadow-lg p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-black mb-2">Tell us about yourself</h2>
              <p className="text-base text-gray-600">Help us personalize your experience</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-black font-medium mb-2">Target Country</label>
                <select
                  value={formData.targetCountry}
                  onChange={(e) => handleInputChange("targetCountry", e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 focus:border-black focus:outline-none transition-colors"
                >
                  <option value="">Select target country</option>
                  <option value="japan">Japan</option>
                  <option value="korea">Korea</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-black font-medium mb-2">Education Level</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange("educationLevel", e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 focus:border-black focus:outline-none transition-colors"
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
                <label className="block text-sm text-black font-medium mb-2">Years of Experience</label>
                <select
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 focus:border-black focus:outline-none transition-colors"
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
                <label className="block text-sm text-black font-medium mb-2">
                  Industry <span className="text-gray-400">(optional)</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 focus:border-black focus:outline-none transition-colors"
                >
                  <option value="">Select industry</option>
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

            <div className="flex gap-4 mt-10">
              <button
                onClick={handleBack}
                className="flex-1 rounded-full bg-white border-2 border-gray-200 text-black px-6 py-3 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={!formData.targetCountry || !formData.educationLevel || !formData.yearsOfExperience}
                className="flex-1 rounded-full bg-black text-white px-6 py-3 shadow-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
