package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type BuyerProfileModel struct {
	DB *gorm.DB
}

type BuyerProfile struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`

	UserID uuid.UUID `gorm:"type:uuid;not null" form:"user_id" json:"user_id"`
	// Relasi opsional (kalau ingin)
	// User User `gorm:"foreignKey:UserID"`

	FullName     string `gorm:"type:varchar(150);not null" form:"full_name" json:"full_name"`
	Phone        string `gorm:"type:varchar(50);not null" form:"phone" json:"phone"`
	Address      string `gorm:"type:text;not null" form:"address" json:"address"`
	ProfileImage string `gorm:"type:text" form:"profile_image" json:"profile_image"`
	Allergic     string `gorm:"type:text" form:"allergic" json:"allergic"`

	CreatedAt time.Time `gorm:"autoCreateTime" form:"created_at" json:"created_at"`
}
