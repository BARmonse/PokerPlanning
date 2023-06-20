package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"
)

type CreateRoomRequest struct {
	Player Player `json:"user"`
}

type CreateEventStrategy struct {
}

func (s *CreateEventStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, roomManager *RoomManager) {
	var createRoomRequest CreateRoomRequest
	err := json.Unmarshal(eventPayload, &createRoomRequest)

	if err != nil {
		log.Println("Error decoding username:", err)
		return
	}

	createdRoom := CreateRoom(conn, createRoomRequest.Player)

	roomManager.eventEmitter.Emit(ROOM_CREATED, createdRoom)
}