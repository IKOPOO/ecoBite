package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/config"
	"ecobite/internal/handler"
	"ecobite/internal/service"

	//"ecobite/internal/database/model"
	routes "ecobite/internal/routes/route"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routes(app *config.Application) http.Handler {
	r := gin.Default()

	v1 := r.Group("/api/v1")
	{
		authHandler := auth.NewUserauth(&app.Model.Users)

		productImageService := service.NewProdukImageService(&app.Model.ProductImage)

		sellerService := service.NewSellerService(&app.Model.SellerProfile, productImageService)
		sellerHandler := handler.NewSellerHandler(sellerService)

		buyerService := service.NewBuyerService(&app.Model.BuyerProfile, productImageService)
		buyerHandler := handler.NewBuyerHandler(buyerService)

		productService := service.NewProductService(&app.Model.Product, productImageService, sellerService)
		productHandler := handler.NewProductHandler(productService)

		routes.AuthRoutes(v1, authHandler)
		routes.SellerProfileRoutes(v1, sellerHandler)
		routes.BuyerRoutes(v1, buyerHandler)
		routes.ProductRoute(v1, productHandler)
	}

	return r
}
