"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Phone, Mail, Camera, CheckCircle } from "lucide-react"

export default function SellerStorePage() {
  const [storeData, setStoreData] = useState({
    name: "Toko Roti Makmur",
    description: "Roti dan pastry segar setiap hari dengan bahan berkualitas. Spesialis croissant dan roti artisan.",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    phone: "021-5551234",
    email: "tokorotimakmur@email.com",
    openTime: "06:00",
    closeTime: "21:00",
    isOpen: true,
  })

  const [operatingDays, setOperatingDays] = useState({
    senin: true,
    selasa: true,
    rabu: true,
    kamis: true,
    jumat: true,
    sabtu: true,
    minggu: false,
  })

  const handleSave = () => {
    alert("Perubahan berhasil disimpan!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Profil Toko</h1>
          <p className="text-muted-foreground">Kelola informasi dan pengaturan toko Anda</p>
        </div>
        <Badge className={storeData.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {storeData.isOpen ? "Buka" : "Tutup"}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Store Info */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Store Image */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-xl bg-muted" />
                  <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <p className="font-medium">Foto Toko</p>
                  <p className="text-sm text-muted-foreground">JPG atau PNG, maksimal 2MB</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Toko</Label>
                  <Input
                    id="name"
                    value={storeData.name}
                    onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={storeData.description}
                    onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontak & Lokasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={storeData.phone}
                      onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={storeData.email}
                      onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={storeData.address}
                    onChange={(e) => setStoreData({ ...storeData, address: e.target.value })}
                    className="pl-10"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jam Operasional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="openTime">Jam Buka</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="openTime"
                      type="time"
                      value={storeData.openTime}
                      onChange={(e) => setStoreData({ ...storeData, openTime: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="closeTime">Jam Tutup</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="closeTime"
                      type="time"
                      value={storeData.closeTime}
                      onChange={(e) => setStoreData({ ...storeData, closeTime: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hari Operasional</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(operatingDays).map(([day, isActive]) => (
                    <Button
                      key={day}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOperatingDays({ ...operatingDays, [day]: !isActive })}
                      className="capitalize"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Toko</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Toko Buka</p>
                  <p className="text-sm text-muted-foreground">Terima pesanan baru</p>
                </div>
                <Switch
                  checked={storeData.isOpen}
                  onCheckedChange={(checked) => setStoreData({ ...storeData, isOpen: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Toko Terverifikasi</p>
                  <p className="text-xs text-green-600">Sejak 15 Jan 2024</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Dokumen terverifikasi:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>KTP Pemilik</li>
                  <li>NPWP</li>
                  <li>Izin Usaha</li>
                  <li>Sertifikat Halal</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={handleSave}>
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  )
}
