"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/onboarding"
  }

  const handleGoogleSignUp = () => {
    window.location.href = "/onboarding"
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* --- PERBAIKAN DI SINI --- */}
      {/* Menambahkan spacer untuk Navbar 'fixed' */}
      <div className="h-[73px]" />
      {/* --- AKHIR PERBAIKAN --- */}

      <div className="flex flex-1">
        {/* Left Side - Decorative with Image */}
        <div className="h-full w-full flex flex-col cover items-center justify-center">
           <img
              src="images/REGISTER.svg"
              alt="register image"
              className=""
            />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Form Content */}
          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-black mb-3">Create your Free Account</h1>
              </div>

              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-black">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your Full Name here"
                    required
                    className="rounded-full py-6 px-6 bg-gray-100 border-none text-black placeholder:text-black/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email here"
                    required
                    className="rounded-full py-6 px-6 bg-gray-100 border-none text-black placeholder:text-black/50"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2 text-black">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password here"
                    required
                    className="rounded-full py-6 px-6 bg-gray-100 border-none text-black placeholder:text-black/50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white rounded-full py-6 text-lg font-semibold hover:bg-gray-800 transition-all mt-8"
                >
                  Create Account
                </Button>
              </form>

              <p className="text-center mt-6 text-black/70">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-black hover:text-black/80">
                  Log in
                </Link>
              </p>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-black/20"></div>
                <span className="text-sm text-black/50">- OR -</span>
                <div className="flex-1 h-px bg-black/20"></div>
              </div>

              <Button
                onClick={handleGoogleSignUp}
                className="w-full bg-white text-black rounded-full py-6 flex items-center justify-center gap-3 border-2 border-black/20 hover:bg-black/5 transition-all font-medium"
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
                Sign-up with Google
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}