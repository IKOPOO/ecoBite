"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

// UI Components
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Pastikan import Sheet benar
import { cn } from "@/lib/utils"

// Icons
import {
  Leaf as LeafIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  MessageSquare as MessageIcon, // Saya sesuaikan nama iconnya
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react"

// Import Komponen Kita
import { UserNav } from "@/components/layouts/user-nav"

interface HeaderProps {
  variant?: "landing" | "marketplace"
}

export function Header({ variant = "landing" }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dummy Data (Nanti diganti pake Query/Context)
  const notifUnread = 2
  const chatUnread = 5
  const cartCount = 3

  // Cek Status Login (Client Side)
  useEffect(() => {
    // Cek apakah ada token di localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LeafIcon className="size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">ecoBite</span>
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
          {/* Ikon-ikon Marketplace (Hanya muncul di variant marketplace) */}
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

              <Link href="/buyer/chat">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <MessageIcon className="size-5" />
                  {chatUnread > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {chatUnread > 9 ? "9+" : chatUnread}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/buyer/cart">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <CartIcon className="size-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </>
          )}

          {/* --- USER PROFILE / LOGIN BUTTONS --- */}
          {isLoggedIn ? (
            // Kalau Login: Tampilkan Avatar User (Berisi Logout Logic)
            <div className="ml-2">
              <UserNav />
            </div>
          ) : (
            // Kalau Belum Login: Tampilkan Tombol Masuk/Daftar
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

          {/* --- MOBILE MENU TOGGLE --- */}
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

      {/* --- MOBILE MENU CONTENT --- */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 animate-in slide-in-from-top-5 border-b bg-background p-4 shadow-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {variant === "landing" && (
              <>
                <Link
                  href="/"
                  className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Beranda
                </Link>
                <Link
                  href="#cara-kerja"
                  className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Cara Kerja
                </Link>
                <Link
                  href="#tentang"
                  className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Tentang Kami
                </Link>

                {!isLoggedIn && (
                  <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                    <Link href="/login">
                      <Button variant="outline" className="w-full justify-start">
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full justify-start">Daftar Akun</Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            {variant === "marketplace" && (
              <>
                <Link href="/buyer/marketplace" className="flex items-center py-2 text-sm font-medium text-foreground">
                  Marketplace
                </Link>
                <Link href="/buyer/orders" className="flex items-center py-2 text-sm font-medium text-muted-foreground">
                  Pesanan Saya
                </Link>
                <Link href="/buyer/cart" className="flex items-center py-2 text-sm font-medium text-muted-foreground">
                  Keranjang Belanja ({cartCount})
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
