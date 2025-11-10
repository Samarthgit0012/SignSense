"use client"

interface SidebarProps {
  currentMode: "sign-to-text" | "text-to-sign"
  onModeChange: (mode: "sign-to-text" | "text-to-sign") => void
}

export default function Sidebar({ currentMode, onModeChange }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-(--color-border) bg-(--color-surface)/30 p-6">
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-(--color-text-muted) mb-4">TRANSLATION MODE</h2>
        <div className="space-y-2">
          <button
            onClick={() => onModeChange("sign-to-text")}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentMode === "sign-to-text"
                ? "bg-(--color-primary) text-white"
                : "text-(--color-text-secondary) hover:bg-(--color-surface)"
            }`}
          >
            <div className="font-medium">Sign to Text</div>
            <div className="text-xs mt-1">Recognize ASL from video</div>
          </button>
          <button
            onClick={() => onModeChange("text-to-sign")}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              currentMode === "text-to-sign"
                ? "bg-(--color-primary) text-white"
                : "text-(--color-text-secondary) hover:bg-(--color-surface)"
            }`}
          >
            <div className="font-medium">Text to Sign</div>
            <div className="text-xs mt-1">Generate signs from text</div>
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-(--color-border)">
        <h2 className="text-sm font-semibold text-(--color-text-muted) mb-4">QUICK LINKS</h2>
        <nav className="space-y-2 text-sm">
          <a
            href="/learn"
            className="block px-3 py-2 text-(--color-text-secondary) hover:text-(--color-text-primary) rounded hover:bg-(--color-surface)"
          >
            Learn ASL
          </a>
          <a
            href="/history"
            className="block px-3 py-2 text-(--color-text-secondary) hover:text-(--color-text-primary) rounded hover:bg-(--color-surface)"
          >
            Translation History
          </a>
          <a
            href="/community"
            className="block px-3 py-2 text-(--color-text-secondary) hover:text-(--color-text-primary) rounded hover:bg-(--color-surface)"
          >
            Community
          </a>
        </nav>
      </div>
    </aside>
  )
}
