"use client"

import * as React from "react"
import { Send, Bot, User, Loader2, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { studentInfoAssistantChat } from "@/ai/flows/student-info-assistant-chat"

type Message = {
  id: string
  role: "assistant" | "user"
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm CampusConnect AI. How can I help you with your school schedule or exams today?"
    }
  ])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      const response = await studentInfoAssistantChat(currentInput)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response || "I'm here to help, but I couldn't generate a response. Could you rephrase that?"
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an issue connecting to my brain. Please try again in a moment."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading])

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border overflow-hidden shadow-2xl">
      <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-headline">CampusConnect AI</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Smart Assistant • Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMessages([{ id: "1", role: "assistant", content: "Hello! Chat cleared. How can I help?" }])} title="Clear Chat">
          <RefreshCcw className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}
            >
              <div className="flex items-start gap-3">
                {message.role === "assistant" && (
                  <Bot className="h-4 w-4 mt-1 text-primary shrink-0" />
                )}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                {message.role === "user" && (
                  <User className="h-4 w-4 mt-1 text-primary-foreground shrink-0" />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble-ai processing-indicator">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-xs">Consulting database...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSend} className="p-4 border-t bg-muted/10">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about schedules, exams, or news..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-background"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
