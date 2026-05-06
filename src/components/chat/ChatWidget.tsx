import { useState, useRef, useEffect, useCallback } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

const EDGE_FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const GREETING: Message = {
  role: "assistant",
  content:
    "Hello! I'm Genesis AI — your guide to everything Genesis Group.\n\nAsk me about our services, team, offices, open roles, or latest news.",
}

function TypingDots() {
  return (
    <span className="flex gap-1 items-center py-0.5">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}

function MessageBubble({ msg, isTyping }: { msg: Message; isTyping: boolean }) {
  const isUser = msg.role === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {isTyping ? (
        <div className="bg-white/5 border border-white/5 px-3 py-2.5 rounded-xl">
          <TypingDots />
        </div>
      ) : (
        <div
          className={`max-w-[85%] px-3 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? "bg-amber-400 text-black font-medium"
              : "bg-white/5 text-white/90 border border-white/[0.06]"
          }`}
        >
          {msg.content}
        </div>
      )}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 50)
  }, [open])

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 100)}px`
  }, [input])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: "user", content: text }
    const historyForApi = messages.map((m) => ({ role: m.role, content: m.content }))
    const newHistory = [...historyForApi, { role: "user" as const, content: text }]

    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "" }])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch(EDGE_FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({ messages: newHistory }),
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          updated[updated.length - 1] = { ...last, content: last.content + chunk }
          return updated
        })
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I couldn't reach Genesis AI right now. Please try again.",
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const isLastMsgTyping = loading && messages[messages.length - 1]?.content === ""

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Genesis AI" : "Open Genesis AI"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 shadow-[0_0_24px_rgba(251,191,36,0.35)] flex items-center justify-center transition-all duration-200"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col w-[380px] max-w-[calc(100vw-24px)] h-[520px] max-h-[calc(100vh-120px)] bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] bg-[#0f0f0f]">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
              G
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-none tracking-wide">Genesis AI</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white/30 text-[10px] font-mono">ONLINE</span>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide"
            onWheel={(e) => e.stopPropagation()}
          >
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                msg={msg}
                isTyping={isLastMsgTyping && i === messages.length - 1}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="px-3 pb-3 pt-2 border-t border-white/[0.08]">
            <div className="flex gap-2 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Genesis…"
                rows={1}
                disabled={loading}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white/90 text-sm placeholder:text-white/25 resize-none focus:outline-none focus:border-amber-400/40 transition-colors disabled:opacity-50"
                style={{ maxHeight: "100px" }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
                aria-label="Send"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <p className="text-white/15 text-[10px] text-center mt-2 font-mono">
              GENESIS AI · genesis-group.jp
            </p>
          </div>
        </div>
      )}
    </>
  )
}
