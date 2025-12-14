import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value

  // --- 1. PROTEKSI HALAMAN AUTH ---
  if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin', request.url))
    if (role === 'seller') return NextResponse.redirect(new URL('/seller', request.url))
    return NextResponse.redirect(new URL('/', request.url))
  }

  // --- 2. PROTEKSI HALAMAN ADMIN ---
  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    if (role !== 'admin') return NextResponse.redirect(new URL('/forbidden', request.url))
  }

  // --- 3. PROTEKSI HALAMAN SELLER ---
  if (pathname.startsWith('/seller')) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    // admin boleh ngintip, buyer gaboleh
    if (role !== 'seller' && role !== 'admin') {
      // kecuali halaman onboarding seller, mungkin perlu pengecualian?
      // tapi karena onboarding url-nya /buyer/open-store, jadi aman.
      return NextResponse.redirect(new URL('/forbidden', request.url))
    }
  }

  // --- 4. PROTEKSI HALAMAN BUYER ---
  if (pathname.startsWith('/buyer')) {
    // 👇 PERBAIKAN DISINI: TAMBAH TANDA SERU (!)
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/buyer/:path*', '/login', '/register'],
}
