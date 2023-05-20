package main

import (
	"log"
	"net/http"
)

func main() {
	setupConnection()

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func setupConnection() {

	roomManager := newRoomManager()

	http.HandleFunc("/socket.io/", roomManager.serve)
}