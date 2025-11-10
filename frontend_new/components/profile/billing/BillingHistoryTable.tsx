import React from "react"
import { mockBillingHistory } from "@/lib/mock-billing-data"
import { Download } from "lucide-react"

export function BillingHistoryTable() {
  return (
    <div className="soft-card rounded-2xl bg-white shadow-lg p-6">
      <h3 className="text-lg font-bold text-black mb-4">Billing History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black/10">
              <th className="text-left py-3 px-2 font-semibold text-black">Date</th>
              <th className="text-left py-3 px-2 font-semibold text-black">Amount</th>
              <th className="text-left py-3 px-2 font-semibold text-black">Status</th>
              <th className="text-left py-3 px-2 font-semibold text-black">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {mockBillingHistory.map((item) => (
              <tr key={item.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                <td className="py-4 px-2 text-black">{item.date}</td>
                <td className="py-4 px-2 text-black font-medium">${item.amount}.00</td>
                <td className="py-4 px-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <button className="flex items-center gap-2 text-black hover:text-black/70 transition-colors text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
