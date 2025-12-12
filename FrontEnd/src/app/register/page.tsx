"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LeafIcon, EyeIcon, EyeOffIcon, StoreIcon, ShoppingBagIcon, ArrowLeftIcon } from "@/components/icons"

type UserRole = "buyer" | "seller"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") as UserRole | null

  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<UserRole>(initialRole || "buyer")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect based on role
    if (role === "buyer") {
      router.push("/marketplace")
    } else {
      router.push("/seller/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 relative">
      <Link href="/" className="absolute top-4 left-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-10">
        <ArrowLeftIcon className="size-5" />
        <span className="font-medium">Kembali</span>
      </Link>
      <Card className="w-full max-w-md mt-16">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <LeafIcon className="size-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">ecoBite</span>
          </Link>
          <CardTitle className="text-2xl">Buat Akun Baru</CardTitle>
          <CardDescription>Bergabung dengan komunitas food rescue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selector */}
            <div className="space-y-2">
              <Label>Daftar Sebagai</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${role === "buyer" ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                    }`}
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-full ${role === "buyer" ? "bg-primary/10" : "bg-muted"
                      }`}
                  >
                    <ShoppingBagIcon
                      className={`size-6 ${role === "buyer" ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <span className={`font-medium ${role === "buyer" ? "text-primary" : ""}`}>Pembeli</span>
                  <span className="text-xs text-muted-foreground">Beli makanan hemat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("seller")}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${role === "seller" ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                    }`}
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-full ${role === "seller" ? "bg-primary/10" : "bg-muted"
                      }`}
                  >
                    <StoreIcon className={`size-6 ${role === "seller" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-medium ${role === "seller" ? "text-primary" : ""}`}>Penjual</span>
                  <span className="text-xs text-muted-foreground">Jual makanan Anda</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" type="text" placeholder="Masukkan nama anda" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Masukkan username" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nama@email.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Daftar"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Dengan mendaftar, Anda menyetujui{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Kebijakan Privasi
              </Link>{" "}
              kami.
            </p>
          </form>

          <div className="mt-6 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
