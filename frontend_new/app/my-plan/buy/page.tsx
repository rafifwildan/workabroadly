"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CREDIT_PACKAGES } from "@/lib/products"
import Footer from "@/components/Footer"

export default function BuyCreditsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!packageId) {
      router.push("/my-plan")
    }
  }, [packageId, router])

  if (!packageId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId)

  if (!pkg) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h2>
            <Link href="/my-plan" className="text-black hover:underline">
              ← Back to My Plan
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const priceDisplay = (pkg.priceInCents / 100).toFixed(2)

  const handleDummyPayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    const params = new URLSearchParams({
      package: pkg.name,
      credits: pkg.credits.toString(),
      bonus: (pkg.bonus || 0).toString(),
      price: priceDisplay,
    })
    router.push(`/confirmation/payment?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Link href="/my-plan" className="mb-6 text-gray-900 hover:text-gray-700 flex items-center gap-2">
            ← Back to My Plan
          </Link>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Purchase</h2>

            <div className="bg-gray-100 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-semibold text-gray-900">{pkg.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Credits:</span>
                  <span className="text-gray-900">{pkg.credits}</span>
                </div>
                {pkg.bonus && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bonus Credits:</span>
                    <span className="text-green-600">+{pkg.bonus}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total Credits:</span>
                    <span className="font-bold text-gray-900">{pkg.credits + (pkg.bonus || 0)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold text-gray-900">Total Price:</span>
                    <span className="font-bold text-gray-900 text-xl">${priceDisplay}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900"
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900"
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleDummyPayment}
              disabled={isProcessing}
              className="w-full bg-black text-white rounded-full py-4 font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Processing Payment...
                </span>
              ) : (
                <span>Pay ${priceDisplay}</span>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              This is a demo payment page. No real charges will be made.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
