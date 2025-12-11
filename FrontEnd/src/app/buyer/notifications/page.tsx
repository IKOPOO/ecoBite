"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotifications, type Notification } from "@/lib/notification-context"
import {
  BellIcon,
  ShoppingBagIcon,
  TagIcon,
  PackageIcon,
  MessageIcon,
  InfoIcon,
  TrashIcon,
  CheckIcon,
} from "@/components/icons"

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "order":
      return <ShoppingBagIcon className="size-5 text-blue-500" />
    case "promo":
      return <TagIcon className="size-5 text-orange-500" />
    case "product":
      return <PackageIcon className="size-5 text-green-500" />
    case "chat":
      return <MessageIcon className="size-5 text-purple-500" />
    case "system":
      return <InfoIcon className="size-5 text-gray-500" />
    default:
      return <BellIcon className="size-5 text-gray-500" />
  }
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`
  return date.toLocaleDateString("id-ID")
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  return (
    <div className="min-h-screen bg-muted/30">
      <Header variant="marketplace" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifikasi</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckIcon className="mr-2 size-4" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread")} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="unread">
              Belum Dibaca
              {unreadCount > 0 && (
                <span className="ml-1.5 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BellIcon className="size-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    {filter === "unread" ? "Tidak ada notifikasi baru" : "Tidak ada notifikasi"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-colors ${!notification.read ? "border-primary/30 bg-primary/5" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {notification.image ? (
                        <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={notification.image || "/placeholder.svg"}
                            alt=""
                            width={48}
                            height={48}
                            className="size-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-foreground">{notification.title}</h3>
                              {!notification.read && <span className="size-2 rounded-full bg-primary" />}
                            </div>
                            <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatTimeAgo(notification.createdAt)}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckIcon className="size-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 text-muted-foreground hover:text-destructive"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <TrashIcon className="size-4" />
                            </Button>
                          </div>
                        </div>

                        {notification.link && (
                          <Link href={notification.link}>
                            <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-primary">
                              Lihat Detail
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
