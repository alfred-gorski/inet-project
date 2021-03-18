package main

import (
	"inet-project/database"
	"inet-project/router"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	// serve Single Page application on "/public", assume static file at dist folder
	app.Static("/", "public")

	database.ConnectDB()

	router.SetupRoutes(app)
	log.Fatal(app.Listen(":3000"))

	// defer database.DB.Close()

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
}
