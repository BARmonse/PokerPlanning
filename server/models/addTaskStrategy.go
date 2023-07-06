package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"
)

type AddTaskRequest struct {
	Description string `json:"description"`
	Code string `json:"code"`
}

type AddTaskStrategy struct {
}

func (s *AddTaskStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, roomManager *RoomManager) {
	var addTaskRequest AddTaskRequest
	err := json.Unmarshal(eventPayload, &addTaskRequest)

	if err != nil {
		log.Println("Error decoding task description:", err)
		return
	}

	room := AddTask(FindRoomByCode(roomManager.rooms, addTaskRequest.Code), addTaskRequest.Description)

	roomJSON, err := json.Marshal(room)
	if err != nil {
		log.Println("Error marshaling new room:", err)
		return
	}

	event := Event{
		Type: TASK_ADDED,
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