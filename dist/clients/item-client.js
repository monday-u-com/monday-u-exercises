// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
// This is the post get if the client side!! wow

export default new (class ItemClient {
   async getAllTasks() {
      const response = await fetch("/getAll");
      const tasks = await response.json();
      return tasks;
   }

   async deleteTask(i) {
      await fetch(`/del/${i}`, { method: "DELETE" });
   }

   async addTask(task) {
      const reqOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ task }),
      };
      const response = await fetch("/add", reqOptions);
      const pokemonImagesURLs = await response.json();
      return pokemonImagesURLs;
   }

   async clearTasks() {
      await fetch("/del", { method: "DELETE" });
   }

   async sortTasks(way) {
      await fetch(`/sort/${way}`);
   }
})();
