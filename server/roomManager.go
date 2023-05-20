package main

import (
	"log"
	"net/http"
	"server/models"
	"sync"

	"github.com/gorilla/websocket"
)

type RoomManager struct {
	rooms map[string]*models.Room
	sync.RWMutex
}

var (
	webSocketUpgrader = websocket.Upgrader{
		CheckOrigin: checkOrigin,
		ReadBufferSize: 1024,
		WriteBufferSize: 1024,
	}
)


func newRoomManager() *RoomManager{
	roomManager := &RoomManager{
		rooms: make(map[string]*models.Room),
	}

	return roomManager
}

func (roomManager *RoomManager) addRoom(room *models.Room) {
	roomManager.Lock()
	defer roomManager.Unlock()

	roomManager.rooms[room.Code] = room
}

func (roomManager *RoomManager) removeCLient(room *models.Room) {
	roomManager.Lock()
	defer roomManager.Unlock()


	delete(roomManager.rooms, room.Code)
	
}

func (roomManage *RoomManager) serve(w http.ResponseWriter, r *http.Request) {
	log.Println("Connection initialized")
	_, error := webSocketUpgrader.Upgrade(w, r, nil)

	if error != nil {
		log.Println(error)
		return
	}
}



func checkOrigin(request *http.Request) bool {
	origin := request.Header.Get("Origin")

	switch origin {
	case "http://localhost:3000":
		return true
	default:
		return false
	}
}