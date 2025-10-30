"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  const handleTryDemo = () => {
    router.push("/dashboard?demo=true")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="WorkAbroadly" width={180} height={40} className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold text-primary">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="soft-button font-semibold text-white rounded-2xl px-6">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section with Bento Grid */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Your AI-Powered Guide to Working Abroad</h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Master visa requirements, cultural nuances, and workplace communication for Japan and Korea
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="soft-button font-semibold text-white rounded-2xl px-8 text-lg py-9">
                Get Started Free
              </Button>
            </Link>
            <Button
              size="lg"
              onClick={handleTryDemo}
              variant="outline"
              className="font-semibold rounded-2xl px-8 py-6 text-lg border-2 border-primary text-primary bg-card shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.5)]"
            >
              Try Demo
            </Button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Large Card - AI Career Coach */}
          <div className="md:col-span-2 md:row-span-2 p-8 rounded-3xl soft-card">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-primary">🤖</div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">AI Career Coach</h3>
                <p className="text-lg text-muted-foreground">
                  Get instant answers about visa requirements, work permits, and employment terms
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-2xl bg-muted shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
                <p className="text-sm font-medium text-muted-foreground">
                  "What documents do I need for a work visa in Japan?"
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-muted shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
                <p className="text-sm font-medium text-muted-foreground">
                  "How long does the E-7 visa process take in Korea?"
                </p>
              </div>
            </div>
          </div>

          {/* Small Card - Visa Info */}
          <div className="p-6 rounded-3xl soft-card">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-secondary">📋</div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Visa Requirements</h3>
            <p className="text-muted-foreground">Comprehensive guides for work visas in Japan and Korea</p>
          </div>

          {/* Small Card - Cultural Tips */}
          <div className="p-6 rounded-3xl soft-card">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-accent">🌏</div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Cultural Insights</h3>
            <p className="text-muted-foreground">Learn workplace etiquette and communication styles</p>
          </div>

          {/* Medium Card - Role Play */}
          <div className="md:col-span-2 p-8 rounded-3xl soft-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-secondary">🎭</div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Interactive Role-Play</h3>
                <p className="text-lg text-muted-foreground">
                  Practice real workplace scenarios with AI feedback on your responses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground">Comprehensive tools to prepare you for working abroad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Career Coach Feature */}
          <div className="p-8 rounded-3xl soft-card">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-primary">🤖</div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">AI Career Coach</h3>
            <p className="text-lg mb-6 text-muted-foreground">
              Get instant, accurate answers to all your questions about working abroad
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Visa requirements and application process</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Work permit regulations and timelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Employment terms and labor laws</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Country-specific guidance for Japan and Korea</span>
              </li>
            </ul>
          </div>

          {/* Cultural Role-Play Feature */}
          <div className="p-8 rounded-3xl soft-card">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-secondary">🎭</div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Cultural Role-Play</h3>
            <p className="text-lg mb-6 text-muted-foreground">
              Practice real workplace scenarios and build confidence before you go
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-secondary">✓</span>
                <span className="text-muted-foreground">Interactive workplace simulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary">✓</span>
                <span className="text-muted-foreground">AI feedback on cultural appropriateness</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary">✓</span>
                <span className="text-muted-foreground">Language tips and common phrases</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary">✓</span>
                <span className="text-muted-foreground">Build confidence through practice</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Simple, Token-Based Pricing</h2>
          <p className="text-xl text-muted-foreground">Pay only for what you use. No subscriptions, no commitments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl soft-card">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary">50</span>
                <span className="text-xl ml-2 text-muted-foreground">tokens</span>
              </div>
              <p className="text-lg font-semibold text-foreground">$9.99</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">50 AI Career Coach queries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">10 Role-Play scenarios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Basic visa guides</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Email support</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button className="soft-button w-full font-semibold text-white rounded-2xl py-6">Get Started</Button>
            </Link>
          </div>

          {/* Professional Plan - Featured */}
          <div
            className="p-8 rounded-3xl relative bg-primary shadow-[8px_8px_16px_rgba(163,177,198,0.7),-8px_-8px_16px_rgba(255,255,255,0.6)]"
            style={{ transform: "scale(1.05)" }}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold bg-accent text-foreground">
              Most Popular
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">Professional</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">150</span>
                <span className="text-xl ml-2 text-white opacity-90">tokens</span>
              </div>
              <p className="text-lg font-semibold text-white">$24.99</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-white">✓</span>
                <span className="text-white">150 AI Career Coach queries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white">✓</span>
                <span className="text-white">35 Role-Play scenarios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white">✓</span>
                <span className="text-white">Advanced visa guides</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white">✓</span>
                <span className="text-white">Priority email support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white">✓</span>
                <span className="text-white">Cultural insights library</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button className="w-full font-semibold rounded-2xl py-6 bg-card text-primary shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.5)]">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-3xl soft-card">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary">500</span>
                <span className="text-xl ml-2 text-muted-foreground">tokens</span>
              </div>
              <p className="text-lg font-semibold text-foreground">$79.99</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">500 AI Career Coach queries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Unlimited Role-Play scenarios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Premium visa guides</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">24/7 priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Full cultural insights library</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">Personalized coaching sessions</span>
              </li>
            </ul>
            <Link href="/signup">
              <Button className="soft-button w-full font-semibold text-white rounded-2xl py-6">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Token Info */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground">
            Tokens never expire. Use them at your own pace. Each AI Career Coach query uses 1 token, and each Role-Play
            scenario uses 5 tokens.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">© 2025 WorkAbroadly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
