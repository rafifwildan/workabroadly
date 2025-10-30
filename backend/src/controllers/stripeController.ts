// import type { Request, Response } from "express"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-11-20.acacia",
// })

// const products = [
//   {
//     id: "basic",
//     name: "Basic Plan",
//     description: "100 tokens for career coaching",
//     price: 50000,
//     tokens: 100,
//   },
//   {
//     id: "pro",
//     name: "Pro Plan",
//     description: "500 tokens for career coaching",
//     price: 200000,
//     tokens: 500,
//   },
//   {
//     id: "premium",
//     name: "Premium Plan",
//     description: "1000 tokens for career coaching",
//     price: 350000,
//     tokens: 1000,
//   },
// ]

// export async function getProducts(req: Request, res: Response) {
//   try {
//     res.json({ products })
//   } catch (error: any) {
//     console.error("[Stripe Error]:", error)
//     res.status(500).json({ error: "Failed to fetch products" })
//   }
// }

// export async function createCheckout(req: Request, res: Response) {
//   try {
//     const { productId } = req.body

//     if (!productId) {
//       return res.status(400).json({ error: "Product ID is required" })
//     }

//     const product = products.find((p) => p.id === productId)

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" })
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "idr",
//             product_data: {
//               name: product.name,
//               description: product.description,
//             },
//             unit_amount: product.price,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URL}/tokens/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/tokens/buy`,
//       metadata: {
//         productId: product.id,
//         tokens: product.tokens.toString(),
//       },
//     })

//     res.json({ url: session.url })
//   } catch (error: any) {
//     console.error("[Stripe Error]:", error)
//     res.status(500).json({ error: "Failed to create checkout session" })
//   }
// }
