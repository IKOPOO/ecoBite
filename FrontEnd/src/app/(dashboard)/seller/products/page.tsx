"use client"

import { useState, useRef } from "react"
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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Loader2, CheckCircle, XCircle, AlertTriangle, Upload, Camera } from "lucide-react"

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

interface VerificationResult {
  safety_status: "Lolos" | "Tolak"
  reason: string
  confidence_score: number
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

  // Verification & Camera State
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)

  // Camera Refs & State
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    try {
      setIsCameraOpen(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setIsCameraOpen(false)
      alert("Gagal mengakses kamera. Pastikan izin kamera diberikan.")
    }
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsCameraOpen(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas size to match video dimension
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg')
        setImagePreview(dataUrl)
        setVerificationResult(null)
        stopCamera()
      }
    }
  }

  const handleRetake = () => {
    setImagePreview(null)
    setVerificationResult(null)
    startCamera()
  }

  const handleVerifyProduct = async () => {
    if (!imagePreview) return

    setIsVerifying(true)
    try {
      const response = await fetch("/api/verify-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imagePreview,
          name: newProduct.name,
          description: newProduct.description,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setVerificationResult(data)
      } else {
        console.error("Verification failed:", data)
        alert("Gagal memverifikasi produk: " + (data.error || "Unknown error"))
      }
    } catch (error) {
      console.error("Error verifying product:", error)
      alert("Terjadi kesalahan saat memverifikasi produk")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleAddProduct = () => {
    if (verificationResult?.safety_status === "Tolak") {
      alert("Produk tidak dapat ditambahkan karena tidak lolos verifikasi: " + verificationResult.reason)
      return
    }

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
    setImagePreview(null)
    setVerificationResult(null)
    setImagePreview(null)
    setVerificationResult(null)
    // Removed legacy fileInputRef usage
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
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Image Upload Section */}
              <div className="grid gap-2">
                <Label>Foto Produk</Label>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {!isCameraOpen && !imagePreview && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-32 border-dashed border-2 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                        onClick={startCamera}
                      >
                        <Camera className="h-8 w-8 text-muted-foreground" />
                        <span className="text-muted-foreground font-medium">Buka Kamera</span>
                      </Button>
                    )}

                    {isCameraOpen && (
                      <div className="relative w-full overflow-hidden rounded-lg bg-black">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-auto object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={stopCamera}
                          >
                            Batal
                          </Button>
                          <Button
                            type="button"
                            onClick={capturePhoto}
                            className="bg-white text-black hover:bg-gray-200"
                          >
                            Ambil Foto
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {imagePreview && (
                    <div className="flex items-center justify-between rounded-lg border p-3 bg-muted/50">
                      <div className="flex items-center gap-2">
                        {isVerifying ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            <span className="text-sm font-medium">Memverifikasi kualitas...</span>
                          </>
                        ) : verificationResult ? (
                          <>
                            {verificationResult.safety_status === "Lolos" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                            <div className="flex flex-col">
                              <span className={`text-sm font-medium ${verificationResult.safety_status === "Lolos" ? "text-green-600" : "text-red-600"
                                }`}>
                                {verificationResult.safety_status === "Lolos" ? "Verifikasi Lolos" : "Verifikasi Ditolak"}
                              </span>
                              {verificationResult.reason && (
                                <span className="text-xs text-muted-foreground">{verificationResult.reason}</span>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <span className="text-sm text-muted-foreground">Foto belum diverifikasi</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleRetake}
                        >
                          Foto Ulang
                        </Button>
                        <Button
                          size="sm"
                          variant={verificationResult?.safety_status === "Lolos" ? "outline" : "default"}
                          onClick={handleVerifyProduct}
                          disabled={isVerifying}
                        >
                          {isVerifying ? "Memproses..." : verificationResult ? "Verifikasi Ulang" : "Verifikasi Sekarang"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
              <Button
                onClick={handleAddProduct}
                className="mt-2"
                disabled={!imagePreview || verificationResult?.safety_status === "Tolak" || isVerifying}
              >
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
    </div >
  )
}
