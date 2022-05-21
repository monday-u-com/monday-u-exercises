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
      this.onCompleteTask = callbacks.onCompleteTask;
    }

    this.addTaskBtn.addEventListener("click", this.addTask);
    document.addEventListener("keypress", (event) => this.onKeyPress(event));
  }

  addTask = () => {
    // Validate the input isn't empty before adding the task
    if (!addTaskInput.value) {
      return;
    }

    const todo = new Todo(this.addTaskInput.value, this.taskId++);
    this.todos.push(todo);
    const { checkboxBtn, taskTxt, trashBtn } = this.onAddTask();

    checkboxBtn.addEventListener("click", () =>
      this.completeTask(todo.id, taskTxt)
    );

    // const input = document.querySelector(`#task-${this.taskId - 1}`);
    // input.addEventListener("click", (event) => onTaskPress(event));

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
    console.log("deleteTask");
    this.todos = this.todos.filter((todo) => todo.id !== todoToDelete.id);
    this.onTaskDelete(todoToDelete);

    if (!this.todos.length) {
      this.onFinishedAll();
    }
  };

  completeTask = (taskId, taskTxt) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === taskId) {
        todo.toBeDone = false;
      }
      return todo;
    });
    this.onCompleteTask(taskTxt);
  };
}
