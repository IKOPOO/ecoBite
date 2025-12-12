import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, TrendingUp, Leaf, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Penjualan",
    value: "Rp 2.450.000",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Produk Aktif",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Pesanan Baru",
    value: "8",
    change: "Perlu diproses",
    trend: "neutral",
    icon: ShoppingCart,
  },
  {
    title: "Makanan Diselamatkan",
    value: "156 kg",
    change: "+23 kg minggu ini",
    trend: "up",
    icon: Leaf,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Ahmad Rizky",
    items: "Croissant x3, Roti Gandum x2",
    total: 45000,
    status: "pending",
    time: "5 menit lalu",
  },
  {
    id: "ORD-002",
    customer: "Siti Nurhaliza",
    items: "Donat Coklat x6",
    total: 30000,
    status: "processing",
    time: "15 menit lalu",
  },
  {
    id: "ORD-003",
    customer: "Budi Santoso",
    items: "Roti Tawar x2, Baguette x1",
    total: 52000,
    status: "ready",
    time: "30 menit lalu",
  },
  {
    id: "ORD-004",
    customer: "Dewi Lestari",
    items: "Cake Slice x4",
    total: 80000,
    status: "completed",
    time: "1 jam lalu",
  },
]

const expiringProducts = [
  { name: "Croissant Butter", stock: 12, expiry: "2 jam lagi" },
  { name: "Roti Gandum", stock: 8, expiry: "4 jam lagi" },
  { name: "Donat Glaze", stock: 15, expiry: "6 jam lagi" },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    ready: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
  }
  const labels: Record<string, string> = {
    pending: "Menunggu",
    processing: "Diproses",
    ready: "Siap Diambil",
    completed: "Selesai",
  }
  return <Badge className={styles[status]}>{labels[status]}</Badge>
}

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali, Toko Roti Makmur</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                {stat.trend === "up" && (
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    {stat.change}
                  </div>
                )}
                {stat.trend === "down" && (
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowDownRight className="h-4 w-4" />
                    {stat.change}
                  </div>
                )}
                {stat.trend === "neutral" && <span className="text-sm text-muted-foreground">{stat.change}</span>}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pesanan Terbaru</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/seller/orders">Lihat Semua</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-sm">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatRupiah(order.total)}</p>
                    <p className="text-sm text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Products Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Produk Segera Kadaluarsa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Stok: {product.stock}</p>
                  </div>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {product.expiry}
                  </Badge>
                </div>
              ))}
              <Button className="w-full bg-transparent" variant="outline" asChild>
                <Link href="/seller/products">Kelola Produk</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
