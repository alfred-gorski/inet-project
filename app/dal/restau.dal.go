package dal

import (
	"inet-project/database"

	"gorm.io/gorm"
)

// RestauInfo defines the Restau
type RestauInfo struct {
	Title       string `json:"title"`
	Type        string `json:"type"`
	Location    string `json:"location"`
	Phone       string `json:"phone"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

// Restau struct defines the Restau Model
type Restau struct {
	gorm.Model
	User       uint       `gorm:"not null;index" json:"user"`
	RestauInfo RestauInfo `gorm:"embedded"`
	Favorited  bool       `gorm:"default:false" json:"favorited"`
}

// CreateRestau create a Restau entry in the Restau's table
func CreateRestau(Restau *Restau) *gorm.DB {
	return database.DB.Create(Restau)
}

// FindRestau finds a Restau with given condition
func FindRestau(dest interface{}, conds ...interface{}) *gorm.DB {
	return database.DB.Model(&Restau{}).Take(dest, conds...)
}

// FindRestauByUser finds a Restau with given Restau and user identifier
func FindRestauByUser(dest interface{}, RestauIden interface{}, userIden interface{}) *gorm.DB {
	return FindRestau(dest, "id = ? AND user = ?", RestauIden, userIden)
}

// FindRestausByUser finds the Restaus with user's identifier given
func FindRestausByUser(dest interface{}, userIden interface{}) *gorm.DB {
	return database.DB.Model(&Restau{}).Find(dest, "user = ?", userIden)
}

// DeleteRestau deletes a Restau from Restaus' table with the given Restau and user identifier
func DeleteRestau(RestauIden interface{}, userIden interface{}) *gorm.DB {
	return database.DB.Unscoped().Delete(&Restau{}, "id = ? AND user = ?", RestauIden, userIden)
}

// UpdateRestau allows to update the Restau with the given RestauID and userID
func UpdateRestau(RestauIden interface{}, userIden interface{}, data interface{}) *gorm.DB {
	return database.DB.Model(&Restau{}).Where("id = ? AND user = ?", RestauIden, userIden).Updates(data)
}
