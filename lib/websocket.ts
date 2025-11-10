export class WebSocketClient {
  private url: string
  private ws: WebSocket | null = null
  private listeners: Map<string, Set<Function>> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  constructor(url = `${process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"}/ws`) {
    this.url = url
  }

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`${this.url}?token=${token}`)

        this.ws.onopen = () => {
          console.log("[WebSocket] Connected")
          this.reconnectAttempts = 0
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.emit(data.type, data)
          } catch (err) {
            console.error("[WebSocket] Failed to parse message:", err)
          }
        }

        this.ws.onerror = (error) => {
          console.error("[WebSocket] Error:", error)
          reject(error)
        }

        this.ws.onclose = () => {
          console.log("[WebSocket] Disconnected")
          this.attemptReconnect(token)
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  private attemptReconnect(token: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      console.log(`[WebSocket] Attempting reconnect in ${delay}ms...`)
      setTimeout(() => this.connect(token), delay)
    }
  }

  send(type: string, data: any = {}) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, ...data }))
    } else {
      console.warn("[WebSocket] Not connected")
    }
  }

  on(type: string, callback: Function) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(callback)
  }

  off(type: string, callback: Function) {
    this.listeners.get(type)?.delete(callback)
  }

  private emit(type: string, data: any) {
    this.listeners.get(type)?.forEach((callback) => callback(data))
  }

  disconnect() {
    this.ws?.close()
    this.ws = null
  }
}

export const wsClient = new WebSocketClient()
