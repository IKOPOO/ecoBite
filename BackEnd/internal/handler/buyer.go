package handler

import (
	"ecobite/internal/database/model"
	"ecobite/internal/service"
	"fmt"
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
			"error":  "Invalid request body or missing fields 1",
			"detail": err.Error(),
		})
		return
	}

	// ambil foto nya
	file, err := c.FormFile("profile_image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  "Invalid request body or missing fields 2",
			"detail": err.Error(),
		})
		return
	}

	storeImage, err := h.Service.ProdukImage.UploadSingleImage(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  "Invalid request body or missing fields 3",
			"detail": err.Error(),
		})
		return
	}

	if file == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "profile_image file is nil",
		})
		return
	}

	fmt.Println("Uploading file:", file.Filename)
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

func (h *BuyerHandler) GetBuyerProfile(c *gin.Context) {
	idParams := c.Param("user_id")
	id, err := uuid.Parse(idParams)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pengurus id"})
		return
	}
	buyer, err := h.Service.Buyer.GetBuyerProfileById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pengurus Not Found"})
		return
	}

	resp := &model.BuyerProfile{
		ID:           buyer.ID,
		UserID:       id,
		FullName:     buyer.FullName,
		Phone:        buyer.Phone,
		Address:      buyer.Address,
		ProfileImage: buyer.ProfileImage,
		Allergic:     buyer.Allergic,
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "buyer profile",
		"data":    resp,
	})
}
