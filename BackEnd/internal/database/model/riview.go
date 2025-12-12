package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type RiviewModel struct {
	DB *gorm.DB
}

type Review struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`

	OrderID   uuid.UUID `gorm:"type:uuid;not null" json:"order_id"`
	ProductID uuid.UUID `gorm:"type:uuid;not null" json:"product_id"`
	BuyerID   uuid.UUID `gorm:"type:uuid;not null" json:"buyer_id"`

	Rating  int    `gorm:"not null;check:rating >= 1 AND rating <= 5" json:"rating"`
	Comment string `json:"comment"`

	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}
