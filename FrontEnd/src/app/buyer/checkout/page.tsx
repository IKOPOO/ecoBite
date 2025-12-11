"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRightIcon, MapPinIcon, TruckIcon, PackageIcon, LeafIcon } from "@/components/icons"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/data"

type DeliveryMethod = "pickup" | "delivery"
type PaymentMethod = "qris" | "cod" | "ewallet"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart, totalItems } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris")
  const [couponCode, setCouponCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const deliveryFee = deliveryMethod === "delivery" ? 10000 : 0
  const total = subtotal + deliveryFee
  const totalFoodWasteSaved = items.reduce((acc, item) => acc + item.product.foodWasteSaved * item.quantity, 0)

  if (items.length === 0) {
    router.push("/buyer/cart")
    return null
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 1500))
    clearCart()
    router.push("/buyer/orders?success=true")
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
            <Link href="/buyer/cart" className="hover:text-foreground">
              Keranjang
            </Link>
            <ChevronRightIcon className="size-4" />
            <span className="text-foreground">Checkout</span>
          </nav>

          <h1 className="mb-8 text-2xl font-bold md:text-3xl">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Delivery Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Metode Pengiriman</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={deliveryMethod}
                    onValueChange={(v) => setDeliveryMethod(v as DeliveryMethod)}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <Label
                      htmlFor="pickup"
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                        deliveryMethod === "pickup" ? "border-primary bg-primary/5" : "hover:bg-muted"
                      }`}
                    >
                      <RadioGroupItem value="pickup" id="pickup" />
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <PackageIcon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Ambil Sendiri</p>
                        <p className="text-sm text-muted-foreground">Gratis</p>
                      </div>
                    </Label>
                    <Label
                      htmlFor="delivery"
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                        deliveryMethod === "delivery" ? "border-primary bg-primary/5" : "hover:bg-muted"
                      }`}
                    >
                      <RadioGroupItem value="delivery" id="delivery" />
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                        <TruckIcon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Delivery</p>
                        <p className="text-sm text-muted-foreground">{formatPrice(10000)}</p>
                      </div>
                    </Label>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Address - Show only for delivery */}
              {deliveryMethod === "delivery" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPinIcon className="size-5" />
                      Alamat Pengiriman
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat Lengkap</Label>
                      <Textarea id="address" placeholder="Masukkan alamat lengkap" rows={3} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Catatan (opsional)</Label>
                        <Input id="notes" placeholder="Patokan lokasi, dll" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Metode Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                    className="space-y-3"
                  >
                    {[
                      { value: "qris", label: "QRIS", desc: "Scan QR untuk bayar" },
                      { value: "cod", label: "COD (Cash on Delivery)", desc: "Bayar saat barang diterima" },
                      { value: "ewallet", label: "E-Wallet", desc: "GoPay, OVO, Dana, dll" },
                    ].map((method) => (
                      <Label
                        key={method.value}
                        htmlFor={method.value}
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                          paymentMethod === method.value ? "border-primary bg-primary/5" : "hover:bg-muted"
                        }`}
                      >
                        <RadioGroupItem value={method.value} id={method.value} />
                        <div>
                          <p className="font-medium">{method.label}</p>
                          <p className="text-sm text-muted-foreground">{method.desc}</p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Coupon */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kupon Diskon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Masukkan kode kupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline" className="bg-transparent">
                      Terapkan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="max-h-48 space-y-3 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="line-clamp-1 text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(item.product.discountedPrice * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({totalItems} item)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ongkos Kirim</span>
                      <span>{deliveryFee === 0 ? "Gratis" : formatPrice(deliveryFee)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-lg text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Sustainability Info */}
                  <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3">
                    <LeafIcon className="size-5 text-primary" />
                    <span className="text-sm">
                      Menyelamatkan <strong className="text-primary">{totalFoodWasteSaved.toFixed(1)} kg</strong> food
                      waste
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isLoading}>
                    {isLoading ? "Memproses..." : "Bayar Sekarang"}
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
