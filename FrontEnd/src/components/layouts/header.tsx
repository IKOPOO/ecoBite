"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation" // Opsional: jika butuh active state
import { Button } from "@/components/ui/button"
import {
  SearchIcon,
  BellIcon,
  MessageSquare as MessageIcon, // Alias biar sama kayak icon kamu
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react"

// IMPORT PROVIDER KITA
import { useCart } from "@/providers/cart-provider"
import { useChat } from "@/providers/chat-provider"
import { UserNav } from "@/components/layouts/user-nav" // Asumsi component ini ada

interface HeaderProps {
  variant?: "landing" | "marketplace"
}

export function Header({ variant = "landing" }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 1. Panggil Data Cart
  const { totalItems } = useCart()

  // 2. Panggil Data Chat (GANTI DUMMY)
  const { totalUnread } = useChat()

  // Sisa dummy data (Notif belum ada providernya)
  const notifUnread = 2

  // Cek Status Login (Client Side)
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2">
          {/* Pastikan file ini ada di public folder, atau ganti text biasa */}
          <img src="/savorbite-logo.png" alt="SavorBite Logo" className="h-24 w-auto" />
        </Link>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden items-center gap-8 md:flex">
          {variant === "landing" && (
            <>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Beranda
              </Link>
              <Link
                href="#cara-kerja"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Cara Kerja
              </Link>
              <Link
                href="#tentang"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Tentang Kami
              </Link>
            </>
          )}
          {variant === "marketplace" && (
            <>
              <Link
                href="/buyer/marketplace"
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                Marketplace
              </Link>
              <Link
                href="/buyer/orders"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Pesanan
              </Link>
            </>
          )}
        </nav>

        {/* --- RIGHT ACTIONS --- */}
        <div className="flex items-center gap-2">
          {variant === "marketplace" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-muted-foreground hover:text-foreground"
              >
                <SearchIcon className="size-5" />
              </Button>

              <Link href="/buyer/notifications">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <BellIcon className="size-5" />
                  {notifUnread > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex size-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    </span>
                  )}
                </Button>
              </Link>

              {/* TOMBOL CHAT DINAMIS */}
              <Link href="/buyer/chat">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <MessageIcon className="size-5" />
                  {totalUnread > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                      {totalUnread > 9 ? "9+" : totalUnread}
                    </span>
                  )}
                </Button>
              </Link>

              {/* TOMBOL CART DINAMIS */}
              <Link href="/buyer/cart">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <CartIcon className="size-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </>
          )}

          {/* --- LOGIN / PROFILE --- */}
          {isLoggedIn ? (
            <div className="ml-2">
              <UserNav />
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex ml-2">
              <Link href="/login">
                <Button variant="ghost" className="font-semibold">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-bold shadow-md">Daftar Sekarang</Button>
              </Link>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU CONTENT (Disembunyikan biar kodenya gak kepanjangan, isinya sama kayak punyamu) */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b bg-background p-4 shadow-xl md:hidden">
          {/* Isi navigasi mobile kamu taruh sini */}
        </div>
      )}
    </header>
  )
}
