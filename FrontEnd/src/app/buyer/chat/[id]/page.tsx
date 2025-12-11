"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from "@/lib/chat-context"
import { ArrowLeftIcon, SendIcon, StoreIcon, ImageIcon, MoreVerticalIcon } from "@/components/icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function formatMessageTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
}

function formatMessageDate(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return "Hari Ini"
  if (date.toDateString() === yesterday.toDateString()) return "Kemarin"
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

export default function ChatConversationPage() {
  const params = useParams()
  const conversationId = params.id as string
  const { getConversation, sendMessage, markConversationAsRead } = useChat()
  const conversation = getConversation(conversationId)

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (conversation) {
      markConversationAsRead(conversationId)
    }
  }, [conversationId, conversation, markConversationAsRead])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation?.messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    sendMessage(conversationId, newMessage.trim())
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!conversation) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header variant="marketplace" />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Percakapan tidak ditemukan</p>
        </main>
      </div>
    )
  }

  // Group messages by date
  const groupedMessages: { date: string; messages: typeof conversation.messages }[] = []
  let currentDate = ""
  conversation.messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp).toDateString()
    if (msgDate !== currentDate) {
      currentDate = msgDate
      groupedMessages.push({ date: msg.timestamp, messages: [msg] })
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg)
    }
  })

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Chat Header */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          <Link href="/buyer/chat">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="size-5" />
            </Button>
          </Link>

          <div className="flex flex-1 items-center gap-3">
            <div className="size-10 overflow-hidden rounded-full bg-muted">
              <Image
                src={conversation.storeImage || "/placeholder.svg"}
                alt={conversation.storeName}
                width={40}
                height={40}
                className="size-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-foreground truncate">{conversation.storeName}</h1>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVerticalIcon className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <StoreIcon className="mr-2 size-4" />
                Lihat Toko
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="space-y-6">
            {groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* Date Separator */}
                <div className="mb-4 flex items-center justify-center">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {formatMessageDate(group.date)}
                  </span>
                </div>

                {/* Messages */}
                <div className="space-y-3">
                  {group.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderType === "buyer" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          message.senderType === "buyer"
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-foreground border"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        <p
                          className={`mt-1 text-right text-xs ${
                            message.senderType === "buyer" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Message Input */}
      <footer className="sticky bottom-0 border-t bg-background">
        <div className="container mx-auto flex items-center gap-2 px-4 py-3">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ImageIcon className="size-5" />
          </Button>
          <Input
            placeholder="Ketik pesan..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()} className="shrink-0">
            <SendIcon className="size-5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
