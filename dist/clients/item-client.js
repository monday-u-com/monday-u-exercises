// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
// This is the post get if the client side!! wow

export default class ItemClient {
   constructor() {}

   async getAllTasks() {
      const response = await fetch("/getAll");
      const tasks = await response.json();
      return tasks;
   }

   async deleteTask() {}
}
