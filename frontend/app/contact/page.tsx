"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 relative overflow-hidden">
      {/* Pastel Liquid Wave Background Elements */}
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none opacity-50"
        style={{
          background: `
            radial-gradient(ellipse at 30% 70%, 
              rgba(236, 72, 153, 0.3) 0%,
              rgba(167, 139, 250, 0.2) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(80px)'
        }}
      ></div>
      
      <div 
        className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none opacity-50"
        style={{
          background: `
            radial-gradient(ellipse at 70% 30%, 
              rgba(134, 239, 172, 0.3) 0%,
              rgba(147, 197, 253, 0.2) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(80px)'
        }}
      ></div>
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[700px] pointer-events-none opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, 
              rgba(253, 186, 116, 0.25) 0%,
              rgba(196, 181, 253, 0.2) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(100px)'
        }}
      ></div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <img src="/logo.jpeg" alt="WorkAbroadly" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="font-semibold text-gray-900">
                Home
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-gray-900">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl px-6 hover:from-purple-600 hover:to-pink-600">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-8 py-16 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Get in Touch</h1>
          <p className="text-xl text-gray-700 mb-8">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="px-8 pb-24 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/80 backdrop-blur-lg shadow-lg">
                    📧
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">Email</h3>
                    <a href="mailto:support@workabroadly.com" className="text-purple-600 hover:underline font-medium">
                      support@workabroadly.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/80 backdrop-blur-lg shadow-lg">
                    💬
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">Live Chat</h3>
                    <p className="text-gray-700">Available Mon-Fri, 9AM-6PM JST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/80 backdrop-blur-lg shadow-lg">
                    🌏
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900">Office</h3>
                    <p className="text-gray-700">Tokyo, Japan</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/80 backdrop-blur-lg shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/80 backdrop-blur-lg shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/80 backdrop-blur-lg shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
                  >
                    <span className="text-xl font-bold">f</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-900 font-semibold mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/50 border-gray-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-900 font-semibold mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/50 border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-900 font-semibold mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/50 border-gray-300"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-900 font-semibold mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px] bg-white/50 border-gray-300"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Oops! Something went wrong. Please try again later.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 font-semibold text-white rounded-xl py-6"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12 border-t border-white/30 bg-white/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-700">© 2025 WorkAbroadly. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}