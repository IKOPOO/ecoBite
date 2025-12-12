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
import { Search, MoreHorizontal, Eye, Ban, CheckCircle, Users, UserCheck, UserX } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "buyer" | "seller"
  status: "active" | "suspended" | "pending"
  joinDate: string
  totalOrders: number
  totalSpent: number
}

const initialUsers: User[] = [
  {
    id: "U-001",
    name: "Ahmad Rizky",
    email: "ahmad@email.com",
    phone: "081234567890",
    role: "buyer",
    status: "active",
    joinDate: "2024-01-10",
    totalOrders: 15,
    totalSpent: 450000,
  },
  {
    id: "U-002",
    name: "Siti Nurhaliza",
    email: "siti@email.com",
    phone: "082345678901",
    role: "buyer",
    status: "active",
    joinDate: "2024-01-08",
    totalOrders: 8,
    totalSpent: 280000,
  },
  {
    id: "U-003",
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "083456789012",
    role: "seller",
    status: "active",
    joinDate: "2024-01-05",
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: "U-004",
    name: "Dewi Lestari",
    email: "dewi@email.com",
    phone: "084567890123",
    role: "buyer",
    status: "suspended",
    joinDate: "2023-12-20",
    totalOrders: 3,
    totalSpent: 95000,
  },
  {
    id: "U-005",
    name: "Eko Prasetyo",
    email: "eko@email.com",
    phone: "085678901234",
    role: "buyer",
    status: "pending",
    joinDate: "2024-01-15",
    totalOrders: 0,
    totalSpent: 0,
  },
]

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const updateUserStatus = (userId: string, newStatus: "active" | "suspended") => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status: newStatus })
    }
  }

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Manajemen Pengguna</h1>
        <p className="text-muted-foreground">Kelola semua pengguna terdaftar di platform</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Pengguna</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-sm text-muted-foreground">Pengguna Aktif</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.suspended}</p>
              <p className="text-sm text-muted-foreground">Pengguna Suspended</p>
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
                placeholder="Cari nama atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bergabung</TableHead>
                  <TableHead>Total Pesanan</TableHead>
                  <TableHead>Total Belanja</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "suspended"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {user.status === "active" ? "Aktif" : user.status === "suspended" ? "Suspended" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.totalOrders}</TableCell>
                    <TableCell>{formatRupiah(user.totalSpent)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => updateUserStatus(user.id, "suspended")}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => updateUserStatus(user.id, "active")}
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

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Pengguna</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <span className="text-2xl font-bold">{selectedUser.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid gap-4 rounded-lg bg-slate-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ID Pengguna</p>
                    <p className="font-medium">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">No. Telepon</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      className={`mt-1 ${selectedUser.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {selectedUser.status === "active" ? "Aktif" : "Suspended"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tanggal Bergabung</p>
                    <p className="font-medium">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pesanan</p>
                    <p className="font-medium">{selectedUser.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {selectedUser.status === "active" ? (
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => updateUserStatus(selectedUser.id, "suspended")}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Suspend Pengguna
                  </Button>
                ) : (
                  <Button className="flex-1" onClick={() => updateUserStatus(selectedUser.id, "active")}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Aktifkan Pengguna
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
