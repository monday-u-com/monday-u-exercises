// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express");
const compression = require("compression");
require("express-async-errors");
const errorHandler = require("./server/middleware/error_handler");
const router = require("./server/routes/api");

const port = 8080;
const server = express();

server.use([compression(), express.json()]);
server.use(express.static("dist"));

server.use("/", router);

server.use(errorHandler);

process.on("unhandledRejection", (reason, promise) => {
   console.log("Unhandled Rejection", reason.message);
   throw reason;
});

process.on("uncaughtException", (error) => {
   console.log("Uncaught Exception", error.message);
   process.exit(1);
});

server.listen(port, () => {
   console.log("Server started on port", port);
});
