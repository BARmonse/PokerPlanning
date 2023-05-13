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

	manager := newManager()

	http.Handle("/", http.FileServer(http.Dir("../client")))
	http.HandleFunc("/ws", manager.serve)
}