# 🌱 ecoBite

**ecoBite** adalah platform marketplace berkelanjutan yang menghubungkan penjual produk ramah lingkungan dengan pembeli yang peduli lingkungan. Platform ini menyediakan ekosistem yang lengkap untuk transaksi produk eco-friendly dengan fitur lengkap mulai dari autentikasi, manajemen produk, keranjang belanja, hingga sistem pembayaran dan review.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Kontribusi](#-kontribusi)

## ✨ Fitur Utama

### 🔐 Autentikasi & Otorisasi
- Registrasi dan login pengguna
- JWT-based authentication
- Role-based access control (Admin, Seller, Buyer)
- Password hashing dengan Argon2id

### 🛍️ Marketplace
- Katalog produk eco-friendly
- Pencarian dan filter produk
- Detail produk dengan multiple images
- Sistem kategori produk
- Review dan rating produk

### 👤 Manajemen Pengguna
- Profile pembeli (Buyer Profile)
- Profile penjual (Seller Profile)
- Manajemen alamat pengiriman
- Dashboard admin
- Dashboard seller

### 🛒 Shopping & Transaksi
- Keranjang belanja (Shopping Cart)
- Manajemen pesanan (Orders)
- Sistem pembayaran (Payments)
- Status tracking pesanan
- Notifikasi real-time

### 🗺️ Fitur Tambahan
- Integrasi OpenStreetMap untuk lokasi toko
- Landing page yang interaktif dengan parallax effect
- Responsive design untuk semua device
- Dark mode support

## 🛠️ Teknologi

### Frontend
- **Framework**: [Next.js](https://nextjs.org) 16.0+ (App Router)
- **Language**: TypeScript 5+
- **UI Framework**: React 19.2
- **Styling**: TailwindCSS 4.1+
- **UI Components**: 
  - Radix UI (Accessible components)
  - shadcn/ui (Component library)
  - Lucide React (Icons)
- **State Management**: 
  - TanStack Query v5 (Server state)
  - React Hook Form (Forms)
- **Validation**: Zod
- **HTTP Client**: Axios
- **Maps**: Leaflet + React Leaflet
- **AI Integration**: Google Generative AI
- **Charts**: Recharts
- **Animations**: TailwindCSS Animate

### Backend
- **Language**: Go 1.25.4
- **Framework**: Gin (HTTP web framework)
- **Database**: PostgreSQL
- **ORM**: GORM
- **Authentication**: JWT (golang-jwt/jwt)
- **Password Hashing**: Argon2id
- **Migration**: golang-migrate
- **Environment**: godotenv
- **Hot Reload**: Air

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: 
  - npm (Frontend)
  - Go Modules (Backend)

## 📁 Struktur Proyek

```
ecoBite/
├── FrontEnd/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── (auth)/      # Authentication pages (Login, Register)
│   │   │   ├── (dashboard)/ # Dashboard pages (Admin, Seller)
│   │   │   ├── (public)/    # Public pages (Landing page)
│   │   │   ├── (errors)/    # Error pages
│   │   │   └── api/         # API routes
│   │   ├── components/      # React components
│   │   │   ├── features/    # Feature-specific components
│   │   │   ├── layouts/     # Layout components
│   │   │   ├── shared/      # Shared components
│   │   │   └── ui/          # UI components (shadcn)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and helpers
│   │   ├── providers/       # Context providers
│   │   └── services/        # API services
│   ├── public/              # Static assets
│   └── package.json
│
├── BackEnd/                 # Go Backend Application
│   ├── cmd/                 # Application entrypoints
│   ├── internal/            # Internal packages
│   │   ├── auth/           # Authentication logic
│   │   ├── config/         # Configuration
│   │   ├── database/       # Database models
│   │   ├── handler/        # HTTP handlers
│   │   ├── routes/         # Route definitions
│   │   ├── server/         # Server setup
│   │   └── service/        # Business logic
│   ├── migrations/         # Database migrations
│   │   ├── 000001_users
│   │   ├── 000002_addresses
│   │   ├── 000003_seller_profile
│   │   ├── 000004_buyer_profile
│   │   ├── 000005_products
│   │   ├── 000006_carts
│   │   ├── 000007_cart_items
│   │   ├── 000008_orders
│   │   ├── 000009_order_items
│   │   ├── 000010_payments
│   │   ├── 000011_reviews
│   │   ├── 000012_notifications
│   │   └── 000013_product_images
│   ├── storage/            # File storage
│   ├── go.mod
│   └── .air.toml           # Air configuration
│
└── README.md               # This file
```

## 🚀 Instalasi

### Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** 18+ dan npm
- **Go** 1.25.4+
- **PostgreSQL** 14+
- **Git**

### Clone Repository

```bash
git clone <repository-url>
cd ecoBite
```

### Setup Frontend

```bash
cd FrontEnd
npm install
```

### Setup Backend

```bash
cd BackEnd
go mod download
```

### Install Air (untuk hot reload)

```bash
go install github.com/air-verse/air@latest
```

## ⚙️ Konfigurasi

### Frontend Configuration

1. Copy file environment example:
```bash
cd FrontEnd
cp env.example .env.local
```

2. Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Backend Configuration

1. Copy file environment:
```bash
cd BackEnd
cp .env.example .env
```

2. Edit `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ecobite
DB_SSLMODE=disable

JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=24h

SERVER_PORT=8080
SERVER_MODE=debug
```

### Database Setup

1. Buat database PostgreSQL:
```sql
CREATE DATABASE ecobite;
```

2. Jalankan migrations:
```bash
cd BackEnd
migrate -path migrations -database "postgresql://user:password@localhost:5432/ecobite?sslmode=disable" up
```

Atau jika menggunakan `make`:
```bash
make migrate-up
```

## 🏃 Menjalankan Aplikasi

### Development Mode

#### Backend (Terminal 1)
```bash
cd BackEnd
air
# atau tanpa hot reload:
go run cmd/main.go
```

Backend akan berjalan di: `http://localhost:8080`

#### Frontend (Terminal 2)
```bash
cd FrontEnd
npm run dev
```

Frontend akan berjalan di: `http://localhost:3000`

### Production Build

#### Backend
```bash
cd BackEnd
go build -o ecobite cmd/main.go
./ecobite
```

#### Frontend
```bash
cd FrontEnd
npm run build
npm start
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
POST   /api/auth/logout      # Logout user
GET    /api/auth/me          # Get current user
```

### Users
```
GET    /api/users            # Get all users (Admin)
GET    /api/users/:id        # Get user by ID
PUT    /api/users/:id        # Update user
DELETE /api/users/:id        # Delete user (Admin)
```

### Products
```
GET    /api/products         # Get all products
GET    /api/products/:id     # Get product by ID
POST   /api/products         # Create product (Seller)
PUT    /api/products/:id     # Update product (Seller)
DELETE /api/products/:id     # Delete product (Seller)
```

### Cart
```
GET    /api/cart             # Get user cart
POST   /api/cart/items       # Add item to cart
PUT    /api/cart/items/:id   # Update cart item
DELETE /api/cart/items/:id   # Remove cart item
```

### Orders
```
GET    /api/orders           # Get user orders
GET    /api/orders/:id       # Get order by ID
POST   /api/orders           # Create order
PUT    /api/orders/:id       # Update order status
```

### Reviews
```
GET    /api/products/:id/reviews  # Get product reviews
POST   /api/products/:id/reviews  # Create review
PUT    /api/reviews/:id           # Update review
DELETE /api/reviews/:id           # Delete review
```

## 🗄️ Database Schema

### Core Tables
- **users** - Data pengguna sistem
- **addresses** - Alamat pengiriman pengguna
- **seller_profiles** - Profile khusus seller
- **buyer_profiles** - Profile khusus buyer

### Product Management
- **products** - Katalog produk
- **product_images** - Gambar produk

### Shopping & Transaction
- **carts** - Keranjang belanja
- **cart_items** - Item dalam keranjang
- **orders** - Pesanan
- **order_items** - Item dalam pesanan
- **payments** - Data pembayaran

### Engagement
- **reviews** - Review produk
- **notifications** - Notifikasi pengguna

## 🤝 Kontribusi

Kontribusi selalu diterima! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tim Pengembang

- **Wong Sangar** - Initial work

## 🙏 Acknowledgments

- Next.js Team untuk framework yang luar biasa
- Gin Framework untuk HTTP routing yang cepat
- shadcn untuk UI components yang beautiful
- Dan semua open source contributors

---

**Built with ❤️ for a sustainable future**
