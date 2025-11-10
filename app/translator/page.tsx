"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { wsClient } from "@/lib/websocket"
import VideoCapture from "@/components/translation/video-capture"
import TranslationDisplay from "@/components/translation/translation-display"
import { Button } from "@/components/ui/button"

export default function TranslatorPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"sign-to-text" | "text-to-sign">("sign-to-text")
  const [isRecording, setIsRecording] = useState(false)
  const [translation, setTranslation] = useState("")
  const [confidence, setConfidence] = useState(0)
  const [loading, setLoading] = useState(false)
  const [wsConnected, setWsConnected] = useState(false)
  const [textInput, setTextInput] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // Connect WebSocket
    wsClient
      .connect(token)
      .then(() => {
        setWsConnected(true)

        // Listen for real-time translation updates
        wsClient.on("translation-result", (data) => {
          setTranslation(data.translation)
          setConfidence(data.confidence)
          setLoading(false)
        })

        wsClient.on("error", (data) => {
          console.error("Translation error:", data.message)
          setLoading(false)
        })
      })
      .catch((err) => {
        console.error("WebSocket connection failed:", err)
      })

    return () => {
      wsClient.disconnect()
    }
  }, [router])

  const handleStartRecording = () => {
    setIsRecording(true)
    setTranslation("")
    wsClient.send("start-recording")
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setLoading(true)
    wsClient.send("stop-recording")
  }

  const handleTextTranslate = () => {
    if (!textInput.trim()) return
    setLoading(true)
    wsClient.send("translate-text", { text: textInput })
  }

  return (
    <div className="min-h-screen bg-(--color-background) flex">
      <Sidebar currentMode={mode} onModeChange={setMode} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Connection Status */}
            <div className="mb-6 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${wsConnected ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-sm text-(--color-text-secondary)">
                {wsConnected ? "Connected" : "Connecting..."}
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Panel */}
              <div className="space-y-4">
                {mode === "sign-to-text" ? (
                  <>
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
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter text to translate to sign language..."
                      className="w-full h-64 p-4 rounded-lg bg-(--color-surface) border border-(--color-border) text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                    />
                    <div className="flex gap-3">
                      <Button
                        onClick={handleTextTranslate}
                        disabled={loading || !textInput.trim()}
                        className="flex-1 bg-(--color-primary)"
                      >
                        {loading ? "Translating..." : "Translate"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setTextInput("")
                          setTranslation("")
                        }}
                        className="flex-1"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel */}
              <div>
                <TranslationDisplay translation={translation} confidence={confidence} loading={loading} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
