export interface Product {
  id: string
  name: string
  description: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  category: "makanan-jadi" | "bahan-makanan"
  status: "layak-konsumsi" | "untuk-ternak"
  stock: number
  expiryDate: string
  productionDate: string
  weight?: number
  image: string
  store: Store
  foodWasteSaved: number
}

export interface Store {
  id: string
  name: string
  location: string
  distance: string
  rating: number
  image: string
}

export const stores: Store[] = [
  {
    id: "store-1",
    name: "Bakery Citra",
    location: "Jl. Sudirman No. 45, Jakarta Pusat",
    distance: "1.2 km",
    rating: 4.8,
    image: "/bakery-logo.png",
  },
  {
    id: "store-2",
    name: "Restoran Padang Sederhana",
    location: "Jl. Gatot Subroto No. 12, Jakarta Selatan",
    distance: "2.5 km",
    rating: 4.6,
    image: "/restaurant-logo.png",
  },
  {
    id: "store-3",
    name: "Supermarket Fresh",
    location: "Jl. Thamrin No. 88, Jakarta Pusat",
    distance: "0.8 km",
    rating: 4.5,
    image: "/generic-supermarket-logo.png",
  },
  {
    id: "store-4",
    name: "Toko Sayur Makmur",
    location: "Pasar Minggu, Jakarta Selatan",
    distance: "3.1 km",
    rating: 4.3,
    image: "/vegetable-store-logo.jpg",
  },
]

export const products: Product[] = []

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function getDaysUntilExpiry(expiryDate: string): number {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
