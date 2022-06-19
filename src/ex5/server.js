const fs = require("fs");
const express = require("express");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("ori", "root", 'bgZONOT2602!', {
  host: 'localhost',
  dialect:  'mysql' 
});

async function test(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test()



const path = require("path");
const bodyParser = require("body-parser");

require("express-async-errors");

const logger = require("./server/middleware/logger");

const errorHandler = require("./server/middleware/error_handler");
const itemRouter = require("./server/routes/itemRouter");
//const port = 8080;
const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
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

const port = process.env.PORT || '8080';
/* server.listen(port, () => {
  console.log("Server started on port", port);
}); */


server.listen(port, function () { console.log('Running on ' + port); });


module.exports = server;
