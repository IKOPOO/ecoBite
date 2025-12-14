"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateSeller } from "@/hooks/use-seller"
import { CreateSellerSchema, CreateSellerFormValues } from "@/services/seller-service"

// UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, MapPin, Phone, Loader2 } from "lucide-react"
import BackButton from "@/components/shared/back-button"

export default function OpenStorePage() {
  const { mutate, isPending } = useCreateSeller()

  const form = useForm<CreateSellerFormValues>({
    resolver: zodResolver(CreateSellerSchema),
    defaultValues: {
      store_name: "",
      store_description: "",
      address: "",
      phone_number: "",
    },
  })

  const onSubmit = (data: CreateSellerFormValues) => {
    mutate(data)
  }

  return (
    <div className="container max-w-2xl py-10 m-auto">
      <div className="absolute left-4 top-0 md:left-8 md:top-8">
        <BackButton label="Kembali" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Store className="size-6 text-primary" />
            Buka Toko Gratis
          </CardTitle>
          <CardDescription>Mulai selamatkan makanan dan dapatkan keuntungan hari ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* NAMA TOKO */}
              <FormField
                control={form.control}
                name="store_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Toko</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Dapur Bu Sinta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DESKRIPSI (Opsional) */}
              <FormField
                control={form.control}
                name="store_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Singkat (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Menjual katering harian dan kue basah..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NOMOR HP */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor WhatsApp / Telepon</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="08123456789" type="tel" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ALAMAT */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap Toko</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                        <Textarea
                          className="pl-9 min-h-25"
                          placeholder="Jl. Pandanaran No. 12, Semarang..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sedang Memproses...
                  </>
                ) : (
                  "Buka Toko Sekarang"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
