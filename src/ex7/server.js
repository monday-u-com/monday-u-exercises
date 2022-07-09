// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express");
const todoRouter = require("./server/routes/api");
const logger = require("./server/middleware/logger_middleware");
const errorHandler = require("./server/middleware/error_handler");
const corsHeader = require("./server/middleware/cors_header_middleware");
const path = require("path");

const compression = require("compression");
const PORT = 3001;
const app = express();

app.use([express.json(), logger, compression()]);
// app.use(corsHeader);

// app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/todo", todoRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "ok",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
