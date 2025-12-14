import { api } from '@/lib/axios'
import { ENDPOINTS } from '@/lib/endpoints'
import axios from 'axios'
import { z } from 'zod'

// 1. Definisikan Bentuk Data (Schema)
// Biar kita tau data yang masuk bentuknya kayak apa
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  storeName: z.string().optional(),
  imageUrl: z.string().optional(),
})

export type Product = z.infer<typeof ProductSchema>

// 2. Definisikan Parameter (Props) yang dikirim dari Page
interface GetProductsParams {
  category?: string
  search?: string
  page?: number
}

interface CreateProductPayload {
  name: string
  price: number
  description: string
}

// 3. Fungsi Fetching
export const productService = {
  getAll: async (params?: GetProductsParams) => {
    // URL diambil dari variable, jadi aman
    const response = await api.get(ENDPOINTS.PRODUCTS, {
      params: params, // Axios otomatis ubah jadi ?category=x&search=y
    })

    // Validasi data dari backend (Optional tapi recommended)
    // return z.array(ProductSchema).parse(response.data.data)

    return response.data.data // Balikin raw data dulu sementara
  },

  getOne: async (id: string) => {
    const response = await api.get(ENDPOINTS.PRODUCT_DETAIL(id))
    return response.data.data
  },

  create: async (payload: CreateProductPayload) => {
    const response = await api.post(ENDPOINTS.CREATE_PRODUCT, payload)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(ENDPOINTS.DELETE_PRODUCT(id))
    return response.data
  },

  update: async (id: string, payload: Partial<CreateProductPayload>) => {
    const response = await api.patch(ENDPOINTS.UPDATE_PRODUCT(id), payload)
    return response.data
  },
}

export const getSellerProducts = async () => {
  // Panggil API Route lokal yang baru kita buat
  const response = await axios.get('/api/v1/seller/products')
  return response.data.data
}

export const createProduct = async (productData: any) => {
  const response = await axios.post('/api/v1/seller/products', productData)
  return response.data
}
