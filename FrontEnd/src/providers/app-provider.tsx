"use client"

import QueryProvider from "@/providers/query-provider"
import { AuthProvider } from "@/providers/auth-provider"
import { NotificationProvider } from "@/providers/notification-provider"
import { ChatProvider } from "@/providers/chat-provider"
import { CartProvider } from "@/providers/cart-provider"
import { Toaster } from "@/components/ui/sonner"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <NotificationProvider>
          <ChatProvider>
            <CartProvider>{children}</CartProvider>
          </ChatProvider>
        </NotificationProvider>
      </AuthProvider>
      <Toaster />
    </QueryProvider>
  )
}
