package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type OrderModel struct {
	DB *gorm.DB
}
type Order struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`

	BuyerID  uuid.UUID `gorm:"type:uuid;not null" json:"buyer_id"`
	SellerID uuid.UUID `gorm:"type:uuid;not null" json:"seller_id"`

	TotalAmount float64 `gorm:"type:decimal(12,2);not null" json:"total_amount"`

	Status        string `gorm:"type:order_status_enum;default:'pending'" json:"status"`
	PaymentMethod string `gorm:"type:payment_method_enum" json:"payment_method"`
	PaymentStatus string `gorm:"type:payment_status_enum;default:'pending'" json:"payment_status"`

	OrderDate time.Time `gorm:"autoCreateTime" json:"order_date"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
