package auth

import (
	"errors"
	"strconv"

	"github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
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
