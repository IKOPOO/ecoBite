import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, LoginFormValues, RegisterFormValues } from '@/services/auth-service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner' // Pake toast library kamu
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  user_id: string
  email: string
  full_name: string
  role: string
  exp: number
}

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterFormValues) => authService.register(data),

    onSuccess: (response) => {
      const data = response.data || response // Handle beda struktur axios
      const { token, role, user } = data

      if (token) {
        Cookies.set('token', token, { expires: 1 })
        Cookies.set('role', role, { expires: 1 })
        localStorage.setItem('token', token)

        // HANYA SIMPAN JIKA USER ADA DATANYA
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
        }
      }
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginFormValues) => authService.login(data),

    onSuccess: (response) => {
      const data = response.data || response
      const { token } = data

      if (!token) {
        toast.error('Login Gagal', { description: 'Token tidak diterima.' })
        return
      }

      try {
        // decode token
        const decoded = jwtDecode<JwtPayload>(token)
        const role = decoded.role ? decoded.role : 'buyer'

        // susun data user
        const userPayload = {
          id: decoded.user_id,
          fullName: decoded.full_name,
          email: decoded.email,
          username: decoded.full_name.replace(/\s+/g, '').toLowerCase(),
          role: role,
        }

        // simpan cookies (middleware)
        Cookies.set('token', token, { expires: 1 })
        Cookies.set('role', role, { expires: 1 })

        // simpan localstorage (client ui)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userPayload))

        // reset cache & notifikasi
        queryClient.clear()

        toast.success('Login Berhasil!', {
          description: 'Selamat datang kembali!',
        })

        // redirect sesuai role
        if (role === 'seller') {
          router.push('/seller')
        } else if (role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } catch (error) {
        toast.error('Login Error', { description: 'Gagal memproses data login.' })
      }
    },

    onError: (error: any) => {
      const errorMsg = error.response?.data?.error || 'Gagal login.'
      toast.error('Gagal Masuk', { description: errorMsg })
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
