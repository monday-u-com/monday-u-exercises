// Express boilerplate, hosting the `dist` file, connecting to the routes
// make bluebird default Promise

const express = require("express");
const app = express();
const tasks = require("./server/routes/api.js");
const logger = require("./server/middleware/logger.js");
const cors = require("cors");
const clearCache = require("./server/services/clearCache.js");
const cron = require("node-cron");

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/tasks", tasks);

const port = 8080;

app.listen(port, () => {
  console.log("Server started on port", port);
});

cron.schedule("*/20 * * * *", () => {
  clearCache();
});
