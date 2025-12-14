// --- CONFIG API ---
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'

// --- DAFTAR ENDPOINT (Kamus URL) ---
export const ENDPOINTS = {
  // AUTH
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  // MARKETPLACE
  PRODUCTS: '/products', // <-- Nanti uncomment ini kalo Golang udah ready
  // PRODUCTS: '/products-dummy', // <-- Sementara pake ini dulu

  CREATE_PRODUCT: '/products', // method POST
  UPDATE_PRODUCT: (id: string) => `/products/${id}`, // method PUT/PATCH
  DELETE_PRODUCT: (id: string) => `/products/${id}`, // method DELETE

  PRODUCT_DETAIL: (id: string) => `/products/${id}`, // Dynamic URL

  // TRANSACTION
  CHECKOUT: '/transactions/checkout',
}
