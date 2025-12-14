// app/api/v1/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Pura-pura baca data yang dikirim user (email/password)
  const body = await request.json()

  // Simulasi logika login sederhana
  // Misal: Asal ada isinya, dianggap sukses
  if (body.email && body.password) {
    // Kita delay sedikit biar kerasa kayak loading beneran (1 detik)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: 'Login Berhasil (Mode Simulasi)',
        data: {
          token: 'dummy-token-123456', // Token palsu
          user: {
            id: 1,
            name: 'User Food Rescue',
            email: body.email,
          },
        },
      },
      { status: 200 },
    )
  }

  // Simulasi jika gagal
  return NextResponse.json({ success: false, message: 'Email atau password salah' }, { status: 401 })
}
