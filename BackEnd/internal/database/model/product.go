package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type ProductModel struct {
	DB *gorm.DB
}

type Product struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`

	SellerID uuid.UUID `gorm:"type:uuid;not null" json:"seller_id"`

	Nama      string `gorm:"type:varchar(150);not null" json:"nama"`
	Deskripsi string `gorm:"type:text" json:"deskripsi"`

	Harga     float64 `gorm:"type:decimal(12,2);not null" json:"harga"`
	HargaAsli float64 `gorm:"type:decimal(12,2)" json:"harga_asli"`

	Stock int `gorm:"not null;default:0" json:"stock"`

	BeratInGrams float64 `gorm:"type:decimal(10,2)" json:"berat_in_grams"`

	TipeProduk    string `gorm:"type:tipe_produk_enum;not null" json:"tipe_produk"`
	StatusKondisi string `gorm:"type:status_kondisi_enum;not null" json:"status_kondisi"`
	TargetUser    string `gorm:"type:target_user_enum;not null" json:"target_user"`

	TanggalKadaluwarsa time.Time `gorm:"type:date;not null" json:"tanggal_kadaluwarsa"`

	ImageURL string `gorm:"type:text" json:"image_url"`

	Status string `gorm:"type:product_status_enum;default:'active'" json:"status"`

	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
