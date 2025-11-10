import React from "react"

export function CurrentPlanCard() {
  return (
    <div className="soft-card rounded-2xl bg-white shadow-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">Current Plan</h3>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-2xl font-bold text-black">Pro Plan</h4>
          <p className="text-black/70 mt-1">$20/month</p>
          <p className="text-sm text-black/50 mt-2">Next billing: February 1, 2025</p>
        </div>
        <button className="rounded-full bg-black text-white px-6 py-2 shadow-md hover:bg-gray-800 transition-colors">
          Manage Plan
        </button>
      </div>
    </div>
  )
}
