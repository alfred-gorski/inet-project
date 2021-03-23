package auth

import (
	"errors"
	"strconv"

	"github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// ValidURLTokenUserID check if URL id matches Token id. Return userId if matches
func ValidURLTokenUserID(c *fiber.Ctx) (int, error) {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return 0, err
	}

	token := c.Locals("user").(*jwt.Token)
	claims := token.Claims.(jwt.MapClaims)
	uid := int(claims["user_id"].(float64))

	if uid != id {
		return 0, errors.New("URL id does not match Token id")
	}
	return id, nil
}

// Hash return hashed password
func Hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckHash compare password with hash
func CheckHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
