"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layouts/header"
import { Footer } from "@/components/layouts/footer"
import { ProductCard } from "@/components/features/marketplace/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchIcon, FilterIcon, LeafIcon } from "@/components/shared/icons"
import { products } from "@/lib/data"

type SortOption = "termurah" | "terdekat" | "expiring-soon"
type CategoryFilter = "all" | "makanan-jadi" | "bahan-makanan"
type StatusFilter = "all" | "layak-konsumsi" | "untuk-ternak"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("terdekat")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(query) || p.store.name.toLowerCase().includes(query))
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter(p => p.category === categoryFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(p => p.status === statusFilter)
    }

    // Price filter
    result = result.filter(p => p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1])

    // Sorting
    switch (sortBy) {
      case "termurah":
        result.sort((a, b) => a.discountedPrice - b.discountedPrice)
        break
      case "terdekat":
        result.sort((a, b) => Number.parseFloat(a.store.distance) - Number.parseFloat(b.store.distance))
        break
      case "expiring-soon":
        result.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
        break
    }

    return result
  }, [searchQuery, sortBy, categoryFilter, statusFilter, priceRange])

  const totalFoodWasteSaved = products.reduce((acc, p) => acc + p.foodWasteSaved, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="marketplace" />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-primary/5 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">Temukan Makanan Hemat</h1>
                <p className="text-muted-foreground">Selamatkan makanan berkualitas dengan harga terbaik</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <LeafIcon className="size-5 text-primary" />
                <span className="font-semibold text-primary">
                  {totalFoodWasteSaved.toFixed(1)} kg food waste diselamatkan
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Bar */}
        <section className="border-b py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative flex-1 md:max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari makanan atau toko..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={v => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terdekat">Terdekat</SelectItem>
                    <SelectItem value="termurah">Termurah</SelectItem>
                    <SelectItem value="expiring-soon">Segera Expired</SelectItem>
                  </SelectContent>
                </Select>

                {/* Filter Sheet for Mobile */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 md:hidden bg-transparent">
                      <FilterIcon className="size-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Filter Produk</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <FilterContent
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Sidebar Filters - Desktop */}
              <aside className="hidden w-64 shrink-0 md:block">
                <div className="sticky top-20 space-y-6 rounded-xl border bg-card p-6">
                  <h3 className="font-semibold">Filter</h3>
                  <FilterContent
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                  />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Menampilkan {filteredProducts.length} produk</p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                      <SearchIcon className="size-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 font-semibold">Produk tidak ditemukan</h3>
                    <p className="text-sm text-muted-foreground">Coba ubah filter atau kata kunci pencarian</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FilterContent({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}: {
  categoryFilter: CategoryFilter
  setCategoryFilter: (v: CategoryFilter) => void
  statusFilter: StatusFilter
  setStatusFilter: (v: StatusFilter) => void
}) {
  return (
    <>
      {/* Category */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Kategori</Label>
        <div className="space-y-2">
          {[
            { value: "all", label: "Semua Kategori" },
            { value: "makanan-jadi", label: "Makanan Jadi" },
            { value: "bahan-makanan", label: "Bahan Makanan" },
          ].map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`category-${option.value}`}
                checked={categoryFilter === option.value}
                onCheckedChange={() => setCategoryFilter(option.value as CategoryFilter)}
              />
              <Label htmlFor={`category-${option.value}`} className="cursor-pointer text-sm font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Status</Label>
        <div className="space-y-2">
          {[
            { value: "all", label: "Semua Status" },
            { value: "layak-konsumsi", label: "Layak Konsumsi" },
            { value: "untuk-ternak", label: "Untuk Ternak" },
          ].map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`status-${option.value}`}
                checked={statusFilter === option.value}
                onCheckedChange={() => setStatusFilter(option.value as StatusFilter)}
              />
              <Label htmlFor={`status-${option.value}`} className="cursor-pointer text-sm font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
