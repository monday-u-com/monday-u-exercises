const { Task } = require("../storage/models");

class DBManager {
  getAllTasks = async () =>
    await Task.findAll({
      where: {
        deleted: null,
      },
    });

  async addTask(task) {
    const response = await Task.bulkCreate(task);
    await Task.sync();

    return response;
  }

  async deleteTask(id) {
    await Task.findOne({ where: { id: id } }).then(async (task) => {
      if (!task) {
        throw new Error("No task found");
      }
      await task.update({ deleted: Date.now() });
    });
  }

  clearTasks = async () => {
    await Task.findAll({
      where: {
        deleted: null,
      },
    }).then((tasks) => {
      tasks.forEach(async (task) => {
        await task.update({ deleted: Date.now() });
      });
    });
  };

  async checkMarkTask(isChecked, taskID) {
    await Task.findOne({ where: { id: taskID } }).then(async (task) => {
      if (!task) {
        throw new Error("No task found");
      }
      await task.update({ status: isChecked });
      await task.update({ done: isChecked ? Date.now() : null });
    });

    return await this.getAllTasks();
  }

  async undoDelete() {
    await Task.findOne({ order: [["deleted", "DESC"]] }).then(async (task) => {
      await task.update({ deleted: null });
    });
  }
}

module.exports = new DBManager();
