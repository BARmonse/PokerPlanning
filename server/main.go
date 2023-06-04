package main

import (
	"log"
	"server/models"

	"github.com/valyala/fasthttp"
)

func main() {
	roomManager := models.NewRoomManager()

	server := &fasthttp.Server{
		Handler:     roomManager.Serve,
		ReadTimeout: 5 * fasthttp.DefaultDialTimeout,
	}

	log.Fatal(server.ListenAndServe(":8080"))
}