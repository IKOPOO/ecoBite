package model

import (
	"fmt"
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

type CreateBuyerProfileRequest struct {
	UserID       string `form:"user_id" json:"user_id"`
	FullName     string `form:"full_name" json:"full_name" binding:"required"`
	Phone        string `form:"phone" json:"phone" binding:"required"`
	Address      string `form:"address" json:"address" binding:"required"`
	Allergic     string `form:"allergic" json:"allergic"`
	ProfileImage string `form:"profile_image" json:"profile_image"` // bisa URL atau nanti di-handle upload file
}

func (m *BuyerProfileModel) InsertBuyerProfile(buyer *BuyerProfile) error {
	userModel := UserModel{DB: m.DB}
	_, err := userModel.GetUserById(buyer.UserID)
	if err != nil {
		return fmt.Errorf("user_id tidak ditemukan: %v", err)
	}
	buyer.CreatedAt = time.Now()
	result := m.DB.Create(buyer)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("no row inserted")
	}

	return nil
}
