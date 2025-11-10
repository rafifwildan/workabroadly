
export interface CreditPackage {
  id: string
  name: string
  description: string
  credits: number
  priceInCents: number
  estimatedSessions: number
  popular?: boolean
  bonus?: number
  features: string[]
}

// ✅ Data
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "free-tier",
    name: "Free-tier",
    description: "Try it, it's free",
    credits: 0,
    priceInCents: 0,
    chatSessions: 3,
    rolePlayPractices: 3,
    rolePlayType: "basic",
    reportType: "basic",
    features: ["3 chat sessions with AI Coaches", "3 cultural role-play scenarios"],
  },
  {
    id: "starter-pack",
    name: "Starter",
    description: "Most popular choice for serious learners",
    credits: 10,
    priceInCents: 300, // $3
    popular: true,
    chatSessions: 10,
    rolePlayPractices: 5,
    rolePlayType: "premium",
    reportType: "comprehensive",
    features: [
      "10 chat sessions with AI Coaches", 
      "5 cultural role-play scenarios"
    ],
  },
  {
    id: "professional-pack",
    name: "Professional",
    description: "Best value for dedicated learners",
    credits: 30,
    priceInCents: 700, // $7
    chatSessions: 50,
    rolePlayPractices: 20,
    rolePlayType: "premium",
    reportType: "comprehensive-plus",
    features: [
      "20 chat sessions with AI Coaches", 
      "10 cultural role-play scenarios"
    ],
  },
  {
    id: "premium-pack",
    name: "Premium",
    description: "Custom solution for teams",
    credits: 50,
    priceInCents: 1000,
    chatSessions: 999,
    rolePlayPractices: 999,
    rolePlayType: "premium",
    reportType: "comprehensive-plus",
    features: [
      "30 chat sessions with AI Coaches", 
      "15 cultural role-play scenarios"],
  },
]

// optional re-export
export const TOKEN_PACKAGES = CREDIT_PACKAGES
