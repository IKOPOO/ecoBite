"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
// Sesuaikan path import ini dengan struktur folder kamu
import { type Product, products } from "@/lib/data"
import { toast } from "sonner" // Optional: Kalau mau pakai notif

export interface CartItem {
  product: Product
  quantity: number
}

interface CartProviderType {
  items: CartItem[]
  addToCart: (productId: string, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartProviderType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // 1. LOAD DATA DARI LOCAL STORAGE (Saat pertama kali buka)
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem("cart-storage")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Gagal memuat keranjang:", error)
      }
    }
  }, [])

  // 2. SIMPAN DATA KE LOCAL STORAGE (Setiap ada perubahan items)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart-storage", JSON.stringify(items))
    }
  }, [items, isMounted])

  const addToCart = useCallback((productId: string, quantity = 1) => {
    // Cari data produk berdasarkan ID dari dummy data
    const product = products.find(p => p.id === productId)

    if (!product) {
      toast.error("Produk tidak ditemukan")
      return
    }

    setItems(prev => {
      const existing = prev.find(item => item.product.id === productId)

      if (existing) {
        // Cek stok sebelum nambah
        const newQuantity = existing.quantity + quantity
        if (newQuantity > product.stock) {
          toast.warning(`Stok hanya tersisa ${product.stock}`)
          return prev.map(item => (item.product.id === productId ? { ...item, quantity: product.stock } : item))
        }

        toast.success("Jumlah barang diperbarui di keranjang")
        return prev.map(item => (item.product.id === productId ? { ...item, quantity: newQuantity } : item))
      }

      toast.success("Berhasil masuk keranjang")
      return [...prev, { product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId))
    toast.info("Barang dihapus dari keranjang")
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(prev => {
      // Jika user update jadi 0 atau negatif, hapus item
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId)
      }

      return prev.map(item => {
        if (item.product.id === productId) {
          // Cek stok lagi biar aman
          const safeQuantity = Math.min(quantity, item.product.stock)
          return { ...item, quantity: safeQuantity }
        }
        return item
      })
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem("cart-storage")
    toast.info("Keranjang dikosongkan")
  }, [])

  // Hitung total
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = items.reduce((acc, item) => acc + item.product.discountedPrice * item.quantity, 0)

  // Prevent Hydration Mismatch: Jangan render apa-apa sampai client siap
  if (!isMounted) {
    return null
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
