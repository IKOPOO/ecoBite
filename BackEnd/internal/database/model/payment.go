package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type PaymentModel struct {
	DB *gorm.DB
}

type Payment struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`

	OrderID uuid.UUID `gorm:"type:uuid;not null" json:"order_id"`
	UserID  uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`

	Amount float64 `gorm:"type:decimal(12,2);not null" json:"amount"`

	PaymentMethod string `gorm:"type:payment_method_enum2;not null" json:"payment_method"`
	PaymentStatus string `gorm:"type:payment_status_enum2;default:'pending'" json:"payment_status"`

	PaymentProofURL string `gorm:"type:text" json:"payment_proof_url"`
	TransactionID   string `gorm:"type:varchar(255)" json:"transaction_id"`
	PaymentToken    string `gorm:"type:varchar(255)" json:"payment_token"`

	PaidAt    *time.Time `json:"paid_at"`
	CreatedAt time.Time  `gorm:"autoCreateTime" json:"created_at"`
}
