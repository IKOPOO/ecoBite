import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Package, ShoppingCart, Leaf, DollarSign } from "lucide-react"

const weeklyData = [
  { day: "Sen", sales: 320000, orders: 12 },
  { day: "Sel", sales: 450000, orders: 18 },
  { day: "Rab", sales: 280000, orders: 10 },
  { day: "Kam", sales: 520000, orders: 22 },
  { day: "Jum", sales: 680000, orders: 28 },
  { day: "Sab", sales: 890000, orders: 35 },
  { day: "Min", sales: 750000, orders: 30 },
]

const topProducts = [
  { name: "Croissant Butter", sold: 45, revenue: 675000 },
  { name: "Roti Gandum", sold: 38, revenue: 380000 },
  { name: "Cake Red Velvet", sold: 25, revenue: 500000 },
  { name: "Donat Coklat", sold: 52, revenue: 364000 },
  { name: "Baguette", sold: 20, revenue: 240000 },
]

const sustainabilityStats = {
  foodSaved: 156,
  co2Reduced: 312,
  mealsProvided: 520,
  wasteReduction: 78,
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function SellerAnalyticsPage() {
  const maxSales = Math.max(...weeklyData.map((d) => d.sales))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Analitik</h1>
        <p className="text-muted-foreground">Pantau performa penjualan dan dampak lingkungan toko Anda</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="mr-1 h-3 w-3" />
                +15%
              </Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">Rp 3.890.000</p>
            <p className="text-sm text-muted-foreground">Total Minggu Ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="mr-1 h-3 w-3" />
                +8%
              </Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">155</p>
            <p className="text-sm text-muted-foreground">Pesanan Minggu Ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <Badge className="bg-red-100 text-red-800">
                <TrendingDown className="mr-1 h-3 w-3" />
                -3%
              </Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">Rp 25.100</p>
            <p className="text-sm text-muted-foreground">Rata-rata Pesanan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="mr-1 h-3 w-3" />
                +23%
              </Badge>
            </div>
            <p className="mt-4 text-2xl font-bold">156 kg</p>
            <p className="text-sm text-muted-foreground">Makanan Diselamatkan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Penjualan Mingguan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((data) => (
                <div key={data.day} className="flex items-center gap-4">
                  <span className="w-10 text-sm text-muted-foreground">{data.day}</span>
                  <div className="flex-1">
                    <div className="h-8 rounded-lg bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(data.sales / maxSales) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-28 text-right text-sm font-medium">{formatRupiah(data.sales)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sold} terjual</p>
                    </div>
                  </div>
                  <p className="font-medium">{formatRupiah(product.revenue)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Dampak Keberlanjutan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-green-50 p-6 text-center">
              <p className="text-3xl font-bold text-green-700">{sustainabilityStats.foodSaved} kg</p>
              <p className="mt-2 text-sm text-green-600">Makanan Diselamatkan</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-6 text-center">
              <p className="text-3xl font-bold text-blue-700">{sustainabilityStats.co2Reduced} kg</p>
              <p className="mt-2 text-sm text-blue-600">CO2 Dikurangi</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 text-center">
              <p className="text-3xl font-bold text-purple-700">{sustainabilityStats.mealsProvided}</p>
              <p className="mt-2 text-sm text-purple-600">Porsi Disediakan</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-6 text-center">
              <p className="text-3xl font-bold text-orange-700">{sustainabilityStats.wasteReduction}%</p>
              <p className="mt-2 text-sm text-orange-600">Pengurangan Limbah</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
