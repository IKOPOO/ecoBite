"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

const initialProducts = [
  {
    id: "1",
    name: "Croissant Butter",
    category: "Roti & Pastry",
    originalPrice: 25000,
    discountPrice: 15000,
    stock: 12,
    expiry: "2024-01-15 18:00",
    status: "active",
  },
  {
    id: "2",
    name: "Roti Gandum",
    category: "Roti & Pastry",
    originalPrice: 18000,
    discountPrice: 10000,
    stock: 8,
    expiry: "2024-01-15 20:00",
    status: "active",
  },
  {
    id: "3",
    name: "Donat Coklat",
    category: "Kue & Dessert",
    originalPrice: 12000,
    discountPrice: 7000,
    stock: 0,
    expiry: "2024-01-15 17:00",
    status: "sold_out",
  },
  {
    id: "4",
    name: "Cake Red Velvet Slice",
    category: "Kue & Dessert",
    originalPrice: 35000,
    discountPrice: 20000,
    stock: 5,
    expiry: "2024-01-16 12:00",
    status: "active",
  },
  {
    id: "5",
    name: "Baguette",
    category: "Roti & Pastry",
    originalPrice: 22000,
    discountPrice: 12000,
    stock: 3,
    expiry: "2024-01-15 19:00",
    status: "low_stock",
  },
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
    active: "bg-green-100 text-green-800",
    sold_out: "bg-red-100 text-red-800",
    low_stock: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-800",
  }
  const labels: Record<string, string> = {
    active: "Aktif",
    sold_out: "Habis",
    low_stock: "Stok Rendah",
    inactive: "Nonaktif",
  }
  return <Badge className={styles[status]}>{labels[status]}</Badge>
}

export default function SellerProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    expiry: "",
    description: "",
  })

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddProduct = () => {
    const product = {
      id: String(products.length + 1),
      name: newProduct.name,
      category: newProduct.category,
      originalPrice: Number(newProduct.originalPrice),
      discountPrice: Number(newProduct.discountPrice),
      stock: Number(newProduct.stock),
      expiry: newProduct.expiry,
      status: "active",
    }
    setProducts([...products, product])
    setNewProduct({
      name: "",
      category: "",
      originalPrice: "",
      discountPrice: "",
      stock: "",
      expiry: "",
      description: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Produk</h1>
          <p className="text-muted-foreground">Kelola produk makanan yang tersedia di toko Anda</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Contoh: Croissant Butter"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Roti & Pastry">Roti & Pastry</SelectItem>
                    <SelectItem value="Kue & Dessert">Kue & Dessert</SelectItem>
                    <SelectItem value="Makanan Berat">Makanan Berat</SelectItem>
                    <SelectItem value="Minuman">Minuman</SelectItem>
                    <SelectItem value="Sayur & Buah">Sayur & Buah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="originalPrice">Harga Normal</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        originalPrice: e.target.value,
                      })
                    }
                    placeholder="25000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discountPrice">Harga Diskon</Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    value={newProduct.discountPrice}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        discountPrice: e.target.value,
                      })
                    }
                    placeholder="15000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stok</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Waktu Kadaluarsa</Label>
                  <Input
                    id="expiry"
                    type="datetime-local"
                    value={newProduct.expiry}
                    onChange={(e) => setNewProduct({ ...newProduct, expiry: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Deskripsi produk..."
                  rows={3}
                />
              </div>
              <Button onClick={handleAddProduct} className="mt-2">
                Simpan Produk
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="sold_out">Habis</SelectItem>
                <SelectItem value="low_stock">Stok Rendah</SelectItem>
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
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga Normal</TableHead>
                  <TableHead>Harga Diskon</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Kadaluarsa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-muted-foreground line-through">
                      {formatRupiah(product.originalPrice)}
                    </TableCell>
                    <TableCell className="font-medium text-primary">{formatRupiah(product.discountPrice)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.expiry}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
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
    </div>
  )
}
