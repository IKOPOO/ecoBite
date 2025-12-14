import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ambil token dan role dari Cookies
  // Pastikan backend/frontend login set cookie bernama 'token' dan 'role'
  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value // "ADMIN" | "SELLER" | "BUYER"

  // --- 1. PROTEKSI HALAMAN AUTH (Login/Register) ---
  // Kalau user sudah login, jangan boleh masuk halaman login lagi
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    // Redirect ke dashboard masing-masing
    if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin', request.url))
    if (role === 'SELLER') return NextResponse.redirect(new URL('/seller', request.url))
    return NextResponse.redirect(new URL('/', request.url)) // Buyer ke home
  }

  // --- 2. PROTEKSI HALAMAN ADMIN ---
  if (pathname.startsWith('/admin')) {
    // Kalau gak ada token, tendang ke login
    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
    }
    // Kalau ada token tapi bukan ADMIN, tendang ke forbidden
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/forbidden', request.url))
    }
  }

  // --- 3. PROTEKSI HALAMAN SELLER ---
  if (pathname.startsWith('/seller')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=/seller', request.url))
    }
    // Admin biasanya boleh ngintip dashboard seller, tapi buyer ga boleh
    if (role !== 'SELLER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/forbidden', request.url))
    }
  }

  // --- 4. PROTEKSI HALAMAN BUYER (Profile, Cart, dll) ---
  // Kita asumsikan /buyer/* butuh login
  if (pathname.startsWith('/buyer')) {
    if (token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Konfigurasi: Middleware cuma jalan di rute-rute ini biar ga berat
export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/buyer/:path*', '/login', '/register'],
}
