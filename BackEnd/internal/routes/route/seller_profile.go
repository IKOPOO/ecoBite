package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/handler"

	"github.com/gin-gonic/gin"
)

func SellerProfileRoutes(rg *gin.RouterGroup, sellerHandler *handler.SellerHandler) {
	// public api
	p := rg.Group("/seller")
	// public api
	p.Use(auth.AuthMiddleware("ADMIN", "USER"))
	{
		p.POST("/", sellerHandler.CreateSeller)
		p.GET("/:user_id", sellerHandler.GetSellerProfile)

	}

}
