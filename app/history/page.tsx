"use client"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"

export default function HistoryPage() {
  const translations = [
    {
      id: 1,
      type: "sign-to-text",
      input: "Video recording",
      output: "Hello, how are you doing today?",
      timestamp: "2 minutes ago",
      accuracy: 94,
    },
    {
      id: 2,
      type: "text-to-sign",
      input: "Thank you very much",
      output: "Avatar animation",
      timestamp: "15 minutes ago",
      accuracy: 91,
    },
    {
      id: 3,
      type: "sign-to-text",
      input: "Video recording",
      output: "I am fine, thank you",
      timestamp: "1 hour ago",
      accuracy: 96,
    },
    {
      id: 4,
      type: "text-to-sign",
      input: "What is your name?",
      output: "Avatar animation",
      timestamp: "3 hours ago",
      accuracy: 88,
    },
    {
      id: 5,
      type: "sign-to-text",
      input: "Video recording",
      output: "See you tomorrow",
      timestamp: "Yesterday",
      accuracy: 93,
    },
  ]

  return (
    <div className="min-h-screen bg-(--color-background) flex">
      <Sidebar currentMode="sign-to-text" onModeChange={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Translation History</h1>
              <p className="text-(--color-text-secondary)">View your recent sign language translations</p>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Search translations..."
                className="flex-1 px-4 py-2 rounded-lg bg-(--color-surface) border border-(--color-border) text-(--color-text-primary) placeholder:text-(--color-text-muted)"
              />
              <select className="px-4 py-2 rounded-lg bg-(--color-surface) border border-(--color-border) text-(--color-text-primary)">
                <option>All Types</option>
                <option>Sign to Text</option>
                <option>Text to Sign</option>
              </select>
            </div>

            {/* History Table */}
            <div className="bg-(--color-surface) border border-(--color-border) rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-(--color-border) bg-(--color-background)/50">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Input</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Output</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Accuracy</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {translations.map((trans) => (
                    <tr
                      key={trans.id}
                      className="border-b border-(--color-border) hover:bg-(--color-background)/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            trans.type === "sign-to-text"
                              ? "bg-blue-900/30 text-blue-300"
                              : "bg-purple-900/30 text-purple-300"
                          }`}
                        >
                          {trans.type === "sign-to-text" ? "S→T" : "T→S"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-(--color-text-secondary)">{trans.input}</td>
                      <td className="px-6 py-4 text-sm text-(--color-text-secondary) truncate">{trans.output}</td>
                      <td className="px-6 py-4 text-sm font-medium">{trans.accuracy}%</td>
                      <td className="px-6 py-4 text-sm text-(--color-text-muted)">{trans.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
