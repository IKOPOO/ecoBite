"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/providers/auth-provider"
import {
  UserIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  EditIcon,
  ShoppingBagIcon,
  HeartIcon,
  LeafIcon,
  CameraIcon,
  LockIcon,
  BellIcon,
  CheckCircleIcon,
} from "@/components/shared/icons"

export default function BuyerProfilePage() {
  const { user, setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    productAlerts: true,
    chatMessages: true,
    emailNotifications: false,
  })

  const handleSaveProfile = () => {
    if (user) {
      setUser({ ...user, ...formData })
    }
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    // Mock password change
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  // Mock stats
  const stats = {
    totalOrders: 24,
    savedFood: "48 kg",
    totalSavings: "Rp 720.000",
    favoriteStores: 5,
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header variant="marketplace" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Profil Saya</h1>
          <p className="text-muted-foreground">Kelola informasi akun dan pengaturan</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="size-24 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={user?.avatar || "/placeholder.svg?height=100&width=100&query=user avatar"}
                        alt={user?.name || "User"}
                        width={96}
                        height={96}
                        className="size-full object-cover"
                      />
                    </div>
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 size-8 rounded-full">
                      <CameraIcon className="size-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Bergabung sejak{" "}
                    {new Date(user?.joinedAt || "").toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                  </p>

                  <Separator className="my-6" />

                  {/* Impact Stats */}
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShoppingBagIcon className="size-4" />
                        <span>Total Pesanan</span>
                      </div>
                      <span className="font-semibold">{stats.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <LeafIcon className="size-4" />
                        <span>Food Waste Diselamatkan</span>
                      </div>
                      <span className="font-semibold text-primary">{stats.savedFood}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircleIcon className="size-4" />
                        <span>Total Hemat</span>
                      </div>
                      <span className="font-semibold text-primary">{stats.totalSavings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <HeartIcon className="size-4" />
                        <span>Toko Favorit</span>
                      </div>
                      <span className="font-semibold">{stats.favoriteStores}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Link
                    href="/buyer/orders"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ShoppingBagIcon className="size-4" />
                    Pesanan Saya
                  </Link>
                  <Link
                    href="/buyer/chat"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <MailIcon className="size-4" />
                    Pesan
                  </Link>
                  <Link
                    href="/buyer/notifications"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <BellIcon className="size-4" />
                    Notifikasi
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="security">Keamanan</TabsTrigger>
                <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Informasi Profil</CardTitle>
                      <CardDescription>Perbarui informasi profil dan alamat pengiriman</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "ghost" : "outline"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        "Batal"
                      ) : (
                        <>
                          <EditIcon className="mr-2 size-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                            <UserIcon className="size-4 text-muted-foreground" />
                            <span>{formData.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                            <PhoneIcon className="size-4 text-muted-foreground" />
                            <span>{formData.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                          <MailIcon className="size-4 text-muted-foreground" />
                          <span>{formData.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={e => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Masukkan alamat lengkap"
                        />
                      ) : (
                        <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                          <MapPinIcon className="size-4 text-muted-foreground" />
                          <span>{formData.address || "Belum ada alamat"}</span>
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleSaveProfile}>Simpan Perubahan</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Keamanan Akun</CardTitle>
                    <CardDescription>Kelola password dan keamanan akun</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Password Saat Ini</Label>
                        <div className="relative">
                          <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="currentPassword"
                            type="password"
                            className="pl-10"
                            value={passwordData.currentPassword}
                            onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            placeholder="Masukkan password saat ini"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Password Baru</Label>
                        <div className="relative">
                          <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="newPassword"
                            type="password"
                            className="pl-10"
                            value={passwordData.newPassword}
                            onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            placeholder="Masukkan password baru"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                        <div className="relative">
                          <LockIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="pl-10"
                            value={passwordData.confirmPassword}
                            onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            placeholder="Konfirmasi password baru"
                          />
                        </div>
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange}>Ubah Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Notifikasi</CardTitle>
                    <CardDescription>Pilih notifikasi yang ingin kamu terima</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Update Pesanan</Label>
                          <p className="text-sm text-muted-foreground">Notifikasi tentang status pesanan</p>
                        </div>
                        <Switch
                          checked={notificationSettings.orderUpdates}
                          onCheckedChange={checked =>
                            setNotificationSettings({ ...notificationSettings, orderUpdates: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Promo & Diskon</Label>
                          <p className="text-sm text-muted-foreground">Info promo dan diskon dari toko favoritmu</p>
                        </div>
                        <Switch
                          checked={notificationSettings.promotions}
                          onCheckedChange={checked =>
                            setNotificationSettings({ ...notificationSettings, promotions: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Alert Produk</Label>
                          <p className="text-sm text-muted-foreground">Notifikasi saat produk favoritmu hampir habis</p>
                        </div>
                        <Switch
                          checked={notificationSettings.productAlerts}
                          onCheckedChange={checked =>
                            setNotificationSettings({ ...notificationSettings, productAlerts: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Pesan Chat</Label>
                          <p className="text-sm text-muted-foreground">Notifikasi pesan baru dari penjual</p>
                        </div>
                        <Switch
                          checked={notificationSettings.chatMessages}
                          onCheckedChange={checked =>
                            setNotificationSettings({ ...notificationSettings, chatMessages: checked })
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notifikasi Email</Label>
                          <p className="text-sm text-muted-foreground">Terima notifikasi juga via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={checked =>
                            setNotificationSettings({
                              ...notificationSettings,
                              emailNotifications: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
