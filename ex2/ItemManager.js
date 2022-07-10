export default class ItemManager {
  constructor() {
    {
      this.taskArray = this.getTasksFromLocalStorage();
    }
  }
  
  addItem(newTasks) {
    this.taskArray.push(newTasks);
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        newTasks,
      ])
    );
  }

  taskArray() {
    return this.taskArray;
  }
  removeTask(taskIndexToRemove) {
    const index = taskIndexToRemove;
    this.taskArray.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(this.taskArray));
  }
  // Claer All Tasks
  clearAllTasks() {
    this.taskArray = [];
    localStorage.setItem("tasks", []);
  }
  getTasksFromLocalStorage() {
    try {
      return Array.from(JSON.parse(localStorage.getItem("tasks")));
    } catch (e) {
      return [];
    }
    finally{console.log("Loaded Tasks")}
  }

 
  
}
