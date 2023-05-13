package main

import "net/http"

func main() {
	setupConnection()
}

func setupConnection() {
	http.Handle("/", http.FileServer(http.Dir("../client")))
}