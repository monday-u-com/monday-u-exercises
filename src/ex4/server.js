// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import envModule from "./envModule.js";
import todoRouter from "./server/routes/api.js";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();
app.use([express.json(), express.static("dist")]);
app.use("/tasks", todoRouter);

app.listen(envModule.port, () =>
	console.log(`server is listening on port ${process.env.port}`)
);
