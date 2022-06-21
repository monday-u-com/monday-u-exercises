// Define your endpoints here (this is your "controller file")
const itemManager = require("../services/item_manager.js");
const express = require("express");
const router = express.Router();

router.put("/", (req, res) => {
  itemManager.reSortTasks(req.body);
  res.status(200).json({ message: "Tasks was resorted" });
});

module.exports = router;
