package types

import "inet-project/app/dal"

// RestauResponse struct contains the todo field which should be returned in a response
type RestauResponse struct {
	ID         uint           `json:"id"`
	RestauInfo dal.RestauInfo `json:"restauinfo"`
	Favorited  bool           `json:"favorited"`
}

// FavoriteRestauDTO defined the payload for the favorite Restau
type FavoriteRestauDTO struct {
	Favorited bool `json:"favorited"`
}
