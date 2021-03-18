package database

import (
	"fmt"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"inet-project/model"

	"github.com/joho/godotenv"
)

// DB gorm connector
var DB *gorm.DB

// Config func to get env value
func Config(key string) string {
	// load .env file
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Print("Error loading .env file")
	}
	return os.Getenv(key)
}

// ConnectDB connect to db
func ConnectDB() {
	var err error
	// p := Config("DB_PORT")
	// port, err := strconv.ParseUint(p, 10, 32)
	// DB, err = gorm.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", Config("DB_HOST"), port, Config("DB_USER"), Config("DB_PASSWORD"), Config("DB_NAME")))
	DB, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	DB.AutoMigrate(&model.User{})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("Connection Opened to Database")
	DB.AutoMigrate(&model.User{})
	fmt.Println("Database Migrated")
}
