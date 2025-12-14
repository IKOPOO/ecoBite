package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type CartItemModel struct {
	DB *gorm.DB
}

type CartItem struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	CartID    uuid.UUID `gorm:"type:uuid;not null" form:"cart_id" json:"cart_id"`
	ProductID uuid.UUID `gorm:"type:uuid;not null" form:"product_id" json:"product_id"`
	Quantity  int       `gorm:"not null" form:"quantity" json:"quantity"`
	AddedAt   time.Time `gorm:"autoCreateTime" form:"added_at" json:"added_at"`
}

func (m *CartItemModel) FindByCartAndProduct(
	cartID, productID uuid.UUID,
) (*CartItem, error) {
	var item CartItem
	err := m.DB.
		Where("cart_id = ? AND product_id = ?", cartID, productID).
		First(&item).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (m *CartItemModel) Create(item *CartItem) error {
	return m.DB.Create(item).Error
}

func (m *CartItemModel) Update(item *CartItem) error {
	return m.DB.Save(item).Error
}
