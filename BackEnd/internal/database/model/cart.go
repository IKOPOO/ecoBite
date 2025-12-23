package model

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CartModel struct {
	DB *gorm.DB
}

func (Cart) TableName() string {
	return "cart"
}

type Cart struct {
	ID        uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	BuyerID   uuid.UUID  `gorm:"type:uuid;not null" form:"buyer_id" json:"buyer_id"`
	SellerID  uuid.UUID  `gorm:"type:uuid;not null" form:"seller_id" json:"seller_id"`
	Items     []CartItem `gorm:"foreignKey:CartID;references:ID" json:"items"`
	CreatedAt time.Time  `gorm:"autoCreateTime" form:"created_at" json:"created_at"`
}

type CartWithItems struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	BuyerID   uuid.UUID `gorm:"type:uuid;not null" form:"buyer_id" json:"buyer_id"`
	SellerID  uuid.UUID `gorm:"type:uuid;not null" form:"seller_id" json:"seller_id"`
	CreatedAt time.Time `gorm:"autoCreateTime" form:"created_at" json:"created_at"`
}

type AddToCartRequest struct {
	ProductID uuid.UUID `form:"product_id" json:"product_id" binding:"required"`
	Quantity  int       `form:"quantity" json:"quantity" binding:"required"`
}

func (m *CartModel) WithTx(tx *gorm.DB) *CartModel {
	return &CartModel{DB: tx}
}

// get cart with items
func (h *CartModel) GetCartWithItemByBuyerID(ctx context.Context, buyerID uuid.UUID) (*Cart, error) {
	var cart Cart
	if err := h.DB.WithContext(ctx).Preload("Items").Where("buyer_id = ?").First(&cart).Error; err != nil {
		return nil, err
	}

	return &cart, nil
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

func (m *CartModel) FindCartByBuyerAndSeller(
	ctx context.Context,
	buyerID, sellerID uuid.UUID,
) (*CartWithItems, error) {
	var cart CartWithItems
	if err := m.DB.WithContext(ctx).Preload("Items").Where("buyer_id = ? and seller_id = ?", buyerID, sellerID).First(&cart).Error; err != nil {
		return nil, err
	}
	return &cart, nil
}

func (m *CartModel) Create(ctx context.Context, cart *Cart) error { // -> ini yang dipake
	return m.DB.WithContext(ctx).Create(cart).Error
}

func (m *CartModel) FindByBuyerIDAndSellerID(buyerID uuid.UUID) (*Cart, error) {
	var cart *Cart
	if err := m.DB.Where("buyer_id = ?", buyerID).First(&cart).Error; err != nil {
		return nil, err
	}

	return cart, nil
}

func (m *CartModel) DeleteCart(ctx context.Context, cartID uuid.UUID) error {
	return m.DB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("cart_id = ?", cartID).Delete(&CartWithItems{}).Error; err != nil {
			return err
		}

		if err := tx.Delete(&Cart{}, "id = ?", cartID).Error; err != nil {
			return err
		}

		return nil
	})
}
