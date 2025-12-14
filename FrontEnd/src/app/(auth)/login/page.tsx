"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LeafIcon } from "@/components/shared/icons"
import BackButton from "@/components/shared/back-button"
import { useLogin } from "@/hooks/use-auth"
import { useForm } from "react-hook-form"
import { LoginFormValues, LoginSchema } from "@/services/auth-service"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
  const { mutate, isPending } = useLogin()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    mutate(data)
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
          <CardTitle className="text-2xl">Selamat Datang Kembali</CardTitle>
          <CardDescription>Masuk ke akun ecoBite Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* --- EMAIL --- */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@kamu.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- PASSWORD --- */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="#" className="text-xs text-muted-foreground hover:underline hover:text-primary">
                        Lupa password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* --- TOMBOL SUBMIT --- */}
              <Button className="w-full" size="lg" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk Sekarang <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

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
