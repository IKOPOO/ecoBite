package handler

import (
	"ecobite/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type OrderHandler struct {
	Service service.OrderService
}

func NewOrderHandler(m service.OrderService) *OrderHandler {
	return &OrderHandler{Service: m}
}

func (h *OrderHandler) Checkout(c *gin.Context) {

	ctx := c.Request.Context()

	// ambil buyer_id dari middleware
	buyer_id, ok := c.MustGet("user_id").(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "unauthorized",
			"message": "you need to login first then buy",
		})
		return
	}

	buyerUUID, err := uuid.Parse(buyer_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid user id",
		})
		return
	}

	// take seller id from req
	var sellerID struct {
		SellerID uuid.UUID `json:"seller_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(sellerID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// buat order
	if err := h.Service.CreateOrder(ctx, buyerUUID, sellerID.SellerID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "order created successfully",
	})

}
