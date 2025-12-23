package handler

import (
	"ecobite/internal/database/model"
	"ecobite/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CartHandler struct {
	CartService      *service.CartService
	CartQueryService *service.CartQueryService
}

func NewCartHandler(m *service.CartService, q *service.CartQueryService) *CartHandler {
	return &CartHandler{CartService: m, CartQueryService: q}
}

func (h *CartHandler) AddToCart(c *gin.Context) {
	ctx := c.Request.Context()

	// 1️⃣ ambil userID dari middleware
	userID, ok := c.MustGet("user_id").(uuid.UUID)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}
	// ambil buyerid dengan user_id
	buyer_id, err := h.CartQueryService.Buyer.GetBuyerProfileByUserID(ctx, userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Buyer Not Found",
		})
		return
	}

	// bind request
	var req *model.AddToCartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// 3️⃣ panggil service
	if err := h.CartService.AddToCart(
		ctx,
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

func (h *CartHandler) GetCartByBuyerID(c *gin.Context) {
	ctx := c.Request.Context()

	// take user id from middleware
	userID := c.MustGet("user_id").(uuid.UUID)

	carts, err := h.CartQueryService.GetCartByBuyerID(ctx, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "cart found and success to get",
		"cart":    carts,
	})
}
