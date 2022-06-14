// Express boilerplate, hosting the `dist` file, connecting to the routes

const express = require('express');

const errorHandler = require('./server/middleware/error_handler');
const port = 8080;
const server = express();


server.get('/', (req, res) => {
    res.status(200).json({
        health: `ok`
        
    });
    
});

 server.post('/error', async (req, res, next) => {
    try {
        let error = Error("My shiny error");
        error.statusCode = 400;
        throw error;
    } catch (e) {
        next(e);
    }
}); 

process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Rejection", reason.message);
    throw reason
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
}); 

server.use(errorHandler);

server.listen(port, () => {
    console.log("Server started on port", port);
});