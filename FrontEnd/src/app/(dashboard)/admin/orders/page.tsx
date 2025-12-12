"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, ShoppingCart, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react"

interface Transaction {
  id: string
  buyer: string
  seller: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled" | "refunded"
  paymentMethod: string
  createdAt: string
}

const initialTransactions: Transaction[] = [
  {
    id: "TRX-001",
    buyer: "Ahmad Rizky",
    seller: "Toko Roti Makmur",
    items: [
      { name: "Croissant Butter", quantity: 3, price: 15000 },
      { name: "Roti Gandum", quantity: 2, price: 10000 },
    ],
    total: 65000,
    status: "completed",
    paymentMethod: "QRIS",
    createdAt: "2024-01-15 10:30",
  },
  {
    id: "TRX-002",
    buyer: "Siti Nurhaliza",
    seller: "Warung Padang Sederhana",
    items: [{ name: "Nasi Goreng Spesial", quantity: 2, price: 18000 }],
    total: 36000,
    status: "processing",
    paymentMethod: "E-Wallet",
    createdAt: "2024-01-15 10:15",
  },
  {
    id: "TRX-003",
    buyer: "Budi Santoso",
    seller: "Fresh Mart",
    items: [{ name: "Sayur Mix Segar", quantity: 1, price: 20000 }],
    total: 20000,
    status: "pending",
    paymentMethod: "COD",
    createdAt: "2024-01-15 09:45",
  },
  {
    id: "TRX-004",
    buyer: "Dewi Lestari",
    seller: "Toko Roti Makmur",
    items: [{ name: "Donat Coklat", quantity: 6, price: 7000 }],
    total: 42000,
    status: "completed",
    paymentMethod: "QRIS",
    createdAt: "2024-01-15 09:00",
  },
  {
    id: "TRX-005",
    buyer: "Eko Prasetyo",
    seller: "Cafe Kopi Nusantara",
    items: [{ name: "Bento Box", quantity: 2, price: 25000 }],
    total: 50000,
    status: "cancelled",
    paymentMethod: "E-Wallet",
    createdAt: "2024-01-14 16:30",
  },
  {
    id: "TRX-006",
    buyer: "Fitri Handayani",
    seller: "Fresh Mart",
    items: [
      { name: "Buah Pisang 1kg", quantity: 1, price: 15000 },
      { name: "Sayur Mix Segar", quantity: 1, price: 20000 },
    ],
    total: 35000,
    status: "refunded",
    paymentMethod: "QRIS",
    createdAt: "2024-01-14 15:00",
  },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function AdminOrdersPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.seller.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: transactions.length,
    totalValue: transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.total, 0),
    completed: transactions.filter((t) => t.status === "completed").length,
    pending: transactions.filter((t) => t.status === "pending" || t.status === "processing").length,
  }

  const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    processing: { label: "Diproses", color: "bg-blue-100 text-blue-800", icon: Clock },
    completed: { label: "Selesai", color: "bg-green-100 text-green-800", icon: CheckCircle },
    cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-800", icon: XCircle },
    refunded: { label: "Refund", color: "bg-purple-100 text-purple-800", icon: XCircle },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Manajemen Transaksi</h1>
        <p className="text-muted-foreground">Monitor semua transaksi di platform</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Transaksi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatRupiah(stats.totalValue)}</p>
              <p className="text-sm text-muted-foreground">Total Nilai</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Selesai</p>
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
              <p className="text-sm text-muted-foreground">Dalam Proses</p>
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
                placeholder="Cari ID transaksi, pembeli, atau penjual..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
                <SelectItem value="refunded">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Pembeli</TableHead>
                  <TableHead>Penjual</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Pembayaran</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.buyer}</TableCell>
                    <TableCell>{tx.seller}</TableCell>
                    <TableCell className="font-medium">{formatRupiah(tx.total)}</TableCell>
                    <TableCell>{tx.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[tx.status].color}>{statusConfig[tx.status].label}</Badge>
                    </TableCell>
                    <TableCell>{tx.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedTransaction(tx)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Transaksi {selectedTransaction?.id}</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Badge className={statusConfig[selectedTransaction.status].color}>
                  {statusConfig[selectedTransaction.status].label}
                </Badge>
                <span className="text-sm text-muted-foreground">{selectedTransaction.createdAt}</span>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pembeli</p>
                  <p className="font-medium">{selectedTransaction.buyer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Penjual</p>
                  <p className="font-medium">{selectedTransaction.seller}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <p className="font-medium">Item Pesanan</p>
                {selectedTransaction.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatRupiah(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Payment & Total */}
              <div className="space-y-2 rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Metode Pembayaran</span>
                  <span className="font-medium">{selectedTransaction.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">{formatRupiah(selectedTransaction.total)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
