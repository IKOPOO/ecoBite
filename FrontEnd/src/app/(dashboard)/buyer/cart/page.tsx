"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon, ChevronRightIcon, LeafIcon } from "@/components/shared/icons"
import { useCart } from "@/providers/cart-provider"
import { formatPrice } from "@/lib/data"

export default function CartPage() {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart()

  const totalFoodWasteSaved = items.reduce((acc, item) => acc + item.product.foodWasteSaved * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header variant="marketplace" />
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBagIcon className="size-10 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Keranjang Kosong</h1>
            <p className="mb-6 text-muted-foreground">Belum ada produk di keranjang Anda</p>
            <Link href="/marketplace">
              <Button className="gap-2">
                Mulai Belanja
                <ChevronRightIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="marketplace" />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/marketplace" className="hover:text-foreground">
              Marketplace
            </Link>
            <ChevronRightIcon className="size-4" />
            <span className="text-foreground">Keranjang</span>
          </nav>

          <h1 className="mb-8 text-2xl font-bold md:text-3xl">Keranjang Belanja</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map(item => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link href={`/marketplace/${item.product.id}`} className="shrink-0">
                          <div className="size-24 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              className="size-full object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link href={`/marketplace/${item.product.id}`}>
                              <h3 className="font-semibold hover:text-primary">{item.product.name}</h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.product.store.name}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center rounded-lg border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <MinusIcon className="size-4" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                <PlusIcon className="size-4" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                {formatPrice(item.product.discountedPrice * item.quantity)}
                              </p>
                              <p className="text-xs text-muted-foreground line-through">
                                {formatPrice(item.product.originalPrice * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <TrashIcon className="size-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Item</span>
                    <span>{totalItems} item</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  {/* Sustainability Info */}
                  <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3">
                    <LeafIcon className="size-5 text-primary" />
                    <span className="text-sm">
                      Anda akan menyelamatkan{" "}
                      <strong className="text-primary">{totalFoodWasteSaved.toFixed(1)} kg</strong> food waste
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" onClick={() => router.push("/buyer/checkout")}>
                    Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
