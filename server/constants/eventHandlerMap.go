package constants

import (
	"server/interfaces"
	"server/models"
)

var EventHandlers = map[string]interfaces.EventHandler{
	models.ROOM_CREATED: &models.CreateEventStrategy{},
}