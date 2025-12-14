// src/hooks/use-product-mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/services/product-service'
import { toast } from 'sonner' // Asumsi pake library toast (opsional)

// Hook buat DELETE
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    // Fungsi yang akan dijalankan
    mutationFn: (id: string) => productService.delete(id),

    // Kalo SUKSES, ngapain?
    onSuccess: () => {
      toast.success('Produk berhasil dihapus')

      // MAGIC HAPPENS HERE! ✨
      // Kita suruh Tanstack Query buat "Lupakan" cache produk lama
      // dan ambil data baru dari server otomatis.
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },

    // Kalo ERROR, ngapain?
    onError: (error: any) => {
      toast.error(error.message || 'Gagal menghapus produk')
    },
  })
}

// Hook buat CREATE (POST)
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productService.create, // Ga perlu wrapper arrow func kalo parameter sama
    onSuccess: () => {
      toast.success('Produk berhasil dibuat!')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
