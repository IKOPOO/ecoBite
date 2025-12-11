"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, Ban, CheckCircle, Package, AlertTriangle, Flag } from "lucide-react"

interface Product {
  id: string
  name: string
  seller: string
  category: string
  originalPrice: number
  discountPrice: number
  stock: number
  expiry: string
  status: "active" | "suspended" | "flagged"
  reports: number
}

const initialProducts: Product[] = [
  {
    id: "P-001",
    name: "Croissant Butter",
    seller: "Toko Roti Makmur",
    category: "Roti & Pastry",
    originalPrice: 25000,
    discountPrice: 15000,
    stock: 12,
    expiry: "2024-01-15 18:00",
    status: "active",
    reports: 0,
  },
  {
    id: "P-002",
    name: "Nasi Goreng Spesial",
    seller: "Warung Padang Sederhana",
    category: "Makanan Berat",
    originalPrice: 30000,
    discountPrice: 18000,
    stock: 8,
    expiry: "2024-01-15 20:00",
    status: "active",
    reports: 0,
  },
  {
    id: "P-003",
    name: "Sayur Mix Segar",
    seller: "Fresh Mart",
    category: "Sayur & Buah",
    originalPrice: 35000,
    discountPrice: 20000,
    stock: 15,
    expiry: "2024-01-16 12:00",
    status: "flagged",
    reports: 3,
  },
  {
    id: "P-004",
    name: "Donat Coklat",
    seller: "Toko Roti Makmur",
    category: "Kue & Dessert",
    originalPrice: 12000,
    discountPrice: 7000,
    stock: 20,
    expiry: "2024-01-15 17:00",
    status: "active",
    reports: 0,
  },
  {
    id: "P-005",
    name: "Bento Box",
    seller: "Cafe Kopi Nusantara",
    category: "Makanan Berat",
    originalPrice: 45000,
    discountPrice: 25000,
    stock: 0,
    expiry: "2024-01-15 19:00",
    status: "suspended",
    reports: 5,
  },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const updateProductStatus = (productId: string, newStatus: "active" | "suspended") => {
    setProducts(products.map((product) => (product.id === productId ? { ...product, status: newStatus } : product)))
    if (selectedProduct?.id === productId) {
      setSelectedProduct({ ...selectedProduct, status: newStatus })
    }
  }

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    flagged: products.filter((p) => p.status === "flagged").length,
    suspended: products.filter((p) => p.status === "suspended").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Manajemen Produk</h1>
        <p className="text-muted-foreground">Monitor dan kelola semua produk di platform</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Produk</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-sm text-muted-foreground">Produk Aktif</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <Flag className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.flagged}</p>
              <p className="text-sm text-muted-foreground">Dilaporkan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <Ban className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.suspended}</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari produk atau penjual..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Roti & Pastry">Roti & Pastry</SelectItem>
                <SelectItem value="Makanan Berat">Makanan Berat</SelectItem>
                <SelectItem value="Kue & Dessert">Kue & Dessert</SelectItem>
                <SelectItem value="Sayur & Buah">Sayur & Buah</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="flagged">Dilaporkan</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>Penjual</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-100" />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.seller}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-muted-foreground line-through">
                          {formatRupiah(product.originalPrice)}
                        </p>
                        <p className="font-medium text-primary">{formatRupiah(product.discountPrice)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : product.status === "flagged"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {product.status === "active"
                            ? "Aktif"
                            : product.status === "flagged"
                              ? "Dilaporkan"
                              : "Suspended"}
                        </Badge>
                        {product.reports > 0 && (
                          <Badge variant="outline" className="text-orange-600">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            {product.reports}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedProduct(product)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                          {product.status !== "suspended" ? (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => updateProductStatus(product.id, "suspended")}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => updateProductStatus(product.id, "active")}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Aktifkan
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Produk</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-xl bg-slate-100" />
                <div>
                  <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                  <p className="text-muted-foreground">{selectedProduct.seller}</p>
                </div>
              </div>

              <div className="grid gap-4 rounded-lg bg-slate-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ID Produk</p>
                    <p className="font-medium">{selectedProduct.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kategori</p>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Harga Normal</p>
                    <p className="font-medium">{formatRupiah(selectedProduct.originalPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Harga Diskon</p>
                    <p className="font-medium text-primary">{formatRupiah(selectedProduct.discountPrice)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stok</p>
                    <p className="font-medium">{selectedProduct.stock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kadaluarsa</p>
                    <p className="font-medium">{selectedProduct.expiry}</p>
                  </div>
                </div>
              </div>

              {selectedProduct.reports > 0 && (
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">{selectedProduct.reports} Laporan</span>
                  </div>
                  <p className="mt-1 text-sm text-orange-600">Produk ini telah dilaporkan oleh pengguna</p>
                </div>
              )}

              <div className="flex gap-2">
                {selectedProduct.status !== "suspended" ? (
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => updateProductStatus(selectedProduct.id, "suspended")}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Suspend Produk
                  </Button>
                ) : (
                  <Button className="flex-1" onClick={() => updateProductStatus(selectedProduct.id, "active")}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Aktifkan Produk
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
