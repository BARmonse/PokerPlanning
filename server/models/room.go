package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"

	"server/utils"
)

type Room struct {

	Identifier string `json:"identifier"`
	Code string `json:"code"`
	Players []Player `json:"players"`
	Tasks []Task `json:"tasks"`
	Connections []*websocket.Conn
}


func CreateRoom(conn *websocket.Conn, player Player) *Room {
	var identifier = utils.GenerateIdentifier(16)
	var code = utils.GenerateIdentifier(6)

	player.IsAdmin = true

	var initialPlayers = []Player{
		player,
	}

	var initialConnections = []*websocket.Conn{
		conn,
	}

	newRoom := &Room{
		Identifier:  identifier,
		Code:        code,
		Players:     initialPlayers,
		Tasks:       []Task{},
		Connections: initialConnections,
	}

	newRoomJSON, err := json.Marshal(newRoom)
	if err != nil {
		log.Println("Error marshaling new room:", err)
		return nil
	}

	event := Event{
		Type:    ROOM_CREATED,
		Payload: newRoomJSON,
	}
	eventJSON, _ := json.Marshal(event)
	conn.WriteMessage(websocket.TextMessage, eventJSON)

	return newRoom
}

func FindRoomByCode(rooms map[string]*Room, roomCode string) *Room {
	room, found := rooms[roomCode]

	if (!found) {
		log.Printf("Room with code %v not found", roomCode)
	}

	return room
}

func AddPlayerToRoom(conn *websocket.Conn, room *Room, player Player) *Room {
	room.Players = append(room.Players, player)
	room.Connections = append(room.Connections, conn)

	return room
}

func AddTask(room *Room, taskDescription string) *Room {
	
	room.Tasks = append(room.Tasks, *newTask(taskDescription))
	return room
}

func updateTaskDescription(tasks []Task, taskIdentifier string, description string) {
	for _, task := range tasks {
		if task.Identifier == taskIdentifier {
			task.Description = description
			break
		}
	}
}

func removeTaskByIdentifier(tasks []Task, taskIdentifier string) {
	for i, task := range tasks {
		if task.Identifier == taskIdentifier {
			_ = append(tasks[:i], tasks[i+1:]...)
			break
		}
	}
}

