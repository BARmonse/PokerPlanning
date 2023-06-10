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

func (s *JoinRoomStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, roomManager RoomManager) {
	var joinRoomRequest JoinRoomRequest
	err := json.Unmarshal(eventPayload, &joinRoomRequest)

	if err != nil {
		log.Println("Error decoding Join room request:", err)
		return
	}

	foundRoom := FindRoomByCode(roomManager.rooms, joinRoomRequest.Code)

	room := AddPlayerToRoom(conn, foundRoom, joinRoomRequest.Username)
	
	for _, c := range room.Connections {
		err := c.WriteJSON(room)
		if err != nil {
			log.Println("Error broadcasting room:", err)
		}
	}
}