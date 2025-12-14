package model

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CartModel struct {
	DB *gorm.DB
}

type Cart struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	BuyerID   uuid.UUID `gorm:"type:uuid;not null" form:"buyer_id" json:"buyer_id"`
	SellerID  uuid.UUID `gorm:"type:uuid;not null" form:"seller_id" json:"seller_id"`
	CreatedAt time.Time `gorm:"autoCreateTime" form:"created_at" json:"created_at"`
}

type AddToCartRequest struct {
	ProductID uuid.UUID `form:"product_id" json:"product_id" binding:"required"`
	Quantity  int       `form:"quantity" json:"quantity" binding:"required"`
}

func (Cart) TableName() string {
	return "cart"
}

func (m *CartModel) InsertCart(user_id uuid.UUID, cart *Cart) error {
	seller := SellerProfileModel{DB: m.DB}
	_, err := seller.GetSellerProfileById(user_id)
	if err != nil {
		return fmt.Errorf("user_id tidak ditemukan: %v", err)
	}

	result := m.DB.Create(cart)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (m *CartModel) FindByBuyerAndSeller(
	buyerID, sellerID uuid.UUID,
) (*Cart, error) {
	var cart Cart
	err := m.DB.
		Where("buyer_id = ? AND seller_id = ?", buyerID, sellerID).
		First(&cart).Error
	if err != nil {
		return nil, err
	}
	return &cart, nil
}

func (m *CartModel) Create(cart *Cart) error {
	return m.DB.Create(cart).Error
}
