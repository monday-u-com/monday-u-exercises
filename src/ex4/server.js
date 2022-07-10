// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const envModule = require("./envModule.js");
const todoRouter = require("./server/routes/api.js");
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();
app.use([express.json(), express.static("dist")]);
app.use("/tasks", todoRouter);

app.listen(envModule.port, () =>
	console.log(`server is listening on port ${process.env.port}`)
);
