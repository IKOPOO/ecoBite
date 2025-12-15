import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie' // Pastikan install: npm install js-cookie

// 1. CONFIG BASE URL
// Kita pakai path relative '/api/v1' supaya request masuk ke Proxy Next.js dulu.
// Proxy Next.js (di next.config.ts) yang akan meneruskan ke Cloudflare.
const BASE_URL = '/api/v1'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Header ngrok SUDAH DIHAPUS karena pakai Cloudflare
  },
  timeout: 10000,
})

// ==============================================================================
// 2. REQUEST INTERCEPTOR (Cuma Perlu SATU)
// ==============================================================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Cek Token dari Cookies dulu (prioritas), baru localStorage
    const token = Cookies.get('token') || (typeof window !== 'undefined' ? localStorage.getItem('token') : null)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// ==============================================================================
// 3. RESPONSE INTERCEPTOR
// ==============================================================================
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      // 401: Token Expired / Tidak Valid
      if (status === 401) {
        if (typeof window !== 'undefined') {
          // Bersihkan semua penyimpanan
          Cookies.remove('token')
          Cookies.remove('role')
          localStorage.removeItem('token')
          localStorage.removeItem('user')

          // Redirect ke login jika belum disana
          if (!window.location.pathname.startsWith('/login')) {
            window.location.href = '/login?session_expired=true'
          }
        }
      }
    }
    return Promise.reject(error)
  },
)
