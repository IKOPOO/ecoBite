package model

import (
	"fmt"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type SellerProfileModel struct {
	DB *gorm.DB
}

type VerificationStatus string

const (
	VerificationPending  VerificationStatus = "pending"
	VerificationApproved VerificationStatus = "approved"
	VerificationRejected VerificationStatus = "rejected"
)

type SellerProfile struct {
	ID                 uuid.UUID          `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID             uuid.UUID          `gorm:"type:uuid;not null" json:"user_id"`
	StoreName          string             `gorm:"type:varchar(150);not null" json:"store_name"`
	OwnerName          string             `gorm:"type:varchar(150);not null" json:"owner_name"`
	Address            string             `gorm:"type:text;not null" json:"address"`
	Phone              string             `gorm:"type:varchar(50);not null" json:"phone"`
	StoreImage         string             `gorm:"type:text" json:"store_image"`
	StoreDescription   string             `gorm:"type:text" json:"store_description"`
	VerificationStatus VerificationStatus `gorm:"type:verification_status_enum;default:'pending'" json:"verification_status"`
	KtpNumber          string             `gorm:"type:varchar(100)" json:"ktp_number"`
	KtpImage           string             `gorm:"type:text" json:"ktp_image"`
	VerifiedAt         *time.Time         `json:"verified_at"`
	CreatedAt          time.Time          `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt          time.Time          `gorm:"autoUpdateTime" json:"updated_at"`
}

type CreateSellerProfileRequest struct {
	UserID           string `form:"user_id" validate:"required,uuid4"`
	StoreName        string `form:"store_name" validate:"required"`
	OwnerName        string `form:"owner_name" validate:"required"`
	Address          string `form:"address" validate:"required"`
	Phone            string `form:"phone" validate:"required"`
	StoreImage       string `form:"store_image"`       // untuk upload file
	StoreDescription string `form:"store_description"` // teks biasa
	KTPNumber        string `form:"ktp_number"`        // teks biasa
	KTPImage         string `form:"ktp_image"`         // untuk upload file
}

func (m *SellerProfileModel) InsertSellerProfile(seller *SellerProfile) error {
	var user SellerProfile
	if err := m.DB.First(&user, seller.UserID).Error; err != nil {
		return fmt.Errorf("user_id tidak ditemukan")
	}
	// Validasi email unik
	seller.CreatedAt = time.Now()
	result := m.DB.Create(seller)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("no row inserted")
	}
	return nil
}
