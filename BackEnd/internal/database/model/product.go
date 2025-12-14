package model

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ProductModel struct {
	DB *gorm.DB
}

type Product struct {
	ID                 uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	SellerID           uuid.UUID `gorm:"type:uuid;not null" json:"seller_id"`
	Nama               string    `gorm:"type:varchar(150);not null" json:"nama"`
	Deskripsi          string    `gorm:"type:text" json:"deskripsi"`
	Harga              float64   `gorm:"type:decimal(12,2);not null" json:"harga"`
	HargaAsli          float64   `gorm:"type:decimal(12,2)" json:"harga_asli"`
	Stock              int       `gorm:"not null;default:0" json:"stock"`
	BeratInGrams       float64   `gorm:"type:decimal(10,2)" json:"berat_in_grams"`
	TipeProduk         string    `gorm:"type:tipe_produk_enum;not null" json:"tipe_produk"`
	StatusKondisi      string    `gorm:"type:status_kondisi_enum;not null" json:"status_kondisi"`
	TargetUser         string    `gorm:"type:target_user_enum;not null" json:"target_user"`
	TanggalKadaluwarsa time.Time `gorm:"type:date;not null" json:"tanggal_kadaluwarsa"`
	Status             string    `gorm:"type:product_status_enum;default:'active'" json:"status"`
	CreatedAt          time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt          time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

type CreateProductRequest struct {
	Nama               string  `form:"nama" json:"nama" binding:"required"`
	Deskripsi          string  `form:"deskripsi" json:"deskripsi"`
	Harga              float64 `form:"harga" json:"harga" binding:"required"`
	HargaAsli          float64 `form:"harga_asli" json:"harga_asli"`
	Stock              int     `form:"stock" json:"stock" binding:"required"`
	BeratInGrams       float64 `form:"berat_in_grams" json:"berat_in_grams"`
	TipeProduk         string  `form:"tipe_produk" json:"tipe_produk" binding:"required"`
	StatusKondisi      string  `form:"status_kondisi" json:"status_kondisi" binding:"required"`
	TargetUser         string  `form:"target_user" json:"target_user" binding:"required"`
	TanggalKadaluwarsa string  `form:"tanggal_kadaluwarsa" json:"tanggal_kadaluwarsa" binding:"required"`
}

type ProductResponse struct {
	ID                 uuid.UUID `json:"id"`
	SellerID           uuid.UUID `json:"seller_id"`
	Nama               string    `json:"nama"`
	Deskripsi          string    `json:"deskripsi"`
	Harga              float64   `json:"harga"`
	HargaAsli          float64   `json:"harga_asli"`
	Stock              int       `json:"stock"`
	BeratInGrams       float64   `json:"berat_in_grams"`
	TipeProduk         string    `json:"tipe_produk"`
	StatusKondisi      string    `json:"status_kondisi"`
	TargetUser         string    `json:"target_user"`
	TanggalKadaluwarsa time.Time `json:"tanggal_kadaluwarsa"`
	Status             string    `json:"status"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}

func (Product) TableName() string {
	return "product"
}

func (m *ProductModel) InsertProduct(user_id uuid.UUID, product *Product) error {
	userModel := UserModel{DB: m.DB}
	_, err := userModel.GetUserById(user_id)
	if err != nil {
		return fmt.Errorf("user_id tidak ditemukan: %v", err)
	}
	product.CreatedAt = time.Now()
	product.UpdatedAt = time.Now()
	result := m.DB.Create(product)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("no row inserted")
	}

	return nil
}

func (m *ProductModel) GetProductBySellerID(sellerID uuid.UUID, page, limit, offset int) ([]*Product, int64, error) {
	var ProductData []*Product
	// take data per page
	query := m.DB.Where("seller_id = ?", sellerID)
	if err := query.
		Offset(offset).
		Limit(limit).
		Find(&ProductData).Error; err != nil {
		return nil, 0, err
	}

	var total int64
	// hitung total data
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	return ProductData, total, nil

}

func (m *ProductModel) GetProductByID(id uuid.UUID) (*Product, error) {
	var product Product
	if err := m.DB.First(&product, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &product, nil

}
