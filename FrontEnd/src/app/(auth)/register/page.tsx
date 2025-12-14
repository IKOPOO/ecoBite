"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LeafIcon, EyeIcon, EyeOffIcon, StoreIcon, ShoppingBagIcon, ArrowLeftIcon } from "@/components/shared/icons"
import BackButton from "@/components/shared/back-button"
import { useRegister } from "@/hooks/use-auth"
import { RegisterFormValues, RegisterSchema } from "@/services/auth-service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, ShoppingBag, Store } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type UserRole = "buyer" | "seller"

export default function RegisterPage() {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const initialRole = searchParams.get("role") as UserRole | null

  // const [showPassword, setShowPassword] = useState(false)
  // const [role, setRole] = useState<UserRole>(initialRole || "buyer")
  // const [isLoading, setIsLoading] = useState(false)

  // // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  // //   e.preventDefault()
  // //   setIsLoading(true)

  // //   // Simulate registration
  // //   await new Promise(resolve => setTimeout(resolve, 1000))

  // //   // Redirect based on role
  // //   if (role === "buyer") {
  // //     router.push("/marketplace")
  // //   } else {
  // //     router.push("/seller/dashboard")
  // //   }
  // // }

  // 1. Panggil Hook Mutasi
  const { mutate, isPending } = useRegister()

  // 2. Setup Form dengan Zod Resolver
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "BUYER", // Default role
    },
  })

  // 3. Handler Submit
  const onSubmit = (data: RegisterFormValues) => {
    mutate(data) // Kirim data ke hook -> service -> backend
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4 relative">
      <BackButton className="absolute left-4 top-4 z-10" label="Kembali" />
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* --- PILIH ROLE (Radio Cards) --- */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Saya ingin mendaftar sebagai...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {/* Pilihan Pembeli */}
                        <div>
                          <RadioGroupItem value="BUYER" id="buyer" className="peer sr-only" />
                          <Label
                            htmlFor="buyer"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                          >
                            <ShoppingBag className="mb-2 size-6 text-primary" />
                            Pembeli
                          </Label>
                        </div>

                        {/* Pilihan Penjual */}
                        <div>
                          <RadioGroupItem value="SELLER" id="seller" className="peer sr-only" />
                          <Label
                            htmlFor="seller"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                          >
                            <Store className="mb-2 size-6 text-primary" />
                            Mitra Penjual
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- NAMA LENGKAP --- */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Budi Santoso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- EMAIL --- */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="budi@contoh.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {/* --- PASSWORD --- */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* --- CONFIRM PASSWORD --- */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* --- TOMBOL SUBMIT --- */}
              <Button className="w-full" size="lg" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Mendaftarkan...
                  </>
                ) : (
                  "Buat Akun"
                )}
              </Button>
            </form>
          </Form>

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
