package handler

import (
	"ecobite/internal/database/model"
	"ecobite/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CartHandler struct {
	Service service.CartService
}

func NewCartHandler(m service.CartService) *CartHandler {
	return &CartHandler{Service: m}
}

func (h *CartHandler) AddToCart(c *gin.Context) {
	// 1️⃣ ambil buyer_id dari middleware
	buyerID, ok := c.MustGet("user_id").(uuid.UUID)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}
	// ambil buyerid dengan user_id
	buyer_id, err := h.Service.Buyer.GetBuyerProfileById(buyerID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Buyer Not Found",
		})
		return
	}

	// 2️⃣ bind request
	var req *model.AddToCartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// 3️⃣ panggil service
	if err := h.Service.AddToCart(
		buyer_id.ID,
		req.ProductID,
		req.Quantity,
	); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// 4️⃣ response sukses
	c.JSON(http.StatusOK, gin.H{
		"message": "item added to cart",
	})
}
