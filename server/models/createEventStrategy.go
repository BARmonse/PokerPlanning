package models

import (
	"encoding/json"
	"log"
)

type CreateRoomRequest struct {
	Username string `json:"username"`
}

type CreateEventStrategy struct {
}

func (s *CreateEventStrategy) HandleEvent(eventPayload json.RawMessage) {
	var createRoomRequest CreateRoomRequest
	err := json.Unmarshal(eventPayload, &createRoomRequest)
	if err != nil {
		log.Println("Error decoding username:", err)
		return
	}

	log.Printf("Room created by %v", createRoomRequest.Username)
}