"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { CartItem } from "@/providers/cart-provider" // Import tipe dari cart

// Kita samakan tipe datanya dengan yang ada di halaman Orders
export type OrderStatus = "pending" | "processing" | "ready" | "completed" | "cancelled"

export interface OrderItem {
  name: string
  quantity: number
  price: number
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
  storeId: string
  storeName: string
  storeLocation: string
  deliveryMethod: "pickup" | "delivery"
}

interface OrderContextType {
  orders: Order[]
  addOrder: (cartItems: CartItem[], total: number) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // 1. Load data dari LocalStorage saat awal buka
  useEffect(() => {
    setIsMounted(true)
    const savedOrders = localStorage.getItem("orders-storage")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error("Gagal load orders", e)
      }
    }
  }, [])

  // 2. Simpan ke LocalStorage tiap ada perubahan
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("orders-storage", JSON.stringify(orders))
    }
  }, [orders, isMounted])

  // FUNGSI UTAMA: Membuat Order Baru dari Cart
  const addOrder = (cartItems: CartItem[], total: number) => {
    if (cartItems.length === 0) return

    // Ambil info toko dari item pertama (Asumsi 1 cart = 1 toko dulu biar simpel)
    // Kalau mau multi-toko, logic-nya harus di-split per toko.
    const firstItem = cartItems[0].product.store

    const newOrder: Order = {
      id: `ORD-${Date.now()}`, // Bikin ID unik pakai timestamp
      items: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.discountedPrice, // Pakai harga diskon
        image: item.product.image,
      })),
      total: total,
      status: "processing", // Default status langsung 'diproses'
      createdAt: new Date().toISOString(),
      storeId: firstItem.id,
      storeName: firstItem.name,
      storeLocation: firstItem.location,
      deliveryMethod: "pickup", // Default pickup dulu
    }

    // Tambahkan order baru di paling atas array (unshift logic)
    setOrders(prev => [newOrder, ...prev])
  }

  return <OrderContext.Provider value={{ orders, addOrder }}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
