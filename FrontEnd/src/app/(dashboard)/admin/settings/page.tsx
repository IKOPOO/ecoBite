"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, Globe, Percent, Mail } from "lucide-react"

export default function AdminSettingsPage() {
  const [platformSettings, setPlatformSettings] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    sellerRegistrations: true,
    emailNotifications: true,
  })

  const [commissionRate, setCommissionRate] = useState("5")
  const [minDiscount, setMinDiscount] = useState("30")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Pengaturan Platform</h1>
        <p className="text-muted-foreground">Kelola pengaturan umum platform SavorBite</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Platform Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Kontrol Platform
            </CardTitle>
            <CardDescription>Pengaturan dasar operasional platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode Maintenance</p>
                <p className="text-sm text-muted-foreground">Nonaktifkan akses pengguna sementara</p>
              </div>
              <Switch
                checked={platformSettings.maintenanceMode}
                onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, maintenanceMode: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Registrasi Pengguna Baru</p>
                <p className="text-sm text-muted-foreground">Izinkan pengguna baru mendaftar</p>
              </div>
              <Switch
                checked={platformSettings.newRegistrations}
                onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, newRegistrations: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Registrasi Penjual Baru</p>
                <p className="text-sm text-muted-foreground">Izinkan penjual baru mendaftar</p>
              </div>
              <Switch
                checked={platformSettings.sellerRegistrations}
                onCheckedChange={(checked) =>
                  setPlatformSettings({ ...platformSettings, sellerRegistrations: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Commission Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Pengaturan Komisi
            </CardTitle>
            <CardDescription>Atur komisi dan diskon platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="commission">Komisi Platform (%)</Label>
              <Input
                id="commission"
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-sm text-muted-foreground">Persentase yang diambil dari setiap transaksi</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minDiscount">Minimum Diskon (%)</Label>
              <Input
                id="minDiscount"
                type="number"
                value={minDiscount}
                onChange={(e) => setMinDiscount(e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-sm text-muted-foreground">Diskon minimum yang harus diberikan penjual</p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Pengaturan Notifikasi
            </CardTitle>
            <CardDescription>Kelola notifikasi sistem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifikasi</p>
                <p className="text-sm text-muted-foreground">Kirim notifikasi via email</p>
              </div>
              <Switch
                checked={platformSettings.emailNotifications}
                onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, emailNotifications: checked })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="adminEmail">Email Admin</Label>
              <Input id="adminEmail" type="email" defaultValue="admin@ecobite.id" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supportEmail">Email Support</Label>
              <Input id="supportEmail" type="email" defaultValue="support@ecobite.id" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Keamanan
            </CardTitle>
            <CardDescription>Pengaturan keamanan platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="sessionTimeout">Session Timeout (menit)</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 menit</SelectItem>
                  <SelectItem value="60">60 menit</SelectItem>
                  <SelectItem value="120">2 jam</SelectItem>
                  <SelectItem value="480">8 jam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input id="maxLoginAttempts" type="number" defaultValue="5" />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Reset Semua Password Admin
            </Button>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Regional
            </CardTitle>
            <CardDescription>Pengaturan wilayah dan bahasa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Bahasa Default</Label>
              <Select defaultValue="id">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Mata Uang</Label>
              <Select defaultValue="idr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idr">IDR - Rupiah Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Zona Waktu</Label>
              <Select defaultValue="wib">
                <SelectTrigger>
                  <SelectValue />
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

        {/* Email Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Template Email
            </CardTitle>
            <CardDescription>Kustomisasi template email sistem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Template yang dipilih</Label>
              <Select defaultValue="welcome">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Email Selamat Datang</SelectItem>
                  <SelectItem value="order">Konfirmasi Pesanan</SelectItem>
                  <SelectItem value="verification">Verifikasi Penjual</SelectItem>
                  <SelectItem value="reset">Reset Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emailSubject">Subject</Label>
              <Input id="emailSubject" defaultValue="Selamat Datang di SavorBite!" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emailBody">Body</Label>
              <Textarea
                id="emailBody"
                rows={4}
                defaultValue="Halo {{name}}, Terima kasih telah bergabung dengan SavorBite. Bersama-sama kita bisa mengurangi food waste!"
              />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Simpan Template
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save All Button */}
      <div className="flex justify-end">
        <Button size="lg">Simpan Semua Pengaturan</Button>
      </div>
    </div>
  )
}
