"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot, Drama, MessageSquare } from "lucide-react"

type Step = 1 | 2

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    // Step 1
    primaryInterest: "",

    // Step 2
    originCountry: "",
    targetCulture: "",
    employeeType: "",
    educationLevel: "",
    industry: "",
    occupation: "",         // optional
    yearsOfExperience: "",  // optional
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

  const handleComplete = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("") // Clear previous errors

    try {
      // Get token from localStorage
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

      if (!token) {
        setErrorMessage("Not authenticated. Please sign in again.")
        setLoading(false)
        router.push("/login")
        return
      }

      // Call backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/onboarding`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      // ⚡ CRITICAL: Handle non-JSON responses (404, 500, etc.)
      const contentType = response.headers.get("content-type")
      const isJSON = contentType && contentType.includes("application/json")

      if (!response.ok) {
        // Try to parse error message from JSON
        if (isJSON) {
          const errorData = await response.json()
          const backendError = errorData.error || errorData.message || 'Failed to save onboarding data'
          console.error("[Onboarding Error]:", backendError)
          setErrorMessage(backendError)
        } else {
          // Non-JSON response (HTML error page, etc.)
          const text = await response.text()
          console.error("[Onboarding Error] Non-JSON response:", text)
          setErrorMessage(`Server error (${response.status}): ${response.statusText}`)
        }
        setLoading(false)
        return
      }

      // Success - parse response and redirect
      const data = await response.json()
      console.log("✅ Onboarding completed successfully:", data)

      // Update user in localStorage
      if (data.user && typeof window !== "undefined") {
        localStorage.setItem("auth_user", JSON.stringify(data.user))
      }

      // Redirect to home
      router.push('/home')

    } catch (error: any) {
      console.error("[Onboarding Error] Network or unexpected error:", error)

      // Check if it's a SyntaxError from JSON parsing
      if (error instanceof SyntaxError) {
        setErrorMessage("Server returned invalid response. Please try again or contact support.")
      } else {
        setErrorMessage(error.message || "Network error. Please check your connection and try again.")
      }

      setLoading(false)
    }
  }

  const progress = (step / 2) * 100

  return (
  <div
      className="
        min-h-screen
        flex items-center justify-center p-8
        bg-cover bg-center bg-no-repeat
      ">
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
                    <h4 className="text-lg font-bold text-black mb-1">Cultural Inteligence Coach</h4>
                    <p className="text-sm text-gray-600">I want to learn more about cross cultural insights.</p>
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

            {/* Error Message Display */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ {errorMessage}
                </p>
              </div>
            )}

            {/* Form Fields */}
        <div className="space-y-6">

          {/* 1 — Where are you from? */}
          <div>
            <label className="block text-sm text-black font-medium mb-2">
              Where are you from?
            </label>
            <select
              value={formData.originCountry}
              onChange={(e) => handleInputChange("originCountry", e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 focus:border-black focus:outline-none transition-colors"
            >
              <option value="">Select your origin country</option>
              <option value="indonesia">Indonesia</option>
              <option value="japan">Japan</option>
              <option value="korea">Korea</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* 2 — Culture of interest */}
          <div>
            <label className="block text-sm text-black font-medium mb-2">
              Which culture are you most interested in?
            </label>
            <select
              value={formData.targetCulture}
              onChange={(e) => handleInputChange("targetCulture", e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 focus:border-black focus:outline-none transition-colors"
            >
              <option value="">Select a culture</option>
              <option value="japan">Japan</option>
              <option value="korea">Korea</option>
              <option value="english-western">English / Western</option>
              <option value="indonesia">Indonesia</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* 3 — Employee type */}
          <div>
            <label className="block text-sm text-black font-medium mb-2">
              What best describes you?
            </label>
            <select
              value={formData.employeeType}
              onChange={(e) => handleInputChange("employeeType", e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 focus:border-black focus:outline-none transition-colors"
            >
              <option value="">Select one</option>
              <option value="expat">Expat — working or studying abroad</option>
              <option value="local-mnc">Local employee at a multinational company</option>
              <option value="job-seeker">Job seeker</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* 4 — Education level */}
          <div>
            <label className="block text-sm text-black font-medium mb-2">
              Education Level
            </label>
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

          {/* 5 — Industry (optional) */}
          <div>
            <label className="block text-sm text-black font-medium mb-2">
              Your Work Industry <span className="text-gray-400">(optional)</span>
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
                disabled={
                  !formData.originCountry ||
                  !formData.targetCulture ||
                  !formData.employeeType ||
                  !formData.educationLevel ||
                  loading
                }
                className="flex-1 rounded-full bg-black text-white px-6 py-3 shadow-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Saving..." : "Complete Setup"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}
