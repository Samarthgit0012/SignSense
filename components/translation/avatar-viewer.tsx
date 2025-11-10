"use client"

export default function AvatarViewer() {
  return (
    <div className="h-full flex flex-col rounded-lg bg-(--color-surface) border border-(--color-border) p-6">
      <h3 className="text-sm font-semibold text-(--color-text-muted) mb-4">SIGN LANGUAGE AVATAR</h3>

      {/* Avatar Display Area */}
      <div className="flex-1 flex items-center justify-center bg-(--color-background) rounded-lg border border-(--color-border) mb-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-(--color-primary) mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">🧑</span>
          </div>
          <p className="text-(--color-text-secondary)">Avatar animation will appear here</p>
          <p className="text-xs text-(--color-text-muted) mt-2">Enter text above to generate signs</p>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 text-sm rounded-lg bg-(--color-primary) text-white hover:bg-(--color-primary-dark) transition-colors">
            Play
          </button>
          <button className="flex-1 px-3 py-2 text-sm rounded-lg border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-background) transition-colors">
            Pause
          </button>
          <button className="flex-1 px-3 py-2 text-sm rounded-lg border border-(--color-border) text-(--color-text-secondary) hover:bg-(--color-background) transition-colors">
            Reset
          </button>
        </div>

        <div>
          <label className="text-sm text-(--color-text-muted) block mb-2">Avatar Speed</label>
          <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full" />
        </div>
      </div>
    </div>
  )
}
