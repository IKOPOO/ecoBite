"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LeafIcon, MenuIcon, XIcon, CartIcon, SearchIcon, BellIcon, MessageIcon, UserIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useNotifications } from "@/lib/notification-context"
import { useChat } from "@/lib/chat-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  variant?: "landing" | "marketplace" | "dashboard"
}

export function Header({ variant = "landing" }: HeaderProps) {
  const cart = useCart()
  const { unreadCount: notifUnread } = useNotifications()
  const { totalUnread: chatUnread } = useChat()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = cart?.totalItems ?? 0

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <LeafIcon className="size-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">ecoBite</span>
        </Link>

        {/* Desktop Navigation */}
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
              <Link href="/marketplace" className="text-sm font-medium text-foreground">
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {variant === "marketplace" && (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <SearchIcon className="size-5" />
              </Button>

              <Link href="/buyer/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="size-5" />
                  {notifUnread > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
                      {notifUnread > 9 ? "9+" : notifUnread}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/buyer/chat">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageIcon className="size-5" />
                  {chatUnread > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {chatUnread > 9 ? "9+" : chatUnread}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/buyer/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <CartIcon className="size-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserIcon className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/buyer/profile">Profil Saya</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/buyer/orders">Pesanan Saya</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login">Keluar</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {variant === "landing" && (
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/login">
                <Button variant="ghost">Masuk</Button>
              </Link>
              <Link href="/register">
                <Button>Daftar</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-16 border-b bg-background p-4 transition-all md:hidden",
          mobileMenuOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-4">
          {variant === "landing" && (
            <>
              <Link href="/" className="text-sm font-medium text-muted-foreground">
                Beranda
              </Link>
              <Link href="#cara-kerja" className="text-sm font-medium text-muted-foreground">
                Cara Kerja
              </Link>
              <Link href="#tentang" className="text-sm font-medium text-muted-foreground">
                Tentang Kami
              </Link>

              <div className="flex flex-col gap-2 pt-4">
                <Link href="/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">Daftar</Button>
                </Link>
              </div>
            </>
          )}
          {variant === "marketplace" && (
            <>
              <Link href="/marketplace" className="text-sm font-medium text-foreground">
                Marketplace
              </Link>
              <Link href="/buyer/orders" className="text-sm font-medium text-muted-foreground">
                Pesanan
              </Link>
              <Link href="/buyer/profile" className="text-sm font-medium text-muted-foreground">
                Profil
              </Link>
              <Link href="/buyer/notifications" className="text-sm font-medium text-muted-foreground">
                Notifikasi {notifUnread > 0 && `(${notifUnread})`}
              </Link>
              <Link href="/buyer/chat" className="text-sm font-medium text-muted-foreground">
                Pesan {chatUnread > 0 && `(${chatUnread})`}
              </Link>
              <Link href="/buyer/cart" className="text-sm font-medium text-muted-foreground">
                Keranjang ({cartCount})
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
