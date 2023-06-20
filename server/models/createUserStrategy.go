package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"
)

type createUserRequest struct {
	Username string `json:"username"`
}

type CreateUserStrategy struct {
}

func (s *CreateUserStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, roomManager *RoomManager) {
	var createUserRequest createUserRequest
	err := json.Unmarshal(eventPayload, &createUserRequest)

	if err != nil {
		log.Println("Error decoding username:", err)
		return
	}

	createdPlayer := CreatePlayer(createUserRequest.Username, false)

	createdPlayerJSON, err := json.Marshal(createdPlayer)

	if err != nil {
		log.Println("Error marshaling new room:", err)
	}

	event := Event{
		Type:    USERNAME_CREATED,
		Payload: createdPlayerJSON,
	}

	eventJSON, err := json.Marshal(event)

	if err != nil {
		log.Println("Error marshaling user created event: ", err)
	}

	conn.WriteMessage(websocket.TextMessage, eventJSON)
}