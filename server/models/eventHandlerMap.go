package models

var EventHandlers = map[string]EventHandler{
	USERNAME_CREATED: &CreateUserStrategy{},
	ROOM_CREATED: &CreateEventStrategy{},
	JOIN_ROOM: &JoinRoomStrategy{},
	TASK_ADDED: &AddTaskStrategy{},
}