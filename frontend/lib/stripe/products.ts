export interface TokenPackage {
  id: string
  name: string
  description: string
  tokens: number
  priceInCents: number
  popular?: boolean
  bonus?: number
}

// Token packages available for purchase
export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: "starter-pack",
    name: "Starter Pack",
    description: "Perfect for trying out scenarios",
    tokens: 100,
    priceInCents: 999, // $9.99
  },
  {
    id: "popular-pack",
    name: "Popular Pack",
    description: "Most popular choice",
    tokens: 500,
    priceInCents: 3999, // $39.99
    popular: true,
    bonus: 50, // +50 bonus tokens
  },
  {
    id: "pro-pack",
    name: "Pro Pack",
    description: "Best value for serious learners",
    tokens: 1000,
    priceInCents: 6999, // $69.99
    bonus: 200, // +200 bonus tokens
  },
  {
    id: "ultimate-pack",
    name: "Ultimate Pack",
    description: "Maximum tokens for dedicated users",
    tokens: 2500,
    priceInCents: 14999, // $149.99
    bonus: 750, // +750 bonus tokens
  },
]
