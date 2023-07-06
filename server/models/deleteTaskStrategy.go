package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"
)

type DeleteTaskRequest struct {
	TaskIdentifier string `json:"taskIdentifier"`
	Code string `json:"code"`
}

type DeleteTaskStrategy struct {
}

func (s *DeleteTaskStrategy) HandleEvent(conn *websocket.Conn, eventPayload json.RawMessage, roomManager *RoomManager) {
	var deleteTaskRequest DeleteTaskRequest
	err := json.Unmarshal(eventPayload, &deleteTaskRequest)

	if err != nil {
		log.Println("Error decoding task description:", err)
		return
	}

	room := FindRoomByCode(roomManager.rooms, deleteTaskRequest.Code)
	removeTaskByIdentifier(room.Tasks, deleteTaskRequest.TaskIdentifier)

	roomJSON, err := json.Marshal(room)
	if err != nil {
		log.Println("Error marshaling room:", err)
		return
	}

	event := Event{
		Type: TASK_DELETED,
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