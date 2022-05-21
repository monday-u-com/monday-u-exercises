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

  async addTask() {
    // Validate the input isn't empty before adding the task
    if (!addTaskInput.value) {
      return;
    }

    let todoValues;
    if (/^(\d*,)*\d*$/.test(this.addTaskInput.value.replace(" ", ""))) {
      todoValues = await this.pokemonClient.getPokemon(
        this.addTaskInput.value.replace(" ", "").split(",")
      );
    } else {
      todoValues = [this.addTaskInput.value];
    }

    todoValues.forEach((todoValue) => {
      const todo = new Todo(todoValue, this.taskId++);
      this.todos.push(todo);
      this.onAddTask(todo.id);

      const checkboxBtn = document.querySelector(`#input-${todo.id}`);
      const taskTxt = document.querySelector(`#task-txt-${todo.id}`);
      const trashBtn = document.querySelector(`#trash-button-${todo.id}`);
      checkboxBtn.addEventListener("click", () =>
        this.checkUncheckTask(todo.id, taskTxt)
      );
      trashBtn.addEventListener("click", () => this.deleteTask(todo));
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
