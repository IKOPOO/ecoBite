"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Store, Clock, ShieldCheck } from "lucide-react"

interface Seller {
  id: string
  name: string
  owner: string
  email: string
  phone: string
  type: string
  address: string
  status: "pending" | "verified" | "rejected" | "suspended"
  joinDate: string
  totalProducts: number
  totalSales: number
  documents: string[]
}

const initialSellers: Seller[] = [
  {
    id: "S-001",
    name: "Toko Roti Makmur",
    owner: "Budi Santoso",
    email: "rotimakmur@email.com",
    phone: "021-5551234",
    type: "Bakery",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    status: "verified",
    joinDate: "2024-01-05",
    totalProducts: 24,
    totalSales: 2450000,
    documents: ["KTP", "NPWP", "Izin Usaha", "Sertifikat Halal"],
  },
  {
    id: "S-002",
    name: "Warung Padang Sederhana",
    owner: "Ahmad Rizky",
    email: "padangsederhana@email.com",
    phone: "021-5552345",
    type: "Restaurant",
    address: "Jl. Thamrin No. 456, Jakarta Pusat",
    status: "pending",
    joinDate: "2024-01-15",
    totalProducts: 0,
    totalSales: 0,
    documents: ["KTP", "NPWP", "Izin Usaha"],
  },
  {
    id: "S-003",
    name: "Bakery House",
    owner: "Siti Nurhaliza",
    email: "bakeryhouse@email.com",
    phone: "021-5553456",
    type: "Bakery",
    address: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
    status: "pending",
    joinDate: "2024-01-14",
    totalProducts: 0,
    totalSales: 0,
    documents: ["KTP", "NPWP"],
  },
  {
    id: "S-004",
    name: "Fresh Mart",
    owner: "Dewi Lestari",
    email: "freshmart@email.com",
    phone: "021-5554567",
    type: "Grocery",
    address: "Jl. Kuningan No. 321, Jakarta Selatan",
    status: "verified",
    joinDate: "2024-01-02",
    totalProducts: 45,
    totalSales: 5680000,
    documents: ["KTP", "NPWP", "Izin Usaha", "Sertifikat PIRT"],
  },
  {
    id: "S-005",
    name: "Cafe Kopi Nusantara",
    owner: "Eko Prasetyo",
    email: "kopinusantara@email.com",
    phone: "021-5555678",
    type: "Cafe",
    address: "Jl. Casablanca No. 654, Jakarta Selatan",
    status: "rejected",
    joinDate: "2024-01-12",
    totalProducts: 0,
    totalSales: 0,
    documents: ["KTP"],
  },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<Seller[]>(initialSellers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || seller.status === statusFilter
    const matchesTab = activeTab === "all" || seller.status === activeTab
    return matchesSearch && matchesStatus && matchesTab
  })

  const updateSellerStatus = (sellerId: string, newStatus: "verified" | "rejected" | "suspended") => {
    setSellers(sellers.map((seller) => (seller.id === sellerId ? { ...seller, status: newStatus } : seller)))
    if (selectedSeller?.id === sellerId) {
      setSelectedSeller({ ...selectedSeller, status: newStatus })
    }
  }

  const stats = {
    total: sellers.length,
    pending: sellers.filter((s) => s.status === "pending").length,
    verified: sellers.filter((s) => s.status === "verified").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Manajemen Penjual</h1>
        <p className="text-muted-foreground">Verifikasi dan kelola penjual di platform</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Store className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Penjual</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending Verifikasi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.verified}</p>
              <p className="text-sm text-muted-foreground">Terverifikasi</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="verified">Terverifikasi</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari nama toko atau pemilik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sellers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Penjual ({filteredSellers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Toko</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Produk</TableHead>
                      <TableHead>Total Penjualan</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSellers.map((seller) => (
                      <TableRow key={seller.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-slate-100" />
                            <div>
                              <p className="font-medium">{seller.name}</p>
                              <p className="text-sm text-muted-foreground">{seller.owner}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{seller.type}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              seller.status === "verified"
                                ? "bg-green-100 text-green-800"
                                : seller.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : seller.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }
                          >
                            {seller.status === "verified"
                              ? "Terverifikasi"
                              : seller.status === "pending"
                                ? "Pending"
                                : seller.status === "rejected"
                                  ? "Ditolak"
                                  : "Suspended"}
                          </Badge>
                        </TableCell>
                        <TableCell>{seller.totalProducts}</TableCell>
                        <TableCell>{formatRupiah(seller.totalSales)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedSeller(seller)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                              </DropdownMenuItem>
                              {seller.status === "pending" && (
                                <>
                                  <DropdownMenuItem
                                    className="text-green-600"
                                    onClick={() => updateSellerStatus(seller.id, "verified")}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Verifikasi
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => updateSellerStatus(seller.id, "rejected")}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Tolak
                                  </DropdownMenuItem>
                                </>
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
        </TabsContent>
      </Tabs>

      {/* Seller Detail Dialog */}
      <Dialog open={!!selectedSeller} onOpenChange={() => setSelectedSeller(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Penjual</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-slate-100" />
                <div>
                  <h3 className="text-lg font-semibold">{selectedSeller.name}</h3>
                  <p className="text-muted-foreground">{selectedSeller.type}</p>
                </div>
              </div>

              <div className="grid gap-4 rounded-lg bg-slate-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pemilik</p>
                    <p className="font-medium">{selectedSeller.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedSeller.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-medium">{selectedSeller.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bergabung</p>
                    <p className="font-medium">{selectedSeller.joinDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alamat</p>
                  <p className="font-medium">{selectedSeller.address}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Dokumen Terverifikasi</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSeller.documents.map((doc) => (
                    <Badge key={doc} variant="outline">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedSeller.status === "pending" && (
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => updateSellerStatus(selectedSeller.id, "verified")}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verifikasi
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => updateSellerStatus(selectedSeller.id, "rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Tolak
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
