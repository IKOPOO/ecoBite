"use client"

import QueryProvider from "@/providers/query-provider"
import { AuthProvider } from "@/providers/auth-provider"
import { NotificationProvider } from "@/providers/notification-provider"
import { ChatProvider } from "@/providers/chat-provider"
import { CartProvider } from "@/providers/cart-provider"
import { Toaster } from "@/components/ui/sonner"
import { OrderProvider } from "./order-provider"

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <NotificationProvider>
          <ChatProvider>
            <CartProvider>
              <OrderProvider>{children}</OrderProvider>
            </CartProvider>
          </ChatProvider>
        </NotificationProvider>
      </AuthProvider>
      <Toaster />
    </QueryProvider>
  )
}
