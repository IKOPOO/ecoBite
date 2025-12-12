CREATE TYPE order_status_enum AS ENUM ('pending', 'paid', 'process', 'on_delivery', 'completed', 'cancelled');
CREATE TYPE payment_method_enum AS ENUM ('cod', 'transfer', 'ewallet', 'qris');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'paid', 'failed');
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    buyer_id UUID NOT NULL REFERENCES buyer_profile(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES seller_profile(id) ON DELETE CASCADE,

    total_amount DECIMAL(12,2) NOT NULL,

    status order_status_enum DEFAULT 'pending',
    payment_method payment_method_enum,
    payment_status payment_status_enum DEFAULT 'pending',

    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

