export default class RenderTaskList {
  constructor(tracker, tasks) {
    this.todoList = document.querySelector(".todo-list");
    this.pendingTasks = document.querySelector(".upcomingTasks");
    this.tasksList = tasks;
    this.tracker = tracker;
  }
  render(list) {
    this.todoList.innerHTML = "";
    list.forEach((v, index) => {
      const listItem = this.renderItem(v, index);
      this.todoList.appendChild(listItem);
    });

    this.pendingTasks.innerText =
      list.length == 0
        ? `0 Awating Todos`
        : `${list.length} Todos Await`;
  }


  renderItem(v, index) {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const task = document.createElement("Text");
    const taskDeleteBtn = document.createElement("button");
    const trashIcon = document.createElement("button");

    
    listItem.classList.add("task-item");
    taskDeleteBtn.classList.add("delete-task-btn");
    taskDeleteBtn.id = index;
    taskDeleteBtn.innerText = "🗑️"
    task.id = index;
    task.innerText = v.task;
    trashIcon.name = "trash-outline";

    taskDeleteBtn.onclick = () => {
      this.tracker.taskToRmove(taskDeleteBtn.id);
      this.render(this.tracker.tasksArray());
    };

    taskDeleteBtn.appendChild(trashIcon);
    span.appendChild(task);
    span.appendChild(taskDeleteBtn);
    listItem.appendChild(span);
    return listItem;
  }
}
