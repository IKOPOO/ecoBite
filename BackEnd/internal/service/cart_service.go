package service

import (
	"context"
	"ecobite/internal/database/model"
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CartService struct {
	Cart     *model.CartModel
	CartItem *model.CartItemModel
	Product  *model.ProductModel
	// Buyer    *BuyerService
	// Seller   *SellerService
}

type CartQueryService struct {
	Cart     *model.CartModel
	CartItem *model.CartItemModel
	Buyer    *BuyerService
	// Seller   *SellerService
}

func NewCartService(
	cartModel *model.CartModel,
	cartItemModel *model.CartItemModel,
	productModel *model.ProductModel,
	// buyerService *BuyerService,
) *CartService {
	return &CartService{
		Cart:     cartModel,
		CartItem: cartItemModel,
		Product:  productModel,
		// Buyer:    buyerService,
	}
}

func NewCartQueryService(
	cartModel *model.CartModel,
	cartItemModel *model.CartItemModel,
	buyerService *BuyerService,
) *CartQueryService {
	return &CartQueryService{
		Cart:     cartModel,
		CartItem: cartItemModel,
		Buyer:    buyerService,
	}
}

func (s *CartService) AddToCart(
	ctx context.Context,
	buyerID uuid.UUID,
	productID uuid.UUID,
	quantity int,
) error {

	return s.Cart.DB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// 1️⃣ ambil product
		product, err := s.Product.GetProductByID(productID)
		if err != nil {
			return errors.New("product not found")
		}

		if product.Stock < quantity {
			return errors.New("stock not enough")
		}

		// 2️⃣ cari cart
		cart, err := s.Cart.FindCartByBuyerAndSeller(ctx, buyerID, product.SellerID)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			cart := &model.Cart{
				BuyerID:  buyerID,
				SellerID: product.SellerID,
			}
			if err := s.Cart.Create(ctx, cart); err != nil {
				return err
			}

		} else if err != nil {
			return err
		}
		// 3️⃣ cari cart item
		item, err := s.CartItem.FindByCartAndProduct(ctx, cart.ID, product.ID)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return s.CartItem.Create(&model.CartItem{
				CartID:    cart.ID,
				ProductID: productID,
				Quantity:  quantity,
			})
		} else if err != nil {
			return err
		}

		item.Quantity += quantity
		return s.CartItem.Update(ctx, item)

	})
}

func (s *CartQueryService) GetCartByBuyer(
	ctx context.Context,
	userID uuid.UUID,
) (*model.Cart, error) {
	// get buyer_id using user_id
	buyer, err := s.Buyer.GetBuyerProfileByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	// get cart by buyer_id and seller_id
	cartWithItems, err := s.Cart.GetCartWithItemByBuyerID(ctx, buyer.ID)
	if err != nil {
		return nil, err
	}

	return cartWithItems, nil
}
