package main

import (
	"fmt"
	"inet-project/app/dal"
	"inet-project/app/routes"
	"inet-project/database"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	app.Use(logger.New())

	database.ConnectDB()

	database.Migrate(&dal.User{}, &dal.Restau{})
	fmt.Println("Database Migrated")

	routes.SetupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
