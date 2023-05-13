package main

import "encoding/json"

type Event struct {
	Type string `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

type EventHandler func(event *Event, c *Client) error

const (
	ROOM_CREATED = "room_created"
	ROOM_CLOSED = "room_closed"
  	USER_JOINED = "user_joined"
 	USER_LEFT = "user_joined"
  	USER_VOTED = "user_voted"
  	ALL_USERS_VOTED = "all_users_voted"
  	TASK_ADDED = "task_added"
  	TASK_UPDATED = "task_updated"
  	TASK_DELETED = "task_deleted"
)

type RoomCreatedEvent struct {
	Creator string `json:"name"`
}