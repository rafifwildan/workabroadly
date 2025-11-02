"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert("Email/password signup coming soon! Please use Google signup.")
    }
  }

  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with Yellow Blob Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-gray-100 relative items-center justify-center overflow-hidden">
        {/* Organic Yellow Blob Shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative w-[600px] h-[600px]"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 50%, #FFD700 100%)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              boxShadow: '0 20px 60px rgba(253, 185, 49, 0.3)',
            }}
          >
            {/* Blue Circular Frame Inside */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-[400px] h-[500px] bg-gradient-to-br from-blue-400 to-blue-500 rounded-[50%] flex items-center justify-center shadow-2xl overflow-hidden"
                style={{
                  border: '8px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                {/* Hot Air Balloon Image */}
                <img 
                  src="https://images.unsplash.com/photo-1498550744921-75f79806b163?w=600&h=800&fit=crop"
                  alt="Hot air balloon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo at Top Left */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="WorkAbroadly" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-gray-900">WorkAbroadly</span>
          </Link>
        </div>

        {/* Navigation at Top Right */}
        <div className="absolute top-8 right-8 flex items-center gap-6">
          <Link href="#project" className="text-gray-700 hover:text-gray-900 font-medium">
            Project
          </Link>
          <Link href="#blog" className="text-gray-700 hover:text-gray-900 font-medium">
            Blog
          </Link>
          <Link href="#youtube" className="text-gray-700 hover:text-gray-900 font-medium">
            Youtube
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
            Contact
          </Link>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="WorkAbroadly" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900">WorkAbroadly</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Create your Free Account</h1>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-gray-700">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Fulll Name here"
                required
                className={`w-full rounded-full py-6 px-6 bg-gray-100 border-none text-gray-900 placeholder:text-gray-400 ${errors.fullName ? "border-2 border-red-500" : ""}`}
              />
              {errors.fullName && <p className="text-sm mt-1 text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email here"
                required
                className={`w-full rounded-full py-6 px-6 bg-gray-100 border-none text-gray-900 placeholder:text-gray-400 ${errors.email ? "border-2 border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm mt-1 text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password here"
                required
                className={`w-full rounded-full py-6 px-6 bg-gray-100 border-none text-gray-900 placeholder:text-gray-400 ${errors.password ? "border-2 border-red-500" : ""}`}
              />
              {errors.password && <p className="text-sm mt-1 text-red-500">{errors.password}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full py-7 text-base mt-8"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Log in
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">- OR -</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignUp}
            className="w-full font-medium rounded-full py-6 flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 shadow-sm"
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
            Sing-up with Google
          </Button>
        </div>
      </div>
    </div>
  )
}