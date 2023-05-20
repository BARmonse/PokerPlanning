package models

type Room struct {

	Identifier string
	Code string
	Players []Player
	Tasks []Task
}