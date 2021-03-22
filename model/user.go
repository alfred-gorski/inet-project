package model

import (
	"gorm.io/gorm"
)

// User struct
type User struct {
	gorm.Model
	Email     string `gorm:"unique_index;not null" json:"email"`
	Password  string `gorm:"not null" json:"password"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

// UserData struct
type UserData struct {
	ID        uint   `json:"id"`
	Email     string `json:"email"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Token     string `json:"token"`
}
