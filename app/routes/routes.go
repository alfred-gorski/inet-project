package routes

import (
	"inet-project/app/services"
	"inet-project/utils/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	auth := api.Group("/auth")
	auth.Post("/signup", services.Signup)
	auth.Post("/login", services.Login)

	// User
	restaus := api.Group("/restaus", middleware.Protected())
	restaus.Get("/", services.GetRestaus)
	restaus.Get("/:restauID", services.GetRestau)
	restaus.Post("/", services.CreateRestau)
	restaus.Patch("favorite/:restauID", services.FavoriteRestau)
	restaus.Delete("/:restauID", services.DeleteRestau)

	//TODO: image authentication
	// images := api.Group("/images", middleware.Protected())
	images := api.Group("/images")
	images.Get("/:imageAddr", services.GetImage)
}
