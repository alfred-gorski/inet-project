package router

import (
	"inet-project/handler"
	"inet-project/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// SetupRoutes setup router api
func SetupRoutes(app *fiber.App) {
	// Middleware
	api := app.Group("/api", logger.New())
	api.Get("/", handler.Hello)

	// Auth
	auth := api.Group("/auth")
	auth.Post("/login", handler.Login)

	// User
	user := api.Group("/user")
	user.Get("/:id", handler.GetUser)
	user.Post("/", handler.CreateUser)
	user.Patch("/:id", middleware.Protected(), handler.UpdateUser)
	user.Delete("/:id", middleware.Protected(), handler.DeleteUser)
}

/*
	apiGroup := app.Group("/api")
	{
		apiGroup.Get("/user", func(c *fiber.Ctx) error {
			return c.JSON(fiber.Map{"id": 1, "name": "kiyon"})
		})
	}

	app.Get("/*", func(c *fiber.Ctx) error {
		// if err := c.SendFile("public/index.html"); err != nil {
		// 	c.Next(fiber.ErrInternalServerError)
		// }
		return c.SendFile("public/index.html")
	})

	// for _, route := range app.Routes() {
	// 	log.Println(route.Method, route.Path)
	// }

	// Start server on http://localhost:3000
	log.Fatal(app.Listen(":3000"))
*/
