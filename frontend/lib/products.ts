export interface TokenPackage {
  id: string
  name: string
  description: string
  tokens: number
  priceInCents: number
  popular?: boolean
  bonus?: number
  chatSessions: number
  rolePlayPractices: number
  rolePlayType: "basic" | "premium"
  reportType: "basic" | "comprehensive" | "comprehensive-plus"
  features: string[]
}

export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: "free-tier",
    name: "Free",
    description: "Perfect for getting started",
    tokens: 0,
    priceInCents: 0,
    chatSessions: 3,
    rolePlayPractices: 3,
    rolePlayType: "basic",
    reportType: "basic",
    features: ["3 Chat sessions with Expat AI", "3 Free basic role play practices", "Basic feedback only"],
  },
  {
    id: "starter-pack",
    name: "Starter",
    description: "Great for beginners",
    tokens: 100,
    priceInCents: 300, // $3
    chatSessions: 10,
    rolePlayPractices: 3,
    rolePlayType: "premium",
    reportType: "basic",
    features: ["10 Chat sessions with Expat AI", "Unlock 3 premium role play practices", "Basic practice report"],
  },
  {
    id: "professional-pack",
    name: "Professional",
    description: "Most popular choice for serious learners",
    tokens: 500,
    priceInCents: 1500, // $15
    popular: true,
    chatSessions: 20,
    rolePlayPractices: 10,
    rolePlayType: "premium",
    reportType: "comprehensive",
    features: [
      "20 Chat sessions with Expat AI",
      "Unlock 10 premium role play practices",
      "Comprehensive practice report",
    ],
  },
  {
    id: "premium-pack",
    name: "Premium",
    description: "Best value for dedicated learners",
    tokens: 1000,
    priceInCents: 2000, // $20 (discounted from $30)
    chatSessions: 50,
    rolePlayPractices: 20,
    rolePlayType: "premium",
    reportType: "comprehensive-plus",
    features: [
      "50 Chat sessions with Expat AI",
      "Unlock 20+ premium role play practices",
      "Comprehensive practice report",
      "Personalized roadmap",
    ],
  },
]
