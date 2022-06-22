export default new (class ItemClient {
   async getAllTasks() {
      const response = await fetch("/getAll");
      const tasks = await response.json();
      return tasks;
   }

   async deleteTask(id) {
      await fetch(`/del/${id}`, { method: "DELETE" });
   }

   async addTask(task) {
      const reqOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ task }),
      };
      const response = await fetch("/add", reqOptions);
      return await response.json();
   }

   async clearTasks() {
      await fetch("/del", { method: "DELETE" });
   }

   async sortTasks(way) {
      const response = await fetch(`/sort/${way}`);
      const tasks = await response.json();
      return tasks;
   }

   async checkMarkTask(isChecked, taskID) {
      const reqOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ isChecked: isChecked, taskID: taskID }),
      };
      await fetch("/checkmark", reqOptions);
   }
})();
