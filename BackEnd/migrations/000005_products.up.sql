CREATE TYPE tipe_produk_enum AS ENUM ('makanan_jadi', 'bahan_makanan');
CREATE TYPE status_kondisi_enum AS ENUM ('hampir_kadaluarsa', 'kadaluwarsa');
CREATE TYPE target_user_enum AS ENUM ('manusia', 'ternak');
CREATE TYPE product_status_enum AS ENUM ('active', 'inactive', 'banned');

-- TABLE: product
CREATE TABLE IF NOT EXISTS product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profile(id) ON DELETE CASCADE,
    nama VARCHAR(150) NOT NULL,
    deskripsi TEXT,
    harga DECIMAL(12,2) NOT NULL,
    harga_asli DECIMAL(12,2),
    stock INT NOT NULL DEFAULT 0,
    berat_in_grams DECIMAL(10,2),
    tipe_produk tipe_produk_enum NOT NULL,
    status_kondisi status_kondisi_enum NOT NULL,
    target_user target_user_enum NOT NULL,
    tanggal_kadaluwarsa DATE NOT NULL,
    status product_status_enum DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

