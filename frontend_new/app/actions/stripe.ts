"use server"

import { stripe } from "@/lib/stripe"
import { CREDIT_PACKAGES } from "@/lib/products"

export async function startCheckoutSession(packageId: string) {
  const creditPackage = CREDIT_PACKAGES.find((p) => p.id === packageId)
  if (!creditPackage) {
    throw new Error(`Credit package with id "${packageId}" not found`)
  }

  const totalCredits = creditPackage.credits + (creditPackage.bonus || 0)

  // Create Checkout Sessions
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: creditPackage.name,
            description: `${totalCredits} credits${creditPackage.bonus ? ` (includes ${creditPackage.bonus} bonus credits)` : ""}`,
          },
          unit_amount: creditPackage.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      packageId: creditPackage.id,
      credits: totalCredits.toString(),
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
