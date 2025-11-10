"use client"

import { useState } from "react"
import Link from "next/link"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg text-(--color-text-secondary) hover:bg-(--color-surface)"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-(--color-background) border-b border-(--color-border) p-6 space-y-4">
          <Link href="/dashboard" className="block text-(--color-text-secondary) hover:text-(--color-text-primary)">
            Dashboard
          </Link>
          <Link href="/learn" className="block text-(--color-text-secondary) hover:text-(--color-text-primary)">
            Learn
          </Link>
          <Link href="/history" className="block text-(--color-text-secondary) hover:text-(--color-text-primary)">
            History
          </Link>
          <Link href="/profile" className="block text-(--color-text-secondary) hover:text-(--color-text-primary)">
            Profile
          </Link>
        </div>
      )}
    </>
  )
}
