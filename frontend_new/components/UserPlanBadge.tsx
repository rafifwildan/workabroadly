"use client"

import { Shield, Crown, Zap, Building2 } from "lucide-react"
import { PLAN_LIMITS, type UserUsage } from "@/lib/usage-calculator" // getCreditUsage

interface UserPlanBadgeProps {
  usage: UserUsage
  showDetails?: boolean
}

export default function UserPlanBadge({ usage, showDetails = true }: UserPlanBadgeProps) {
  const planInfo = PLAN_LIMITS[usage.plan]
  // const creditUsage = getCreditUsage(usage)

  const getPlanIcon = () => {
    switch (usage.plan) {
      case "starter":
        return <Shield className="w-5 h-5" />
      case "professional":
        return <Zap className="w-5 h-5" />
      case "premium":
        return <Crown className="w-5 h-5" />
      case "enterprise":
        return <Building2 className="w-5 h-5" />
    }
  }

  const getPlanColor = () => {
    return "bg-black/5 text-black border-black/20"
  }

  return (
    <div className={`rounded-xl border-2 ${getPlanColor()} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        {getPlanIcon()}
        <span className="font-bold text-lg">{planInfo.name}</span>
      </div>

      {showDetails && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Credits Used:</span>
            {/* <span className="font-medium">{creditUsage.creditsUsed}</span> */}
          </div>
          <div className="flex justify-between">
            <span>Remaining Credits:</span>
            <span className="font-medium">
              {/* {creditUsage.creditsRemaining === "Unlimited" ? "Unlimited" : creditUsage.creditsRemaining} */}
            </span>
          </div>
          {/* <div className="flex justify-between">
            <span>Chat Sessions:</span>
            <span className="font-medium">{usage.chatSessions}</span>
          </div>
          <div className="flex justify-between">
            <span>Role-Plays:</span>
            <span className="font-medium">{usage.rolePlays}</span>
          </div> */}
        </div>
      )}
    </div>
  )
}
