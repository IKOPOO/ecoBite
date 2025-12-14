package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/config"
	"ecobite/internal/handler"
	"ecobite/internal/service"

	//"ecobite/internal/database/model"
	routes "ecobite/internal/routes/route"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Routes(app *config.Application) http.Handler {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"http://127.0.0.1:3002",
			"http://127.0.0.1:3000",
		},
		AllowMethods: []string{
			"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",
		},
		AllowHeaders: []string{
			"Origin", "Content-Type", "Authorization", "ngrok-skip-browser-warning",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
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

		cartService := service.NewCartService(&app.Model.Cart, &app.Model.CartItem, productService.Product, buyerService)
		carthandler := handler.NewCartHandler(*cartService)

		routes.AuthRoutes(v1, authHandler)
		routes.SellerProfileRoutes(v1, sellerHandler)
		routes.BuyerRoutes(v1, buyerHandler)
		routes.ProductRoute(v1, productHandler)
		routes.CartRoutes(v1, carthandler)
	}

	return r
}
