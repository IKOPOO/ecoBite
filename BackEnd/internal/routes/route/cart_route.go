package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/handler"

	"github.com/gin-gonic/gin"
)

func CartRoutes(rg *gin.RouterGroup, cartHandler *handler.CartHandler) {
	// public api
	p := rg.Group("/cart")
	// public api
	p.Use(auth.AuthMiddleware("BUYER"))
	{
		p.POST("/items", cartHandler.AddToCart)
		p.GET("/:buyer_id", cartHandler.GetCartByBuyerID)
	}

}
