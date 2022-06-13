// Define your endpoints here (this is your "controller file")
const express = require("express");
const itemManagerObj = require("../services/item-manager");
const fs = require("fs");

const itemManager = new itemManagerObj.ItemManager();
const router = express.Router();

router.get("/getAll", async (req, res) => {
   const TASKS_FILE_NAME = "./server/tasks.json";
   if (!fs.existsSync(TASKS_FILE_NAME)) {
      fs.writeFileSync(TASKS_FILE_NAME, JSON.stringify([]));
   } else {
      const fileData = await fs.promises.readFile(TASKS_FILE_NAME);
      itemManager.items = JSON.parse(fileData);
   }
   res.status(200).json(itemManager);
});

module.exports = router;

// router.post("/", newTask);
// router.delete("/:id", deleteTask);

// async function createJedi(req, res) {
//    console.log("saving jedi");
//    await jediService.addJedi(req.body);
//    res.status(200).json(req.body);
// }

// async function deleteJedi(req, res) {
//    let jediId = Number.parseInt(req.params.id);
//    //TODO 4. Turn it to error with proper status and throw it
//    if (isNaN(jediId)) {
//       let error = Error();
//       error.statusCode = 400;
//       error.message = "wrong parameters";
//       throw error;
//    }

//    const data = await jediService.deleteJedi(jediId);
//    res.status(200).json(data);
// }
