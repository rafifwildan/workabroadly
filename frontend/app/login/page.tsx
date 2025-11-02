"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  // Router and navigation
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  })
  
  // UI state
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/home")
    }
  }, [router])

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam === "authentication_failed") {
        setError("Authentication failed. Please try again.");
      } else {
        setError("An error occurred during login.");
      }
    }
  }, [searchParams]);

  // Form handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: Implement actual authentication logic
      window.location.href = "/home"
    } catch (err) {
      setError("Login failed. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
  }

  const handleTryDemo = () => {
    router.push("/home?demo=true")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        {/* Logo and Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center">
            <Image src="/images/logo.png" alt="WorkAbroadly" width={180} height={40} className="h-10 w-auto" />
          </Link>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl soft-card">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue your journey</p>
          </div>

          {/* Try Demo button */}
          <Button
            onClick={handleTryDemo}
            className="w-full mb-4 font-semibold rounded-2xl py-6 flex items-center justify-center gap-3 bg-accent text-foreground shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.5)]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            Try Demo Account
          </Button>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full mb-6 font-semibold rounded-2xl py-6 flex items-center justify-center gap-3 bg-card text-foreground border-2 border-border shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.5)]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.8 10.2273C19.8 9.51819 19.7364 8.83637 19.6182 8.18182H10V12.05H15.4818C15.2273 13.3 14.5091 14.3591 13.4364 15.0682V17.5773H16.7364C18.7091 15.7682 19.8 13.2318 19.8 10.2273Z"
                fill="#4285F4"
              />
              <path
                d="M10 20C12.7 20 14.9636 19.1045 16.7364 17.5773L13.4364 15.0682C12.5182 15.6682 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2 4.40455 11.8H0.990909V14.3909C2.75455 17.8909 6.11364 20 10 20Z"
                fill="#34A853"
              />
              <path
                d="M4.40455 11.8C4.18182 11.2 4.05455 10.5545 4.05455 9.88636C4.05455 9.21818 4.18182 8.57273 4.40455 7.97273V5.38182H0.990909C0.359091 6.64545 0 8.07273 0 9.88636C0 11.7 0.359091 13.1273 0.990909 14.3909L4.40455 11.8Z"
                fill="#FBBC05"
              />
              <path
                d="M10 3.75C11.4682 3.75 12.7864 4.25909 13.8227 5.24091L16.7364 2.32727C14.9591 0.613636 12.6955 -0.25 10 -0.25C6.11364 -0.25 2.75455 1.85909 0.990909 5.38182L4.40455 7.97273C5.19091 5.55 7.39545 3.75 10 3.75Z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                className="rounded-xl py-6 bg-muted border-none shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                className="rounded-xl py-6 bg-muted border-none shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded accent-primary" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-primary">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="soft-button w-full font-semibold text-white rounded-2xl py-6">
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
