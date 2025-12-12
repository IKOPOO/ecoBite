package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type NotificationModel struct {
	DB *gorm.DB
}

type Notification struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`

	UserID uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`

	Title   string `gorm:"type:varchar(255);not null" json:"title"`
	Message string `gorm:"type:text;not null" json:"message"`

	Type string `gorm:"type:notification_type_enum;not null" json:"type"`

	IsRead bool `gorm:"default:false" json:"is_read"`

	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}
