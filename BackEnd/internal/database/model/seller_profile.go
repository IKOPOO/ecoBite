package model

import (
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
	ID     uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`

	StoreName string `gorm:"type:varchar(150);not null" json:"store_name"`
	OwnerName string `gorm:"type:varchar(150);not null" json:"owner_name"`
	Address   string `gorm:"type:text;not null" json:"address"`
	Phone     string `gorm:"type:varchar(50);not null" json:"phone"`

	StoreImage       string `gorm:"type:text" json:"store_image"`
	StoreDescription string `gorm:"type:text" json:"store_description"`

	VerificationStatus VerificationStatus `gorm:"type:verification_status_enum;default:'pending'" json:"verification_status"`

	KtpNumber string `gorm:"type:varchar(100)" json:"ktp_number"`
	KtpImage  string `gorm:"type:text" json:"ktp_image"`

	VerifiedAt *time.Time `json:"verified_at"`

	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
