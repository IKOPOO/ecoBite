import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, LoginFormValues, RegisterFormValues } from '@/services/auth-service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner' // Pake toast library kamu
import Cookies from 'js-cookie'

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterFormValues) => authService.register(data),

    onSuccess: () => {
      toast.success('Pendaftaran Berhasil!', {
        description: 'Silakan login dengan akun baru Anda.',
      })
      // Redirect ke halaman login setelah sukses
      router.push('/login')
    },

    onError: (error: any) => {
      // Ambil pesan error dari Backend Go (biasanya response.data.error)
      const errorMsg = error.response?.data?.error || 'Gagal mendaftar. Coba lagi nanti.'
      toast.error('Registrasi Gagal', {
        description: errorMsg,
      })
    },
  })
}

export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginFormValues) => authService.login(data),

    onSuccess: (response) => {
      // Asumsi respons BE kamu bentuknya:
      // { data: { token: "abc...", role: "SELLER", user: { ... } } }
      // Nanti sesuaikan path-nya kalau beda strukturnya.

      const { token, role, user } = response.data || response

      // 1. Simpan Token
      if (token) {
        Cookies.set('token', token, { expires: 1 }) // Expire 1 hari
        Cookies.set('role', role, { expires: 1 }) // Buat middleware tau dia siapa
        localStorage.setItem('token', token) // Buat Axios Interceptor

        // Opsional: Simpan data user buat profil
        localStorage.setItem('user', JSON.stringify(user))
      }

      toast.success('Login Berhasil!', {
        description: 'Selamat datang kembali di ecoBite.',
      })

      // 2. Redirect Sesuai Role
      if (role === 'ADMIN') {
        router.push('/admin')
      } else if (role === 'SELLER') {
        router.push('/seller')
      } else {
        // Buyer atau user biasa ke halaman utama
        router.push('/')
      }
    },

    onError: (error: any) => {
      const errorMsg = error.response?.data?.error || 'Email atau password salah.'
      toast.error('Gagal Masuk', {
        description: errorMsg,
      })
    },
  })
}

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient() // Ambil instance query client

  return useMutation({
    mutationFn: authService.logout,

    // Kita pakai onSettled, bukan onSuccess.
    // Kenapa? Karena sukses atau gagal (misal server down),
    // user TETAP harus bisa logout dari sisi frontend.
    onSettled: () => {
      // 1. Hapus semua jejak token
      Cookies.remove('token')
      Cookies.remove('role')
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // 2. Bersihkan Cache Data (PENTING!)
      // Biar pas user lain login, dia gak liat data user sebelumnya
      queryClient.clear()

      // 3. Notifikasi
      toast.success('Sampai Jumpa!', {
        description: 'Anda berhasil keluar.',
      })

      // 4. Tendang ke Login atau Home
      router.push('/login')

      // Opsional: Force Refresh halaman biar state React bersih total
      // router.refresh()
    },
  })
}
