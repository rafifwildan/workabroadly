// User Plan Types
export type UserPlan = "starter" | "professional" | "premium" | "enterprise"

// Plan Limits
export const PLAN_LIMITS = {
  starter: {
    estimatedSessions: 3,
    price: 0,
    name: "Starter",
  },
  professional: {
    estimatedSessions: 200,
    price: 15,
    name: "Professional",
  },
  premium: {
    estimatedSessions: 250,
    price: 20,
    name: "Premium",
  },
  enterprise: {
    estimatedSessions: -1, // unlimited
    price: null,
    name: "Enterprise",
  },
} as const

// Usage Model
export interface UserUsage {
  userId: string
  plan: UserPlan
  sessionsUsed: number
  resetDate: Date
  lastTopUpDate?: Date
}

// Remaining usage
export function getRemainingUsage(usage: UserUsage) {
  const limit = PLAN_LIMITS[usage.plan].estimatedSessions

  return {
    sessionsRemaining:
      limit === -1 ? "Unlimited" : Math.max(0, limit - usage.sessionsUsed),
    sessionsTotal: limit,
  }
}

// Check eligibility
export function canUseService(usage: UserUsage): boolean {
  const limit = PLAN_LIMITS[usage.plan].estimatedSessions
  return limit === -1 || usage.sessionsUsed < limit
}

// Increment usage
export function incrementUsage(usage: UserUsage): UserUsage {
  return { ...usage, sessionsUsed: usage.sessionsUsed + 1 }
}

// Should reset usage
export function shouldResetUsage(usage: UserUsage): boolean {
  const now = new Date()
  return now >= new Date(usage.resetDate)
}

// Reset usage (monthly or top-up)
export function resetUsage(usage: UserUsage, isTopUp = false): UserUsage {
  const now = new Date()
  const nextResetDate = new Date(now)
  nextResetDate.setMonth(nextResetDate.getMonth() + 1)
  nextResetDate.setDate(1)
  nextResetDate.setHours(0, 0, 0, 0)

  return {
    ...usage,
    sessionsUsed: 0,
    resetDate: nextResetDate,
    lastTopUpDate: isTopUp ? now : usage.lastTopUpDate,
  }
}

// Usage percent for display
export function getUsagePercentage(usage: UserUsage): number {
  const limit = PLAN_LIMITS[usage.plan].estimatedSessions
  if (limit === -1) return 0
  return (usage.sessionsUsed / limit) * 100
}
