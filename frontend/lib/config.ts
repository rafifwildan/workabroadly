// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/api/chat`,
  stripe: {
    checkout: `${API_BASE_URL}/api/stripe/checkout`,
    success: `${API_BASE_URL}/api/stripe/success`,
  },
}
