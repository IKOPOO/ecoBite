import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

// 1. CONFIG BASE URL
// Kita ambil dari Environment Variable, kalau gak ada pake localhost (buat dev)
// Backend Golang biasanya jalan di port 8080
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // HAPUS header 'ngrok-skip-browser-warning' disini. Cloudflare gak butuh.
  },
  timeout: 10000,
})

// ==============================================================================
// 2. REQUEST INTERCEPTOR (Satpam Pintu Keluar)
// Tugas: Cek dompet user, kalau ada "KTP" (Token), tempel ke jidat (Header)
// ==============================================================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Cek apakah kita sedang di browser (Client Side) atau Server
    if (typeof window !== 'undefined') {
      // Ambil token dari LocalStorage (atau Cookies)
      const token = localStorage.getItem('token')

      // Kalau token ada, tempel ke Header Authorization
      // Format standar Golang middleware biasanya: "Bearer <token>"
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// ==============================================================================
// 3. RESPONSE INTERCEPTOR (Satpam Pintu Masuk)
// Tugas: Cek balasan dari Backend. Kalau error 401 (Token Expired), tendang ke login.
// ==============================================================================
api.interceptors.response.use(
  (response) => {
    // Kalau sukses (200, 201), loloskan data apa adanya
    return response
  },
  (error: AxiosError) => {
    // Cek status code dari error response
    if (error.response) {
      const status = error.response.status

      // CASE: 401 UNAUTHORIZED
      // Artinya token user sudah kadaluarsa atau tidak valid
      if (status === 401) {
        if (typeof window !== 'undefined') {
          // 1. Hapus token busuk dari storage
          localStorage.removeItem('token')
          localStorage.removeItem('user') // Hapus data user juga kalau ada

          // 2. Redirect paksa ke halaman login
          // Kita pakai window.location biar full refresh (state bersih)
          // Kecuali kamu lagi di halaman login, jangan redirect (looping nanti)
          if (!window.location.pathname.startsWith('/login')) {
            window.location.href = '/login?session_expired=true'
          }
        }
      }

      // CASE: 403 FORBIDDEN (Opsional)
      // Artinya user login, tapi gak punya hak akses (User biasa coba buka Admin)
      if (status === 403) {
        // Bisa redirect ke halaman Forbidden yg kita buat tadi
        // window.location.href = "/forbidden"
      }
    }

    // Kembalikan error biar bisa di-handle sama TanStack Query / UI (munculin Toast dll)
    return Promise.reject(error)
  },
)
