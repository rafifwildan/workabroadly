
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
    name: "Starter",
    description: "Try our adaptive role-play learning",
    credits: 0,
    priceInCents: 0,
    estimatedSessions: 3,
    features: [
      "3 sessions",
      "AI custom roleplay practice",
      "Basic feedback",
    ],
  },
  {
    id: "professional-pack",
    name: "Professional",
    description: "Most popular choice for serious learners",
    credits: 400,
    priceInCents: 1500,
    estimatedSessions: 200,
    popular: false,
    features: [
      "≈200 estimated sessions",
      "AI custom roleplay practice",
      "Session insights",
    ],
  },
  {
    id: "premium-pack",
    name: "Premium",
    description: "Best value for dedicated learners",
    credits: 900,
    priceInCents: 2000,
    estimatedSessions: 250,
    popular: true,
    features: [
      "≈250 estimated sessions",
      "AI custom roleplay practice",
      "Session insights",
    ],
  },
  {
    id: "enterprise-pack",
    name: "Enterprise",
    description: "Custom solution for teams",
    credits: 0,
    priceInCents: 0,
    estimatedSessions: 999,
    features: [
      "Unlimited sessions",
      "Custom scenarios",
      "Team management",
      "Priority support",
    ],
  },
]

// optional re-export
export const TOKEN_PACKAGES = CREDIT_PACKAGES
