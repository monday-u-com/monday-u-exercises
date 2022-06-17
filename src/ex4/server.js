// Express boilerplate, hosting the `dist` file, connecting to the routes
const fs = require("fs");
const express = require("express");

require("express-async-errors");

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const logger = require("./server/middleware/logger");

const errorHandler = require("./server/middleware/error_handler");
const itemRouter = require("./server/routes/itemRouter");
const port = 8080;
const server = express();

const liveReloadServer = livereload.createServer();

server.use(connectLiveReload());

//
server.use([logger, express.json(), express.static("dist")]);
server.use("/item", itemRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    health: `ok`,
  });
});

server.post("/error", async (req, res, next) => {
  try {
    let error = Error("My shiny error");
    error.statusCode = 400;
    throw error;
  } catch (e) {
    next(e);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection", reason.message);
  throw reason;
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception", error.message);
  process.exit(1);
});

server.use(errorHandler);

server.listen(port, () => {
  console.log("Server started on port", port);
});

module.exports = server;
