package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/handler"

	"github.com/gin-gonic/gin"
)

func ProductRoute(r *gin.RouterGroup, productHandler *handler.ProductHandler) {
	p := r.Group("/product")
	p.Use(auth.AuthMiddleware("ADMIN", "SELLER"))
	{
		p.POST("/", productHandler.CreateProduct)
		p.GET("/:user_id", productHandler.GetProductBySellerID)
	}
}
