CREATE TABLE IF NOT EXISTS buyer_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    profile_image TEXT,
    allergic TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

