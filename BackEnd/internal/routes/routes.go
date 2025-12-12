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

		producService := service.NewProdukImageService(&app.Model.ProductImage)
		sellerService := service.NewSellerService(&app.Model.SellerProfile, producService)
		sellerHandler := handler.NewSellerHandler(sellerService)
		routes.AuthRoutes(v1, authHandler)
		routes.SellerProfileRoutes(v1, sellerHandler)
	}

	return r
}
