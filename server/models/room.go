package models

import (
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

	return &Room{
		Identifier:  identifier,
		Code:        code,
		Players:     initialPlayers,
		Tasks:       []Task{},
		Connections: initialConnections,
	}
}
