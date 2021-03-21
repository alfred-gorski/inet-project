package model

import (
	"gorm.io/gorm"
)

// User struct
type User struct {
	gorm.Model
	Username  string `gorm:"unique_index;not null" json:"username"`
	Email     string `gorm:"unique_index;not null" json:"email"`
	Password  string `gorm:"not null" json:"password"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}
