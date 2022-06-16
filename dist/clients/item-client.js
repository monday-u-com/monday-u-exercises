// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
// This is the post get if the client side!! wow

export default new (class ItemClient {
   async getAllTasks() {
      const response = await fetch("/getAll");
      const tasks = await response.json();
      return tasks;
   }

   async deleteTask(i) {
      const response = await fetch(`/del/${i}`, { method: "DELETE" });
      const tasks = await response.json();
      return tasks;
   }

   async addTask(task) {
      const reqOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ task }),
      };
      const response = await fetch("/add", reqOptions);
   }

   async clearTasks() {
      const response = await fetch("/del", { method: "DELETE" });
   }
})();
