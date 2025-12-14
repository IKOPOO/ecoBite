package handler

import (
	"ecobite/internal/database/model"
	"ecobite/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"math"
	"net/http"
	"strconv"
	"time"
)

type ProductHandler struct {
	Service *service.ProductService
}

func NewProductHandler(m *service.ProductService) *ProductHandler {
	return &ProductHandler{Service: m}
}

func (h *ProductHandler) CreateProduct(c *gin.Context) {

	user_ID := c.MustGet("user_id").(uuid.UUID)
	// get the request body
	var input model.CreateProductRequest
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  "Invalid request body or missing fields",
			"detail": err.Error(),
		})
		return
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":  "failed to read file",
			"detail": err.Error(),
		})
		return
	}

	files := form.File["image"]
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No image uploaded",
		})
		return
	}

	if len(files) > 5 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "too many image uploaded",
		})
		return
	}

	// insert product
	product, err := h.Service.InsertProductService(user_ID, &input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to insert",
			"detail": err.Error(),
		})
		return
	}

	storeImage, err := h.Service.UploadImage(files)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  "failed to upload image",
			"detail": err.Error(),
		})
		return
	}
	imageResult := []*model.ProductImageResponse{}
	for _, image := range storeImage {
		fileUploads := &model.ProductImage{
			ProductID: product.ID,
			ImageURL:  image.ImageURL,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		fileUpload, err := h.Service.ProdukImage.Model.InsertImages(fileUploads)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":  "failed to insert",
				"detail": err.Error(),
			})
			return
		}
		imageResult = append(imageResult, &model.ProductImageResponse{
			ID:        fileUpload.ID,
			ImageURL:  fileUpload.ImageURL,
			CreatedAt: fileUpload.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "user created successfully",
		"data":    product,
		"image":   storeImage,
	})
}

func (h *ProductHandler) GetProductBySellerID(c *gin.Context) {

	user_ID := c.MustGet("user_id").(uuid.UUID)

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset := (page - 1) * limit

	ProductList, total, err := h.Service.GetAllProductBySellerID(user_ID, page, limit, offset)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product Not Found"})
		return
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))
	c.JSON(http.StatusOK, gin.H{
		"message": "Get product BY user_ID",
		"page":    page,
		"limit":   limit,
		"total":   totalPages,
		"data":    ProductList,
	})

}
