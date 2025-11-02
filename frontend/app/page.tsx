"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react" // Added useRef
import { ArrowRight, ArrowDownRight } from "lucide-react"
import { motion, useInView } from "framer-motion" // Added framer-motion

export default function LandingPage() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleTryDemo = () => {
    router.push("/dashboard?demo=true")
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Refs for scroll-triggered animations
  const feature1Ref = useRef(null)
  const feature2Ref = useRef(null)
  const isInView1 = useInView(feature1Ref, { once: true, amount: 0.3 })
  const isInView2 = useInView(feature2Ref, { once: true, amount: 0.3 })

  const faqs = [
    {
      question: "What is WorkAbroadly?",
      answer:
        "WorkAbroadly is an AI-powered platform that helps you prepare for working in Japan and Korea. We provide personalized guidance on visa requirements, cultural nuances, and workplace communication through interactive AI coaching and role-play scenarios.",
    },
    {
      question: "How does the AI Career Coach work?",
      answer:
        "Our AI Career Coach uses advanced language models trained on real expat experiences and cultural knowledge. It provides personalized advice based on your specific situation, answers your questions in real-time, and helps you navigate the complexities of working abroad.",
    },
    {
      question: "What are role-play practices?",
      answer:
        "Role-play practices are interactive scenarios where you can practice real workplace situations like job interviews, business meetings, or casual conversations. The AI responds naturally and provides feedback on your communication style and cultural appropriateness.",
    },
    {
      question: "Do I need any prior experience?",
      answer:
        "No prior experience is needed! WorkAbroadly is designed for everyone from complete beginners to experienced professionals. Our AI adapts to your level and provides guidance tailored to your background and goals.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take data security seriously. All your conversations and personal information are encrypted and stored securely. We never share your data with third parties, and you can delete your account and data at any time.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Clean white navbar */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="WorkAbroadly Logo" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-8">
            <Link href="#home" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center relative z-10">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your AI-Powered Guide
              <br />
              to Working Abroad
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Master visa requirements, cultural nuances, and workplace communication for Japan and Korea
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 rounded-full px-10 py-6 text-lg font-semibold shadow-lg transition-all flex items-center gap-3 w-fit group hover:scale-105 hover:shadow-xl"
              >
                Innovative Solutions
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Right: Bento Grid of Diverse Portraits */}
          <div className="relative">
            {/* Animated Shapes */}
            <motion.div
              className="absolute -top-10 -left-10 w-24 h-24 bg-blue-100 rounded-full opacity-50 z-0"
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-20 h-20 bg-pink-100 rounded-2xl opacity-50 z-0"
              animate={{
                y: [0, 10, 0],
                x: [0, -15, 0],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
             <motion.div
              className="absolute top-1/2 -right-12 w-16 h-16 bg-green-100 rounded-full opacity-50 z-0"
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Grid Content */}
            <div className="grid grid-cols-3 gap-4 relative z-10">
              {/* Row 1 */}
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden">
                <img
                  src="/woman-with-hijab-holding-basketball-on-yellow-back.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden">
                <img
                  src="/person-with-blue-artistic-makeup-on-dark-blue-back.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden">
                <img
                  src="/person-in-orange-and-yellow-gradient-background.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Row 2 */}
              <div className="col-span-1 rounded-2xl overflow-hidden">
                <img
                  src="/smiling-woman-with-flower-crown-on-beige-backgroun.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Row 3 */}
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden">
                <img
                  src="/woman-in-pink-outfit-sitting-on-pink-background.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden">
                <img
                  src="/person-with-red-beanie-on-teal-background.jpg"
                  alt="Diverse professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden">
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

      {/* About the Company Section - Clean & Balanced */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image */}
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop"
              alt="About Innovative Solutions"
              className="w-full aspect-square rounded-[2.5rem] object-cover shadow-xl"
            />
          </div>

          {/* Right: Text Content + Stats */}
          <div className="flex flex-col justify-start space-y-6 pt-2">
            {/* Badge */}
            <div>
              <div className="inline-block bg-gray-900 text-white rounded-full px-8 py-3 text-sm font-semibold">
                About the Company
              </div>
            </div>

            {/* Text Content */}
            <div className="mt-6 lg:mt-12">
              <p className="text-base text-gray-700 leading-relaxed">
                Innovative Solutions is a cutting-edge technology company that provides innovative solutions for
                businesses of all sizes. Founded in 2010, we are dedicated to helping our clients achieve their goals
                through our customized and effective technology solutions. With over a decade of experience, we have
                built a reputation for delivering high-quality services to our clients.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-1">2022</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-1">96</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-1">140</div>
                <div className="text-sm text-gray-600">Projects done</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - New Design */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">Feature</h2>
          <p className="text-3xl text-gray-700">Feature</p>
        </div>

        {/* Feature 1 - Image Left, Text Right */}
        <motion.div
          ref={feature1Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative">
            <img
              src="/images/company.svg"
              alt="Feature 1"
              className="w-full h-[400px] object-cover rounded-3xl"
            />
            <div className="absolute bottom-0 left-0 bg-white rounded-tr-[40px] px-8 py-4 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                Feature 1
                <ArrowDownRight className="w-8 h-8" />
              </h3>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-xl text-gray-700 leading-relaxed text-justify">
              Our values are reflected in everything we do, from our commitment to staying ahead of the curve with the
              latest technology to our unwavering dedication to providing excellent customer service.
            </p>
          </div>
        </motion.div>

        {/* Feature 2 - Text Left, Image Right */}
        <motion.div
          ref={feature2Ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center lg:order-1">
            <p className="text-xl text-gray-700 leading-relaxed text-justify">
              Our values are reflected in everything we do, from our commitment to staying ahead of the curve with the
              latest technology to our unwavering dedication to providing excellent customer service.
            </p>
          </div>
          <div className="relative lg:order-2">
            <img
              src="/images/company.svg"
              alt="Feature 2"
              className="w-full h-[400px] object-cover rounded-3xl"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-tl-[40px] px-8 py-4 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                Feature 2
                <ArrowDownRight className="w-8 h-8" />
              </h3>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features to Help You Succeed</h2>
          <p className="text-xl text-gray-600">Everything you need to prepare for your international career</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Career Coach */}
          <div className="border border-gray-200 rounded-2xl p-12 transition-shadow hover:shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Career Coach</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get personalized guidance on visa requirements, job search strategies, and career planning. Our AI coach
              understands the unique challenges of working abroad and provides tailored advice for your situation.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">24/7 availability for instant answers</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Personalized advice based on your background</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Up-to-date information on visa policies</span>
              </li>
            </ul>
          </div>

          {/* Cultural Role-Play */}
          <div className="border border-gray-200 rounded-2xl p-12 transition-shadow hover:shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cultural Role-Play</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Practice real workplace scenarios through interactive role-play. Learn proper business etiquette,
              communication styles, and cultural norms before your first day at work.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Realistic workplace scenarios</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Instant feedback on your responses</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Build confidence before interviews</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start free, upgrade as you grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">3 Chat sessions with Expat AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">3 Free basic role play practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Basic feedback only</span>
                </li>
              </ul>
              <Button className="w-full bg-gray-900 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                Get Started
              </Button>
            </div>

            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$3</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">10 Chat sessions with Expat AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Unlock 3 premium role play practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Basic practice report</span>
                </li>
              </ul>
              <Button className="w-full bg-gray-900 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                Get Started
              </Button>
            </div>

            {/* Professional - Popular */}
            <div className="bg-blue-600 rounded-2xl p-8 border-2 border-blue-600 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$15</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white">20 Chat sessions with Expat AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white">Unlock 10 premium role play practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white">Comprehensive practice report</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                Get Started
              </Button>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$20</span>
                <span className="text-gray-500 line-through ml-2">$30</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">50 Chat sessions with Expat AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Unlock 20+ premium role play practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Comprehensive practice report + personalized roadmap</span>
                </li>
              </ul>
              <Button className="w-full bg-gray-900 text-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about WorkAbroadly</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:shadow-md transition-shadow bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-5 pt-2 bg-white">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section with Pastel Colorful Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-gradient-to-br from-pink-100 via-blue-100 to-green-100">
        {/* Soft Pastel Liquid Wave Elements */}
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none opacity-50"
          style={{
            background: `
              radial-gradient(ellipse at 30% 70%, 
                rgba(236, 72, 153, 0.3) 0%,
                rgba(167, 139, 250, 0.2) 40%,
                transparent 70%
              )
            `,
            filter: "blur(80px)",
          }}
          animate={{ x: [-20, 20, -20], y: [-20, 30, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none opacity-50"
          style={{
            background: `
              radial-gradient(ellipse at 70% 30%, 
                rgba(134, 239, 172, 0.3) 0%,
                rgba(147, 197, 253, 0.2) 40%,
                transparent 70%
              )
            `,
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -30, 0], y: [20, -10, 20] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
        ></motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[700px] pointer-events-none opacity-40"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, 
                rgba(253, 186, 116, 0.25) 0%,
                rgba(196, 181, 253, 0.2) 40%,
                transparent 70%
              )
            `,
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 10 }}
        ></motion.div>

        {/* CTA Card */}
        <div className="relative z-10 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl p-12 max-w-lg mx-6 text-center">
          {/* Icon/Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Create with the highest
            <br />
            quality AI Audio
          </h2>

          {/* CTA Button with Glass Effect */}
          <Button className="w-full bg-gray-900/90 backdrop-blur-xl text-white border border-gray-900/20 rounded-full py-6 text-sm font-bold tracking-wide mb-6 hover:bg-gray-900 transition-all uppercase shadow-lg">
            GET STARTED FREE
          </Button>

          {/* Login Link */}
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 font-semibold underline hover:text-gray-700">
              Log in
            </Link>
          </p>
        </div>

        {/* Social Icons */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
          <Link
            href="https://twitter.com"
            className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md hover:bg-white/90 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com"
            className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md hover:bg-white/90 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
          <Link
            href="https://github.com"
            className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md hover:bg-white/90 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <Link
            href="https://youtube.com"
            className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md hover:bg-white/90 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </Link>
          <Link
            href="https://discord.com"
            className="w-12 h-12 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md hover:bg-white/90 transition-all hover:scale-105"
          >
            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg" />
              <span className="text-xl font-bold text-gray-900">WorkAbroadly</span>
            </div>
            <p className="text-gray-600 text-sm">© 2025 WorkAbroadly. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                Contact
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}