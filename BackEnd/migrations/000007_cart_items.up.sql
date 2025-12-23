CREATE TABLE IF NOT EXISTS cart_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    price_at_time DECIMAL(12,2) NOT NULL,
    quantity INT NOT NULL,
    addet_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

