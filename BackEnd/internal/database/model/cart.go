package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type CartModel struct {
	DB *gorm.DB
}

type Cart struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`

	BuyerID  uuid.UUID `gorm:"type:uuid;not null" form:"buyer_id" json:"buyer_id"`
	SellerID uuid.UUID `gorm:"type:uuid;not null" form:"seller_id" json:"seller_id"`

	// Optional: relasi jika diperlukan
	// Buyer  BuyerProfile  `gorm:"foreignKey:BuyerID"`
	// Seller SellerProfile `gorm:"foreignKey:SellerID"`

	CreatedAt time.Time `gorm:"autoCreateTime" form:"created_at" json:"created_at"`
}
