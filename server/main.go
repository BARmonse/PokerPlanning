package main

import (
	"log"

	"github.com/valyala/fasthttp"
)

func main() {
	roomManager := newRoomManager()

	server := &fasthttp.Server{
		Handler:     roomManager.serve,
		ReadTimeout: 5 * fasthttp.DefaultDialTimeout,
	}

	log.Fatal(server.ListenAndServe(":8080"))
}