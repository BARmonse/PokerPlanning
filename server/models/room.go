package models

import (
	"encoding/json"
	"log"

	"github.com/fasthttp/websocket"

	"server/utils"
)

type Room struct {

	Identifier string
	Code string
	Players []Player
	Tasks []Task
	Connections []*websocket.Conn
}


func CreateRoom(conn *websocket.Conn, username string) *Room {
	var identifier = utils.GenerateRoomIdentifier(16)
	var code = utils.GenerateRoomIdentifier(6)

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
