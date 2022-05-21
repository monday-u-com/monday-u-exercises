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
      this.onCheckUncheckTask = callbacks.onCheckUncheckTask;
      this.onClearAll = callbacks.onClearAll;
    }

    this.addTaskBtn.addEventListener("click", this.addTask);
    document.addEventListener("keypress", (event) => this.onKeyPress(event));
    clearAllBtn.addEventListener("click", () => this.clearAll());
  }

  addTask = () => {
    // Validate the input isn't empty before adding the task
    if (!addTaskInput.value) {
      return;
    }

    const todo = new Todo(this.addTaskInput.value, this.taskId++);
    this.todos.push(todo);
    const { checkboxBtn, taskTxt, trashBtn } = this.onAddTask(todo.id);

    checkboxBtn.addEventListener("click", () =>
      this.checkUncheckTask(todo.id, taskTxt)
    );
    trashBtn.addEventListener("click", () => this.deleteTask(todo));
  };

  onKeyPress = (event) => {
    if (event.key === "Enter") {
      const inputElem = document.querySelector(".add-task-input");
      if (inputElem === document.activeElement) {
        this.addTask();
      }
    }
  };

  deleteTask = (todoToDelete) => {
    this.todos = this.todos.filter((todo) => todo.id !== todoToDelete.id);
    this.onTaskDelete(todoToDelete);

    if (!this.todos.length) {
      this.onFinishedAll();
    }
  };

  checkUncheckTask = (taskId, taskTxt) => {
    const todoInd = this.todos.findIndex((todo) => todo.id == taskId);
    this.todos[todoInd].toBeDone = !this.todos[todoInd].toBeDone;
    this.onCheckUncheckTask(taskTxt);
  };

  clearAll = () => {
    this.todos = [];
    onClearAll();
  };
}
