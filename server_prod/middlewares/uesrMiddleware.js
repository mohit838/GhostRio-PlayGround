export const userMiddleware =  function(req, res, next) {
    // Perform operations for handling the route
    // ...
    // Call next() to pass control to the next middleware
    next();
}