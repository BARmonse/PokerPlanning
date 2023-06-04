package main

import (
	"encoding/json"
	"log"
	"server/constants"
	"server/interfaces"
	"server/models"
	"sync"

	"github.com/fasthttp/websocket"
	"github.com/valyala/fasthttp"
)

type RoomManager struct {
	rooms map[string]*models.Room
	eventHandler interfaces.EventHandler
	sync.RWMutex
}

func newRoomManager() *RoomManager {
	roomManager := &RoomManager{
		rooms: make(map[string]*models.Room),
	}

	return roomManager
}

func (rm *RoomManager) setEventHandler(e interfaces.EventHandler) {
	rm.eventHandler = e
}

func (roomManager *RoomManager) addRoom(room *models.Room) {
	roomManager.Lock()
	defer roomManager.Unlock()

	roomManager.rooms[room.Code] = room
}

func (roomManager *RoomManager) removeClient(room *models.Room) {
	roomManager.Lock()
	defer roomManager.Unlock()

	delete(roomManager.rooms, room.Code)
}

func (roomManager *RoomManager) serve(ctx *fasthttp.RequestCtx) {
	var upgrader = websocket.FastHTTPUpgrader{
		CheckOrigin: checkOrigin,
	}
	
	err := upgrader.Upgrade(ctx, func(conn *websocket.Conn) {
		log.Println("Connection initialized")
		defer conn.Close()

		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("Error while reading message:", err)
				return
			}

			var event models.Event
			err = json.Unmarshal(message, &event)

			if err != nil {
				log.Println("Errow while decoding event:", err)
				continue
			}

			eventHandler, found := constants.EventHandlers[event.Type]
			if (!found) {
				log.Println("Unknown Event Type:", event.Type)
			continue
			}

			eventHandler.HandleEvent(event.Payload);
		}
	})

	if err != nil {
		log.Println("Error while upgrading connection:", err)
	}
}

func checkOrigin(ctx *fasthttp.RequestCtx) bool {
	origin := string(ctx.Request.Header.Peek("Origin"))

	switch origin {
	case "http://localhost:3000":
		return true
	default:
		return false
	}
}