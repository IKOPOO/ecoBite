'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

// Service Functions
const fetchProducts = async () => {
  const res = await axios.get('/api/v1/seller/products')
  return res.data.data
}

const createProduct = async (data: any) => {
  const res = await axios.post('/api/v1/seller/products', data)
  return res.data
}

const removeProduct = async (id: string) => {
  const res = await axios.delete(`/api/v1/seller/products?id=${id}`)
  return res.data
}

// Custom Hook
export const useSellerProducts = () => {
  const queryClient = useQueryClient()

  // 1. Ambil Data
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['seller-products'],
    queryFn: fetchProducts,
  })

  // 2. Tambah Data
  const addMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] })
      toast.success('Produk berhasil ditambahkan!')
    },
    onError: () => toast.error('Gagal menambah produk'),
  })

  // 3. Hapus Data
  const deleteMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] })
      toast.success('Produk dihapus')
    },
    onError: () => toast.error('Gagal menghapus produk'),
  })

  return {
    products,
    isLoading,
    addProduct: addMutation.mutateAsync, // Pakai Async biar bisa di-await di UI
    deleteProduct: deleteMutation.mutate,
    isAdding: addMutation.isPending,
  }
}
