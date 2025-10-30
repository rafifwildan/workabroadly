"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { TOKEN_PACKAGES } from "@/lib/stripe/products"

export default function BuyTokensPage() {
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleDummyPayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setPaymentSuccess(true)
    setTimeout(() => {
      router.push("/tokens")
    }, 3000)
  }

  if (selectedPackage) {
    const pkg = TOKEN_PACKAGES.find((p) => p.id === selectedPackage)
    if (!pkg) return null

    if (paymentSuccess) {
      const totalTokens = pkg.tokens + (pkg.bonus || 0)
      return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12">
          <div className="max-w-md mx-auto px-4">
            <div className="soft-card rounded-2xl p-8 shadow-xl text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-4">Your {totalTokens} tokens have been added to your account.</p>
              <p className="text-sm text-muted-foreground">Redirecting to token dashboard...</p>
            </div>
          </div>
        </div>
      )
    }

    const priceDisplay = (pkg.priceInCents / 100).toFixed(2)

    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => setSelectedPackage(null)}
            className="mb-6 text-primary hover:text-primary/80 flex items-center gap-2"
            disabled={isProcessing}
          >
            ← Back to packages
          </button>

          <div className="soft-card rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Complete Your Purchase</h2>

            <div className="bg-muted rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-semibold text-foreground">{pkg.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Tokens:</span>
                  <span className="text-foreground">{pkg.tokens}</span>
                </div>
                {pkg.bonus && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bonus Tokens:</span>
                    <span className="text-success">+{pkg.bonus}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total Tokens:</span>
                    <span className="font-bold text-primary">{pkg.tokens + (pkg.bonus || 0)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold text-foreground">Total Price:</span>
                    <span className="font-bold text-foreground text-xl">${priceDisplay}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground"
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground"
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleDummyPayment}
              disabled={isProcessing}
              className="w-full bg-primary text-primary-foreground rounded-xl py-4 font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Processing Payment...
                </span>
              ) : (
                <span>Pay ${priceDisplay}</span>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              This is a demo payment page. No real charges will be made.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Link href="/tokens" className="inline-block mb-4 text-primary hover:text-primary/80">
            ← Back to Token Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">Buy Tokens</h1>
          <p className="text-lg text-muted-foreground">Choose the perfect token package for your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TOKEN_PACKAGES.map((pkg) => {
            const totalTokens = pkg.tokens + (pkg.bonus || 0)
            const pricePerToken = (pkg.priceInCents / totalTokens / 100).toFixed(3)
            const priceDisplay = (pkg.priceInCents / 100).toFixed(2)
            const cardClass = pkg.popular
              ? "soft-card rounded-2xl p-6 shadow-xl relative ring-2 ring-primary"
              : "soft-card rounded-2xl p-6 shadow-xl relative"
            const buttonClass = pkg.popular
              ? "w-full rounded-xl py-3 font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
              : "w-full rounded-xl py-3 font-semibold transition-colors bg-muted text-foreground hover:bg-muted/80"

            return (
              <div key={pkg.id} className={cardClass}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">💎</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-foreground mb-1">${priceDisplay}</div>
                  <div className="text-lg text-primary font-semibold mb-2">{pkg.tokens} tokens</div>
                  {pkg.bonus && (
                    <div className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                      +{pkg.bonus} bonus tokens!
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-success">✓</span>
                    <span>{totalTokens} total tokens</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-success">✓</span>
                    <span>${pricePerToken} per token</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-success">✓</span>
                    <span>Never expires</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-success">✓</span>
                    <span>Instant delivery</span>
                  </div>
                </div>

                <button onClick={() => setSelectedPackage(pkg.id)} className={buttonClass}>
                  Buy Now
                </button>
              </div>
            )
          })}
        </div>

        <div className="soft-card rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Why Buy Tokens?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-foreground mb-2">Practice Scenarios</h3>
              <p className="text-sm text-muted-foreground">
                Use tokens to access interactive role-play scenarios and improve your skills
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold text-foreground mb-2">AI Career Coach</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized guidance and feedback from our AI-powered career coach
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-semibold text-foreground mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your improvement and earn badges as you complete scenarios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
