import { api } from '@/lib/axios'
import { ENDPOINTS } from '@/lib/endpoints'
import { z } from 'zod'

// 1. Schema Validasi (Zod)
// Ini validasi di sisi Frontend biar user ga ngasal
export const RegisterSchema = z
  .object({
    fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
    role: z.enum(['BUYER', 'SELLER'], {
      required_error: 'Pilih peran Anda (Pembeli/Penjual)',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'], // Error muncul di field confirmPassword
  })

export const LoginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
})

// Tipe data inferred dari Zod
export type RegisterFormValues = z.infer<typeof RegisterSchema>
export type LoginFormValues = z.infer<typeof LoginSchema>

// 2. Service Function
export const authService = {
  register: async (data: RegisterFormValues) => {
    // Kita buang field 'confirmPassword' sebelum kirim ke Go
    // Karena Backend biasanya cuma butuh password doang
    const { confirmPassword, ...payload } = data

    const response = await api.post(ENDPOINTS.REGISTER, payload)
    return response.data
  },

  login: async (data: LoginFormValues) => {
    const response = await api.post(ENDPOINTS.LOGIN, data)
    return response.data // Biasanya isinya { token, role, user_id }
  },

  logout: async () => {
    const response = await api.post(ENDPOINTS.LOGOUT)
    return response.data
  },
}
