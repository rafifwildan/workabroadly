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
import type { CardType } from '@/components/PricingCard';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "What is WorkAbroadly?",
      answer:
        "WorkAbroadly is a Cultural Role-Play Platform & Expat AI Consultant that helps global talent enhance their careers without getting overwhelmed by cross-cultural barriers. We provide personalized guidance through interactive AI coaching and cultural role-play scenarios.",
    },
    {
      question: "How does the Cultural Role-Play work?",
      answer:
        "Our Cultural Role-Play Simulation lets you practice real workplace scenarios in a safe environment. You'll engage in interactive conversations that mirror actual business situations, receiving instant feedback on cultural appropriateness and communication style.",
    },
    {
      question: "What can the Expat AI Consultant help me with?",
      answer:
        "The Expat AI Consultant provides 24/7 personalized guidance on visa requirements, job search strategies, workplace communication, and cultural adaptation. It's trained on real expat experiences and understands the unique challenges of working abroad.",
    },
    {
      question: "Do I need any prior experience?",
      answer:
        "No prior experience is needed! WorkAbroadly is designed for everyone from complete beginners to experienced professionals. Our platform adapts to your level and provides guidance tailored to your background and goals.",
    },
  ]

  // Define package type mapping
  const PACKAGE_TYPES: Record<string, CardType> = {
  'free-tier': 'cyan',
  'professional-pack': 'yellow',
  'premium-pack': 'purple',
  'enterprise-pack': 'pink'
};

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Memanggil komponen Navbar */}
      <Navbar />

      {/* Spacer untuk kompensasi fixed navbar (Ini tetap di sini) */}
      <div className="h-[97px]" />


      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 bg-white overflow-hidden">
        <div className="absolute -left-20 top-20 w-64 h-64 bg-gray-200 rounded-full opacity-100 -z-10" />
        <div
          className="absolute -right-32 bottom-10 w-96 h-96 bg-gray-300 opacity-100 -z-10"
          style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Cultural Role-Play Platform & Expat AI Consultant
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-semibold">Speak the Culture, Win at Work</p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Help global talent enhance their careers without getting overwhelmed by cross-cultural barriers
            </p>
            <Link href="/signup">
            <ButtonPill type="type1" size="lg">
              Start Now
            </ButtonPill>
            </Link>
          </div>

          {/* Right: Bento Grid of Diverse Portraits */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/woman-with-hijab-holding-basketball-on-yellow-back.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/person-with-blue-artistic-makeup-on-dark-blue-back.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/person-in-orange-and-yellow-gradient-background.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/smiling-woman-with-flower-crown-on-beige-backgroun.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/woman-in-pink-outfit-sitting-on-pink-background.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/person-with-red-beanie-on-teal-background.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/man-with-glasses-on-orange-background.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="absolute right-0 top-20 w-48 h-48 bg-gray-200 rounded-2xl opacity-100 -z-10 transform rotate-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="/modern-office-building-with-greenery.jpg"
              alt="About WorkAbroadly"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div>
            <div className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              About the Company
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
              WorkAbroadly is a cutting-edge Cultural Role-Play Platform & Expat AI Consultant that provides innovative
              solutions for businesses and individuals. Founded in 2022, we are committed to helping global talent
              navigate cross-cultural challenges through our customized and effective technology solutions. With over a
              decade of experience, we have built a reputation for delivering high-quality services to our clients.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">2022</div>
                <div className="text-gray-600">Founded</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">96</div>
                <div className="text-gray-600">Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">140</div>
                <div className="text-gray-600">Projects done</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Role Play Simulation Features</h2>
          <p className="text-xl text-gray-600">The core solutions to help you succeed abroad</p>
        </div>

        {/* Feature 1: Cultural Role-Play Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <video
              src="/images/Role-Play.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-3xl font-bold text-gray-900">Feature 1</h3>
              <ArrowRight className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">Cultural Role-Play Simulation</h4>
            <p className="text-gray-700 leading-relaxed text-justify">
              Practice real workplace scenarios through interactive role-playing characters from different backgrounds.
              Learn proper business etiquette, communication styles, and cultural norms before your first day at work.
              Our AI-powered simulations adapt to your responses and provide instant feedback.
            </p>
          </div>
        </div>

        {/* Feature 2: Expat AI Consultant */}
      </section>

        {/* Pricing Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <PricingCard 
              key={pkg.id}
              package={pkg}
              type={PACKAGE_TYPES[pkg.id]}
              showPurchaseButton={pkg.priceInCents > 0}
            />
          ))}
        </div>

      {/* FAQ Section (Layout 2 kolom) */}
      <section id="faq" className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* KOLOM KIRI: Teks dan Gambar */}
          <div>
            <div className="mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked</h2>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Questions</h2>
            </div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Can't find the answer you're looking for? Feel free to contact our support team. 
              We're here to help you adapt and succeed abroad.
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

      <Footer />
    </div>
  )
}