"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      window.location.href = "/dashboard"
    }
  }

  const handleGoogleSignUp = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Logo and Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center">
            <Image src="/images/logo.png" alt="WorkAbroadly" width={180} height={40} className="h-10 w-auto" />
          </Link>
        </div>

        {/* Sign Up Card */}
        <div className="p-8 rounded-3xl soft-card">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Create Account</h1>
            <p className="text-muted-foreground">Start your journey to working abroad</p>
          </div>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignUp}
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

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-foreground">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className={`rounded-xl py-6 bg-muted shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] ${errors.fullName ? "border-2 border-destructive" : "border-none"}`}
              />
              {errors.fullName && <p className="text-sm mt-1 text-destructive">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={`rounded-xl py-6 bg-muted shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] ${errors.email ? "border-2 border-destructive" : "border-none"}`}
              />
              {errors.email && <p className="text-sm mt-1 text-destructive">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`rounded-xl py-6 bg-muted shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] ${errors.password ? "border-2 border-destructive" : "border-none"}`}
              />
              {errors.password && <p className="text-sm mt-1 text-destructive">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-foreground">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`rounded-xl py-6 bg-muted shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)] ${errors.confirmPassword ? "border-2 border-destructive" : "border-none"}`}
              />
              {errors.confirmPassword && <p className="text-sm mt-1 text-destructive">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 rounded accent-primary" />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-primary">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <Button type="submit" className="soft-button w-full font-semibold text-white rounded-2xl py-6">
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
