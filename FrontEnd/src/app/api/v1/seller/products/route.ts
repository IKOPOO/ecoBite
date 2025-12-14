import { NextResponse } from 'next/server'

// Data awal (Mock Database)
let sellerProducts = [
  {
    id: '1',
    name: 'Croissant Butter',
    category: 'Roti & Pastry',
    originalPrice: 25000,
    discountPrice: 15000,
    stock: 12,
    expiry: '2024-01-15 18:00',
    status: 'active',
    image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'Croissant lezat dengan butter premium',
  },
  {
    id: '2',
    name: 'Roti Gandum',
    category: 'Roti & Pastry',
    originalPrice: 18000,
    discountPrice: 10000,
    stock: 8,
    expiry: '2024-01-15 20:00',
    status: 'active',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'Roti gandum sehat',
  },
]

export async function GET() {
  return NextResponse.json({ success: true, data: sellerProducts })
}

export async function POST(request: Request) {
  const body = await request.json()

  const newProduct = {
    id: String(Date.now()), // Generate ID
    ...body,
    status: 'active', // Default status
  }

  // Simpan ke array (in-memory)
  sellerProducts.push(newProduct)

  return NextResponse.json({ success: true, data: newProduct })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  sellerProducts = sellerProducts.filter((p) => p.id !== id)

  return NextResponse.json({ success: true, message: 'Deleted' })
}
