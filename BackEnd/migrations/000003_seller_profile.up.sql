-- ENUM untuk status verifikasi
CREATE TYPE verification_status_enum AS ENUM ('pending', 'approved', 'rejected');

-- Tabel seller_profile
CREATE TABLE IF NOT EXISTS seller_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    store_name VARCHAR(150) NOT NULL,
    owner_name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,

    store_image TEXT,
    store_description TEXT,

    verification_status verification_status_enum DEFAULT 'pending',

    ktp_number VARCHAR(100),
    ktp_image TEXT,

    verified_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

