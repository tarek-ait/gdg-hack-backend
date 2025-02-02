# middlewares

Middleware functions process requests before they reach the controller. For example, if a user wants to log in to the system, middleware checks whether the user is authenticated. If the user is authenticated, the request moves to the controller; otherwise, the middleware returns a response with an error.