"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-text-primary)">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-(--color-border)">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center font-bold">S</div>
          <span className="text-xl font-bold">SignSpeak</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-(--color-text-secondary) hover:text-(--color-text-primary)">
            Log In
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="mb-6 inline-block px-4 py-2 rounded-full bg-(--color-surface) border border-(--color-border)">
          <span className="text-sm text-(--color-primary)">Real-time Sign Language Translation</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Breaking Communication Barriers</h1>

        <p className="text-xl text-(--color-text-secondary) mb-8 text-balance">
          SignSpeak enables seamless, real-time bidirectional translation between American Sign Language and spoken
          English—bridging accessibility gaps in education, healthcare, and the workplace.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="bg-(--color-primary) hover:bg-(--color-primary-dark)">
              Start Free Trial
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-(--color-border) hover:bg-(--color-surface-hover) bg-transparent"
          >
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Powerful Features for Real-Time Communication</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Sign Recognition",
              description: "Advanced pose detection and transformer models for accurate continuous ASL recognition",
            },
            {
              title: "Avatar Animation",
              description: "3D avatar visualization for natural sign language generation and synthesis",
            },
            {
              title: "Real-Time Translation",
              description: "Sub-500ms latency for natural, flowing conversation without delays",
            },
            {
              title: "Educational Modules",
              description: "Interactive learning paths and personalized tutoring for ASL students",
            },
            { title: "Privacy First", description: "Local processing ensures your video data stays on your device" },
            { title: "Multi-Language", description: "Support for ASL, English, and Gujarati translation" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-(--color-surface) border border-(--color-border) hover:border-(--color-primary) transition-colors"
            >
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-(--color-text-secondary)">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
