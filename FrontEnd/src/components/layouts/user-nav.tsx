"use client"

import { useLogout } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Settings, ShoppingBag, Store } from "lucide-react"
import Link from "next/link"

interface UserData {
  username?: string
  fullName?: string
  email?: string
  role?: string
}

export function UserNav() {
  const { mutate: logout, isPending } = useLogout()

  let user: UserData = {}
  if (typeof window !== "undefined") {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser && storedUser !== "undefined") {
        user = JSON.parse(storedUser)
      }
    } catch (error) {
      console.error("Gagal parsing data user:", error)
      // Kalau error, hapus data korup biar ga looping error
      localStorage.removeItem("user")
    }
  }
  const userRole = user.role || "buyer"

  // Ambil data user dari LocalStorage buat nampilin nama (Opsional)
  // Kalau mau lebih canggih, nanti pake useQuery profile
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : user?.fullName?.slice(0, 2).toUpperCase() || "US"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-10 rounded-full">
          <Avatar className="size-10 border">
            {/* Ganti src dengan user.avatar_url kalau ada */}
            <AvatarImage src="/avatars/01.png" alt="@user" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username || "Pengguna"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email || "user@ecobite.com"}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* --- LOGIKA MENU TOKO --- */}
          {userRole === "seller" ? (
            // kalau udah jadi seller, arahin ke dashboard
            <Link href="/seller">
              <DropdownMenuItem className="cursor-pointer font-medium text-primary focus:text-primary focus:bg-primary/10">
                <Store className="mr-2 size-4" />
                <span>dashboard toko</span>
              </DropdownMenuItem>
            </Link>
          ) : (
            // kalau masih buyer, tawarkan buka toko
            <Link href="/buyer/open-store">
              <DropdownMenuItem className="cursor-pointer font-medium text-green-600 focus:text-green-700 focus:bg-green-50">
                <Store className="mr-2 size-4" />
                <span>buka toko gratis</span>
              </DropdownMenuItem>
            </Link>
          )}
          {/* ------------------------ */}

          <DropdownMenuSeparator />
          <Link href="/buyer/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 size-4" />
              <span>Profil Saya</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/buyer/orders">
            <DropdownMenuItem className="cursor-pointer">
              <ShoppingBag className="mr-2 size-4" />
              <span>Pesanan</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/buyer/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 size-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={() => logout()}
          disabled={isPending}
        >
          <LogOut className="mr-2 size-4" />
          <span>{isPending ? "Keluar..." : "Keluar"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
