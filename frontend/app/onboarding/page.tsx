"use client"

import { useState } from "react"

type Step = 1 | 2 | 3

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    // Step 2: Demographics
    fullName: "",
    age: "",
    location: "",
    education: "",
    occupation: "",
    experience: "0",
    // Step 3: Interests
    targetCountry: "",
    primaryInterest: "",
    goals: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep((step + 1) as Step)
  }

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as Step)
  }

  const handleComplete = () => {
    window.location.href = "/home"
  }

  const progress = (step / 3) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-50 via-white to-background-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-12 text-center">
          <p className="text-xs text-primary-600 mb-2">Step {step} of 3</p>
          <div className="w-full bg-primary-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step 1: Welcome Screen */}
        {step === 1 && (
          <div className="soft-card max-w-2xl mx-auto rounded-3xl bg-white shadow-2xl p-16">
            {/* Hero Illustration */}
            <div className="flex justify-center mb-8">
              <div className="bg-primary-100 rounded-full w-24 h-24 flex items-center justify-center">
                <span className="text-6xl">🌍</span>
              </div>
            </div>

            {/* Welcome Message */}
            <h1 className="text-4xl font-bold text-primary-900 text-center mb-6">Welcome to Workabroadly!</h1>
            <p className="text-lg text-primary-600 text-center max-w-lg mx-auto mb-12">
              Let's get you started on your journey to working abroad
            </p>

            {/* Feature Preview */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="rounded-xl bg-background-50 p-6 text-center">
                <div className="text-3xl mb-2">🤖</div>
                <p className="text-sm font-medium text-primary-800">AI-Powered Coaching</p>
              </div>
              <div className="rounded-xl bg-background-50 p-6 text-center">
                <div className="text-3xl mb-2">🎭</div>
                <p className="text-sm font-medium text-primary-800">Cultural Training</p>
              </div>
              <div className="rounded-xl bg-background-50 p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm font-medium text-primary-800">Career Guidance</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleNext}
              className="w-full rounded-2xl bg-primary-500 text-white px-8 py-4 text-lg shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all duration-200"
            >
              Let's Begin
            </button>
          </div>
        )}

        {/* Step 2: Demographics Form */}
        {step === 2 && (
          <div className="soft-card max-w-2xl mx-auto rounded-3xl bg-white shadow-xl p-12">
            {/* Form Header */}
            <div className="text-center mb-10">
              <div className="text-4xl mb-3">👤</div>
              <h2 className="text-3xl font-bold text-primary-900 mb-2">Tell us about yourself</h2>
              <p className="text-base text-primary-600">Help us personalize your experience</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-8">
              <div>
                <label className="block text-sm text-primary-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full rounded-xl border-2 border-primary-200 bg-background-50 p-3 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm text-primary-700 font-medium mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full rounded-xl border-2 border-primary-200 bg-background-50 p-3 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm text-primary-700 font-medium mb-2">Current Country/City</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full rounded-xl border-2 border-primary-200 bg-background-50 p-3 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="e.g., Jakarta, Indonesia"
                />
              </div>

              <div>
                <label className="block text-sm text-primary-700 font-medium mb-2">Highest Education Level</label>
                <select
                  value={formData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                  className="w-full rounded-xl border-2 border-primary-200 bg-background-50 p-3 focus:border-primary-500 focus:outline-none transition-colors"
                >
                  <option value="">Select education level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-primary-700 font-medium mb-2">
                  Current Occupation <span className="text-primary-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  className="w-full rounded-xl border-2 border-primary-200 bg-background-50 p-3 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm text-primary-700 font-medium mb-2">Years of Work Experience</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-primary-600 mt-1">
                  <span>0 years</span>
                  <span className="font-medium text-primary-800">{formData.experience} years</span>
                  <span>20+ years</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={handleBack}
                className="flex-1 rounded-xl bg-white border-2 border-primary-200 text-primary-700 px-6 py-3 hover:bg-primary-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.fullName || !formData.age || !formData.location || !formData.education}
                className="flex-1 rounded-xl bg-primary-500 text-white px-6 py-3 shadow-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Interest Selection */}
        {step === 3 && (
          <div className="soft-card max-w-2xl mx-auto rounded-3xl bg-white shadow-xl p-12">
            <h2 className="text-3xl font-bold text-primary-900 text-center mb-3">What brings you here?</h2>
            <p className="text-base text-primary-600 text-center mb-10">Choose what you're most interested in</p>

            {/* Target Country Selection */}
            <div className="mb-10">
              <label className="block text-lg font-medium text-primary-800 mb-6">Target Country</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <button
                  onClick={() => handleInputChange("targetCountry", "japan")}
                  className={`rounded-2xl bg-white border-3 p-6 cursor-pointer transition-all ${
                    formData.targetCountry === "japan"
                      ? "border-primary-500 bg-primary-50 shadow-lg scale-105"
                      : "border-primary-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="text-4xl mb-2">🇯🇵</div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Japan</h3>
                  <p className="text-sm text-primary-600">Technical skills, seasonal work, highly skilled</p>
                </button>

                <button
                  onClick={() => handleInputChange("targetCountry", "korea")}
                  className={`rounded-2xl bg-white border-3 p-6 cursor-pointer transition-all ${
                    formData.targetCountry === "korea"
                      ? "border-primary-500 bg-primary-50 shadow-lg scale-105"
                      : "border-primary-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="text-4xl mb-2">🇰🇷</div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Korea</h3>
                  <p className="text-sm text-primary-600">Non-professional, working visits, specialized activities</p>
                </button>
              </div>

              <button
                onClick={() => handleInputChange("targetCountry", "both")}
                className={`w-full rounded-xl bg-white border-2 p-4 cursor-pointer transition-all ${
                  formData.targetCountry === "both"
                    ? "border-secondary-500 bg-secondary-50 shadow-lg"
                    : "border-primary-200 shadow-md hover:shadow-lg"
                }`}
              >
                <span className="font-medium text-primary-800">Both countries</span>
              </button>
            </div>

            {/* Primary Interest Selection */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-primary-800 mb-6">
                What would you like to explore first?
              </label>
              <div className="space-y-4">
                <button
                  onClick={() => handleInputChange("primaryInterest", "coach")}
                  className={`w-full rounded-xl bg-white border-2 p-5 cursor-pointer transition-all text-left ${
                    formData.primaryInterest === "coach"
                      ? "border-primary-500 bg-primary-50 shadow-lg"
                      : "border-primary-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎯</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-primary-800 mb-1">AI Career Coach</h4>
                      <p className="text-sm text-primary-600">
                        I want to learn about visa requirements and job preparation
                      </p>
                    </div>
                    {formData.primaryInterest === "coach" && <div className="text-primary-500 text-xl">✓</div>}
                  </div>
                </button>

                <button
                  onClick={() => handleInputChange("primaryInterest", "roleplay")}
                  className={`w-full rounded-xl bg-white border-2 p-5 cursor-pointer transition-all text-left ${
                    formData.primaryInterest === "roleplay"
                      ? "border-primary-500 bg-primary-50 shadow-lg"
                      : "border-primary-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎭</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-primary-800 mb-1">Cultural Role-Play Simulation</h4>
                      <p className="text-sm text-primary-600">I want to practice workplace and cultural scenarios</p>
                    </div>
                    {formData.primaryInterest === "roleplay" && <div className="text-primary-500 text-xl">✓</div>}
                  </div>
                </button>

                <button
                  onClick={() => handleInputChange("primaryInterest", "both")}
                  className={`w-full rounded-xl bg-white border-2 p-5 cursor-pointer transition-all text-left ${
                    formData.primaryInterest === "both"
                      ? "border-primary-500 bg-primary-50 shadow-lg"
                      : "border-primary-200 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">⚡</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-primary-800 mb-1">Explore Both</h4>
                      <p className="text-sm text-primary-600">I want to try everything</p>
                    </div>
                    {formData.primaryInterest === "both" && <div className="text-primary-500 text-xl">✓</div>}
                  </div>
                </button>
              </div>
            </div>

            {/* Goals Text Area */}
            <div className="mb-10">
              <label className="block text-sm text-primary-700 font-medium mb-2">
                Tell us more about your goals <span className="text-primary-400">(optional)</span>
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => handleInputChange("goals", e.target.value)}
                className="w-full rounded-xl border-2 border-primary-200 bg-background-50 p-3 h-24 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                placeholder="e.g., I want to work as a software engineer in Tokyo..."
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 rounded-xl bg-white border-2 border-primary-200 text-primary-700 px-6 py-3 hover:bg-primary-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                disabled={!formData.targetCountry || !formData.primaryInterest}
                className="flex-1 rounded-xl bg-primary-500 text-white px-8 py-3 shadow-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
