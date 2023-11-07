package routes

import (
	authentication "backend/internal/Authentication"
	validation "backend/internal/Validation"
	"backend/internal/subscriptions"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/cors"
)

/*
NewRouter making mux which is a router library that go has
we are passing connection pool as a parameter which is called in main
and returning http.Handler which is basically the router
cors is used to make sure backend recognizes frontend incoming requests
mux.HandleFunc() is used to add a new router to our website first patameter is the url and second parameter is the function to handle the request
response is gonna be response writer, this is where you return the http status code and any json data
request is gonna be a requesthandler where any data sent from front end will be stored, to read the data you will need to unmarshal it basically saying desearilizing
if you have additional parameters other than response and request you will need to do func(reponse,request){and the func you wanna call to do stuff}
*/

func NewRouter(pool *pgxpool.Pool) http.Handler {
	
	userHandler := &authentication.UserHandler{
		DB: pool,
	}


	mux := http.NewServeMux()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // Replace with your React frontend's URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	// all the routes
	mux.HandleFunc("/getUserID",userHandler.GetUserID)

	mux.HandleFunc("/auth/google/login", authentication.Login)

	mux.HandleFunc("/auth/google/callback", userHandler.Callback)

	mux.HandleFunc("/auth/signup",userHandler.NewSignUp)

	mux.HandleFunc("/auth/login",userHandler.UserLogin)

	mux.HandleFunc("/validate-jwt",authentication.ValidateJWT)

	mux.HandleFunc("/validate-twofa",userHandler.Validate)

	mux.HandleFunc("/validate-two-fa",func(response http.ResponseWriter, request *http.Request) {
		validation.ValidateCode(response,request,pool)
	})
	

	mux.HandleFunc("/insert-subscription",func(response http.ResponseWriter, request *http.Request) {
		subscriptions.Insert(response,request,pool)
	})

	mux.HandleFunc("/subscriptions/getMax",func(response http.ResponseWriter, request *http.Request) {
		subscriptions.GetMax(response,request,pool)
	})

	mux.HandleFunc("/suscriptions/search",func(response http.ResponseWriter, request *http.Request) {
		subscriptions.Search(response,request,pool)
	})


	handler := c.Handler(mux)

	// return router
	return handler
	
}
