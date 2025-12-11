"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LeafIcon, EyeIcon, EyeOffIcon } from "@/components/icons"

type UserRole = "buyer" | "seller" | "admin"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<UserRole>("buyer")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect based on role
    if (role === "buyer") {
      router.push("/marketplace")
    } else if (role === "seller") {
      router.push("/seller/dashboard")
    } else {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <LeafIcon className="size-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">ecoBite</span>
          </Link>
          <CardTitle className="text-2xl">Selamat Datang Kembali</CardTitle>
          <CardDescription>Masuk ke akun ecoBite Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selector */}
            <div className="space-y-2">
              <Label>Masuk Sebagai</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "buyer", label: "Pembeli" },
                  { value: "seller", label: "Penjual" },
                  { value: "admin", label: "Admin" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value as UserRole)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      role === option.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nama@email.com" required />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
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
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Daftar sekarang
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
