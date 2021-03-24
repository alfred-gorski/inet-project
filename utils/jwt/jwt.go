package jwt

import (
	"inet-project/database"
	"time"

	"github.com/form3tech-oss/jwt-go"
)

// TokenPayload defines the payload for the token
type TokenPayload struct {
	Email string
	ID    uint
}

// Generate generates the jwt token based on payload
func Generate(payload *TokenPayload) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": payload.Email,
		"ID":    payload.ID,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	})

	return token.SignedString([]byte(database.Config("SECRET")))

}
