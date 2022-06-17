export default class ItemManager {
    constructor() {
      {
        this.TasksArray = this.getTasksFromLocalStorage();
      }
    }
   
    addItem(newTasks) {
      this.TasksArray.push(newTasks);
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("tasks") || "[]"),
          newTasks,
        ])
      );
    }
  
    tasksArray() {
      return this.TasksArray;
    }
    removeTask(taskToRemove) {
      const index = taskToRemove;
      this.TasksArray.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.TasksArray));
    }
    // Claer All Tasks
    clearAllTasks() {
      this.TasksArray = [];
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
  