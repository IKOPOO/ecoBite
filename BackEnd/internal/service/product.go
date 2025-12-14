package service

import (
	"ecobite/internal/database/model"
	"github.com/google/uuid"
	"log"
	"time"
)

type ProductService struct {
	Product     *model.ProductModel
	ProdukImage *ProdukImageService
	Seller      *SellerService
}

func NewProductService(m *model.ProductModel, g *ProdukImageService, s *SellerService) *ProductService {
	return &ProductService{
		Product:     m,
		ProdukImage: g,
		Seller:      s,
	}
}

func (s *ProductService) InsertProductService(user_id uuid.UUID, product *model.CreateProductRequest) (*model.ProductResponse, error) {
	// take seller_profile by user_id
	// if err := s.Seller.DB.First(&seller, "user_id = ?", user_id).Error; err != nil {
	// return nil, err
	// }
	seller, err := s.Seller.GetSellerProfileByUserID(user_id)
	if err != nil {
		return nil, err
	}

	log.Println("SELLER.ID      :", seller.ID)
	log.Println("SELLER.USER_ID :", seller.UserID)

	// konversi tanggal TanggalKadaluwarsa
	expiredDate, err := time.Parse("2006-01-02", product.TanggalKadaluwarsa)
	if err != nil {
	}

	dataUpload := &model.Product{
		SellerID:           seller.ID,
		Nama:               product.Nama,
		Deskripsi:          product.Deskripsi,
		Harga:              product.Harga,
		HargaAsli:          product.HargaAsli,
		Stock:              product.Stock,
		BeratInGrams:       product.BeratInGrams,
		TipeProduk:         product.TipeProduk,
		StatusKondisi:      product.StatusKondisi,
		TargetUser:         product.TargetUser,
		TanggalKadaluwarsa: expiredDate,
		Status:             "active",
		CreatedAt:          time.Now(),
		UpdatedAt:          time.Now(),
	}

	// insert product
	if err := s.Product.InsertProduct(user_id, dataUpload); err != nil {
		return nil, err
	}

	response := &model.ProductResponse{
		ID:                 dataUpload.ID,
		SellerID:           dataUpload.SellerID,
		Nama:               dataUpload.Nama,
		Deskripsi:          dataUpload.Deskripsi,
		Harga:              dataUpload.Harga,
		HargaAsli:          dataUpload.HargaAsli,
		Stock:              dataUpload.Stock,
		BeratInGrams:       dataUpload.BeratInGrams,
		TipeProduk:         dataUpload.TipeProduk,
		StatusKondisi:      dataUpload.StatusKondisi,
		TargetUser:         dataUpload.TargetUser,
		TanggalKadaluwarsa: dataUpload.TanggalKadaluwarsa,
		Status:             dataUpload.Status,
		CreatedAt:          dataUpload.CreatedAt,
		UpdatedAt:          dataUpload.UpdatedAt,
	}
	return response, nil

}

func (m *ProductService) GetAllProductBySellerID(user_ID uuid.UUID, page, limit, offset int) ([]*model.ProductResponse, int64, error) {

	seller, err := m.Seller.GetSellerProfileByUserID(user_ID)
	if err != nil {
		return nil, 0, err
	}
	var response []*model.ProductResponse
	product, count, err := m.Product.GetProductBySellerID(seller.ID, page, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	for _, data := range product {
		response = append(response, &model.ProductResponse{
			ID:                 data.ID,
			SellerID:           data.SellerID,
			Nama:               data.Nama,
			Deskripsi:          data.Deskripsi,
			Harga:              data.Harga,
			HargaAsli:          data.HargaAsli,
			Stock:              data.Stock,
			BeratInGrams:       data.BeratInGrams,
			TipeProduk:         data.TipeProduk,
			StatusKondisi:      data.StatusKondisi,
			TargetUser:         data.TargetUser,
			TanggalKadaluwarsa: data.TanggalKadaluwarsa,
			Status:             data.Status,
			CreatedAt:          data.CreatedAt,
			UpdatedAt:          data.UpdatedAt,
		})
	}

	return response, count, nil
}
