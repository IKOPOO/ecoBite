"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Notification {
  id: string
  type: "order" | "promo" | "product" | "chat" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string
  link?: string
  image?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  deleteNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "order",
    title: "Pesanan Dikonfirmasi",
    message: "Pesanan #ORD-2024-001 telah dikonfirmasi oleh Toko Roti Makmur",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    link: "/buyer/orders",
    image: "/bread-bakery.jpg",
  },
  {
    id: "notif-2",
    type: "product",
    title: "Produk Hampir Habis",
    message: "Croissant Butter yang kamu suka tinggal 3 tersisa!",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: "/marketplace/1",
    image: "/golden-croissant.png",
  },
  {
    id: "notif-3",
    type: "promo",
    title: "Diskon 50%!",
    message: "Restoran Padang Sederhana memberikan diskon hingga 50% untuk semua menu!",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    link: "/marketplace?store=padang-sederhana",
    image: "/indonesian-food-rendang.jpg",
  },
  {
    id: "notif-4",
    type: "chat",
    title: "Pesan Baru",
    message: "Toko Roti Makmur: Pesanan sudah siap diambil ya kak!",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    link: "/buyer/chat/store-1",
    image: "/bakery-shop-logo.jpg",
  },
  {
    id: "notif-5",
    type: "order",
    title: "Pesanan Selesai",
    message: "Pesanan #ORD-2024-000 telah selesai. Terima kasih sudah berbelanja!",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: "/buyer/orders",
  },
  {
    id: "notif-6",
    type: "system",
    title: "Selamat Datang di ecoBite!",
    message: "Terima kasih sudah bergabung. Yuk mulai selamatkan makanan dan hemat pengeluaran!",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    link: "/marketplace",
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const addNotification = (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
