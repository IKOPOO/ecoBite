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

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Roti Tawar Gandum",
    description: "Roti tawar gandum utuh, tekstur lembut dan kaya serat. Cocok untuk sarapan sehat.",
    originalPrice: 28000,
    discountedPrice: 12000,
    discountPercentage: 57,
    category: "makanan-jadi",
    status: "layak-konsumsi",
    stock: 15,
    expiryDate: "2025-12-14",
    productionDate: "2025-12-10",
    image: "/whole-wheat-bread.png",
    store: stores[0],
    foodWasteSaved: 0.5,
  },
  {
    id: "prod-2",
    name: "Nasi Padang Komplit",
    description: "Paket nasi padang dengan rendang, ayam pop, daun singkong, dan sambal hijau.",
    originalPrice: 45000,
    discountedPrice: 20000,
    discountPercentage: 56,
    category: "makanan-jadi",
    status: "layak-konsumsi",
    stock: 8,
    expiryDate: "2025-12-12",
    productionDate: "2025-12-12",
    image: "/nasi-padang-indonesian-food.jpg",
    store: stores[1],
    foodWasteSaved: 0.8,
  },
  {
    id: "prod-3",
    name: "Buah Apel Fuji (1kg)",
    description: "Apel Fuji segar dengan sedikit memar, rasa tetap manis dan renyah.",
    originalPrice: 55000,
    discountedPrice: 25000,
    discountPercentage: 55,
    category: "bahan-makanan",
    status: "layak-konsumsi",
    stock: 20,
    expiryDate: "2025-12-15",
    productionDate: "2025-12-08",
    weight: 1000,
    image: "/fresh-fuji-apples.jpg",
    store: stores[2],
    foodWasteSaved: 1.0,
  },
  {
    id: "prod-4",
    name: "Sayur Bayam Segar",
    description: "Bayam organik segar, cocok untuk tumis atau lalapan.",
    originalPrice: 15000,
    discountedPrice: 5000,
    discountPercentage: 67,
    category: "bahan-makanan",
    status: "layak-konsumsi",
    stock: 30,
    expiryDate: "2025-12-13",
    productionDate: "2025-12-11",
    weight: 250,
    image: "/fresh-spinach-vegetables.jpg",
    store: stores[3],
    foodWasteSaved: 0.25,
  },
  {
    id: "prod-5",
    name: "Croissant Butter",
    description: "Croissant dengan butter premium, tekstur renyah di luar, lembut di dalam.",
    originalPrice: 25000,
    discountedPrice: 10000,
    discountPercentage: 60,
    category: "makanan-jadi",
    status: "layak-konsumsi",
    stock: 12,
    expiryDate: "2025-12-13",
    productionDate: "2025-12-11",
    image: "/butter-croissant-pastry.jpg",
    store: stores[0],
    foodWasteSaved: 0.15,
  },
  {
    id: "prod-6",
    name: "Ayam Goreng Crispy",
    description: "Ayam goreng tepung crispy, gurih dan renyah. 2 potong per porsi.",
    originalPrice: 35000,
    discountedPrice: 15000,
    discountPercentage: 57,
    category: "makanan-jadi",
    status: "layak-konsumsi",
    stock: 6,
    expiryDate: "2025-12-12",
    productionDate: "2025-12-12",
    image: "/crispy-fried-chicken.png",
    store: stores[1],
    foodWasteSaved: 0.4,
  },
  {
    id: "prod-7",
    name: "Wortel Organik (500g)",
    description: "Wortel organik segar dengan bentuk tidak sempurna tapi nutrisi tetap maksimal.",
    originalPrice: 20000,
    discountedPrice: 8000,
    discountPercentage: 60,
    category: "bahan-makanan",
    status: "layak-konsumsi",
    stock: 25,
    expiryDate: "2025-12-16",
    productionDate: "2025-12-09",
    weight: 500,
    image: "/organic-carrots-vegetables.jpg",
    store: stores[3],
    foodWasteSaved: 0.5,
  },
  {
    id: "prod-8",
    name: "Donat Cokelat (6pcs)",
    description: "Donat lembut dengan topping cokelat. Isi 6 buah per box.",
    originalPrice: 42000,
    discountedPrice: 18000,
    discountPercentage: 57,
    category: "makanan-jadi",
    status: "layak-konsumsi",
    stock: 10,
    expiryDate: "2025-12-13",
    productionDate: "2025-12-11",
    image: "/chocolate-donuts-box.jpg",
    store: stores[0],
    foodWasteSaved: 0.3,
  },
  {
    id: "prod-9",
    name: "Pisang Cavendish (1kg)",
    description: "Pisang Cavendish dengan kulit agak bercak hitam, daging buah tetap segar.",
    originalPrice: 30000,
    discountedPrice: 12000,
    discountPercentage: 60,
    category: "bahan-makanan",
    status: "layak-konsumsi",
    stock: 18,
    expiryDate: "2025-12-14",
    productionDate: "2025-12-10",
    weight: 1000,
    image: "/ripe-cavendish-bananas.jpg",
    store: stores[2],
    foodWasteSaved: 1.0,
  },
  {
    id: "prod-10",
    name: "Sisa Roti untuk Ternak",
    description: "Kumpulan roti yang sudah lewat tanggal konsumsi manusia, cocok untuk pakan ternak.",
    originalPrice: 50000,
    discountedPrice: 10000,
    discountPercentage: 80,
    category: "bahan-makanan",
    status: "untuk-ternak",
    stock: 50,
    expiryDate: "2025-12-10",
    productionDate: "2025-12-05",
    weight: 5000,
    image: "/leftover-bread-animal-feed.jpg",
    store: stores[0],
    foodWasteSaved: 5.0,
  },
]

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
