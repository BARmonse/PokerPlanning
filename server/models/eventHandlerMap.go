package models

var EventHandlers = map[string]EventHandler{
	USERNAME_CREATED: &CreateUserStrategy{},
	ROOM_CREATED: &CreateEventStrategy{},
	JOIN_ROOM: &JoinRoomStrategy{},
	TASK_ADDED: &AddTaskStrategy{},
	TASK_UPDATED: &UpdateTaskStrategy{},
	TASK_DELETED: &DeleteTaskStrategy{},
}