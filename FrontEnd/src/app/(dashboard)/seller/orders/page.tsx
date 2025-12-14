"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Phone, MapPin, Clock, Package, CheckCircle, XCircle } from "lucide-react"

type OrderStatus = "pending" | "confirmed" | "processing" | "ready" | "completed" | "cancelled"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customer: string
  phone: string
  address: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  deliveryMethod: "pickup" | "delivery"
  createdAt: string
  notes?: string
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Ahmad Rizky",
    phone: "081234567890",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    items: [
      { name: "Croissant Butter", quantity: 3, price: 15000 },
      { name: "Roti Gandum", quantity: 2, price: 10000 },
    ],
    total: 65000,
    status: "pending",
    deliveryMethod: "pickup",
    createdAt: "2024-01-15 10:30",
    notes: "Tolong pisahkan kemasannya",
  },
  {
    id: "ORD-002",
    customer: "Siti Nurhaliza",
    phone: "082345678901",
    address: "Jl. Gatot Subroto No. 456, Jakarta Pusat",
    items: [{ name: "Donat Coklat", quantity: 6, price: 7000 }],
    total: 42000,
    status: "confirmed",
    deliveryMethod: "delivery",
    createdAt: "2024-01-15 10:15",
  },
  {
    id: "ORD-003",
    customer: "Budi Santoso",
    phone: "083456789012",
    address: "Jl. Thamrin No. 789, Jakarta Pusat",
    items: [
      { name: "Roti Tawar", quantity: 2, price: 12000 },
      { name: "Baguette", quantity: 1, price: 12000 },
    ],
    total: 36000,
    status: "processing",
    deliveryMethod: "pickup",
    createdAt: "2024-01-15 09:45",
  },
  {
    id: "ORD-004",
    customer: "Dewi Lestari",
    phone: "084567890123",
    address: "Jl. Kuningan No. 321, Jakarta Selatan",
    items: [{ name: "Cake Red Velvet Slice", quantity: 4, price: 20000 }],
    total: 80000,
    status: "ready",
    deliveryMethod: "pickup",
    createdAt: "2024-01-15 09:00",
  },
  {
    id: "ORD-005",
    customer: "Eko Prasetyo",
    phone: "085678901234",
    address: "Jl. Rasuna Said No. 654, Jakarta Selatan",
    items: [
      { name: "Croissant Butter", quantity: 5, price: 15000 },
      { name: "Donat Coklat", quantity: 3, price: 7000 },
    ],
    total: 96000,
    status: "completed",
    deliveryMethod: "delivery",
    createdAt: "2024-01-14 16:30",
  },
  {
    id: "ORD-006",
    customer: "Fitri Handayani",
    phone: "086789012345",
    address: "Jl. Casablanca No. 987, Jakarta Selatan",
    items: [{ name: "Roti Gandum", quantity: 4, price: 10000 }],
    total: 40000,
    status: "cancelled",
    deliveryMethod: "pickup",
    createdAt: "2024-01-14 15:00",
    notes: "Pembeli membatalkan karena perubahan jadwal",
  },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

const statusConfig: Record<OrderStatus, { label: string; color: string; next?: OrderStatus; nextLabel?: string }> = {
  pending: {
    label: "Menunggu",
    color: "bg-yellow-100 text-yellow-800",
    next: "confirmed",
    nextLabel: "Konfirmasi",
  },
  confirmed: {
    label: "Dikonfirmasi",
    color: "bg-blue-100 text-blue-800",
    next: "processing",
    nextLabel: "Proses",
  },
  processing: {
    label: "Diproses",
    color: "bg-indigo-100 text-indigo-800",
    next: "ready",
    nextLabel: "Siap Diambil",
  },
  ready: {
    label: "Siap Diambil",
    color: "bg-purple-100 text-purple-800",
    next: "completed",
    nextLabel: "Selesai",
  },
  completed: { label: "Selesai", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-800" },
}

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && !["completed", "cancelled"].includes(order.status)) ||
      order.status === activeTab
    return matchesSearch && matchesTab
  })

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const orderCounts = {
    all: orders.length,
    active: orders.filter((o) => !["completed", "cancelled"].includes(o.status)).length,
    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Pesanan</h1>
        <p className="text-muted-foreground">Kelola pesanan dari pembeli Anda</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{orderCounts.all}</p>
            <p className="text-sm text-muted-foreground">Total Pesanan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{orderCounts.pending}</p>
            <p className="text-sm text-muted-foreground">Menunggu</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{orderCounts.active}</p>
            <p className="text-sm text-muted-foreground">Aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{orderCounts.completed}</p>
            <p className="text-sm text-muted-foreground">Selesai</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari pesanan atau nama pembeli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="active">Aktif</TabsTrigger>
          <TabsTrigger value="pending">Menunggu</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">Tidak ada pesanan ditemukan</p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => setSelectedOrder(order)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{order.id}</span>
                          <Badge className={statusConfig[order.status].color}>{statusConfig[order.status].label}</Badge>
                          <Badge variant="outline">
                            {order.deliveryMethod === "pickup" ? "Ambil Sendiri" : "Delivery"}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <p className="text-lg font-bold">{formatRupiah(order.total)}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {order.createdAt}
                        </div>
                      </div>
                    </div>
                    {statusConfig[order.status].next && (
                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateOrderStatus(order.id, statusConfig[order.status].next!)
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {statusConfig[order.status].nextLabel}
                        </Button>
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50 bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              updateOrderStatus(order.id, "cancelled")
                            }}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Tolak
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Pesanan {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Badge className={statusConfig[selectedOrder.status].color}>
                  {statusConfig[selectedOrder.status].label}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedOrder.createdAt}</span>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 rounded-lg bg-muted p-4">
                <h4 className="font-medium">Informasi Pembeli</h4>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {selectedOrder.phone}
                  </div>
                  {selectedOrder.deliveryMethod === "delivery" && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      {selectedOrder.address}
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                <h4 className="font-medium">Item Pesanan</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatRupiah(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="space-y-2 rounded-lg bg-yellow-50 p-4">
                  <h4 className="font-medium text-yellow-800">Catatan</h4>
                  <p className="text-sm text-yellow-700">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">{formatRupiah(selectedOrder.total)}</span>
              </div>

              {/* Actions */}
              {statusConfig[selectedOrder.status].next && (
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => updateOrderStatus(selectedOrder.id, statusConfig[selectedOrder.status].next!)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {statusConfig[selectedOrder.status].nextLabel}
                  </Button>
                  {selectedOrder.status === "pending" && (
                    <Button
                      variant="outline"
                      className="flex-1 text-red-600 hover:bg-red-50 bg-transparent"
                      onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Tolak Pesanan
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
