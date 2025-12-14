# 🚀 Quick Start - Snap & Cook Feature

## Setup dalam 3 Menit

### 1. Dapatkan Gemini API Key

1. Buka [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan akun Google
3. Klik **"Create API Key"**
4. Copy API key yang dihasilkan

### 2. Konfigurasi Environment

```bash
cd FrontEnd

# Buat file .env.local
cp env.example .env.local

# Edit .env.local dan tambahkan API key
# NEXT_PUBLIC_GEMINI_API_KEY=paste_your_api_key_here
```

### 3. Jalankan Development Server

```bash
npm run dev
```

### 4. Buka di Browser

Navigate to: **http://localhost:3000/buyer/snap-cook**

---

## Cara Menggunakan

1. **Login sebagai Buyer** (atau register jika belum punya akun)

2. **(Opsional) Tambah Produk ke Cart**
   - Kunjungi `/buyer/marketplace`
   - Pilih beberapa produk
   - Tambahkan ke cart

3. **Buka Snap & Cook**
   - Navigate ke `/buyer/snap-cook`
   - Atau klik menu Snap & Cook di dashboard

4. **Ambil Foto Bahan Makanan**
   - Klik "Buka Kamera" untuk live camera
   - Atau klik "Upload Foto" untuk pilih dari galeri
   - Pastikan pencahayaan cukup baik

5. **Tunggu Chef SavorBite Menganalisis**
   - AI akan menganalisis foto Anda
   - Dan melihat isi keranjang belanja
   - Proses 5-15 detik

6. **Lihat Rekomendasi Resep**
   - Recipe name dan penjelasan
   - Bahan yang sudah ada (dari foto)
   - Bahan yang perlu dibeli (dari cart)
   - Langkah-langkah memasak

7. **Checkout atau Coba Lagi**
   - Klik "Checkout Sekarang" untuk beli bahan
   - Atau "Coba Foto Lain" untuk resep berbeda

---

## Troubleshooting

### Error: "Gemini API Key is not set"

**Solusi:**
- Pastikan file `.env.local` ada di folder `FrontEnd`
- Pastikan nama variable: `NEXT_PUBLIC_GEMINI_API_KEY`
- Restart development server setelah menambah API key

### Error: "Tidak dapat mengakses kamera"

**Solusi:**
- Pastikan browser memiliki izin kamera
- Gunakan HTTPS atau localhost
- Coba "Upload Foto" sebagai alternatif

### Error: TypeScript "Cannot find module '@/components/ui/alert'"

**Solusi:**
- Restart VSCode TypeScript server:
  - Cmd/Ctrl + Shift + P
  - Ketik: "TypeScript: Restart TS Server"
- Atau restart VSCode

### Recipe tidak relevan atau dalam bahasa Inggris

**Solusi:**
- Ambil foto dengan pencahayaan lebih baik
- Pastikan bahan makanan terlihat jelas
- Coba foto dari angle berbeda
- Model AI masih belajar - hasilnya bisa bervariasi

---

## Tips untuk Hasil Terbaik

📸 **Foto yang Bagus:**
- Pencahayaan natural atau terang
- Bahan makanan terlihat jelas
- Tidak blur atau terlalu gelap
- Background kontras dengan bahan makanan

🛒 **Cart yang Relevan:**
- Tambahkan 2-5 item di cart
- Pilih bahan yang biasa digunakan bersama
- Produk sayur, protein, atau bumbu

🍳 **Ekspektasi Realistis:**
- Resep sederhana dan praktis
- Menggunakan alat dapur standar
- Bahan pelengkap (garam, minyak) diasumsikan ada

---

## Debugging

### Check API Configuration

```bash
# Di terminal FrontEnd folder
cat .env.local | grep GEMINI

# Should output:
# NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

### Test Gemini API

Buka browser console di `/buyer/snap-cook` dan cek:
- Tidak ada error "API key not set"
- Check network tab untuk API calls ke Gemini

### Verify Build

```bash
npm run build

# Should show:
# ├ ○ /buyer/snap-cook
```

---

## Next Steps

✅ Feature sudah siap digunakan!

**Testing Checklist:**
- [ ] Test dengan berbagai jenis bahan (sayur, daging, bumbu)
- [ ] Test dengan cart kosong vs cart berisi
- [ ] Test di mobile device
- [ ] Test di browser berbeda (Chrome, Safari, Firefox)

**Future Ideas:**
- Simpan resep favorit
- History resep
- Share resep ke social media
- Filter dietary preferences (vegetarian, halal, dll)

---

## Support

Jika ada masalah:
1. Check [SNAP_COOK.md](./SNAP_COOK.md) untuk dokumentasi lengkap
2. Check browser console untuk error messages
3. Restart TypeScript server jika ada import errors
4. Rebuild aplikasi: `npm run build`

---

**Selamat Memasak! 👨‍🍳**
