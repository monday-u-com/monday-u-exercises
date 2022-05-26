// import { getCurrentDate } from "./utils";
// import {getPokemon} from "./pokemonapi";

class ItemManager  {
    currentTask;
    constructor() {
      this.currentTask = null;
    }
    loadTasks() {
        // check if localStorage has any tasks
        // if not then return
        if (localStorage.getItem("tasks") == null) return;
      
        // Get the tasks from localStorage and convert it to an array
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      
        // Loop through the tasks and add them to the list
        tasks.forEach(task => {
          const list = document.querySelector("ul");
          const li = document.createElement("li");
          const dateText = getCurrentDate();
          li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="fas fa-check" ${task.completed ? 'checked' : ''}>
                <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
                <i class="fa fa-trash" onclick="removeTask(this)"></i> <i class="date">${dateText}</i>`;
          list.insertBefore(li, list.children[0]);
        });
    }
    addTask() {
        const task = document.querySelector("form input");
        const list = document.querySelector("ul");
        // return if task is empty
        if (task.value === "") {
          return alert("Invalid option,please Enter text")
        }
        // check is task already exist
        if (document.querySelector(`input[value="${task.value}"]`)) {
          alert("Task already exist!");
          return false;
        }
      
        // add task to local storage
        localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
        const dateText = getCurrentDate();
        // create list item, add innerHTML and append to ul
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="fas fa-check">
            <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
            <i class="fa fa-trash" onclick="removeTask(this)"></i> <i class="date">${dateText}</i>`;
        list.insertBefore(li, list.children[0]);
        // clear input
        task.value = "";
      }
      
      taskComplete(event) {
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
        tasks.forEach(task => {
          if (task.task === event.nextElementSibling.value) {
            task.completed = !task.completed;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.nextElementSibling.classList.toggle("completed");
      }
      
      removeTask(event) {
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
        tasks.forEach(task => {
          if (task.task === event.parentNode.children[1].value) {
            // delete task
            tasks.splice(tasks.indexOf(task), 1);
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.parentElement.remove();
      }
       getCurrentTask(event) {
        this.currentTask = event.value;
      }
      
      // edit the task and update local storage
       editTask(event) {
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
        // check if task is empty
        if (event.value === "") {
          alert("Task is empty!");
          event.value = currentTask;
          return;
        }
        // task already exist
        tasks.forEach(task => {
          if (task.task === event.value) {
            alert("Task already exist!");
            event.value = currentTask;
            return;
          }
        });
        // update task
        tasks.forEach(task => {
          if (task.task === currentTask) {
            task.task = event.value;
          }
        });
        // update local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
  
        getCurrentDate(){
          const date = new Date();
          const dateText = `${date.getDate()} - ${
          date.getMonth() + 1
          } - ${date.getFullYear()}`;
          return dateText;
        }
  
  }
  
  export default ItemManager;
  
  