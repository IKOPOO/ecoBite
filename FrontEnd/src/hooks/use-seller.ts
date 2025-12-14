import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sellerService, CreateSellerFormValues } from '@/services/seller-service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

export const useCreateSeller = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sellerService.createSeller,

    onSuccess: (response) => {
      // 1. Update Role di Cookie (PENTING biar middleware ngebolehin masuk /seller)
      Cookies.set('role', 'SELLER')

      // 2. Notif
      toast.success('Toko Berhasil Dibuat!', {
        description: 'Selamat berjualan di ecoBite.',
      })

      // 3. Invalidate cache user (karena statusnya berubah)
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })

      // 4. Redirect ke Dashboard Seller
      router.push('/seller')
    },

    onError: (error: any) => {
      const msg = error.response?.data?.error || 'Gagal membuat toko.'
      toast.error('Gagal', { description: msg })
    },
  })
}
