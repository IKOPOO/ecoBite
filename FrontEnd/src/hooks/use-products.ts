import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/product-service'

// Hook untuk ambil BANYAK produk
export const useProducts = (filters?: { category?: string; search?: string }) => {
  return useQuery({
    // Query Key: Kalo filters berubah, dia otomatis fetch ulang
    queryKey: ['products', filters],

    // Query Fn: Panggil service yang tadi
    queryFn: () => productService.getAll(filters),

    // Opsi tambahan (bisa dikosongin)
    staleTime: 1000 * 60, // Data dianggap fresh 1 menit
  })
}

// Hook untuk ambil SATU produk detail
export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getOne(id),
    enabled: !!id, // Cuma jalan kalo ID-nya ada (biar ga error)
  })
}
