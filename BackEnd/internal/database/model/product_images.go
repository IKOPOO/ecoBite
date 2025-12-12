package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type ProductImagesModel struct {
	DB *gorm.DB
}

type ProductImage struct {
	ID        uuid.UUID `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	ProductID string    `json:"product_id" gorm:"type:uuid;not null"`
	ImageURL  string    `json:"image_url" gorm:"type:text;not null"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type ProductInsert struct {
	ImageURL string `json:"image_url" gorm:"type:text;not null"`
}
