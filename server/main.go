package main

import (
	"fmt"
	"net/http"
)

const PORT = 80

// Go modulite sa absoljuten rak.
func main() {
	fs := http.Dir("./client")
	server := http.FileServer(fs)

	http.HandleFunc("/someShit", func(w http.ResponseWriter, r *http.Request) {	
		w.Write([]byte("Hello, world"))
	})

	http.Handle("/", http.RedirectHandler("/static/html/index.html", http.StatusMovedPermanently))
	http.Handle("/static/", http.StripPrefix("/static", server))

	fmt.Printf("Listening on port %d...\n", PORT);
	http.ListenAndServe(fmt.Sprintf(":%d", PORT), nil)
}
