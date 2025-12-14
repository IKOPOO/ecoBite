"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ChevronRightIcon,
  PackageIcon,
  ClockIcon,
  CheckIcon,
  StarIcon,
  MapPinIcon,
  ShoppingBagIcon,
} from "@/components/shared/icons"
import { formatPrice, formatDate } from "@/lib/data"

type OrderStatus = "pending" | "processing" | "ready" | "completed"

interface Order {
  id: string
  items: {
    name: string
    quantity: number
    price: number
    image: string
  }[]
  total: number
  status: OrderStatus
  createdAt: string
  storeName: string
  storeLocation: string
  deliveryMethod: "pickup" | "delivery"
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      { name: "Roti Tawar Gandum", quantity: 2, price: 12000, image: "/whole-wheat-bread.png" },
      { name: "Croissant Butter", quantity: 3, price: 10000, image: "/butter-croissant-pastry.jpg" },
    ],
    total: 54000,
    status: "ready",
    createdAt: "2025-12-12",
    storeName: "Bakery Citra",
    storeLocation: "Jl. Sudirman No. 45, Jakarta Pusat",
    deliveryMethod: "pickup",
  },
  {
    id: "ORD-002",
    items: [{ name: "Nasi Padang Komplit", quantity: 1, price: 20000, image: "/nasi-padang-indonesian-food.jpg" }],
    total: 20000,
    status: "processing",
    createdAt: "2025-12-12",
    storeName: "Restoran Padang Sederhana",
    storeLocation: "Jl. Gatot Subroto No. 12, Jakarta Selatan",
    deliveryMethod: "pickup",
  },
  {
    id: "ORD-003",
    items: [
      { name: "Buah Apel Fuji (1kg)", quantity: 2, price: 25000, image: "/fresh-fuji-apples.jpg" },
      { name: "Pisang Cavendish (1kg)", quantity: 1, price: 12000, image: "/ripe-cavendish-bananas.jpg" },
    ],
    total: 62000,
    status: "completed",
    createdAt: "2025-12-10",
    storeName: "Supermarket Fresh",
    storeLocation: "Jl. Thamrin No. 88, Jakarta Pusat",
    deliveryMethod: "delivery",
  },
]

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof ClockIcon }> = {
  pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-800", icon: ClockIcon },
  processing: { label: "Diproses", color: "bg-blue-100 text-blue-800", icon: PackageIcon },
  ready: { label: "Siap Diambil", color: "bg-primary/10 text-primary", icon: CheckIcon },
  completed: { label: "Selesai", color: "bg-muted text-muted-foreground", icon: CheckIcon },
}

function OrdersContent() {
  const searchParams = useSearchParams()
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccessDialog(true)
    }
  }, [searchParams])

  const activeOrders = mockOrders.filter(o => o.status !== "completed")
  const completedOrders = mockOrders.filter(o => o.status === "completed")

  const handleRateOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowRatingDialog(true)
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/marketplace" className="hover:text-foreground">
          Marketplace
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-foreground">Pesanan</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold md:text-3xl">Pesanan Saya</h1>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Aktif ({activeOrders.length})</TabsTrigger>
          <TabsTrigger value="history">Riwayat ({completedOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.length === 0 ? (
            <EmptyState message="Tidak ada pesanan aktif" />
          ) : (
            activeOrders.map(order => <OrderCard key={order.id} order={order} onRate={handleRateOrder} />)
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {completedOrders.length === 0 ? (
            <EmptyState message="Belum ada riwayat pesanan" />
          ) : (
            completedOrders.map(order => <OrderCard key={order.id} order={order} onRate={handleRateOrder} />)
          )}
        </TabsContent>
      </Tabs>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckIcon className="size-8 text-primary" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-center">Pesanan Berhasil!</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Pesanan Anda telah diterima dan sedang diproses oleh penjual.</p>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setShowSuccessDialog(false)}>Lihat Pesanan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Beri Rating & Ulasan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={() => setRating(star)} className="p-1">
                    <StarIcon
                      className={`size-8 ${star <= rating ? "text-yellow-500" : "text-muted"}`}
                      filled={star <= rating}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="review">Ulasan (opsional)</Label>
              <Textarea id="review" placeholder="Bagikan pengalaman Anda..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRatingDialog(false)} className="bg-transparent">
              Batal
            </Button>
            <Button onClick={() => setShowRatingDialog(false)}>Kirim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function OrderCard({ order, onRate }: { order: Order; onRate: (order: Order) => void }) {
  const status = statusConfig[order.status]
  const StatusIcon = status.icon

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-medium">{order.id}</span>
            <Badge className={status.color}>
              <StatusIcon className="mr-1 size-3" />
              {status.label}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</span>
        </div>

        {/* Store Info */}
        <div className="mb-4 flex items-start gap-3 rounded-lg bg-muted/50 p-3">
          <MapPinIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-medium">{order.storeName}</p>
            <p className="text-sm text-muted-foreground">{order.storeLocation}</p>
            <p className="mt-1 text-xs text-primary">
              {order.deliveryMethod === "pickup" ? "Ambil Sendiri" : "Delivery"}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-4 space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="size-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">x{item.quantity}</p>
              </div>
              <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
          <div>
            <span className="text-sm text-muted-foreground">Total: </span>
            <span className="font-semibold text-primary">{formatPrice(order.total)}</span>
          </div>
          <div className="flex gap-2">
            {order.status === "completed" && (
              <Button variant="outline" size="sm" onClick={() => onRate(order)} className="bg-transparent">
                <StarIcon className="mr-1 size-4" />
                Beri Rating
              </Button>
            )}
            <Button variant="outline" size="sm" className="bg-transparent">
              Detail
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
        <ShoppingBagIcon className="size-8 text-muted-foreground" />
      </div>
      <p className="mb-4 text-muted-foreground">{message}</p>
      <Link href="/marketplace">
        <Button>Mulai Belanja</Button>
      </Link>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="marketplace" />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div>Loading...</div>}>
            <OrdersContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
