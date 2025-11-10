"use client"

import { useEffect, useRef } from "react"

interface VideoCaptureProps {
  isRecording: boolean
}

export default function VideoCapture({ isRecording }: VideoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Camera access denied:", err)
      }
    }

    initCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="relative rounded-lg overflow-hidden bg-(--color-background) aspect-video border-2 border-(--color-border)">
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-600">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          <span className="text-white text-sm font-medium">Recording</span>
        </div>
      )}

      {/* Pose Skeleton Overlay (placeholder) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 640 480">
          <circle cx="320" cy="120" r="30" fill="none" stroke="currentColor" className="text-(--color-primary)" />
          <line x1="320" y1="150" x2="320" y2="240" stroke="currentColor" className="text-(--color-primary)" />
          <circle cx="200" cy="200" r="15" fill="none" stroke="currentColor" className="text-(--color-primary)" />
          <circle cx="440" cy="200" r="15" fill="none" stroke="currentColor" className="text-(--color-primary)" />
        </svg>
      </div>
    </div>
  )
}
