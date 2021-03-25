package services

import (
	"errors"
	"inet-project/app/dal"
	"inet-project/app/types"
	"inet-project/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// CreateRestau is responsible for create Restau
func CreateRestau(c *fiber.Ctx) error {
	b := new(dal.RestauInfo)
	if err := c.BodyParser(b); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	d := &dal.Restau{
		User:       utils.GetUserID(c),
		RestauInfo: *b,
		Favorited:  false,
	}

	if err := dal.CreateRestau(d).Error; err != nil {
		return fiber.NewError(fiber.StatusConflict, err.Error())
	}

	return c.JSON(&types.RestauResponse{
		ID:         d.ID,
		RestauInfo: *b,
		Favorited:  false,
	})
}

// GetRestaus returns the Restaus list
func GetRestaus(c *fiber.Ctx) error {
	d := []dal.Restau{}

	p := &dal.Restau{}
	if err := c.QueryParser(p); err != nil {
		return err
	}
	if p.Favorited == true {
		if err := dal.FindFavoriteRestausByUser(&d, utils.GetUserID(c), true).Error; err != nil {
			return fiber.NewError(fiber.StatusConflict, err.Error())
		}
	} else {
		if err := dal.FindRestausByUser(&d, utils.GetUserID(c)).Error; err != nil {
			return fiber.NewError(fiber.StatusConflict, err.Error())
		}
	}

	r := []types.RestauResponse{}
	for _, v := range d {
		r = append(r, types.RestauResponse{
			ID:         v.ID,
			RestauInfo: v.RestauInfo,
			Favorited:  v.Favorited,
		})
	}
	return c.JSON(r)
}

// GetRestau return a single Restau
func GetRestau(c *fiber.Ctx) error {
	restauID := c.Params("restauID")

	if restauID == "" {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Invalid restauID")
	}

	d := &dal.Restau{}
	err := dal.FindRestauByUser(d, restauID, utils.GetUserID(c)).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.JSON(&types.RestauResponse{})
	}

	return c.JSON(&types.RestauResponse{
		ID:         d.ID,
		RestauInfo: d.RestauInfo,
		Favorited:  d.Favorited,
	})
}

// DeleteRestau deletes a single todo
func DeleteRestau(c *fiber.Ctx) error {
	restauID := c.Params("restauID")

	if restauID == "" {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Invalid restauID")
	}

	res := dal.DeleteRestau(restauID, utils.GetUserID(c))
	if res.RowsAffected == 0 {
		return fiber.NewError(fiber.StatusConflict, "Unable to delete restau")
	}

	err := res.Error
	if err != nil {
		return fiber.NewError(fiber.StatusConflict, err.Error())
	}

	return c.JSON(&types.MsgResponse{
		Message: "Todo successfully deleted",
	})
}

// FavoriteRestau TODO
func FavoriteRestau(c *fiber.Ctx) error {
	b := new(types.FavoriteRestauDTO)
	restauID := c.Params("restauID")

	if restauID == "" {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Invalid restauID")
	}

	if err := c.BodyParser(b); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if err := dal.UpdateRestau(restauID, utils.GetUserID(c),
		map[string]interface{}{"favorited": b.Favorited}).Error; err != nil {
		return fiber.NewError(fiber.StatusConflict, err.Error())
	}

	return c.JSON(&types.MsgResponse{
		Message: "Restau successfully favorited",
	})
}

// TODO: Update Restau
