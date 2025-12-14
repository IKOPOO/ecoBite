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
import { LogOut, User, Settings, ShoppingBag } from "lucide-react"
import Link from "next/link"

export function UserNav() {
  const { mutate: logout, isPending } = useLogout()

  // Ambil data user dari LocalStorage buat nampilin nama (Opsional)
  // Kalau mau lebih canggih, nanti pake useQuery profile
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}
  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : "US"

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
            <p className="text-sm font-medium leading-none">{user.name || "Pengguna"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email || "user@ecobite.com"}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
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
