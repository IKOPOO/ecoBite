package routes

import (
	"ecobite/internal/handler"

	"github.com/gin-gonic/gin"
)

func SellerProfileRoutes(rg *gin.RouterGroup, pengurusHandler *handler.SellerHandler) {
	// public api
	p := rg.Group("/pengurus")
	// public api
	{
		p.POST("/", pengurusHandler.CreateSeller)
	}

}
