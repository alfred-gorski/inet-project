package model

import "gorm.io/gorm"

// Restaurant struct
type Restaurant struct {
	gorm.Model
	Name        string `gorm:"not null" json:"title"`
	Type        string `gorm:"not null" json:"type"`
	Location    int    `gorm:"not null" json:"location"`
	Phone       string `gorm:"not null" json:"phone"`
	Description string `gorm:"not null" json:"description"`
	Image       string `gorm:"not null" json:"image"`
}
