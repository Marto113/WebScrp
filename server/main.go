package main

import (
	"fmt"
	"net/http"
	"io"
)

const (
	PORT = 80
	CHUNK_SIZE = 1024
)

func handleScrape(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Query().Get("siteurl")
	resp, err := http.Get(url)

	if err != nil {
		fmt.Printf("Something went wrong.\n")
		return
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		fmt.Print(err)
	}

	w.Write(body);
}

// Go modulite sa absoljuten rak.
func main() {
	fs := http.Dir("./client")
	server := http.FileServer(fs)

	http.HandleFunc("/scrape", handleScrape)
	http.HandleFunc("/someShit", func(w http.ResponseWriter, r *http.Request) {	
		w.Write([]byte("Hello, world"))
	})

	http.Handle("/", http.RedirectHandler("/static/html/index.html", http.StatusMovedPermanently))
	http.Handle("/static/", http.StripPrefix("/static", server))

	fmt.Printf("Listening on port %d...\n", PORT);
	http.ListenAndServe(fmt.Sprintf(":%d", PORT), nil)
}
