package routes

import (
	"inet-project/app/services"

	"github.com/gofiber/fiber/v2"
)

// AuthRoutes containes all the auth routes
func AuthRoutes(app fiber.Router) {
	api := app.Group("/api")
	auth := api.Group("/auth")

	auth.Post("/signup", services.Signup)
	auth.Post("/login", services.Login)
}
