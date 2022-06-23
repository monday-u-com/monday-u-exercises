const express = require("express");
const app = express();
const tasks = require("./server/routes/tasksApi.js");
const resort = require("./server/routes/resort.js");
const logger = require("./server/middleware/logger.js");
const cors = require("cors");
const clearCache = require("./server/services/clearCache.js");
const cron = require("node-cron");
const path = require("path");
  
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/tasks", tasks);
app.use("/resort", resort);

const port = process.env.PORT || "3042";

app.listen(port, () => {
  console.log("Server started on port", port);
});

cron.schedule("*/20 * * * *", () => {
  clearCache();
});
