package handler

import (
	"ecobite/internal/database/model"
	"ecobite/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type SellerHandler struct {
	Service *service.SellerService
}

func NewSellerHandler(m *service.SellerService) *SellerHandler {
	return &SellerHandler{Service: m}
}

// create seller SellerProfile
func (h *SellerHandler) CreateSeller(c *gin.Context) {

	// get the request body
	var input model.SellerProfile
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body or missing fields",
		})
		return
	}

	// ambil foto nya
	file, err := c.FormFile("store_image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body or missing fields",
		})
	}

	storeImage, err := h.Service.ProdukImage.UploadSingleImage(file)

	ktpImageFile, err := c.FormFile("ktp_image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body or missing fields",
		})
	}

	ktpImage, error := h.Service.ProdukImage.UploadSingleImage(ktpImageFile)
	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body or missing fields",
		})
	}

	seller := &model.SellerProfile{
		UserID:             input.UserID,
		StoreName:          input.StoreName,
		OwnerName:          input.OwnerName,
		Address:            input.Address,
		Phone:              input.Phone,
		StoreImage:         storeImage.ImageURL,
		StoreDescription:   input.StoreDescription,
		VerificationStatus: input.VerificationStatus,
		KtpNumber:          input.KtpNumber,
		KtpImage:           ktpImage.ImageURL,
	}

	if err := h.Service.Seller.InsertSellerProfile(&input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to upload file",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "user created successfully",
		"data":    seller,
	})
}
