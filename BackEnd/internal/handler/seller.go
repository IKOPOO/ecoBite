package handler

import (
	"ecobite/internal/database/model"
	"ecobite/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type SellerHandler struct {
	Service *service.SellerService
}

func NewSellerHandler(m *service.SellerService) *SellerHandler {
	return &SellerHandler{Service: m}
}

// create seller SellerPrVofile
func (h *SellerHandler) CreateSeller(c *gin.Context) {

	user_ID := c.MustGet("user_id").(uuid.UUID)
	// get the request body
	var input model.CreateSellerProfileRequest

	input.StoreName = c.PostForm("store_name")
	input.OwnerName = c.PostForm("owner_name")
	input.Address = c.PostForm("address")
	input.Phone = c.PostForm("phone")
	input.StoreDescription = c.PostForm("store_description")
	input.KTPNumber = c.PostForm("ktp_number")

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

	input.StoreImage = storeImage.ImageURL
	input.KTPImage = ktpImage.ImageURL
	input.UserID = user_ID.String() // dari JWT

	seller := &model.SellerProfile{
		UserID:           user_ID,
		StoreName:        input.StoreName,
		OwnerName:        input.OwnerName,
		Address:          input.Address,
		Phone:            input.Phone,
		StoreImage:       input.StoreImage,
		StoreDescription: input.StoreDescription,
		KtpNumber:        input.KTPNumber,
		KtpImage:         input.KTPImage,
	}

	if err := h.Service.Seller.InsertSellerProfile(seller); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to insert",
			"detail": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "user created successfully",
		"data":    seller,
	})
}

func (h *SellerHandler) GetSellerProfile(c *gin.Context) {
	idParams := c.Param("user_id")
	id, err := uuid.Parse(idParams)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pengurus id"})
		return
	}
	seller, err := h.Service.Seller.GetSellerProfileById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pengurus Not Found"})
		return
	}

	resp := &model.SellerProfileResponse{
		UserID:           idParams,
		StoreName:        seller.StoreName,
		OwnerName:        seller.OwnerName,
		Address:          seller.Address,
		Phone:            seller.Phone,
		StoreImage:       seller.StoreImage,
		StoreDescription: seller.StoreDescription,
		KTPNumber:        seller.KtpNumber,
		KTPImage:         seller.KtpImage,
	}
	c.JSON(http.StatusOK, gin.H{
		"message":  "Get pengurus",
		"pengurus": resp,
	})
}
