package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"
)

type CreateRoomRequest struct {
	Username string `json:"username"`
}

type CreateEventStrategy struct {
}

func (s *CreateEventStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, em EventEmitter) {
	var createRoomRequest CreateRoomRequest
	err := json.Unmarshal(eventPayload, &createRoomRequest)
	if err != nil {
		log.Println("Error decoding username:", err)
		return
	}

	createdRoom := CreateRoom(conn, createRoomRequest.Username)

	em.Emit(ROOM_CREATED, createdRoom)
}