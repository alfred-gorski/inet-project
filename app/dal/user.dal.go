package dal

import (
	"inet-project/database"

	"gorm.io/gorm"
)

// UserInfo defines the User
type UserInfo struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

// User struct
type User struct {
	gorm.Model
	Email    string   `gorm:"uniqueIndex;not null" json:"email"`
	Password string   `gorm:"not null" json:"password"`
	UserInfo UserInfo `gorm:"embedded"`
}

// CreateUser create a user entry in the user's table
func CreateUser(user *User) *gorm.DB {
	return database.DB.Create(user)
}

// FindUser searches the user's table with the condition given
func FindUser(dest interface{}, conds ...interface{}) *gorm.DB {
	return database.DB.Model(&User{}).Take(dest, conds...)
}

// FindUserByEmail searches the user's table with the email given
func FindUserByEmail(dest interface{}, email string) *gorm.DB {
	return FindUser(dest, "email = ?", email)
}
