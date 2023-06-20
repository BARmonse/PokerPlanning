package models

import "encoding/json"

type Event struct {
	Type string `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

const (
	ROOM_CREATED = "room_created"
	ROOM_CLOSED = "room_closed"
	JOIN_ROOM = "join_room"
	USERNAME_CREATED = "username_created"
  	USER_JOINED = "user_joined"
 	USER_LEFT = "user_joined"
  	USER_VOTED = "user_voted"
  	ALL_USERS_VOTED = "all_users_voted"
  	TASK_ADDED = "task_added"
  	TASK_UPDATED = "task_updated"
  	TASK_DELETED = "task_deleted"
)