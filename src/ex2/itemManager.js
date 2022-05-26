class ItemManager {
  constructor(addTaskBtn, addTaskInput, todos, clearAllBtn, callbacks) {
    this.addTaskBtn = addTaskBtn;
    this.addTaskInput = addTaskInput;
    this.todos = todos;
    this.clearAllBtn = clearAllBtn;
    this.taskId = 0;
    this.pokemonClient = new PokemonClient();

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

  bindNewTaskEvents(task) {
    const checkboxBtn = document.querySelector(`#input-${task.id}`);
    const taskTxt = document.querySelector(`#task-txt-${task.id}`);
    const trashBtn = document.querySelector(`#trash-button-${task.id}`);
    checkboxBtn.addEventListener("click", () =>
      this.checkUncheckTask(task.id, taskTxt)
    );
    trashBtn.addEventListener("click", () => this.deleteTask(task));
  }

  async addTask() {
    // Validate the input isn't empty before adding the task
    if (!addTaskInput.value) {
      return;
    }

    let todoValues;
    // Pokemon related task: comma separated numbers with potential spaces before/after numbers
    if (/^(\d+\s*,\s*)*\s*\d+\s*$/.test(this.addTaskInput.value)) {
      try {
        todoValues = await this.pokemonClient.getPokemon(
          this.addTaskInput.value.replaceAll(" ", "").split(",")
        );
      } catch (err) {
        console.error(`An error occured: ${err}`);
        return;
      }
    }
    // Regular task
    else {
      todoValues = [this.addTaskInput.value];
    }

    todoValues.forEach((todoValue) => {
      const todo = new Todo(todoValue, this.taskId++);
      this.todos.push(todo);
      this.onAddTask(todo.id);
      this.bindNewTaskEvents(todo);
    });
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      const inputElem = document.querySelector(".add-task-input");
      if (inputElem === document.activeElement) {
        this.addTask();
      }
    }
  }

  deleteTask(todoToDelete) {
    this.todos = this.todos.filter((todo) => todo.id !== todoToDelete.id);
    this.onTaskDelete(todoToDelete);

    if (!this.todos.length) {
      this.onFinishedAll();
    }
  }

  checkUncheckTask(taskId, taskTxt) {
    const todoInd = this.todos.findIndex((todo) => todo.id == taskId);
    this.todos[todoInd].toBeDone = !this.todos[todoInd].toBeDone;
    this.onCheckUncheckTask(taskTxt);
  }

  clearAll() {
    this.todos = [];
    this.onClearAll();
  }
}
