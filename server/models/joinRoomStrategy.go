package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"
)

type JoinRoomRequest struct {
	Username string `json:"username"`
	Code string `json:"code"`
}

type JoinRoomStrategy struct {
}

func (s *JoinRoomStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, roomManager *RoomManager) {
	var joinRoomRequest JoinRoomRequest
	err := json.Unmarshal(eventPayload, &joinRoomRequest)

	if err != nil {
		log.Println("Error decoding Join room request:", err)
		return
	}

	foundRoom := FindRoomByCode(roomManager.rooms, joinRoomRequest.Code)

	room := AddPlayerToRoom(conn, foundRoom, joinRoomRequest.Username)

	roomJSON, err := json.Marshal(room)
	if err != nil {
		log.Println("Error marshaling new room:", err)
		return
	}

	event := Event{
		Type:    "JOIN_ROOM",
		Payload: roomJSON,
	}

	eventJSON, _ := json.Marshal(event)

	log.Printf("Sending event to all connections in room %v...", room.Identifier)
	for _, c := range room.Connections {
		err := c.WriteMessage(websocket.TextMessage, eventJSON)
		if err != nil {
			log.Println("Error broadcasting room:", err)
			continue
		}
	}

	println("Event sent to all connections")
}