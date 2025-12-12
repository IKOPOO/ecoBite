CREATE TABLE IF NOT EXISTS addresses (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,

    label VARCHAR(20) NOT NULL
        CHECK (label IN ('rumah', 'kos', 'kantor')),

    recipient_name VARCHAR(100) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,

    address TEXT NOT NULL,

    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),

    is_default BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_address_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

