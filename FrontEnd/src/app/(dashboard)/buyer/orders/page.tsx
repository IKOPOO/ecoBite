"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layouts/header" // Sesuaikan path
import { Footer } from "@/components/layouts/footer" // Sesuaikan path
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronRight,
  Package,
  Clock,
  CheckCircle2,
  Star,
  MapPin,
  ShoppingBag,
  MessageCircle,
  RefreshCw,
  XCircle,
  Info,
} from "lucide-react"
// Pastikan path import ini benar sesuai struktur foldermu
import { useOrder } from "@/providers/order-provider"

// Format Rupiah Helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Format Tanggal Helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

type OrderStatus = "pending" | "processing" | "ready" | "completed" | "cancelled"

interface OrderItem {
  name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
  storeId: string
  storeName: string
  storeLocation: string
  deliveryMethod: "pickup" | "delivery"
}

// --- MOCK DATA (Data Statis/Bawaan) ---
const mockOrders: Order[] = [
  {
    id: "ORD-20251212-001",
    items: [
      {
        name: "Roti Tawar Gandum",
        quantity: 2,
        price: 12000,
        image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=200",
      },
      {
        name: "Croissant Butter",
        quantity: 3,
        price: 10000,
        image: "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=200",
      },
    ],
    total: 54000,
    status: "ready",
    createdAt: "2025-12-15T08:30:00",
    storeId: "store-1",
    storeName: "Bakery Citra",
    storeLocation: "Jl. Sudirman No. 45, Jakarta Pusat",
    deliveryMethod: "pickup",
  },
  {
    id: "ORD-20251212-002",
    items: [
      {
        name: "Nasi Padang Komplit",
        quantity: 1,
        price: 20000,
        image: "https://images.pexels.com/photos/6646072/pexels-photo-6646072.jpeg?auto=compress&cs=tinysrgb&w=200",
      },
    ],
    total: 20000,
    status: "processing",
    createdAt: "2025-12-15T10:15:00",
    storeId: "store-2",
    storeName: "Restoran Padang Sederhana",
    storeLocation: "Jl. Gatot Subroto No. 12, Jakarta Selatan",
    deliveryMethod: "pickup",
  },
  {
    id: "ORD-20251210-003",
    items: [
      {
        name: "Buah Apel Fuji (1kg)",
        quantity: 2,
        price: 25000,
        image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=200",
      },
    ],
    total: 50000,
    status: "completed",
    createdAt: "2025-12-10T14:20:00",
    storeId: "store-3",
    storeName: "Supermarket Fresh",
    storeLocation: "Jl. Thamrin No. 88, Jakarta Pusat",
    deliveryMethod: "delivery",
  },
]

// Config warna dan label status
const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  pending: { label: "Menunggu Konfirmasi", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  processing: { label: "Sedang Disiapkan", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Package },
  ready: { label: "Siap Diambil", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 },
  completed: { label: "Selesai", color: "bg-gray-100 text-gray-600 border-gray-200", icon: CheckCircle2 },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
}

