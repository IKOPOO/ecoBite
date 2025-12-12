"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Shield, CreditCard, Smartphone } from "lucide-react"

export default function SellerSettingsPage() {
  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderUpdate: true,
    lowStock: true,
    expiryAlert: true,
    promotions: false,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola preferensi dan pengaturan akun Anda</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifikasi
            </CardTitle>
            <CardDescription>Atur notifikasi yang ingin Anda terima</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pesanan Baru</p>
                <p className="text-sm text-muted-foreground">Notifikasi saat ada pesanan masuk</p>
              </div>
              <Switch
                checked={notifications.newOrder}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newOrder: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Update Pesanan</p>
                <p className="text-sm text-muted-foreground">Notifikasi perubahan status pesanan</p>
              </div>
              <Switch
                checked={notifications.orderUpdate}
                onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdate: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Stok Rendah</p>
                <p className="text-sm text-muted-foreground">Peringatan saat stok produk menipis</p>
              </div>
              <Switch
                checked={notifications.lowStock}
                onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Peringatan Kadaluarsa</p>
                <p className="text-sm text-muted-foreground">Notifikasi produk mendekati kadaluarsa</p>
              </div>
              <Switch
                checked={notifications.expiryAlert}
                onCheckedChange={(checked) => setNotifications({ ...notifications, expiryAlert: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Promosi & Tips</p>
                <p className="text-sm text-muted-foreground">Info promosi dan tips jualan</p>
              </div>
              <Switch
                checked={notifications.promotions}
                onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Keamanan
            </CardTitle>
            <CardDescription>Kelola keamanan akun Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">Password Baru</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Ubah Password
            </Button>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Rekening Pencairan
            </CardTitle>
            <CardDescription>Informasi rekening untuk pencairan dana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="bank">Bank</Label>
              <Select defaultValue="bca">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="bni">BNI</SelectItem>
                  <SelectItem value="bri">BRI</SelectItem>
                  <SelectItem value="mandiri">Mandiri</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">Nomor Rekening</Label>
              <Input id="accountNumber" placeholder="1234567890" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountName">Nama Pemilik Rekening</Label>
              <Input id="accountName" placeholder="Nama sesuai buku rekening" />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Simpan Rekening
            </Button>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Preferensi Aplikasi
            </CardTitle>
            <CardDescription>Pengaturan umum aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="language">Bahasa</Label>
              <Select defaultValue="id">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bahasa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Zona Waktu</Label>
              <Select defaultValue="wib">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih zona waktu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wib">WIB (Jakarta)</SelectItem>
                  <SelectItem value="wita">WITA (Makassar)</SelectItem>
                  <SelectItem value="wit">WIT (Jayapura)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
