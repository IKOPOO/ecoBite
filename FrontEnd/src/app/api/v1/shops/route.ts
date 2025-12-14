// app/api/v1/shops/route.ts
import { NextResponse } from 'next/server'

// Data dummy yang tadi kita buat
const foodRescueSpots = [
  {
    id: 1,
    name: 'Bakery Aroma Tembalang',
    category: 'Roti & Kue',
    address: 'Jl. Ngesrep Timur V',
    lat: -7.0495,
    lng: 110.4375,
    items: 'Mystery Box Roti',
    status: 'Layak Makan',
    price: 'Diskon 50%',
  },
  // ... (masukkan sisa data dummy di sini)
]

export async function GET() {
  // Simulasi loading network
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    data: foodRescueSpots,
  })
}
