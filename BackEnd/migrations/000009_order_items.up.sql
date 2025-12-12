CREATE TABLE IF NOT EXISTS order_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE RESTRICT,

    price DECIMAL(12,2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,

    -- otomatis hitung ulang ketika insert (opsional)
    -- CHECK (subtotal = price * quantity)
    -- kalau mau bisa ditambahkan, kalau tidak saya hapus
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

