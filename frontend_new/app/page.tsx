"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Footer from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import PricingCard from "@/components/PricingCard"
import { CREDIT_PACKAGES } from "@/lib/products"
import ButtonPill from "@/components/ButtonPill"
import BackgroundShapes from "@/components/ui/BackgroundShapes"

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: " How does the chatbot adjust to different cultures?",
      answer:
        "The chatbot automatically adapts tone, etiquette, and phrasing based on the culture you select (Japan, Korea, Indonesia, or Western). It also changes expectations. For example, how direct you should speak, how honorifics are used, or what hierarchy means in conversation.",
    },
    {
      question: "Can I switch cultural context midway through a conversation?",
      answer:
        "Yes. You can change context at any time. Our chatbot will immediately shift to the new cultural framework, re-interpret your situation, and give updated suggestions that better match the new environment.",
    },
    {
      question: "Can the chatbot remember details during a scenario?",
      answer:
        "It can stay aware of the situation within the session. Such as the roles involved or your goal, so responses feel consistent while you continue practicing.",
    },
    {
      question: "Can the chatbot help refine my message for cultural tone?",
      answer:
        "Yes — you can ask it to make your message more polite, formal, casual, or direct depending on your goal and cultural setting.",
    },
  ]

  const PACKAGE_TYPES: Record<string, 'cyan' | 'yellow' | 'purple' | 'pink'> = {
  'free-tier': 'cyan',
  'starter-pack': 'yellow',
  'professional-pack': 'purple',
  'premium-pack': 'pink'
};
  return (
    <div className="min-h-screen bg-white relative">
    
      <BackgroundShapes/>
      <div className="relative z-10">
      {/* Memanggil komponen Navbar */}
      <Navbar />

              {/* Spacer untuk kompensasi fixed navbar (Ini tetap di sini) */}
      <div className="h-[97px]" />
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Cultural-Intelligence Role-Play Platform
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-semibold">Practice culture. Collaborate with ease.</p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Enhance your global collaboration without getting overwhelmed by cross-cultural barriers.
            </p>
            <Link href="/signup">
            <ButtonPill type="type1" size="lg" onClick={() => console.log('Type1 Small clicked')}>
              Start Now
            </ButtonPill>
            </Link>
          </div>

          {/* Right: Single Portrait */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden w-full h-full">
              <img
                src="/images/HERO IMAGE (1).svg"
                alt="Hero Section Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* IMAGE */}
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl w-full min-h-[420px] lg:min-h-[520px]">
            <img
              src="https://images.pexels.com/photos/18069160/pexels-photo-18069160.png"
              alt="About WorkAbroadly"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT CONTENT */}
          <div>
            <div className="inline-block bg-black text-white px-8 py-3 rounded-full text-base font-semibold mb-8">
              About the Company
            </div>

            <p className="text-xl text-gray-700 leading-relaxed mb-10 text-justify">
              WorkAbroadly is an AI-powered cultural intelligence platform built for expatriates and global professionals.
              Our 3 specialized AI coaches provide instant, contextual guidance for navigating social norms, workplace
              dynamics, and daily life.
            </p>

            <div className="grid grid-cols-3 gap-10">
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">2025</div>
                <div className="text-gray-600 text-lg">Founded</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">1,000+</div>
                <div className="text-gray-600 text-lg">Daily Chats</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">3</div>
                <div className="text-gray-600 text-lg">Coach Personas</div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Feature 1 — Persona Coaches Overview */}
      <section className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT : Header + 3 Points */}
          <div>
            {/* Header */}
            <div className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg font-semibold mb-8">
              WorkAbroadly AI Coach Personas
            </div>

            <p className="text-gray-700 leading-relaxed text-justify mb-10">
              Meet your three AI cultural intelligence coaches, helping you adapt socially,
              collaborate professionally, and navigate essential life logistics with ease.
            </p>

            {/* Clara */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Clara — CultureFit Navigator
              </h4>
              <p className="text-gray-600">
                Helps newcomers adapt socially through cultural role-play, tone coaching, and small-talk practice.
              </p>
              <hr className="mt-4 border-gray-300" />
            </div>

            {/* Sora */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Sora — Workplace Strategy Coach
              </h4>
              <p className="text-gray-600">
                Supports working professionals with workplace role-play, negotiation,
                structured feedback, and collaboration frameworks.
              </p>
              <hr className="mt-4 border-gray-300" />
            </div>

            {/* Arlo */}
            <div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                Arlo — LifeAdmin Ally
              </h4>
              <p className="text-gray-600">
                Helps workers & students navigate daily systems—immigration, housing,
                hospital visits, and banking procedures.
              </p>
              <hr className="mt-4 border-gray-300" />
            </div>
          </div>

          {/* ✅ RIGHT : Persona image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-1/2">
            <img
              src="https://images.pexels.com/photos/18069491/pexels-photo-18069491.png"
              alt="WorkAbroadly Persona Coaches"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>



      {/* Pricing Section */}
      <section id="pricing" className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
          </div>

          {/* --- PERUBAHAN DI SINI --- */}
          {/*
            1. Menambahkan wrapper 'max-w-6xl' (lebih kecil dari 7xl)
               untuk membuat container grid lebih sempit.
            2. Mengubah 'gap-8' menjadi 'gap-6' agar jarak antar kartu lebih rapat.
          */}

          <div className="flex flex-wrap justify-center gap-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <PricingCard 
              key={pkg.id}
              package={pkg}
              type={PACKAGE_TYPES[pkg.id]}
              showPurchaseButton={pkg.priceInCents > 0 && pkg.id !== 'enterprise-pack'}
            />
          ))}
        </div>


          {/* --- AKHIR PERUBAHAN --- */}

        </div>
      </section>

      {/* FAQ Section (Layout 2 kolom) */}
      <section id="faq" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* KOLOM KIRI: Teks + Gambar */}
          <div>
            <div className="mb-12">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Frequently Ask
                <br />
                Questions
              </h2>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Can't find the answer you're looking for? Feel free to contact our support team. 
              We're here to help you build cultural intelligence.
            </p>
          </div>

          {/* KOLOM KANAN: Accordion/FAQ List */}
          <div className="space-y-4 lg:mt-12">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 flex items-start justify-between text-left hover:bg-gray-50 transition-colors bg-white"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-2xl font-bold text-gray-400 mt-1">0{index + 1}</span>
                    <h3 className="text-lg font-bold text-gray-900 pr-8">{faq.question}</h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {openFaq === index ? (
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <span className="text-white text-xl">−</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <span className="text-white text-xl">+</span>
                      </div>
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 pt-2 bg-white">
                    <p className="text-gray-600 leading-relaxed ml-12">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  )
}