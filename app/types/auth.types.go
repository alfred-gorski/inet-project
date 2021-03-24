package types

import "inet-project/app/dal"

// LoginDTO defined the /login payload
type LoginDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignupDTO defined the /login payload
type SignupDTO struct {
	Email    string       `json:"email"`
	Password string       `json:"password"`
	UserInfo dal.UserInfo `json:"userinfo"`
}

// UserResponse todo
type UserResponse struct {
	ID       uint         `json:"id"`
	Email    string       `json:"email"`
	UserInfo dal.UserInfo `json:"userinfo"`
}

// AuthResponse todo
type AuthResponse struct {
	User  *UserResponse `json:"user"`
	Token string        `json:"token"`
}
