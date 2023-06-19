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


func CreateRoom(conn *websocket.Conn, username string) *Room {
	var identifier = utils.GenerateIdentifier(16)
	var code = utils.GenerateIdentifier(6)

	var player = CreatePlayer(username, true)

	var initialPlayers = []Player{
		*player,
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
		Type:    "ROOM_CREATED",
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

func AddPlayerToRoom(conn *websocket.Conn, room *Room, username string) *Room {
	var player = CreatePlayer(username, false)

	room.Players = append(room.Players, *player)
	room.Connections = append(room.Connections, conn)

	return room
}
