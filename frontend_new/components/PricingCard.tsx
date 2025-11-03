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
      className={`rounded-3xl p-8 relative transition-all duration-300 overflow-hidden ${
        pkg.popular
          ? "bg-black text-white shadow-xl scale-105"
          : isFree
          ? "bg-[#C5DDD8] shadow-lg hover:shadow-2xl"
          : "bg-white shadow-lg border-2 border-gray-200 hover:border-gray-900"
      }`}
    >
      {/* Decorative background curves untuk Free Plan */}
      {isFree && (
        <>
          {/* Curve kanan atas (ungu/lavender) */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4C5E2] rounded-full opacity-60"></div>
          
          {/* Curve tengah (teal) */}
          <div className="absolute top-1/4 -right-10 w-60 h-60 bg-[#7FC8BC] rounded-full opacity-50"></div>
          
          {/* Curve kanan bawah (lavender) */}
          <div className="absolute -bottom-32 right-0 w-96 h-96 bg-[#D4C5E2] rounded-full opacity-60"></div>
        </>
      )}

      {/* Content wrapper dengan z-index lebih tinggi */}
      <div className="relative z-10">
        {pkg.popular && (
          <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
            POPULAR
          </div>
        )}

        <h3 className={`text-3xl font-bold mb-1 ${pkg.popular ? "text-white" : "text-gray-900"}`}>
          {pkg.name}
        </h3>

        {/* Teks tambahan untuk "For personal" */}
        {isFree && <p className="text-gray-900 text-lg mb-6">For personal</p>}

        <div className="mb-8">
          {isEnterprise ? (
            <span className={`text-3xl font-bold ${pkg.popular ? "text-white" : "text-gray-900"}`}>
              Custom
            </span>
          ) : (
            <>
              <span className={`text-7xl font-bold ${pkg.popular ? "text-white" : "text-gray-900"}`}>
                ${priceDisplay}
              </span>
              {!isFree && <span className={pkg.popular ? "text-gray-400" : "text-gray-600"}>/mo</span>}
            </>
          )}
        </div>

        {showPurchaseButton && !isFree && !isEnterprise && (
          <>
            <div className={`text-sm mb-2 ${pkg.popular ? "text-white" : "text-gray-900"}`}>
              {pkg.credits} credits
            </div>
            {perCredit && (
              <div className={`text-xs mb-4 ${pkg.popular ? "text-gray-400" : "text-gray-600"}`}>
                ${perCredit}/credit
              </div>
            )}
          </>
        )}

        <ul className="space-y-4 mb-10">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className={`flex items-center gap-3 ${pkg.popular ? "text-white" : "text-gray-900"}`}>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  pkg.popular ? "bg-white text-black" : "bg-gray-900 text-white"
                }`}
              >
                ✓
              </span>
              <span className="text-base">{feature}</span>
            </li>
          ))}
        </ul>

        <a href={buttonLink}>
          <button
            className={`w-full rounded-full font-semibold py-4 px-6 transition-all duration-300 text-lg ${
              pkg.popular
                ? "bg-white text-black border-2 border-white hover:bg-black hover:text-white"
                : isFree
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-black text-white border-2 border-black hover:bg-white hover:text-black"
            }`}
          >
            {showPurchaseButton && !isFree && !isEnterprise ? "Purchase" : "Subscribe now"}
          </button>
        </a>
      </div>
    </div>
  )
}