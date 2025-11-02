"use server"

import { stripe } from "@/lib/stripe"
import { TOKEN_PACKAGES } from "@/lib/products"

export async function startCheckoutSession(packageId: string) {
  const tokenPackage = TOKEN_PACKAGES.find((p) => p.id === packageId)
  if (!tokenPackage) {
    throw new Error(`Token package with id "${packageId}" not found`)
  }

  const totalTokens = tokenPackage.tokens + (tokenPackage.bonus || 0)

  // Create Checkout Sessions
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: tokenPackage.name,
            description: `${totalTokens} tokens${tokenPackage.bonus ? ` (includes ${tokenPackage.bonus} bonus tokens)` : ""}`,
          },
          unit_amount: tokenPackage.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      packageId: tokenPackage.id,
      tokens: totalTokens.toString(),
    },
  })

  return session.client_secret
}

export async function getSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.status,
    customerEmail: session.customer_details?.email,
  }
}
