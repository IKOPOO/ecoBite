package config

import (
	"ecobite/internal/database"
	"log"

	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		log.Println("no file detected")
	}
}

type Application struct {
	Port  int
	DB    *gorm.DB
	Model database.Models
}
