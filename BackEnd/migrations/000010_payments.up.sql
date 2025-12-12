CREATE TYPE payment_method_enum2 AS ENUM ('e-wallet', 'cod', 'transfer_bank', 'qris');
CREATE TYPE payment_status_enum2 AS ENUM ('pending', 'paid', 'failed', 'expired');
CREATE TABLE IF NOT EXISTS payment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    amount DECIMAL(12,2) NOT NULL,

    payment_method payment_method_enum2 NOT NULL,
    payment_status payment_status_enum2 DEFAULT 'pending',

    payment_proof_url TEXT,
    transaction_id VARCHAR(255),
    payment_token VARCHAR(255),

    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

