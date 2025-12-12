package database

import (
	"ecobite/internal/database/model"

	"gorm.io/gorm"
)

type Models struct {
	Users         model.UserModel
	SellerProfile model.SellerProfileModel
	BuyerProfile  model.BuyerProfileModel
	Cart          model.CartModel
	Product       model.ProductModel
	Order         model.OrderModel
	OrderItem     model.OrderItemModel
	Payment       model.PaymentModel
	Review        model.RiviewModel
	ProductImage  model.ProductImagesModel

	// Activities model.ActivityModel // Uncomment if you have ActivityModel
}

func NewModel(db *gorm.DB) Models {
	return Models{
		Users:         model.UserModel{DB: db},
		SellerProfile: model.SellerProfileModel{DB: db},
		BuyerProfile:  model.BuyerProfileModel{DB: db},
		Cart:          model.CartModel{DB: db},
		Product:       model.ProductModel{DB: db},
		Order:         model.OrderModel{DB: db},
		OrderItem:     model.OrderItemModel{DB: db},
		Payment:       model.PaymentModel{DB: db},
		Review:        model.RiviewModel{DB: db},
		ProductImage:  model.ProductImagesModel{DB: db},
		// Activities: model.ActivityModel{DB: db}, // Uncomment if you have ActivityModel
	}
}
