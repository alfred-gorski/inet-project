package helper

import (
	"errors"
	"inet-project/database"
	"inet-project/model"

	"gorm.io/gorm"
)

// GetUserByEmail return user with emal
func GetUserByEmail(e string) (*model.User, error) {
	db := database.DB
	var user model.User
	if err := db.Where(&model.User{Email: e}).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}
