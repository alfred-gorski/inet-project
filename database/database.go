package database

import (
	"fmt"
	"inet-project/model"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// DB gorm connector
var DB *gorm.DB

// Config func to get env value
func Config(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Print("Error loading .env file")
	}
	return os.Getenv(key)
}

// ConnectDB connect to db
func ConnectDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("Connection Opened to Database")
	DB.AutoMigrate(&model.User{}, &model.Product{})
	fmt.Println("Database Migrated")
}
