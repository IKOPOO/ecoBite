package service

import (
	"context"
	"ecobite/internal/database/model"
	"errors"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type OrderService struct {
	Order     *model.OrderModel
	OrderItem *model.OrderItemModel
	Cart      *model.CartModel
}

func (o *OrderService) CreateOrder(
	ctx context.Context,
	buyerID, sellerID uuid.UUID,
) error {
	return o.DB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {

		// inject semua model dengan tx
		orderModel := o.Order.WithTx(tx)
		orderItemModel := o.OrderItem.WithTx(tx)
		cartModel := o.Cart.WithTx(tx)

		// get cart and cart item
		cart, cartItems, err := cartModel.GetCartWithItems(buyerID)
		if err != nil {
			return err
		}

		if len(cartItems) == 0 {
			return errors.New("cart is empty, u broke right?")
		}

		// calculate sub total
		var totalAmount float64
		for _, item := range cartItems {
			totalAmount += item.Price * float64(item.Quantity)
		}

		// create order
		order := model.Order{
			BuyerID:       buyerID,
			SellerID:      sellerID,
			TotalAmount:   totalAmount,
			Status:        "pending",
			PaymentMethod: "cash",
			PaymentStatus: "pending",
			OrderDate:     time.Now(),
			UpdatedAt:     time.Now(),
		}

		if err := orderModel.CreateOrder(&order); err != nil {
			return err
		}

		// create order_items
		for _, item := range cartItems {
			orderItem := &model.OrderItem{
				OrderID:   order.ID,
				ProductID: item.ProductID,
				Price:     item.Price,
				Quantity:  item.Quantity,
				Subtotal:  item.Price,
				CreatedAt: time.Now(),
			}

			if err := orderItemModel.CreateOrderItem(orderItem); err != nil {
				return err
			}
		}

		// delete cart and cart cart item
		if err := tx.Where("cart_id = ?", cart.ID).
			Delete(&model.CartItem{}).Error; err != nil {
			return err
		}

		if err := tx.Where(&model.Cart{}, "id = ?", cart.ID).Error; err != nil {
			return err
		}

		return nil
	})
}
