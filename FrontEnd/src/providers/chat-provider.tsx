"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface ChatMessage {
  id: string
  senderId: string
  senderType: "buyer" | "seller"
  message: string
  timestamp: string
  read: boolean
}

export interface ChatConversation {
  id: string
  storeId: string
  storeName: string
  storeImage: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: ChatMessage[]
}

interface ChatProviderType {
  conversations: ChatConversation[]
  totalUnread: number
  sendMessage: (conversationId: string, message: string) => void
  markConversationAsRead: (conversationId: string) => void
  getConversation: (conversationId: string) => ChatConversation | undefined
}

const ChatContext = createContext<ChatProviderType | undefined>(undefined)

// Mock chat data
const mockConversations: ChatConversation[] = [
  {
    id: "conv-1",
    storeId: "store-1",
    storeName: "Toko Roti Makmur",
    storeImage: "/bakery-shop-logo.jpg",
    lastMessage: "Pesanan sudah siap diambil ya kak!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 1,
    messages: [
      {
        id: "msg-1",
        senderId: "user-1",
        senderType: "buyer",
        message: "Halo, apakah croissant masih tersedia?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        read: true,
      },
      {
        id: "msg-2",
        senderId: "store-1",
        senderType: "seller",
        message: "Halo kak! Masih tersedia, tinggal 5 pcs. Mau pesan berapa?",
        timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        read: true,
      },
      {
        id: "msg-3",
        senderId: "user-1",
        senderType: "buyer",
        message: "Saya ambil 3 ya, nanti sore sekitar jam 5 saya ambil",
        timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        read: true,
      },
      {
        id: "msg-4",
        senderId: "store-1",
        senderType: "seller",
        message: "Siap kak! Sudah saya reservekan ya. Ditunggu kedatangannya!",
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        read: true,
      },
      {
        id: "msg-5",
        senderId: "store-1",
        senderType: "seller",
        message: "Pesanan sudah siap diambil ya kak!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        read: false,
      },
    ],
  },
  {
    id: "conv-2",
    storeId: "store-2",
    storeName: "Warung Padang Sederhana",
    storeImage: "/indonesian-restaurant-logo.jpg",
    lastMessage: "Terima kasih sudah berbelanja kak!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unreadCount: 0,
    messages: [
      {
        id: "msg-6",
        senderId: "user-1",
        senderType: "buyer",
        message: "Rendang nya masih ada kak?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
        read: true,
      },
      {
        id: "msg-7",
        senderId: "store-2",
        senderType: "seller",
        message: "Ada kak, masih fresh tadi siang masaknya",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5).toISOString(),
        read: true,
      },
      {
        id: "msg-8",
        senderId: "store-2",
        senderType: "seller",
        message: "Terima kasih sudah berbelanja kak!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: true,
      },
    ],
  },
  {
    id: "conv-3",
    storeId: "store-3",
    storeName: "Fresh Market",
    storeImage: "/supermarket-grocery-logo.jpg",
    lastMessage: "Baik kak, akan kami infokan kalau sudah restock",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    unreadCount: 0,
    messages: [
      {
        id: "msg-9",
        senderId: "user-1",
        senderType: "buyer",
        message: "Susu segar nya kapan restock?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
        read: true,
      },
      {
        id: "msg-10",
        senderId: "store-3",
        senderType: "seller",
        message: "Baik kak, akan kami infokan kalau sudah restock",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        read: true,
      },
    ],
  },
]

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations)

  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)

  const sendMessage = (conversationId: string, message: string) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: "user-1",
            senderType: "buyer",
            message,
            timestamp: new Date().toISOString(),
            read: true,
          }
          return {
            ...conv,
            lastMessage: message,
            lastMessageTime: newMessage.timestamp,
            messages: [...conv.messages, newMessage],
          }
        }
        return conv
      })
    )
  }

  const markConversationAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map(msg => ({ ...msg, read: true })),
          }
        }
        return conv
      })
    )
  }

  const getConversation = (conversationId: string) => {
    return conversations.find(conv => conv.id === conversationId)
  }

  return (
    <ChatContext.Provider
      value={{
        conversations,
        totalUnread,
        sendMessage,
        markConversationAsRead,
        getConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
