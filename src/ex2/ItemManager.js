export default class ItemManager {
    
    constructor() {
      this.currentTask = null;
      this.pokemonClient = new GetPokemon();
      
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
          li.innerHTML = `<input type="checkbox" onclick="taskComplete(task.value)" class="fas fa-check" ${task.completed ? 'checked' : ''}>
                <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(task.value)" onblur="editTask(this)">
                <i class="fa fa-trash" onclick="removeTask(task.value)"></i> <i class="date">${dateText}</i>`;
          list.insertBefore(li, list.children[0]);
        });
    }
    addTask() {
        const task = document.querySelector("form input");
        const list = document.querySelector("ul");
        console.log("Yakir")
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
        const date = new Date();
        const dateText = `${date.getDate()} - ${
        date.getMonth() + 1
        } - ${date.getFullYear()}`;
        
        // create list item, add innerHTML and append to ul
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(${task.value})" class="fas fa-check">
            <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(task.value)" onblur="editTask(task.value)">
            <i class="fa fa-trash" onclick="removeTask(task.value)"></i> <i class="date">${dateText}</i>`;
        list.insertBefore(li, list.children[0]);
        // clear input
        task.value = "";
      }
      
      taskComplete(event) {
        console.log(event);
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
        console.log(tasks);
        tasks.forEach(task => {
          if (task.task === "a") {
              console.log(task.task);
            // delete task
            tasks.splice(tasks.indexOf(task), 1);
            console.log(tasks);
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
  
     
  }
  

  
  