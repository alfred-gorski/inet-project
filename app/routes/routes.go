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
	restaus.Patch("/:restauID", services.FavoriteRestau) //TODO: not RESTful, change to UpdateRestau
	restaus.Delete("/:restauID", services.DeleteRestau)
	//TODO: get favorited Restau

	//TODO: image
}
