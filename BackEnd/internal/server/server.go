package server

import (
	"ecobite/internal/config"
	"ecobite/internal/routes"
	"fmt"
	"log"
	"net/http"
	"time"
)

func NewServer(app *config.Application) error {

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", app.Port),
		Handler:      routes.Routes(app),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	log.Printf("🚀 Server running on Port %d", app.Port)
	return server.ListenAndServe()

}
