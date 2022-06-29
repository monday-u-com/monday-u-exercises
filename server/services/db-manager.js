const { Task } = require("../db/models");

class DBManager {
   getAllTasks = async () => await Task.findAll();

   async addTask(task) {
      await Task.bulkCreate(task);
      await Task.sync();
   }

   async deleteTask(id) {
      await Task.destroy({
         where: { id: id },
      });
   }

   clearTasks = async () =>
      await Task.destroy({
         where: {},
         truncate: true,
      });

   async sortTasks(direction) {
      direction = direction === "down" ? "ASC" : "DESC";

      return await Task.findAll({
         order: [
            ["text", direction],
            ["id", "ASC"],
         ],
      });
   }

   async checkMarkTask(isChecked, taskID) {
      Task.findOne({ where: { id: taskID } }).then((task) => {
         if (!task) {
            throw new Error("No task found");
         }
         task.update({ status: isChecked });
         task.update({ done: isChecked ? Date.now() : null });
      });
   }
}

module.exports = new DBManager();
