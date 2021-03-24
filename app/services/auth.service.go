package services

import (
	"encoding/json"
	"errors"
	"inet-project/app/dal"
	"inet-project/app/types"
	"inet-project/utils/jwt"
	"inet-project/utils/password"
	"io/ioutil"
	"os"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

var defaultRestausData = defaultData("data.json")

// Login service logs in a user
func Login(c *fiber.Ctx) error {
	b := new(types.LoginDTO)
	if err := c.BodyParser(b); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	user := &dal.User{}

	err := dal.FindUserByEmail(user, b.Email).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid email")
	}

	if err := password.Verify(user.Password, b.Password); err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid password")
	}

	t, err := jwt.Generate(&jwt.TokenPayload{
		Email: user.Email,
		ID:    user.ID,
	})

	return c.JSON(&types.AuthResponse{
		User: &types.UserResponse{
			ID:       user.ID,
			Email:    user.Email,
			UserInfo: user.UserInfo,
		},
		Token: t,
	})
}

// Signup service creates a user
func Signup(c *fiber.Ctx) error {
	b := new(types.SignupDTO)
	if err := c.BodyParser(b); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err)
	}

	err := dal.FindUserByEmail(&struct{ ID string }{}, b.Email).Error

	// If email already exists, return
	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return fiber.NewError(fiber.StatusConflict, "Email already exists")
	}

	user := &dal.User{
		Email:    b.Email,
		Password: password.Generate(b.Password),
		UserInfo: b.UserInfo,
	}

	// Create a user, if error return
	if err := dal.CreateUser(user); err.Error != nil {
		return fiber.NewError(fiber.StatusConflict, err.Error.Error())
	}

	for _, restau := range defaultRestausData {
		d := &dal.Restau{
			User:       user.ID,
			RestauInfo: restau,
			Favorited:  false,
		}

		if err := dal.CreateRestau(d).Error; err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}
	}

	t, err := jwt.Generate(&jwt.TokenPayload{
		Email: user.Email,
		ID:    user.ID,
	})

	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(&types.AuthResponse{
		User: &types.UserResponse{
			ID:       user.ID,
			Email:    user.Email,
			UserInfo: user.UserInfo,
		},
		Token: t,
	})
}

func defaultData(path string) []dal.RestauInfo {
	jsonFile, err := os.Open(path)
	if err != nil {
		println(err)
	}

	defer jsonFile.Close()

	b, _ := ioutil.ReadAll(jsonFile)

	var restaus []dal.RestauInfo

	json.Unmarshal([]byte(b), &restaus)

	return restaus
}
