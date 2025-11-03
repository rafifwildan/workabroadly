import Link from "next/link"
import type { CreditPackage } from "@/lib/products"

interface PricingCardProps {
  package: CreditPackage
  showPurchaseButton?: boolean
  ctaText?: string
  ctaLink?: string
}

export default function PricingCard({
  package: pkg,
  showPurchaseButton = false,
  ctaText = "Get Started",
  ctaLink,
}: PricingCardProps) {
  const priceDisplay = pkg.priceInCents === 0 ? "0" : (pkg.priceInCents / 100).toFixed(2)
  const perCredit = pkg.credits > 0 ? (pkg.priceInCents / 100 / pkg.credits).toFixed(3) : null
  const isEnterprise = pkg.id === "enterprise-pack"
  const isFree = pkg.id === "free-tier"

  // Determine button link
  const buttonLink = ctaLink || (showPurchaseButton ? `/my-plan/buy?package=${pkg.id}` : "/signup")

  return (
    <div
      className={`rounded-2xl p-8 relative transition-all ${
        pkg.popular
          ? "bg-black text-white shadow-xl scale-105"
          : "bg-white shadow-lg border-2 border-gray-200 hover:border-gray-900"
      }`}
    >
      {pkg.popular && (
        <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
          POPULAR
        </div>
      )}

      <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? "text-white" : "text-gray-900"}`}>{pkg.name}</h3>

      <div className="mb-6">
        {isEnterprise ? (
          <span className={`text-3xl font-bold ${pkg.popular ? "text-white" : "text-gray-900"}`}>Custom</span>
        ) : (
          <>
            <span className={`text-5xl font-bold ${pkg.popular ? "text-white" : "text-gray-900"}`}>
              ${priceDisplay}
            </span>
            {!isFree && <span className={pkg.popular ? "text-gray-400" : "text-gray-600"}>/mo</span>}
          </>
        )}
      </div>

      {showPurchaseButton && !isFree && !isEnterprise && (
        <>
          <div className={`text-sm mb-2 ${pkg.popular ? "text-white" : "text-gray-900"}`}>{pkg.credits} credits</div>
          {perCredit && (
            <div className={`text-xs mb-4 ${pkg.popular ? "text-gray-400" : "text-gray-600"}`}>${perCredit}/credit</div>
          )}
        </>
      )}

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className={`flex items-center gap-2 ${pkg.popular ? "text-white" : "text-gray-700"}`}>
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                pkg.popular ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={buttonLink}>
        <button
          className={`w-full rounded-full font-semibold py-3 transition-all ${
            pkg.popular
              ? "bg-white text-black hover:bg-gray-100"
              : isEnterprise
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black border-2 border-black hover:bg-black hover:text-white"
          }`}
        >
          {showPurchaseButton && !isFree && !isEnterprise ? "Purchase" : ctaText}
        </button>
      </Link>
    </div>
  )
}
