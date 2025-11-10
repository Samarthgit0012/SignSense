"use client"

import Link from "next/link"
import SignupForm from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-(--color-background) flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center font-bold text-white">
              S
            </div>
            <span className="text-xl font-bold">SignSpeak</span>
          </Link>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-(--color-text-secondary) mt-2">Join SignSpeak to start translating</p>
        </div>

        {/* Form */}
        <SignupForm />

        {/* Sign In Link */}
        <p className="text-center text-(--color-text-secondary) mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-(--color-primary) hover:text-(--color-primary-light) font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
