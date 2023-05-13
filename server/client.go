package main

import (
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

type ClientList map[*Client]bool

type Client struct {

	connection *websocket.Conn
	manager *Manager

	// Used to avoid concurrent writes
	egress chan Event
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client{
		connection: conn,
		manager: manager,
		egress: make(chan Event),
	}
}

func (client* Client) readMessages() {

	defer func() {
		// Cleanup Connection
		client.manager.removeCLient(c)
	}()

	for {
		_, payload, error := client.connection.ReadMessage()

		if error != nil {
			if websocket.IsUnexpectedCloseError(error, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Error reading message: %v", error)
			}
			break
		}

		var request Event

		if err := json.Unmarshal(payload, &request); err != nil {
			log.Printf("Error marshaling event: %v", err)
			break
		}

		if err := client.manager.routeEvent(&request, client); err != nil {
			log.Println("Error handling event: %v", err)
		}
	}
}

func (client* Client) writeMessages() {

	defer func() {
		// Cleanup Connection
		client.manager.removeCLient(client)
	}()

	for {
		select {
		case message, ok := <-client.egress:
			if !ok {
				if err := client.connection.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("Connection Closed")
				}
			}

			data, err := json.Marshal(message)

			if err != nil {
				log.Println("Error marshaling message: %v", message)
				return
			}

			if err := client.connection.WriteMessage(websocket.TextMessage, data); err != nil {
				log.Printf("Failed to send message: %v", err)
			}
			log.Println("Message sent")
		}
	}
}