package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type OrderItemModel struct {
	DB *gorm.DB
}

type OrderItem struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	OrderID   uuid.UUID `gorm:"type:uuid;not null" json:"order_id"`
	ProductID uuid.UUID `gorm:"type:uuid;not null" json:"product_id"`
	Price     float64   `gorm:"type:decimal(12,2);not null" json:"price"`
	Quantity  int       `gorm:"not null" json:"quantity"`
	Subtotal  float64   `gorm:"type:decimal(12,2);not null" json:"subtotal"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}

func (m *OrderItemModel) WithTx(tx *gorm.DB) *OrderItemModel {
	return &OrderItemModel{DB: tx}
}

func (m *OrderItemModel) CreateOrderItem(item *OrderItem) error {
	return m.DB.Create(item).Error
}
