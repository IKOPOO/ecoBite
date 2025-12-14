import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { LandingHero } from "@/components/features/landing/landing-hero"
import { MapWrapper } from "@/components/features/maps/map-wrapper"

import {
  LeafIcon,
  RecycleIcon,
  ShoppingBagIcon,
  StoreIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
} from "@/components/shared/icons"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="landing" />

      <main className="flex-1">
        <LandingHero />

        {/* How It Works */}
        <section id="cara-kerja" className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Cara Kerja SavorBite</h2>
              <p className="text-lg text-muted-foreground">
                Tiga langkah mudah untuk mulai menyelamatkan makanan dan menghemat pengeluaran
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: MapPinIcon,
                  title: "Temukan Makanan Terdekat",
                  description: "Cari restoran atau toko terdekat yang menawarkan makanan dengan harga spesial",
                },
                {
                  step: "02",
                  icon: ShoppingBagIcon,
                  title: "Pilih & Pesan",
                  description: "Pilih makanan favorit Anda dan lakukan pemesanan dengan mudah",
                },
                {
                  step: "03",
                  icon: ClockIcon,
                  title: "Ambil Pesanan",
                  description: "Ambil pesanan Anda di lokasi penjual pada waktu yang ditentukan",
                },
              ].map((item, index) => (
                <Card key={index} className="relative overflow-hidden border-none bg-muted/50 shadow-none">
                  <CardContent className="p-8">
                    <span className="absolute right-4 top-4 text-6xl font-bold text-primary/10">{item.step}</span>
                    <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                      <item.icon className="size-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features / About */}
        <section id="tentang" className="bg-muted/30 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="aspect-4/3 overflow-hidden rounded-3xl">
                  <img
                    src="/restaurant-chef-cooking-sustainable-kitchen-eco-fr.jpg"
                    alt="Mitra restoran SavorBite"
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-3xl font-bold lg:text-4xl">
                  Bersama Mengurangi <span className="text-primary">Food Waste</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Setiap tahun, jutaan ton makanan terbuang sia-sia. SavorBite hadir sebagai solusi untuk menghubungkan
                  restoran, toko roti, dan penjual makanan dengan pembeli yang menghargai kualitas dan keberlanjutan.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    {
                      icon: LeafIcon,
                      title: "Ramah Lingkungan",
                      description: "Kurangi jejak karbon dengan menyelamatkan makanan",
                    },
                    {
                      icon: UsersIcon,
                      title: "Komunitas Peduli",
                      description: "Bergabung dengan ribuan pengguna yang peduli",
                    },
                    {
                      icon: StoreIcon,
                      title: "Mitra Terpercaya",
                      description: "Restoran dan toko terverifikasi",
                    },
                    {
                      icon: ShoppingBagIcon,
                      title: "Harga Terjangkau",
                      description: "Hemat hingga 70% dari harga normal",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <feature.icon className="size-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-3xl bg-primary p-8 lg:p-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
                  Siap Mulai Menyelamatkan Makanan?
                </h2>
                <p className="mb-8 text-lg text-primary-foreground/80">
                  Bergabung dengan ribuan pengguna yang sudah berkontribusi mengurangi food waste sambil menikmati
                  makanan berkualitas dengan harga hemat.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/buyer/marketplace">
                    <Button size="lg" variant="secondary" className="gap-2">
                      Jelajahi Marketplace
                      <ChevronRightIcon className="size-4" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Daftar Sekarang
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location / Map Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Toko yang terdaftar</h2>
              <p className="text-lg text-muted-foreground">
                Temukan kami di Semarang dan bergabunglah dengan gerakan food rescue
              </p>
            </div>
            <MapWrapper />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
