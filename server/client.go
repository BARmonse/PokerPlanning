package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type ClientList map[*Client]bool

type Client struct {

	connection *websocket.Conn
	manager *Manager

	// Used to avoid concurrent writes
	egress chan[] byte
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client{
		connection: conn,
		manager: manager,
		egress: make(chan []byte),
	}
}

func (c* Client) readMessages() {

	defer func() {
		// Cleanup Connection
		c.manager.removeCLient(c)
	}()

	for {
		messageType, payload, error := c.connection.ReadMessage()

		if error != nil {
			if websocket.IsUnexpectedCloseError(error, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Error reading message: %v", error)
			}
			break
		}

		log.Println(messageType)
		log.Println(string(payload))
	}
}

func (c* Client) writeMessages() {

	defer func() {
		// Cleanup Connection
		c.manager.removeCLient(c)
	}()

	for {
		select {
		case message, ok := <-c.egress:
			if !ok {
				if err := c.connection.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("Connection Closed")
				}
			}

			if err := c.connection.WriteMessage(websocket.TextMessage, message); err != nil {
				log.Printf("Failed to send message: %v", err)
			}
			log.Println("Message sent")
		}
	}
}