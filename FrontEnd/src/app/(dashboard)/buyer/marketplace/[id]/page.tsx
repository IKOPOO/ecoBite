"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPinIcon,
  ClockIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  CartIcon,
  StarIcon,
  ChevronRightIcon,
} from "@/components/shared/icons"
import { products, formatPrice, formatDate, getDaysUntilExpiry } from "@/lib/data"
import { useCart } from "@/providers/cart-provider"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header variant="marketplace" />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold">Produk tidak ditemukan</h1>
            <p className="mb-4 text-muted-foreground">Produk yang Anda cari tidak tersedia</p>
            <Link href="/marketplace">
              <Button>Kembali ke Marketplace</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate)
  const isExpiringSoon = daysUntilExpiry <= 2

  const handleAddToCart = () => {
    addToCart(product.id, quantity)
    router.push("/buyer/cart")
  }

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="marketplace" />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/marketplace" className="hover:text-foreground">
                Marketplace
              </Link>
              <ChevronRightIcon className="size-4" />
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="size-full object-cover"
                  />
                </div>
                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  <Badge className="bg-destructive text-destructive-foreground">-{product.discountPercentage}%</Badge>
                  <Badge
                    variant={product.status === "layak-konsumsi" ? "default" : "secondary"}
                    className={product.status === "layak-konsumsi" ? "bg-primary" : ""}
                  >
                    {product.status === "layak-konsumsi" ? "Layak Konsumsi" : "Untuk Ternak"}
                  </Badge>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="mb-2 text-2xl font-bold md:text-3xl">{product.name}</h1>
                  <Link
                    href={`/store/${product.store.id}`}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <img
                      src={product.store.image || "/placeholder.svg"}
                      alt={product.store.name}
                      className="size-6 rounded-full object-cover"
                    />
                    <span>{product.store.name}</span>
                    <div className="flex items-center gap-1">
                      <StarIcon className="size-4 text-yellow-500" filled />
                      <span className="text-sm">{product.store.rating}</span>
                    </div>
                  </Link>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">{formatPrice(product.discountedPrice)}</span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <ClockIcon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expired Date</p>
                        <p className={`font-semibold ${isExpiringSoon ? "text-destructive" : ""}`}>
                          {formatDate(product.expiryDate)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <MapPinIcon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Jarak</p>
                        <p className="font-semibold">{product.store.distance}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Description */}
                <div>
                  <h3 className="mb-2 font-semibold">Deskripsi</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                {/* Product Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Tanggal Produksi</span>
                    <span className="font-medium">{formatDate(product.productionDate)}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Stok Tersedia</span>
                    <span className="font-medium">{product.stock} item</span>
                  </div>
                  {product.weight && (
                    <div className="flex justify-between border-b py-2">
                      <span className="text-muted-foreground">Berat</span>
                      <span className="font-medium">{product.weight}g</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Kategori</span>
                    <span className="font-medium capitalize">{product.category.replace("-", " ")}</span>
                  </div>
                </div>

                {/* Sustainability Info */}
                <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <LeafIcon className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Selamatkan {product.foodWasteSaved} kg Food Waste</p>
                    <p className="text-sm text-muted-foreground">
                      Dengan membeli produk ini, Anda berkontribusi mengurangi sampah makanan
                    </p>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Jumlah:</span>
                    <div className="flex items-center rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <MinusIcon className="size-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                    <CartIcon className="size-5" />
                    Tambah ke Keranjang
                  </Button>
                </div>

                {/* Store Location */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="mb-2 font-semibold">Lokasi Toko</h4>
                    <p className="mb-2 text-sm text-muted-foreground">{product.store.location}</p>
                    <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                      <img src="/map-location-jakarta.jpg" alt="Map" className="size-full object-cover" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-xl font-bold">Produk Serupa</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedProducts.map(relatedProduct => (
                    <Link key={relatedProduct.id} href={`/marketplace/${relatedProduct.id}`}>
                      <Card className="group overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={relatedProduct.image || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground">
                            -{relatedProduct.discountPercentage}%
                          </Badge>
                        </div>
                        <CardContent className="p-3">
                          <h4 className="line-clamp-1 text-sm font-medium">{relatedProduct.name}</h4>
                          <p className="text-sm font-bold text-primary">
                            {formatPrice(relatedProduct.discountedPrice)}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
