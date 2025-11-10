"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import VideoCapture from "./video-capture"
import TranslationDisplay from "./translation-display"
import AvatarViewer from "./avatar-viewer"

interface TranslationInterfaceProps {
  mode: "sign-to-text" | "text-to-sign"
}

export default function TranslationInterface({ mode }: TranslationInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [translation, setTranslation] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [loading, setLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleStartRecording = async () => {
    setIsRecording(true)
    setTranslation("")
  }

  const handleStopRecording = async () => {
    setIsRecording(false)
    setLoading(true)

    // Simulate API call to backend
    setTimeout(() => {
      if (mode === "sign-to-text") {
        setTranslation("Hello, how are you doing today?")
        setConfidence(0.94)
      }
      setLoading(false)
    }, 1500)
  }

  const handleClear = () => {
    setTranslation("")
    setConfidence(0)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Mode Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {mode === "sign-to-text" ? "Sign to Text Translation" : "Text to Sign Generation"}
        </h1>
        <p className="text-(--color-text-secondary)">
          {mode === "sign-to-text"
            ? "Show signs to your camera and see real-time translation"
            : "Enter text and watch the avatar demonstrate the signs"}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Video/Input */}
        <div className="space-y-4">
          {mode === "sign-to-text" ? (
            <div className="flex flex-col gap-4">
              <VideoCapture isRecording={isRecording} />
              <div className="flex gap-3">
                <Button
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Start Recording
                </Button>
                <Button
                  onClick={handleStopRecording}
                  disabled={!isRecording}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Stop Recording
                </Button>
                <Button onClick={handleClear} variant="outline" className="flex-1 bg-transparent">
                  Clear
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <textarea
                placeholder="Enter text to translate to sign language..."
                className="w-full h-64 p-4 rounded-lg bg-(--color-surface) border border-(--color-border) text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
              />
              <div className="mt-4 flex gap-3">
                <Button className="flex-1 bg-(--color-primary)">Translate</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Output */}
        <div className="space-y-4">
          {mode === "sign-to-text" ? (
            <TranslationDisplay translation={translation} confidence={confidence} loading={loading} />
          ) : (
            <AvatarViewer />
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-(--color-surface) border border-(--color-border)">
          <div className="text-sm text-(--color-text-muted) mb-1">Accuracy</div>
          <div className="text-2xl font-bold">94.2%</div>
        </div>
        <div className="p-4 rounded-lg bg-(--color-surface) border border-(--color-border)">
          <div className="text-sm text-(--color-text-muted) mb-1">Latency</div>
          <div className="text-2xl font-bold">445ms</div>
        </div>
        <div className="p-4 rounded-lg bg-(--color-surface) border border-(--color-border)">
          <div className="text-sm text-(--color-text-muted) mb-1">Translations Today</div>
          <div className="text-2xl font-bold">23</div>
        </div>
      </div>
    </div>
  )
}
