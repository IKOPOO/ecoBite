package handler

import (
	"ecobite/internal/database/model"
	"ecobite/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

type BuyerHandler struct {
	Service *service.BuyerService
}

func NewBuyerHandler(m *service.BuyerService) *BuyerHandler {
	return &BuyerHandler{Service: m}
}

func (h *BuyerHandler) CreateBuyer(c *gin.Context) {

	user_ID := c.MustGet("user_id").(uuid.UUID)
	// get the request body
	var input model.CreateBuyerProfileRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  "Invalid request body or missing fields",
			"detail": err.Error(),
		})
	}

	// ambil foto nya
	file, err := c.FormFile("profile_image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body or missing fields",
		})
	}

	storeImage, err := h.Service.ProdukImage.UploadSingleImage(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  "Invalid request body or missing fields",
			"detail": err.Error(),
		})
	}

	buyer := &model.BuyerProfile{
		UserID:       user_ID,
		FullName:     input.FullName,
		Phone:        input.Phone,
		Address:      input.Address,
		ProfileImage: storeImage.ImageURL,
		Allergic:     input.Allergic,
	}

	if err := h.Service.Buyer.InsertBuyerProfile(buyer); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to insert",
			"detail": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "user created successfully",
		"data":    buyer,
	})
}
