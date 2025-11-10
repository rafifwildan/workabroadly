import React from "react"
import { CreditCard } from "lucide-react"

export function PaymentMethodCard() {
  return (
    <div className="soft-card rounded-2xl bg-white shadow-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">Payment Method</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-black" />
          </div>
          <div>
            <p className="font-medium text-black">Visa ending in 1234</p>
            <p className="text-sm text-black/70">Expires 12/2028</p>
          </div>
        </div>
        <button className="rounded-full bg-white border-2 border-black text-black px-6 py-2 shadow-md hover:bg-black/5 transition-colors">
          Update
        </button>
      </div>
    </div>
  )
}
