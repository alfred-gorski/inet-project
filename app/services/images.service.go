package services

import (
	"os"

	"github.com/gofiber/fiber/v2"
)

// GetImage return a single Image
func GetImage(c *fiber.Ctx) error {
	imageAddr := c.Params("imageAddr")

	if imageAddr == "" {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Invalid image address")
	}
	path := "images/" + imageAddr + ".jpg"
	_, err := os.Stat(path)
	if err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Image not exists")
	}

	return c.SendFile(path)
}
