package models

import "server/utils"

type Player struct{

	Identifier string `json:"identifier"`
	Name string `json:"name"`
	IsAdmin bool `json:"isAdmin"`
}

func CreatePlayer(name string, isAdmin bool) *Player {
	identifier := utils.GenerateIdentifier(16)
	return &Player{
		Identifier: identifier,
		Name: name,
		IsAdmin: isAdmin,
	}
}