"use client"

interface TranslationDisplayProps {
  translation: string
  confidence: number
  loading: boolean
}

export default function TranslationDisplay({ translation, confidence, loading }: TranslationDisplayProps) {
  return (
    <div className="h-full flex flex-col rounded-lg bg-(--color-surface) border border-(--color-border) p-6">
      <h3 className="text-sm font-semibold text-(--color-text-muted) mb-4">RECOGNIZED TEXT</h3>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-(--color-text-secondary)">Processing video...</p>
          </div>
        </div>
      )}

      {!loading && translation && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 mb-4 p-4 rounded-lg bg-(--color-background) border border-(--color-border)">
            <p className="text-lg leading-relaxed text-(--color-text-primary)">{translation}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-(--color-text-muted)">Confidence Score</span>
              <span className="text-sm font-medium text-(--color-primary)">{(confidence * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-(--color-background) overflow-hidden">
              <div
                className="h-full bg-(--color-primary) transition-all duration-300"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 px-3 py-2 text-sm rounded-lg bg-(--color-primary) text-white hover:bg-(--color-primary-dark) transition-colors">
              Copy Text
            </button>
            <button className="flex-1 px-3 py-2 text-sm rounded-lg border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-background) transition-colors">
              Speak
            </button>
          </div>
        </div>
      )}

      {!loading && !translation && (
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <p className="text-(--color-text-secondary) mb-2">No translation yet</p>
            <p className="text-sm text-(--color-text-muted)">Record a video to see the recognized text here</p>
          </div>
        </div>
      )}
    </div>
  )
}
