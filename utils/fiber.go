package utils

import (
	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
)

// GetUserID is helper function for getting authenticated user's id
func GetUserID(c *fiber.Ctx) uint {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	id := claims["ID"].(float64)
	return uint(id)
	// id, _ := c.Locals("userID").(uint)
	// return id
}
