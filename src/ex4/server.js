// Express boilerplate, hosting the `dist` file, connecting to the routes
// make bluebird default Promise

const express = require("express");
const app = express();
const tasks = require("./server/routes/api.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/tasks", tasks);

const port = 8080;

app.listen(port, () => {
  console.log("Server started on port", port);
});
