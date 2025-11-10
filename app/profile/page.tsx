"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "stats">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    bio: "Learning ASL and passionate about accessibility",
    preferredLanguage: "English",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-(--color-background) flex">
      <Sidebar currentMode="sign-to-text" onModeChange={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
              <p className="text-(--color-text-secondary)">Manage your account and preferences</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-(--color-border)">
              {(["profile", "settings", "stats"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-(--color-primary) text-(--color-primary)"
                      : "border-transparent text-(--color-text-secondary) hover:text-(--color-text-primary)"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "profile" && (
              <div className="bg-(--color-surface) border border-(--color-border) rounded-lg p-8 max-w-2xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-(--color-primary) flex items-center justify-center text-4xl">
                    🧑
                  </div>
                  <div>
                    <p className="text-(--color-text-secondary) mb-2">Profile Picture</p>
                    <Button size="sm" variant="outline">
                      Change Picture
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input name="fullName" value={formData.fullName} onChange={handleChange} disabled={!isEditing} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 rounded-lg bg-(--color-background) border border-(--color-border) text-(--color-text-primary) disabled:opacity-50"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} className="bg-(--color-primary)">
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => setIsEditing(false)} className="bg-(--color-primary)">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 max-w-2xl">
                <div className="bg-(--color-surface) border border-(--color-border) rounded-lg p-6">
                  <h3 className="font-bold mb-4">Language Preferences</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Language</label>
                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg bg-(--color-background) border border-(--color-border) text-(--color-text-primary)"
                    >
                      <option>English</option>
                      <option>Gujarati</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>

                <div className="bg-(--color-surface) border border-(--color-border) rounded-lg p-6">
                  <h3 className="font-bold mb-4">Privacy & Security</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">Keep my video local (don't upload to servers)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">Allow learning data collection for improvements</span>
                    </label>
                  </div>
                </div>

                <div className="bg-(--color-surface) border border-(--color-border) rounded-lg p-6">
                  <h3 className="font-bold mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-sm">Email notifications for achievements</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">Weekly learning reminders</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                {[
                  { label: "Total Translations", value: "847", icon: "↔️" },
                  { label: "Learning Streak", value: "12 days", icon: "🔥" },
                  { label: "Lessons Completed", value: "24", icon: "✓" },
                  { label: "Average Accuracy", value: "92.3%", icon: "🎯" },
                  { label: "Total Study Time", value: "42 hours", icon: "⏱️" },
                  { label: "Signs Mastered", value: "156", icon: "👏" },
                ].map((stat, i) => (
                  <div key={i} className="bg-(--color-surface) border border-(--color-border) rounded-lg p-6">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <p className="text-(--color-text-muted) text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
