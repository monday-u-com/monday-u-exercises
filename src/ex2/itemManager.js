class ItemManager {
  constructor(addTaskBtn, addTaskInput, todos, clearAllBtn, callbacks) {
    this.addTaskBtn = addTaskBtn;
    this.addTaskInput = addTaskInput;
    this.todos = todos;
    this.clearAllBtn = clearAllBtn;
    this.taskId = 0;
    if (callbacks) {
      this.onAddTask = callbacks.onAddTask;
      this.onTaskDelete = callbacks.onTaskDelete;
      this.onFinishedAll = callbacks.onFinishedAll;
    }

    this.addTaskBtn.addEventListener("click", this.addTask);
    document.addEventListener("keypress", (event) => this.onKeyPress(event));
  }

  addTask = () => {
    // Validate the input isn't empty before adding the task
    if (!addTaskInput.value) {
      return;
    }

    this.todos.push(
      new Todo(this.addTaskInput.value, this.taskId++)
    );
    this.onAddTask();
  };

  onKeyPress = (event) => {
    if (event.key === "Enter") {
      const inputElem = document.querySelector(".add-task-input");
      if (inputElem === document.activeElement) {
        this.addTask();
      }
    }
  };

  deleteTask = (taskId) => {
    this.todos = this.todos.filter(todo => todo.taskId !== taskId)
    this.onTaskDelete()

    if (!this.todos.length){
      this.onFinishedAll()
    }
  }
}
