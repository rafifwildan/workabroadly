// User Plan Types
export type UserPlan = "starter" | "professional" | "premium" | "enterprise"

// Plan Limits based on pricing structure
export const PLAN_LIMITS = {
  starter: {
    chatSessions: 3,
    rolePlays: 3,
    price: 0,
    name: "Starter",
  },
  professional: {
    chatSessions: 20,
    rolePlays: 10,
    price: 15,
    name: "Professional",
  },
  premium: {
    chatSessions: 50,
    rolePlays: 20,
    price: 20,
    name: "Premium",
  },
  enterprise: {
    chatSessions: -1, // -1 = unlimited
    rolePlays: -1,
    price: null, // Custom pricing
    name: "Enterprise",
  },
} as const

// Credit Calculation Constants
export const CREDIT_COSTS = {
  chatSession: 10,
  rolePlay: 20,
} as const

export const PLAN_CREDITS = {
  starter: 0, // Free plan
  professional: 400,
  premium: 900,
  enterprise: -1, // Unlimited
} as const

// Usage Tracking Interface
export interface UserUsage {
  userId: string
  plan: UserPlan
  chatSessionsUsed: number
  rolePlaysUsed: number
  resetDate: Date // Monthly reset or when topped up
  lastTopUpDate?: Date
}

// Calculate remaining sessions
export function getRemainingUsage(usage: UserUsage) {
  const limits = PLAN_LIMITS[usage.plan]

  return {
    chatSessionsRemaining:
      limits.chatSessions === -1 ? "Unlimited" : Math.max(0, limits.chatSessions - usage.chatSessionsUsed),
    rolePlaysRemaining: limits.rolePlays === -1 ? "Unlimited" : Math.max(0, limits.rolePlays - usage.rolePlaysUsed),
    chatSessionsTotal: limits.chatSessions,
    rolePlaysTotal: limits.rolePlays,
  }
}

// Check if user can use service
export function canUseService(usage: UserUsage, serviceType: "chat" | "roleplay"): boolean {
  const limits = PLAN_LIMITS[usage.plan]

  if (serviceType === "chat") {
    return limits.chatSessions === -1 || usage.chatSessionsUsed < limits.chatSessions
  } else {
    return limits.rolePlays === -1 || usage.rolePlaysUsed < limits.rolePlays
  }
}

// Increment usage
export function incrementUsage(usage: UserUsage, serviceType: "chat" | "roleplay"): UserUsage {
  if (serviceType === "chat") {
    return { ...usage, chatSessionsUsed: usage.chatSessionsUsed + 1 }
  } else {
    return { ...usage, rolePlaysUsed: usage.rolePlaysUsed + 1 }
  }
}

// Check if usage should be reset (monthly or on top-up)
export function shouldResetUsage(usage: UserUsage): boolean {
  const now = new Date()
  const resetDate = new Date(usage.resetDate)

  // Reset if we've passed the reset date
  return now >= resetDate
}

// Reset usage (called at beginning of month or when topped up)
export function resetUsage(usage: UserUsage, isTopUp = false): UserUsage {
  const now = new Date()
  const nextResetDate = new Date(now)
  nextResetDate.setMonth(nextResetDate.getMonth() + 1)
  nextResetDate.setDate(1) // First day of next month
  nextResetDate.setHours(0, 0, 0, 0)

  return {
    ...usage,
    chatSessionsUsed: 0,
    rolePlaysUsed: 0,
    resetDate: nextResetDate,
    lastTopUpDate: isTopUp ? now : usage.lastTopUpDate,
  }
}

// Get usage percentage for display
export function getUsagePercentage(usage: UserUsage, serviceType: "chat" | "roleplay"): number {
  const limits = PLAN_LIMITS[usage.plan]

  if (serviceType === "chat") {
    if (limits.chatSessions === -1) return 0 // Unlimited
    return (usage.chatSessionsUsed / limits.chatSessions) * 100
  } else {
    if (limits.rolePlays === -1) return 0 // Unlimited
    return (usage.rolePlaysUsed / limits.rolePlays) * 100
  }
}

// Calculate credits used and remaining
export function getCreditUsage(usage: UserUsage) {
  const creditsUsed = usage.chatSessionsUsed * CREDIT_COSTS.chatSession + usage.rolePlaysUsed * CREDIT_COSTS.rolePlay
  const totalCredits = PLAN_CREDITS[usage.plan]
  const creditsRemaining = totalCredits === -1 ? "Unlimited" : Math.max(0, totalCredits - creditsUsed)
  const featuresUsed = usage.chatSessionsUsed + usage.rolePlaysUsed

  return {
    creditsUsed,
    creditsRemaining,
    totalCredits,
    featuresUsed,
  }
}

// Mock data for development
export function getMockUserUsage(): UserUsage {
  const now = new Date()
  const resetDate = new Date(now)
  resetDate.setMonth(resetDate.getMonth() + 1)
  resetDate.setDate(1)
  resetDate.setHours(0, 0, 0, 0)

  return {
    userId: "mock-user-123",
    plan: "professional",
    chatSessionsUsed: 5,
    rolePlaysUsed: 3,
    resetDate: resetDate,
  }
}
