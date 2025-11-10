"use client"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  const lessons = [
    {
      id: "basics",
      title: "ASL Basics",
      description: "Learn fundamental ASL signs and grammar",
      level: "Beginner",
      progress: 0,
    },
    {
      id: "greetings",
      title: "Greetings & Politeness",
      description: "Master common greetings and polite expressions",
      level: "Beginner",
      progress: 45,
    },
    {
      id: "numbers",
      title: "Numbers & Counting",
      description: "Sign numbers from 0-100 fluently",
      level: "Beginner",
      progress: 75,
    },
    {
      id: "colors",
      title: "Colors",
      description: "Recognize and sign all common colors",
      level: "Intermediate",
      progress: 30,
    },
    {
      id: "family",
      title: "Family & Relationships",
      description: "Discuss family members and relationships",
      level: "Intermediate",
      progress: 0,
    },
    {
      id: "workplace",
      title: "Workplace Communication",
      description: "Professional and workplace-specific signs",
      level: "Advanced",
      progress: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-(--color-background) flex">
      <Sidebar currentMode="sign-to-text" onModeChange={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Learn American Sign Language</h1>
              <p className="text-(--color-text-secondary)">Start your journey to fluent sign language communication</p>
            </div>

            {/* Learning Path */}
            {selectedLesson === null ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="rounded-lg bg-(--color-surface) border border-(--color-border) p-6 hover:border-(--color-primary) transition-colors cursor-pointer"
                    onClick={() => setSelectedLesson(lesson.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
                        <p className="text-sm text-(--color-text-secondary)">{lesson.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-(--color-primary)/20 text-(--color-primary) ml-2">
                        {lesson.level}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-(--color-text-muted)">Progress</span>
                        <span className="text-xs font-medium">{lesson.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-(--color-background) overflow-hidden">
                        <div
                          className="h-full bg-(--color-primary) transition-all"
                          style={{ width: `${lesson.progress}%` }}
                        />
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-(--color-primary)">
                      {lesson.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <Button onClick={() => setSelectedLesson(null)} variant="ghost" className="mb-6">
                  ← Back to Lessons
                </Button>

                <div className="bg-(--color-surface) border border-(--color-border) rounded-lg p-8">
                  <h2 className="text-3xl font-bold mb-6">{lessons.find((l) => l.id === selectedLesson)?.title}</h2>

                  <div className="space-y-6">
                    {/* Lesson Content */}
                    <div className="aspect-video rounded-lg bg-(--color-background) border border-(--color-border) flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🧑</div>
                        <p className="text-(--color-text-secondary)">Interactive lesson video will appear here</p>
                      </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-(--color-background)">
                        <p className="text-sm text-(--color-text-muted) mb-1">Duration</p>
                        <p className="font-semibold">15 minutes</p>
                      </div>
                      <div className="p-4 rounded-lg bg-(--color-background)">
                        <p className="text-sm text-(--color-text-muted) mb-1">Difficulty</p>
                        <p className="font-semibold">Beginner</p>
                      </div>
                    </div>

                    {/* Practice Section */}
                    <div>
                      <h3 className="font-bold mb-3">Practice Exercises</h3>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-(--color-background) border border-(--color-border) flex items-center justify-between">
                          <span>Exercise 1: Identify the signs</span>
                          <Button size="sm">Start</Button>
                        </div>
                        <div className="p-3 rounded-lg bg-(--color-background) border border-(--color-border) flex items-center justify-between">
                          <span>Exercise 2: Sign recognition</span>
                          <Button size="sm">Start</Button>
                        </div>
                        <div className="p-3 rounded-lg bg-(--color-background) border border-(--color-border) flex items-center justify-between">
                          <span>Exercise 3: Real-time practice</span>
                          <Button size="sm">Start</Button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Previous Lesson
                      </Button>
                      <Button className="flex-1 bg-(--color-primary)">Next Lesson</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
