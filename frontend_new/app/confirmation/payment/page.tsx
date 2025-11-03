"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Home, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  const packageName = searchParams.get("package") || "Credit Package"
  const baseCredits = searchParams.get("credits") || "0"
  const bonusCredits = searchParams.get("bonus") || "0"
  const totalPrice = searchParams.get("price") || "0.00"
  const totalCredits = Number.parseInt(baseCredits) + Number.parseInt(bonusCredits)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Your credits have been added to your account and are ready to use.
          </p>

          <div className="bg-gray-100 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Package:</span>
                <span className="font-semibold text-gray-900">{packageName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base Credits:</span>
                <span className="text-gray-900">{baseCredits}</span>
              </div>
              {Number.parseInt(bonusCredits) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bonus Credits:</span>
                  <span className="text-green-600">+{bonusCredits}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total Credits:</span>
                  <span className="font-bold text-gray-900">{totalCredits}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold text-gray-900">Total Price:</span>
                  <span className="font-bold text-gray-900 text-xl">${totalPrice}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">Completed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home" className="w-full sm:w-auto">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-base w-full">
                <Home className="w-5 h-5 mr-2" />
                Go Back to Home
              </Button>
            </Link>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-gray-300 text-gray-900 hover:bg-gray-50 rounded-full px-8 py-6 text-base w-full sm:w-auto bg-transparent"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print Payment
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 mt-8">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  )
}
