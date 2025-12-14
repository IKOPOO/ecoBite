import { ErrorView } from "@/components/shared/error-view"
import { Header } from "@/components/layouts/header" // Sesuaikan path header kamu
import { Footer } from "@/components/layouts/footer" // Sesuaikan path footer kamu
import { UtensilsCrossed, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="landing" /> {/* Sesuaikan variant header kamu */}
      <main className="flex-1 flex flex-col">
        <ErrorView
          title="Makanan Sudah Habis"
          description="Halaman yang kamu cari sepertinya sudah 'dimakan' atau link-nya kadaluarsa. Yuk cari makanan lain!"
          code="404"
          icon={UtensilsCrossed}
          action={
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline" size="lg">
                  Beranda
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" className="gap-2">
                  <ShoppingBag className="size-4" />
                  Cari Makanan
                </Button>
              </Link>
            </div>
          }
        />
      </main>
      <Footer />
    </div>
  )
}
