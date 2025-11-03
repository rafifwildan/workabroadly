export interface CreditPackage {
  id: string
  name: string
  description: string
  credits: number
  priceInCents: number
  popular?: boolean
  bonus?: number
  chatSessions: number
  rolePlayPractices: number
  rolePlayType: "basic" | "premium"
  reportType: "basic" | "comprehensive" | "comprehensive-plus"
  features: string[]
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "free-tier",
    name: "Starter",
    description: "Perfect for getting started",
    credits: 0,
    priceInCents: 0,
    chatSessions: 3,
    rolePlayPractices: 3,
    rolePlayType: "basic",
    reportType: "basic",
    features: ["3 Chat sessions", "3 Role-play practices", "Basic feedback"],
  },
  {
    id: "professional-pack",
    name: "Professional",
    description: "Most popular choice for serious learners",
    credits: 400,
    priceInCents: 1500, // $15
    popular: true,
    chatSessions: 20,
    rolePlayPractices: 10,
    rolePlayType: "premium",
    reportType: "comprehensive",
    features: [
      "20 Chat sessions (200 credits)",
      "10 Role-play practices (200 credits)",
      "Comprehensive feedback",
      "Practice reports",
    ],
  },
  {
    id: "premium-pack",
    name: "Premium",
    description: "Best value for dedicated learners",
    credits: 900,
    priceInCents: 2000, // $20
    chatSessions: 50,
    rolePlayPractices: 20,
    rolePlayType: "premium",
    reportType: "comprehensive-plus",
    features: [
      "50 Chat sessions (500 credits)",
      "20+ Role-play practices (400 credits)",
      "Advanced feedback",
      "Personalized roadmap",
    ],
  },
  {
    id: "enterprise-pack",
    name: "Enterprise",
    description: "Custom solution for teams",
    credits: 0,
    priceInCents: 0,
    chatSessions: 999,
    rolePlayPractices: 999,
    rolePlayType: "premium",
    reportType: "comprehensive-plus",
    features: ["Unlimited sessions", "Custom scenarios", "Team management", "Priority support"],
  },
]

// Credit costs for each activity
export const CREDIT_COSTS = {
  CHAT_SESSION: 10,
  ROLE_PLAY: 20,
}

export const TOKEN_PACKAGES = CREDIT_PACKAGES
