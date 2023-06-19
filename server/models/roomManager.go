package models

import (
	"encoding/json"
	"log"
	"sync"

	"github.com/fasthttp/websocket"
	"github.com/valyala/fasthttp"
)

type RoomManager struct {
	rooms map[string]*Room
	eventEmitter EventEmitter
	sync.RWMutex
}

func NewRoomManager() *RoomManager {
	roomManager := &RoomManager{
		rooms: make(map[string]*Room),
		eventEmitter: *NewEventEmitter(),
	}

	roomManager.setupListeners()

	return roomManager
}

func (roomManager *RoomManager) addRoom(room *Room) {
	roomManager.Lock()
	defer roomManager.Unlock()

	roomManager.rooms[room.Code] = room
}

func (roomManager *RoomManager) removeClient(room *Room) {
	roomManager.Lock()
	defer roomManager.Unlock()

	delete(roomManager.rooms, room.Code)
}

func (rm *RoomManager) setupListeners() {
	rm.eventEmitter.On(ROOM_CREATED, func(payload interface{}) {
		if room, ok := payload.(*Room); ok {
			rm.addRoom(room)
			log.Printf("Created room: %+v", room)
		} else {
			log.Println("Invalid payload type")
		}
	})
}

func (roomManager *RoomManager) Serve(ctx *fasthttp.RequestCtx) {
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

			var event Event
			err = json.Unmarshal(message, &event)

			if err != nil {
				log.Println("Errow while decoding event:", err)
				continue
			}

			eventHandler, found := EventHandlers[event.Type]
			if (!found) {
				log.Println("Unknown Event Type:", event.Type)
			continue
			}

			eventHandler.HandleEvent(conn, event.Payload, *roomManager);
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