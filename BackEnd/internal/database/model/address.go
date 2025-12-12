package model

import (
	"gorm.io/gorm"
)

type Address struct {
	DB *gorm.DB
}
