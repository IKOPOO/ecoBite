import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Store, ShoppingCart, Leaf, DollarSign } from "lucide-react"

const monthlyData = [
  { month: "Jan", users: 1200, sellers: 45, transactions: 3400, revenue: 68000000 },
  { month: "Feb", users: 1450, sellers: 52, transactions: 4100, revenue: 82000000 },
  { month: "Mar", users: 1680, sellers: 58, transactions: 4800, revenue: 96000000 },
  { month: "Apr", users: 1920, sellers: 65, transactions: 5200, revenue: 104000000 },
  { month: "May", users: 2150, sellers: 72, transactions: 5800, revenue: 116000000 },
  { month: "Jun", users: 2400, sellers: 80, transactions: 6500, revenue: 130000000 },
]

const topSellers = [
  { name: "Fresh Mart", sales: 5680000, products: 45 },
  { name: "Toko Roti Makmur", sales: 2450000, products: 24 },
  { name: "Warung Padang Sederhana", sales: 1890000, products: 18 },
  { name: "Bakery House", sales: 1450000, products: 15 },
  { name: "Cafe Kopi Nusantara", sales: 980000, products: 12 },
]

const categoryDistribution = [
  { category: "Roti & Pastry", percentage: 35, color: "bg-blue-500" },
  { category: "Makanan Berat", percentage: 28, color: "bg-green-500" },
  { category: "Kue & Dessert", percentage: 18, color: "bg-purple-500" },
  { category: "Sayur & Buah", percentage: 12, color: "bg-orange-500" },
  { category: "Minuman", percentage: 7, color: "bg-pink-500" },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    notation: "compact",
  }).format(amount)
}

export default function AdminAnalyticsPage() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Analitik Platform</h1>
        <p className="text-muted-foreground">Pantau performa dan pertumbuhan platform ecoBite</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+18%</Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">12,847</p>
            <p className="text-sm text-muted-foreground">Total Pengguna</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <Store className="h-6 w-6 text-purple-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+12%</Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">342</p>
            <p className="text-sm text-muted-foreground">Penjual Aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+25%</Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">28,450</p>
            <p className="text-sm text-muted-foreground">Total Transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">+22%</Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">Rp 2.4M</p>
            <p className="text-sm text-muted-foreground">Total Pendapatan</p>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Impact */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Dampak Lingkungan Total</h3>
              <p className="text-sm text-green-600">Kontribusi ecoBite terhadap keberlanjutan</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">45,280 kg</p>
              <p className="text-sm text-green-600">Makanan Diselamatkan</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">90,560 kg</p>
              <p className="text-sm text-green-600">CO2 Dikurangi</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">150,933</p>
              <p className="text-sm text-green-600">Porsi Disediakan</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-700">Rp 4.5B</p>
              <p className="text-sm text-green-600">Nilai Diselamatkan</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Pendapatan Bulanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-10 text-sm font-medium">{data.month}</span>
                  <div className="flex-1">
                    <div className="h-8 rounded-lg bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-24 text-right text-sm font-medium">{formatRupiah(data.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Sellers */}
        <Card>
          <CardHeader>
            <CardTitle>Penjual Terbaik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellers.map((seller, index) => (
                <div key={seller.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{seller.name}</p>
                      <p className="text-sm text-muted-foreground">{seller.products} produk</p>
                    </div>
                  </div>
                  <p className="font-medium">{formatRupiah(seller.sales)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribusi Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-8 overflow-hidden rounded-lg">
              {categoryDistribution.map((cat) => (
                <div
                  key={cat.category}
                  className={`${cat.color} transition-all`}
                  style={{ width: `${cat.percentage}%` }}
                />
              ))}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {categoryDistribution.map((cat) => (
                <div key={cat.category} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${cat.color}`} />
                  <div>
                    <p className="text-sm font-medium">{cat.category}</p>
                    <p className="text-xs text-muted-foreground">{cat.percentage}%</p>
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
