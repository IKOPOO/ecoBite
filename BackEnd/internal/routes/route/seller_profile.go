package routes

import (
	"ecobite/internal/handler"

	"github.com/gin-gonic/gin"
)

func SellerProfileRoutes(rg *gin.RouterGroup, sellerHandler *handler.SellerHandler) {
	// public api
	p := rg.Group("/seller")
	// public api
	{
		p.POST("/", sellerHandler.CreateSeller)
	}

}
