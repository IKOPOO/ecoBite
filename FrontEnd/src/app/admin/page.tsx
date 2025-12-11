import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Store, Package, ShoppingCart, Leaf, ArrowUpRight, AlertTriangle } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Pengguna",
    value: "12,847",
    change: "+523 bulan ini",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Penjual Aktif",
    value: "342",
    change: "+28 bulan ini",
    icon: Store,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Produk Terdaftar",
    value: "4,521",
    change: "+156 minggu ini",
    icon: Package,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Total Transaksi",
    value: "Rp 2.4M",
    change: "+18% dari bulan lalu",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-600",
  },
]

const pendingVerifications = [
  { id: "S-001", name: "Warung Padang Sederhana", type: "Restaurant", date: "2024-01-15" },
  { id: "S-002", name: "Bakery House", type: "Bakery", date: "2024-01-14" },
  { id: "S-003", name: "Fresh Mart", type: "Grocery", date: "2024-01-14" },
]

const recentTransactions = [
  { id: "TRX-001", buyer: "Ahmad", seller: "Toko Roti", amount: 65000, status: "completed" },
  { id: "TRX-002", buyer: "Siti", seller: "Warung Padang", amount: 45000, status: "processing" },
  { id: "TRX-003", buyer: "Budi", seller: "Fresh Mart", amount: 120000, status: "completed" },
  { id: "TRX-004", buyer: "Dewi", seller: "Bakery House", amount: 35000, status: "pending" },
]

const reportedIssues = [
  { id: "RPT-001", type: "Product", description: "Produk tidak sesuai deskripsi", status: "open" },
  { id: "RPT-002", type: "Seller", description: "Toko tidak responsif", status: "investigating" },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard Admin</h1>
        <p className="text-muted-foreground">Selamat datang di panel administrasi ecoBite</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-1 text-xs text-green-600">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sustainability Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Dampak Lingkungan Bulan Ini</h3>
              <p className="text-sm text-green-600">
                ecoBite telah membantu menyelamatkan makanan dan mengurangi limbah
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">8,542 kg</p>
              <p className="text-sm text-green-600">Makanan Diselamatkan</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">17,084 kg</p>
              <p className="text-sm text-green-600">CO2 Dikurangi</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">28,473</p>
              <p className="text-sm text-green-600">Porsi Disediakan</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">Rp 854M</p>
              <p className="text-sm text-green-600">Nilai Diselamatkan</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Verifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Verifikasi Penjual Pending</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/sellers">Lihat Semua</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((seller) => (
                <div key={seller.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-100" />
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">{seller.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{seller.date}</span>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transaksi Terbaru</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">Lihat Semua</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{tx.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {tx.buyer} - {tx.seller}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatRupiah(tx.amount)}</p>
                    <Badge
                      className={
                        tx.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : tx.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {tx.status === "completed" ? "Selesai" : tx.status === "processing" ? "Diproses" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reported Issues */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Laporan yang Perlu Ditinjau
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{issue.id}</span>
                      <Badge variant="outline">{issue.type}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{issue.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={issue.status === "open" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {issue.status === "open" ? "Open" : "Investigating"}
                    </Badge>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Tinjau
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
