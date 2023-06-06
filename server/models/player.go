package models

type Player struct{

	Name string `json:"name"`
	IsAdmin bool `json:"isAdmin"`
}

func CreatePlayer(name string, isAdmin bool) *Player {
	return &Player{
		Name: name,
		IsAdmin: isAdmin,
	}
}