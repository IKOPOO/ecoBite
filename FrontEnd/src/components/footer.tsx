import Link from "next/link"
import { LeafIcon } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <LeafIcon className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">ecoBite</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Marketplace food rescue yang menghubungkan restoran dengan pembeli untuk mengurangi food waste.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navigasi</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground">
                Marketplace
              </Link>
              <Link href="#cara-kerja" className="text-sm text-muted-foreground hover:text-foreground">
                Cara Kerja
              </Link>
              <Link href="#tentang" className="text-sm text-muted-foreground hover:text-foreground">
                Tentang Kami
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Untuk Bisnis</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/register?role=seller" className="text-sm text-muted-foreground hover:text-foreground">
                Daftar Sebagai Penjual
              </Link>
              <Link href="/seller/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                Dashboard Penjual
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Bantuan</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Hubungi Kami
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Kebijakan Privasi
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">© 2025 ecoBite. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
