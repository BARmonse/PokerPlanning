package models

import (
	"encoding/json"

	"github.com/fasthttp/websocket"
)
type EventHandler interface {

	HandleEvent(connection *websocket.Conn, eventPayload json.RawMessage, roomManager *RoomManager)
}