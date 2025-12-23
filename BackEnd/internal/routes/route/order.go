package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/handler"

	"github.com/gin-gonic/gin"
)

func OrderRoute(r *gin.RouterGroup, orderHandler *handler.OrderHandler) {
	p := r.Group("/order")

	p.Use(auth.AuthMiddleware("BUYER"))
	{
		p.POST("/checkout", orderHandler.Checkout)
	}
}
