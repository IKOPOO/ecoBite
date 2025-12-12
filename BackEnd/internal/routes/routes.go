package routes

import (
	"ecobite/internal/auth"
	"ecobite/internal/config"
	"ecobite/internal/database/model"
	routes "ecobite/internal/routes"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routes(app *config.Application) http.Handler {
	r := gin.Default()

	v1 := r.Group("/api/v1")
	{
		authHandler := auth.NewUserauth(&app.Model.Users)

		routes.authHandler(v1, authHandler)
	}

	return r
}
