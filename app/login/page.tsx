"use client"
import Link from "next/link"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
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
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-(--color-text-secondary) mt-2">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Sign Up Link */}
        <p className="text-center text-(--color-text-secondary) mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-(--color-primary) hover:text-(--color-primary-light) font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
