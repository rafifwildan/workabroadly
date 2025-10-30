"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { API_ENDPOINTS } from "@/lib/config"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({ packageId }: { packageId: string }) {
  const fetchClientSecret = useCallback(async () => {
    const response = await fetch(API_ENDPOINTS.stripe.checkout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ packageId }),
    })

    if (!response.ok) {
      throw new Error("Failed to create checkout session")
    }

    const data = await response.json()
    return data.clientSecret
  }, [packageId])

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
