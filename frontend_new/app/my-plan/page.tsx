"use client"

import { useState } from "react"
import { Gem } from "lucide-react"
import Footer from "@/components/Footer"
import AppSidebar from "@/components/AppSidebar"
import { CREDIT_PACKAGES } from "@/lib/products"
import PageHeader from "@/components/PageHeader"
import PricingCard from "@/components/PricingCard"

type Package = {
  id: string
  name: string
  credits: number
  price: number
  perCredit: number
  savings?: string
  features: string[]
  badge?: string
  popular?: boolean
}

const usageHistory = [
  { date: "Oct 27, 2025", activity: "Expat AI Chat Session", credits: -10 },
  { date: "Oct 26, 2025", activity: "Role-Play: First Day", credits: -20 },
  { date: "Oct 25, 2025", activity: "Expat AI Chat Session", credits: -10 },
  { date: "Oct 24, 2025", activity: "Role-Play: Interview", credits: -20 },
  { date: "Oct 23, 2025", activity: "Expat AI Chat Session", credits: -10 },
]

export default function MyPlanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const purchasablePackages = CREDIT_PACKAGES

  return (
    <div className="min-h-screen bg-white flex">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto pb-24 md:pb-0">
          <PageHeader
            title="My Plan"
            subtitle="Manage your credits and purchase more"
            sidebarOpen={sidebarOpen}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <div className="p-8 space-y-12">
            <div className="bg-black text-white rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center gap-6">
                <Gem className="w-16 h-16" />
                <div className="flex-1">
                  <div className="text-5xl font-bold mb-2">250 credits</div>
                  <p className="text-lg opacity-90">Professional Plan</p>
                  <p className="text-sm opacity-75 mt-2">1 Chat Session = 10 credits • 1 Role-Play = 20 credits</p>
                </div>
              </div>
            </div>

            {/* Credit Packages Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Purchase Credit Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {purchasablePackages.map((pkg) => (
                  <PricingCard key={pkg.id} package={pkg} showPurchaseButton={true} />
                ))}
              </div>
            </div>

            {/* Usage History Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Credit Usage</h3>
              <div className="rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-6 text-sm font-medium text-gray-900">Date</th>
                        <th className="text-left p-6 text-sm font-medium text-gray-900">Activity</th>
                        <th className="text-right p-6 text-sm font-medium text-gray-900">Credits Used</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usageHistory.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="p-6 text-sm text-gray-600">{item.date}</td>
                          <td className="p-6 text-sm text-gray-900 font-medium">{item.activity}</td>
                          <td className="p-6 text-sm text-right text-red-600 font-medium">{item.credits} credits</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
