"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPinIcon, ClockIcon, LeafIcon, CartIcon } from "@/components/shared/icons"
import { type Product, formatPrice, getDaysUntilExpiry } from "@/lib/data"
import { useCart } from "@/providers/cart-provider"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate)
  const isExpiringSoon = daysUntilExpiry <= 2

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to detail page
    e.stopPropagation()

    if (product.stock <= 0) {
      toast.error("Stok habis")
      return
    }

    addToCart(product.id, 1)
    toast.success(`${product.name} ditambahkan ke keranjang`)
  }

  return (
    <Link href={`/buyer/marketplace/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Discount Badge */}
          <div className="absolute left-3 top-3">
            <Badge className="bg-destructive text-destructive-foreground">-{product.discountPercentage}%</Badge>
          </div>
          {/* Status Badge */}
          <div className="absolute right-3 top-3">
            <Badge
              variant={product.status === "layak-konsumsi" ? "default" : "secondary"}
              className={product.status === "layak-konsumsi" ? "bg-primary" : ""}
            >
              {product.status === "layak-konsumsi" ? "Layak Konsumsi" : "Untuk Ternak"}
            </Badge>
          </div>
          {/* Food Waste Saved */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs backdrop-blur">
              <LeafIcon className="size-3 text-primary" />
              <span className="font-medium">{product.foodWasteSaved} kg diselamatkan</span>
            </div>
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="mb-1 line-clamp-1 font-semibold group-hover:text-primary">{product.name}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{product.store.name}</p>

          {/* Price */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-bold text-primary">{formatPrice(product.discountedPrice)}</span>
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          </div>

          {/* Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPinIcon className="size-3" />
              <span>{product.store.distance}</span>
            </div>
            <div className={`flex items-center gap-1 ${isExpiringSoon ? "text-destructive" : ""}`}>
              <ClockIcon className="size-3" />
              <span>
                {daysUntilExpiry <= 0 ? "Expired" : daysUntilExpiry === 1 ? "1 hari lagi" : `${daysUntilExpiry} hari`}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full gap-2"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <CartIcon className="size-4" />
            {product.stock <= 0 ? "Stok Habis" : "Tambah ke Keranjang"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

