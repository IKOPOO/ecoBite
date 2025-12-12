package model

import (
	"fmt"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type UserModel struct {
	DB *gorm.DB
}

type User struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Email     string    `gorm:"type:varchar(100);unique" form:"email" json:"email"`
	Username  string    `gorm:"type:varchar(100);unique" form:"username" json:"username"`
	Password  string    `gorm:"type:varchar(255)" form:"password" json:"password"`
	Role      string    `gorm:"type:varchar(20)" form:"role" json:"role"`
	Status    string    `gorm:"type:varchar(20);default:pending" form:"status" json:"status"`
	CreatedAt time.Time `gorm:"autoCreateTime" form:"created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" form:"updated_at" json:"updated_at"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterRequest struct {
	Username string `json:"username"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password"`
}

// insert new user data
func (m *UserModel) InsertUser(user *User) error {
	result := m.DB.Create(user)
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("no row inserted")
	}

	return nil
}

// get user by email
func (m *UserModel) FindByEmail(email string) (*User, error) {
	var user User
	result := m.DB.First(&user, "email = ?", email)
	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil

}

// get user by id
func (m *UserModel) GetUserById(id int) (*User, error) {
	var user User
	if err := m.DB.First(&user, id).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
