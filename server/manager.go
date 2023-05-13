package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var (
	webSocketUpgrader = websocket.Upgrader{
		ReadBufferSize: 1024,
		WriteBufferSize: 1024,
	}
)

type Manager struct {
	clients ClientList
	sync.RWMutex
}

func newManager() *Manager{
	return &Manager{
		clients: make(ClientList),
	}
}

func (m *Manager) serve(w http.ResponseWriter, r *http.Request) {
	log.Println("Connection initialized")

	connection, error := webSocketUpgrader.Upgrade(w, r, nil)

	if error != nil {
		log.Println(error)
		return
	}

	client:= NewClient(connection, m)
	m.addClient(client)

	go client.readMessages()
	go client.writeMessages()

}

func (m *Manager) addClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	m.clients[client] = true
}

func (m *Manager) removeCLient(client *Client) {
	m.Lock()
	defer m.Unlock()

	if _, ok := m.clients[client]; ok {
		client.connection.Close()
		delete(m.clients, client)
	}
}