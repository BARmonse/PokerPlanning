package models

var EventHandlers = map[string]EventHandler{
	ROOM_CREATED: &CreateEventStrategy{},
	JOIN_ROOM: &JoinRoomStrategy{},
}