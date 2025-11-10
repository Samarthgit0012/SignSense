"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <header className="border-b border-(--color-border) bg-(--color-surface)/50 backdrop-blur-sm sticky top-0">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-(--color-primary) flex items-center justify-center font-bold text-white">
              S
            </div>
            <span className="font-bold hidden sm:inline">SignSpeak</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-(--color-text-secondary) text-sm">
            <Link href="/dashboard" className="hover:text-(--color-text-primary)">
              Dashboard
            </Link>
            <Link href="/learn" className="hover:text-(--color-text-primary)">
              Learn
            </Link>
            <Link href="/history" className="hover:text-(--color-text-primary)">
              History
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </Link>
          <Button size="sm" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
