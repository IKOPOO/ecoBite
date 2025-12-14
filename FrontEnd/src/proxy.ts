import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value

  // --- 1. HANDLING USER YANG SUDAH LOGIN ---
  // Jika sudah punya token DAN mencoba akses: Login, Register, atau Halaman Utama (/)
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname === '/')) {
    // Redirect sesuai role
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    if (role === 'seller') {
      return NextResponse.redirect(new URL('/seller', request.url))
    }

    // REQUEST KAMU: Buyer/User biasa dilempar ke marketplace
    return NextResponse.redirect(new URL('/buyer/marketplace', request.url))
  }

  // --- 2. PROTEKSI HALAMAN ADMIN ---
  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    if (role !== 'admin') return NextResponse.redirect(new URL('/forbidden', request.url))
  }

  // --- 3. PROTEKSI HALAMAN SELLER ---
  if (pathname.startsWith('/seller')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    if (role !== 'seller' && role !== 'admin') {
      return NextResponse.redirect(new URL('/forbidden', request.url))
    }
  }

  // --- 4. PROTEKSI HALAMAN BUYER ---
  if (pathname.startsWith('/buyer')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // PENTING: Tambahkan '/' di sini agar middleware mendeteksi halaman utama
  matcher: ['/', '/admin/:path*', '/seller/:path*', '/buyer/:path*', '/login', '/register'],
}
