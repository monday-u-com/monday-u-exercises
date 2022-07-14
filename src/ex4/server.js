// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express");
const cors = require("cors");
const path = require("path");
const envModule = require("./envModule.js");
const todoRouter = require("./server/routes/api.js");
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors());
app.use("/tasks", todoRouter);

app.listen(envModule.port, () =>
	console.log(`server is listening on port ${process.env.port}`)
);
