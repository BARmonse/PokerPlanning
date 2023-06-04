package models

type Player struct{

	Name string
	IsAdmin bool
}

func CreatePlayer(name string, isAdmin bool) *Player {
	return &Player{
		Name: name,
		IsAdmin: isAdmin,
	}
}