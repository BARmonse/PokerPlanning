package main

import (
	"errors"
	"fmt"
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

	handlers map[string]EventHandler
}

func newManager() *Manager{
	m := &Manager{
		clients: make(ClientList),
		handlers: make(map[string]EventHandler),
	}

	m.setUpEventHandlers()
	return m
}

func (m *Manager) setUpEventHandlers() {
	m.handlers[ROOM_CREATED] = createRoom
}

func createRoom(event *Event, c *Client) error {
	fmt.Println(event)
	return nil
}

func (m* Manager) routeEvent(event *Event, client *Client) error {

	if handler, ok := m.handlers[event.Type]; ok {

		if err := handler(event, client); err != nil {
			return err
		}

		return nil
	} else {
		return errors.New("There is no such event type")
	}

}

func (m *Manager) serve(w http.ResponseWriter, r *http.Request) {
	log.Println("Connection initialized")

	// Only for testing purpose. Use a list of accepted origins instead.
	webSocketUpgrader.CheckOrigin = func(r *http.Request) bool { return true }

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