function OrdersContent() {
  const searchParams = useSearchParams()
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [rating, setRating] = useState(0)

  // 1. Ambil data dinamis dari Provider (LocalStorage)
  const { orders } = useOrder()

  // 2. GABUNGKAN DATA: Data Baru (orders) + Data Mock (mockOrders)
  // 'orders' ditaruh duluan supaya pesanan terbaru muncul paling atas
  const allOrders = [...orders, ...mockOrders]

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccessDialog(true)
    }
  }, [searchParams])

  // 3. Filter berdasarkan 'allOrders' (Gabungan)
  const activeOrders = allOrders.filter(o => ["pending", "processing", "ready"].includes(o.status))
  const historyOrders = allOrders.filter(o => ["completed", "cancelled"].includes(o.status))

  const handleRateOrder = (order: Order) => {
    setSelectedOrder(order)
    setRating(0)
    setShowRatingDialog(true)
  }

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order)
    setShowDetailDialog(true)
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/buyer/marketplace" className="hover:text-foreground">
          Marketplace
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground font-medium">Pesanan Saya</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Pesanan Saya</h1>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="active" className="px-6">
            Berjalan ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="px-6">
            Riwayat ({historyOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 animate-in fade-in-50">
          {activeOrders.length === 0 ? (
            <EmptyState message="Tidak ada pesanan yang sedang berjalan" />
          ) : (
            activeOrders.map((order, index) => (
              // Gunakan index sebagai key fallback jika ID bentrok antara mock & real
              <OrderCard key={order.id + index} order={order} onRate={handleRateOrder} onDetail={handleViewDetail} />
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 animate-in fade-in-50">
          {historyOrders.length === 0 ? (
            <EmptyState message="Belum ada riwayat pesanan" />
          ) : (
            historyOrders.map((order, index) => (
              <OrderCard key={order.id + index} order={order} onRate={handleRateOrder} onDetail={handleViewDetail} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* --- DIALOGS --- */}

      {/* 1. Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="text-center sm:max-w-md">
          <div className="mx-auto mt-4 mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Pesanan Berhasil Dibuat!</DialogTitle>
            <DialogDescription className="text-center">Pesanan Anda telah diteruskan ke penjual.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-4">
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full sm:w-auto">
              Lihat Status Pesanan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Beri Ulasan</DialogTitle>
            <DialogDescription>
              Pengalaman belanja di <span className="font-semibold text-foreground">{selectedOrder?.storeName}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`size-8 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Apa yang kamu suka? (Opsional)</Label>
              <div className="flex flex-wrap gap-2">
                {["Makanan Segar", "Harga Hemat", "Pelayanan Ramah", "Proses Cepat", "Sesuai Foto"].map(tag => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted py-1.5 px-3 font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review">Tulis Ulasan</Label>
              <Textarea id="review" placeholder="Bagikan pendapatmu..." rows={3} className="resize-none" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRatingDialog(false)}>
              Batal
            </Button>
            <Button onClick={() => setShowRatingDialog(false)} disabled={rating === 0}>
              Kirim Ulasan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. Detail Order Dialog (TANPA QR) */}
      {selectedOrder && (
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="sm:max-w-2xl h-[90vh] sm:h-auto overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Detail Pesanan
                <Badge variant="outline" className="font-mono font-normal">
                  #{selectedOrder.id.split("-").pop()}
                </Badge>
              </DialogTitle>
              <DialogDescription>{formatDate(selectedOrder.createdAt)}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4 md:grid-cols-2">
              {/* Kolom Kiri: Info & Status */}
              <div className="space-y-6">
                {/* Instruksi Pengambilan (Pengganti QR) */}
                {selectedOrder.status === "ready" && selectedOrder.deliveryMethod === "pickup" && (
                  <div className="mb-6 flex flex-col items-center justify-center space-y-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 py-8">
                    <div className="flex flex-col items-center gap-1">
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Kode Pengambilan
                      </h4>
                      <p className="text-xs text-muted-foreground">Tunjukkan kode ini kepada penjual</p>
                    </div>

                    {/* KODE BESAR */}
                    <div className="relative rounded-lg border bg-white px-8 py-4 shadow-sm">
                      <div className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-primary/5 border-r border-gray-200"></div>
                      <div className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-primary/5 border-l border-gray-200"></div>

                      <p className="font-mono text-4xl font-black tracking-widest text-primary">
                        {selectedOrder.id.split("-").pop()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] text-muted-foreground border">
                      <Package className="size-3" />
                      <span>Order ID: {selectedOrder.id}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Lokasi Toko</h4>
                  <div className="flex gap-3">
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <MapPin className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedOrder.storeName}</p>
                      <p className="text-xs text-muted-foreground">{selectedOrder.storeLocation}</p>
                      <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                        Lihat di Peta
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Status Pesanan</h4>
                  <div className="border-l-2 border-muted pl-4 space-y-4 ml-2">
                    <div className="relative">
                      <div className="absolute -left-5.25 top-1 size-3 rounded-full bg-primary ring-4 ring-background"></div>
                      <p className="text-sm font-medium">Pesanan Dibuat</p>
                      <p className="text-xs text-muted-foreground">{formatDate(selectedOrder.createdAt)}</p>
                    </div>
                    {selectedOrder.status !== "pending" && (
                      <div className="relative">
                        <div className="absolute -left-5.25 top-1 size-3 rounded-full bg-primary ring-4 ring-background"></div>
                        <p className="text-sm font-medium">Pesanan Diproses</p>
                      </div>
                    )}
                    {selectedOrder.status === "ready" && (
                      <div className="relative">
                        <div className="absolute -left-5.25 top-1 size-3 rounded-full bg-green-500 ring-4 ring-background"></div>
                        <p className="text-sm font-medium text-green-600">Siap Diambil</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Rincian Barang & Harga */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Rincian Barang</h4>
                <ScrollArea className="h-50 w-full rounded-md border p-4">
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="size-12 rounded-md bg-muted overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="size-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} x {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(item.quantity * item.price)}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Biaya Layanan</span>
                    <span>Rp 1.000</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Bayar</span>
                    <span className="text-primary">{formatPrice(selectedOrder.total + 1000)}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Link href={`/buyer/chat/${selectedOrder.storeId}`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="size-4" />
                  Hubungi Penjual
                </Button>
              </Link>
              {selectedOrder.status === "completed" && (
                <Button className="w-full sm:w-auto gap-2">
                  <RefreshCw className="size-4" />
                  Beli Lagi
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

function OrderCard({
  order,
  onRate,
  onDetail,
}: {
  order: Order
  onRate: (order: Order) => void
  onDetail: (order: Order) => void
}) {
  const status = statusConfig[order.status]
  const StatusIcon = status.icon

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-muted/60">
      <CardHeader className="bg-muted/30 p-4 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-background text-xs font-normal text-muted-foreground">
              {order.deliveryMethod === "pickup" ? "Ambil Sendiri" : "Delivery"}
            </Badge>
            <span className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</span>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.color}`}
          >
            <StatusIcon className="size-3.5" />
            {status.label}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="size-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm">{order.storeName}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="mr-1 size-3" />
              <span className="line-clamp-1">{order.storeLocation}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted border">
            {/* Handle image if array is empty (safety check) */}
            {order.items.length > 0 ? (
              <img src={order.items[0].image} alt={order.items[0].name} className="size-full object-cover" />
            ) : (
              <div className="size-full flex items-center justify-center bg-gray-100 text-xs">No Img</div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="font-medium text-sm line-clamp-1">{order.items[0]?.name || "Item"}</p>
            <p className="text-xs text-muted-foreground">
              {order.items[0]?.quantity || 0} barang
              {order.items.length > 1 && ` • +${order.items.length - 1} barang lainnya`}
            </p>
            <p className="text-sm font-semibold text-primary">{formatPrice(order.total)}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-end gap-2 border-t bg-muted/10 p-3">
        <Button variant="ghost" size="sm" onClick={() => onDetail(order)}>
          Lihat Detail
        </Button>

        {order.status === "completed" && (
          <Button variant="outline" size="sm" onClick={() => onRate(order)} className="gap-1">
            <Star className="size-3.5" />
            Beri Ulasan
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl bg-muted/20">
      <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
        <Package className="size-10 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-semibold">Belum Ada Pesanan</h3>
      <p className="mb-6 text-sm text-muted-foreground max-w-xs">{message}</p>
      <Link href="/buyer/marketplace">
        <Button>Mulai Belanja Hemat</Button>
      </Link>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header variant="marketplace" />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <Suspense fallback={<div>Loading...</div>}>
            <OrdersContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
