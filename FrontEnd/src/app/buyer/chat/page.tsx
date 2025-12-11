"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useChat } from "@/lib/chat-context"
import { MessageIcon, SearchIcon, ChevronRightIcon } from "@/components/icons"

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

export default function ChatListPage() {
  const { conversations, totalUnread } = useChat()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.storeName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-muted/30">
      <Header variant="marketplace" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Pesan</h1>
          <p className="text-muted-foreground">
            {totalUnread > 0 ? `${totalUnread} pesan belum dibaca` : "Semua pesan sudah dibaca"}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari percakapan..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Conversation List */}
        <div className="space-y-2">
          {filteredConversations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageIcon className="size-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  {searchQuery ? "Tidak ada percakapan ditemukan" : "Belum ada percakapan"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((conversation) => (
              <Link key={conversation.id} href={`/buyer/chat/${conversation.id}`}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="size-12 overflow-hidden rounded-full bg-muted">
                          <Image
                            src={conversation.storeImage || "/placeholder.svg"}
                            alt={conversation.storeName}
                            width={48}
                            height={48}
                            className="size-full object-cover"
                          />
                        </div>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium text-foreground truncate">{conversation.storeName}</h3>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {formatTimeAgo(conversation.lastMessageTime)}
                          </span>
                        </div>
                        <p
                          className={`mt-0.5 text-sm truncate ${
                            conversation.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {conversation.lastMessage}
                        </p>
                      </div>

                      <ChevronRightIcon className="size-5 shrink-0 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
