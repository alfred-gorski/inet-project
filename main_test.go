package main

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"inet-project/app/dal"
	"inet-project/database"
	"io/ioutil"
	"os"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func TestImageServer(t *testing.T) {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	app.Use(logger.New())
	// serve Single Page application on "web/dist"
	// app.Static("/", "web/dist")

	database.ConnectDB()

	database.Migrate(&dal.User{}, &dal.Restau{})
	fmt.Println("Database Migrated")

	CreateDefaultRestauData(1)

	// log.Fatal(app.Listen(":3000"))

}

func CreateDefaultRestauData(userID uint) {

	jsonFile, err := os.Open("defaultdata.json")
	if err != nil {
		println(err)
	}

	defer jsonFile.Close()

	b, _ := ioutil.ReadAll(jsonFile)

	var restaus []dal.RestauInfo

	json.Unmarshal([]byte(b), &restaus)

	h := sha1.New()

	for _, restau := range restaus {
		h.Write([]byte(restau.Image))
		ha := fmt.Sprintf("%x", h.Sum(nil))
		os.Rename("images/"+restau.Image+".jpg", "images/"+ha+".jpg")
		restau.Image = ha

		// d := &dal.Restau{
		// 	User:       userID,
		// 	RestauInfo: restau,
		// 	Favorited:  false,
		// }
		jsons, _ := json.Marshal(restau)
		println(string(jsons))

		// if err := dal.CreateRestau(d).Error; err != nil {
		// 	println(err.Error())
		// }
	}
}
