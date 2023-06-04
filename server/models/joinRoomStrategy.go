package models

import (
	"encoding/json"
	"log"
)

type JoinRoomRequest struct {
	Username string `json:"username"`
	Code string `json:"code"`
}

type JoinRoomStrategy struct {
}

func (s *JoinRoomStrategy) HandleEvent(eventPayload json.RawMessage) {
	var joinRoomRequest JoinRoomRequest
	err := json.Unmarshal(eventPayload, &joinRoomRequest)
	if err != nil {
		log.Println("Error decoding Join room request:", err)
		return
	}

	log.Printf("Username %v is trying to access to room with code %v", joinRoomRequest.Username, joinRoomRequest.Code)
}