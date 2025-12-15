package service

import (
	"ecobite/internal/database/model"
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CartService struct {
	Cart     *model.CartModel
	CartItem *model.CartItemModel
	Product  *model.ProductModel
	Buyer    *BuyerService
	Seller   *SellerService
}

func NewCartService(
	cartModel *model.CartModel,
	cartItemModel *model.CartItemModel,
	productModel *model.ProductModel,
	buyerService *BuyerService,
) *CartService {
	return &CartService{
		Cart:     cartModel,
		CartItem: cartItemModel,
		Product:  productModel,
		Buyer:    buyerService,
	}
}

type CartWithItem struct {
	Cart *model.Cart       `json:"cart"`
	Item []*model.CartItem `json:"item"`
}

func (s *CartService) AddToCart(
	buyerID uuid.UUID,
	productID uuid.UUID,
	quantity int,
) error {

	// 1️⃣ ambil product
	product, err := s.Product.GetProductByID(productID)
	if err != nil {
		return errors.New("product not found")
	}

	if product.Stock < quantity {
		return errors.New("stock not enough")
	}

	// 2️⃣ cari cart
	cart, err := s.Cart.FindByBuyerAndSeller(
		buyerID,
		product.SellerID,
	)

	if errors.Is(err, gorm.ErrRecordNotFound) {
		cart = &model.Cart{
			BuyerID:  buyerID,
			SellerID: product.SellerID,
		}
		if err := s.Cart.Create(cart); err != nil {
			return err
		}
	} else if err != nil {
		return err
	}

	// 3️⃣ cari cart item
	item, err := s.CartItem.FindByCartAndProduct(
		cart.ID,
		productID,
	)

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return s.CartItem.Create(&model.CartItem{
			CartID:    cart.ID,
			ProductID: productID,
			Quantity:  quantity,
		})
	}

	if err != nil {
		return err
	}

	item.Quantity += quantity
	return s.CartItem.Update(item)
}

func (s *CartService) GetCartByBuyer(buyerID uuid.UUID) (*CartWithItem, error) {
	// get seller_id
	sellerID, err := s.Buyer.GetBuyerProfileById(buyerID)
	if err != nil {
		return nil, err
	}

	cartsData, err := s.Cart.FindByBuyerIDAndSellerID(buyerID, sellerID.ID)
	if err != nil {
		return nil, err
	}

	var cartItems []*model.CartItem
	items, err := s.CartItem.GetCartItemByCartID(cartsData.ID)
	if err != nil {
		return nil, err
	}

	for _, data := range items {
		cartItems = append(cartItems, &model.CartItem{
			ID:        data.ID,
			CartID:    data.CartID,
			ProductID: data.ProductID,
			Quantity:  data.Quantity,
		})
	}

	result := &CartWithItem{
		Cart: cartsData,
		Item: cartItems, // sekarang bisa langsung assign
	}

	return result, nil
}
