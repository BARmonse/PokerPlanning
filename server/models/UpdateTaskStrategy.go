package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"
)

type UpdateTaskRequest struct {
	TaskIdentifier string `json:"taskIdentifier"`
	Description string `json:"description"`
	Code string `json:"code"`
}

type UpdateTaskStrategy struct {
}

func (s *UpdateTaskStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, roomManager *RoomManager) {
	var updateTaskRequest UpdateTaskRequest
	err := json.Unmarshal(eventPayload, &updateTaskRequest)

	if err != nil {
		log.Println("Error decoding task description:", err)
		return
	}

	room := FindRoomByCode(roomManager.rooms, updateTaskRequest.Code)
	updateTaskDescription(room.Tasks, updateTaskRequest.TaskIdentifier, updateTaskRequest.Description)

	roomJSON, err := json.Marshal(room)
	if err != nil {
		log.Println("Error marshaling room:", err)
		return
	}

	event := Event{
		Type: TASK_UPDATED,
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