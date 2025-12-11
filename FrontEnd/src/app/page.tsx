import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  LeafIcon,
  RecycleIcon,
  ShoppingBagIcon,
  StoreIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
} from "@/components/icons"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="landing" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                  <RecycleIcon className="size-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Food Rescue Marketplace</span>
                </div>
                <h1 className="text-balance text-4xl font-bold tracking-tight lg:text-6xl">
                  Kurangi Food Waste, <span className="text-primary">Hemat Pengeluaran</span>
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground">
                  Selamatkan makanan berkualitas dari restoran dan toko dengan harga hemat hingga 70%. Bersama kita
                  wujudkan gaya hidup berkelanjutan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/marketplace">
                    <Button size="lg" className="gap-2">
                      Mulai Belanja
                      <ChevronRightIcon className="size-4" />
                    </Button>
                  </Link>
                  <Link href="/register?role=seller">
                    <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                      <StoreIcon className="size-4" />
                      Daftar Sebagai Penjual
                    </Button>
                  </Link>
                </div>

                {/* Stats Preview */}
                <div className="flex flex-wrap gap-8 pt-4">
                  <div>
                    <p className="text-3xl font-bold text-primary">12,500+</p>
                    <p className="text-sm text-muted-foreground">Kg Food Waste Diselamatkan</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">8,200+</p>
                    <p className="text-sm text-muted-foreground">Pengguna Aktif</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">350+</p>
                    <p className="text-sm text-muted-foreground">Mitra Penjual</p>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-3xl">
                  <img
                    src="/fresh-vegetables-fruits-bread-pastries-food-rescue.jpg"
                    alt="Makanan segar yang diselamatkan"
                    className="size-full object-cover"
                  />
                </div>
                {/* Floating Cards */}
                <div className="absolute -left-4 bottom-8 rounded-xl border bg-card p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <LeafIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Ramah Lingkungan</p>
                      <p className="text-sm text-muted-foreground">Kurangi emisi CO2</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-8 rounded-xl border bg-card p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-accent/50">
                      <ShoppingBagIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Hemat 70%</p>
                      <p className="text-sm text-muted-foreground">Dari harga normal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="cara-kerja" className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Cara Kerja ecoBite</h2>
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
                <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                  <img
                    src="/restaurant-chef-cooking-sustainable-kitchen-eco-fr.jpg"
                    alt="Mitra restoran ecoBite"
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-3xl font-bold lg:text-4xl">
                  Bersama Mengurangi <span className="text-primary">Food Waste</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Setiap tahun, jutaan ton makanan terbuang sia-sia. ecoBite hadir sebagai solusi untuk menghubungkan
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
                  <Link href="/marketplace">
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
      </main>

      <Footer />
    </div>
  )
}
