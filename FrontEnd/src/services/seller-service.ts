import { api } from '@/lib/axios'
import { ENDPOINTS } from '@/lib/endpoints'
import { z } from 'zod'

// 1. Schema Validasi Input
export const CreateSellerSchema = z.object({
  store_name: z.string().min(3, 'Nama toko minimal 3 karakter'),
  store_description: z.string().optional(),
  address: z.string().min(10, 'Alamat harus lengkap (min 10 karakter)'),
  phone_number: z.string().min(10, 'Nomor HP tidak valid').regex(/^\d+$/, 'Hanya boleh angka'),
})

export type CreateSellerFormValues = z.infer<typeof CreateSellerSchema>

// 2. Service Function
export const sellerService = {
  createSeller: async (data: CreateSellerFormValues) => {
    const response = await api.post(ENDPOINTS.CREATE_SELLER, data)
    return response.data
  },
}
