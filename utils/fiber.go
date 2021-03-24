package utils

import "github.com/gofiber/fiber/v2"

// GetUserID is helper function for getting authenticated user's id
func GetUserID(c *fiber.Ctx) uint {
	id, _ := c.Locals("token").(uint)
	return id
}
