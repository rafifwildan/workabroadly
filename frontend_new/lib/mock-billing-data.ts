export const mockBillingHistory = [
  {
    id: "inv-001",
    date: "Jan 1, 2025",
    amount: 20,
    status: "paid" as const,
    invoiceUrl: "#",
  },
  {
    id: "inv-002",
    date: "Dec 1, 2024",
    amount: 20,
    status: "paid" as const,
    invoiceUrl: "#",
  },
  {
    id: "inv-003",
    date: "Nov 1, 2024",
    amount: 20,
    status: "paid" as const,
    invoiceUrl: "#",
  },
  {
    id: "inv-004",
    date: "Oct 1, 2024",
    amount: 20,
    status: "pending" as const,
    invoiceUrl: "#",
  },
]

export type BillingHistoryItem = typeof mockBillingHistory[number]
