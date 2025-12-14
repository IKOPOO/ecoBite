export interface Product {
  id: string
  name: string
  description: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  category: 'makanan-jadi' | 'bahan-makanan'
  status: 'layak-konsumsi' | 'untuk-ternak'
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
    id: 'store-1',
    name: 'Bakery Citra',
    location: 'Jl. Sudirman No. 45, Jakarta Pusat',
    distance: '1.2 km',
    rating: 4.8,
    // Gambar etalase roti di bakery
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'store-2',
    name: 'Restoran Padang Sederhana',
    location: 'Jl. Gatot Subroto No. 12, Jakarta Selatan',
    distance: '2.5 km',
    rating: 4.6,
    // Gambar suasana rumah makan/restoran
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'store-3',
    name: 'Supermarket Fresh',
    location: 'Jl. Thamrin No. 88, Jakarta Pusat',
    distance: '0.8 km',
    rating: 4.5,
    // Gambar rak buah dan sayur di supermarket
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'store-4',
    name: 'Toko Sayur Makmur',
    location: 'Pasar Minggu, Jakarta Selatan',
    distance: '3.1 km',
    rating: 4.3,
    // Gambar kios sayur dan buah segar di pasar
    image: 'https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Roti Tawar Gandum',
    description: 'Roti tawar gandum segar dengan tekstur lembut, cocok untuk sarapan sehat',
    originalPrice: 25000,
    discountedPrice: 12500,
    discountPercentage: 50,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 15,
    expiryDate: '2025-12-16',
    productionDate: '2025-12-13',
    weight: 500,
    // Gambar roti tawar gandum yang sudah diiris
    image: 'https://images.pexels.com/photos/19953736/pexels-photo-19953736.jpeg',
    store: stores[0],
    foodWasteSaved: 0.5,
  },
  {
    id: 'prod-2',
    name: 'Croissant Butter Original',
    description: 'Croissant butter dengan lapisan renyah dan lembut di dalam',
    originalPrice: 15000,
    discountedPrice: 7500,
    discountPercentage: 50,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 8,
    expiryDate: '2025-12-15',
    productionDate: '2025-12-14',
    weight: 100,
    // Gambar croissant di atas meja
    image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[0],
    foodWasteSaved: 0.1,
  },
  {
    id: 'prod-3',
    name: 'Nasi Padang Komplit',
    description: 'Nasi putih dengan rendang, ayam goreng, sambal hijau, dan sayur',
    originalPrice: 45000,
    discountedPrice: 22500,
    discountPercentage: 50,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 12,
    expiryDate: '2025-12-15',
    productionDate: '2025-12-14',
    weight: 600,
    // Gambar hidangan nasi dengan lauk pauk mirip nasi padang
    image:
      'data:image/jpeg;base64,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',
    store: stores[1],
    foodWasteSaved: 0.6,
  },
  {
    id: 'prod-4',
    name: 'Ayam Rendang Bumbu Minang',
    description: 'Rendang ayam dengan bumbu rempah khas Padang yang kaya rasa',
    originalPrice: 35000,
    discountedPrice: 14000,
    discountPercentage: 60,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 6,
    expiryDate: '2025-12-16',
    productionDate: '2025-12-13',
    weight: 400,
    // Gambar ayam bumbu kaya rempah (rendang/kari)
    image: 'https://images.pexels.com/photos/12208781/pexels-photo-12208781.jpeg',
    store: stores[1],
    foodWasteSaved: 0.4,
  },
  {
    id: 'prod-5',
    name: 'Sayur Bayam Segar',
    description: 'Bayam hijau segar langsung dari petani lokal',
    originalPrice: 10000,
    discountedPrice: 5000,
    discountPercentage: 50,
    category: 'bahan-makanan',
    status: 'layak-konsumsi',
    stock: 20,
    expiryDate: '2025-12-17',
    productionDate: '2025-12-14',
    weight: 250,
    // Gambar daun bayam segar
    image: 'https://images.pexels.com/photos/6824475/pexels-photo-6824475.jpeg',
    store: stores[2],
    foodWasteSaved: 0.25,
  },
  {
    id: 'prod-6',
    name: 'Tomat Merah Segar',
    description: 'Tomat merah berkualitas tinggi, sedikit memar namun layak konsumsi',
    originalPrice: 18000,
    discountedPrice: 9000,
    discountPercentage: 50,
    category: 'bahan-makanan',
    status: 'layak-konsumsi',
    stock: 25,
    expiryDate: '2025-12-18',
    productionDate: '2025-12-13',
    weight: 500,
    // Gambar tomat merah segar
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[2],
    foodWasteSaved: 0.5,
  },
  {
    id: 'prod-7',
    name: 'Kue Bolu Pandan',
    description: 'Kue bolu pandan lembut dengan aroma pandan yang harum',
    originalPrice: 30000,
    discountedPrice: 12000,
    discountPercentage: 60,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 5,
    expiryDate: '2025-12-15',
    productionDate: '2025-12-12',
    weight: 300,
    // Gambar kue bolu chiffon hijau (pandan)
    image: 'https://images.pexels.com/photos/7833950/pexels-photo-7833950.jpeg',
    store: stores[0],
    foodWasteSaved: 0.3,
  },
  {
    id: 'prod-8',
    name: 'Donat Coklat Mini',
    description: 'Donat mini dengan taburan coklat, sisa produksi hari ini',
    originalPrice: 20000,
    discountedPrice: 8000,
    discountPercentage: 60,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 10,
    expiryDate: '2025-12-15',
    productionDate: '2025-12-14',
    weight: 200,
    // Gambar beberapa donat coklat kecil
    image: 'https://images.pexels.com/photos/34168753/pexels-photo-34168753.jpeg',
    store: stores[0],
    foodWasteSaved: 0.2,
  },
  {
    id: 'prod-9',
    name: 'Pisang Cavendish',
    description: 'Pisang cavendish matang sempurna dengan sedikit bercak hitam',
    originalPrice: 25000,
    discountedPrice: 10000,
    discountPercentage: 60,
    category: 'bahan-makanan',
    status: 'layak-konsumsi',
    stock: 18,
    expiryDate: '2025-12-16',
    productionDate: '2025-12-10',
    weight: 1000,
    // Gambar pisang matang dengan bintik coklat (ripe banana)
    image: 'https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[2],
    foodWasteSaved: 1.0,
  },
  {
    id: 'prod-10',
    name: 'Wortel Organik',
    description: 'Wortel organik segar dengan bentuk tidak sempurna namun berkualitas',
    originalPrice: 15000,
    discountedPrice: 6000,
    discountPercentage: 60,
    category: 'bahan-makanan',
    status: 'layak-konsumsi',
    stock: 30,
    expiryDate: '2025-12-20',
    productionDate: '2025-12-12',
    weight: 500,
    // Gambar sekelompok wortel segar
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[3],
    foodWasteSaved: 0.5,
  },
  {
    id: 'prod-11',
    name: 'Kentang',
    description: 'Kentang ukuran kecil-sedang, cocok untuk direbus atau digoreng',
    originalPrice: 20000,
    discountedPrice: 8000,
    discountPercentage: 60,
    category: 'bahan-makanan',
    status: 'layak-konsumsi',
    stock: 22,
    expiryDate: '2025-12-25',
    productionDate: '2025-12-10',
    weight: 1000,
    // Gambar kentang merah segar
    image:
      'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[3],
    foodWasteSaved: 1.0,
  },
  {
    id: 'prod-12',
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, ayam suwir, dan kerupuk',
    originalPrice: 28000,
    discountedPrice: 11200,
    discountPercentage: 60,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 7,
    expiryDate: '2025-12-15',
    productionDate: '2025-12-14',
    weight: 450,
    // Gambar hidangan nasi goreng di piring
    image: 'https://images.pexels.com/photos/3926133/pexels-photo-3926133.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[1],
    foodWasteSaved: 0.45,
  },
  {
    id: 'prod-13',
    name: 'Roti Sobek Coklat',
    description: 'Roti sobek lembut dengan isian coklat melimpah',
    originalPrice: 35000,
    discountedPrice: 14000,
    discountPercentage: 60,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 4,
    expiryDate: '2025-12-16',
    productionDate: '2025-12-13',
    weight: 400,
    // Gambar roti sobek atau roti lembut dengan keju
    image: 'https://images.pexels.com/photos/11514009/pexels-photo-11514009.jpeg',
    store: stores[0],
    foodWasteSaved: 0.4,
  },
  {
    id: 'prod-14',
    name: 'Kangkung Hidroponik',
    description: 'Kangkung hidroponik bersih tanpa pestisida',
    originalPrice: 12000,
    discountedPrice: 4800,
    discountPercentage: 60,
    category: 'bahan-makanan',
    status: 'layak-konsumsi',
    stock: 15,
    expiryDate: '2025-12-17',
    productionDate: '2025-12-14',
    weight: 200,
    // Gambar sayuran hijau segar (mirip kangkung/bayam air)
    image: 'https://images.pexels.com/photos/8963467/pexels-photo-8963467.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[3],
    foodWasteSaved: 0.2,
  },
  {
    id: 'prod-15',
    name: 'Sisa Roti Tawar (Untuk Ternak)',
    description: 'Roti tawar sisa produksi 3 hari lalu, cocok untuk pakan ternak',
    originalPrice: 15000,
    discountedPrice: 3000,
    discountPercentage: 80,
    category: 'bahan-makanan',
    status: 'untuk-ternak',
    stock: 25,
    expiryDate: '2025-12-16',
    productionDate: '2025-12-11',
    weight: 800,
    // Gambar tumpukan roti sisa atau roti yang sudah sedikit keras
    image: 'https://images.pexels.com/photos/4197913/pexels-photo-4197913.jpeg',
    store: stores[0],
    foodWasteSaved: 0.8,
  },
  // {
  //   id: 'prod-16',
  //   name: 'Sayur Kubis Luaran (Untuk Ternak)',
  //   description: 'Daun kubis bagian luar yang masih segar, cocok untuk pakan ternak',
  //   originalPrice: 8000,
  //   discountedPrice: 2000,
  //   discountPercentage: 75,
  //   category: 'bahan-makanan',
  //   status: 'untuk-ternak',
  //   stock: 35,
  //   expiryDate: '2025-12-18',
  //   productionDate: '2025-12-13',
  //   weight: 1000,
  //   // Gambar sisa sayuran hijau atau daun kubis
  //   image: 'https://images.pexels.com/photos/11053183/pexels-photo-11053183.jpeg?auto=compress&cs=tinysrgb&w=600',
  //   store: stores[3],
  //   foodWasteSaved: 1.0,
  // },
  {
    id: 'prod-17',
    name: 'Coklat Cupcake',
    description: 'Coklat dalam cup plastik, dingin dan lezat',
    originalPrice: 12000,
    discountedPrice: 4800,
    discountPercentage: 60,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 9,
    expiryDate: '2025-12-16',
    productionDate: '2025-12-14',
    weight: 150,
    // Gambar puding coklat dalam cup atau gelas
    image: 'https://images.pexels.com/photos/913136/pexels-photo-913136.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[0],
    foodWasteSaved: 0.15,
  },
  {
    id: 'prod-18',
    name: 'Salad Sayur Fresh',
    description: 'Salad sayur segar dengan dressing thousand island terpisah',
    originalPrice: 35000,
    discountedPrice: 17500,
    discountPercentage: 50,
    category: 'makanan-jadi',
    status: 'layak-konsumsi',
    stock: 6,
    expiryDate: '2025-12-15',
    productionDate: '2025-12-14',
    weight: 300,
    // Gambar salad sayur segar di mangkuk
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=600',
    store: stores[2],
    foodWasteSaved: 0.3,
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getDaysUntilExpiry(expiryDate: string): number {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
