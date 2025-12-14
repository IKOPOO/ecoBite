package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/handler"

	"github.com/gin-gonic/gin"
)

func BuyerRoutes(rg *gin.RouterGroup, buyerHandler *handler.BuyerHandler) {
	// public api
	p := rg.Group("/buyer")
	// public api
	p.Use(auth.AuthMiddleware("ADMIN", "USER"))
	{
		p.POST("/", buyerHandler.CreateBuyer)
		p.GET("/:user_id", buyerHandler.GetBuyerProfile)
	}

}
