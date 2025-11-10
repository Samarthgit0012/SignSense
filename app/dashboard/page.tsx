"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import TranslationInterface from "@/components/translation/translation-interface"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState<"sign-to-text" | "text-to-sign">("sign-to-text")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-(--color-background) flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-(--color-text-secondary)">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-(--color-background) flex">
      {/* Sidebar */}
      <Sidebar currentMode={mode} onModeChange={setMode} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <TranslationInterface mode={mode} />
        </main>
      </div>
    </div>
  )
}
