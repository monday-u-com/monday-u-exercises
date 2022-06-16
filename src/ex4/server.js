import express from "express";
import todoRouter from "./server/routes/api.js";
import compression from "compression";

const port = 8080;
const server = express();

server.use([compression(), express.json()]);
server.use(express.static("./dist"));
server.use("/", todoRouter);

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