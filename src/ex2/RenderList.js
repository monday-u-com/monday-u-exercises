export default class RenderList {
    constructor(tracker, tasks) {
        this.tasksList = tasks;
        this.manager = tracker;
        this.todoList = document.querySelector(".todo-list");
        this.currentTask = document.querySelector(".pending-tasks");
      }
      render(list) {
        this.todoList.innerHTML = "";
        list.forEach((value, index) => {
          const listItem = this.renderListItem(value, index);
          this.todoList.appendChild(listItem);
        });
        this.pendingTasks.innerText =
        list.length == 0 ? `0 pending tasks`: `You have ${list.length} pending tasks`;
  }
    renderListElements(v,index){
      const item= document.createElement("li");
      const task= document.createElement("text");
      const deleteBtn= document.createElement("button");
      const deleteIcon= document.createElement("icon");
      const span= document.createElement("span");
      
    //   Adding Classes :
    item.classList.add("todo-list-item");
    deleteBtn.classList.add("fa fa-trash");
    deleteBtn.id = index;
    task.id = index;
    task.innerText = v.task;
    deleteIcon.name = "trash-outline";

    deleteBtn.onclick = () => {
      this.tracker.removeItem(deleteBtn.id);
      this.renderList(this.tracker.getItems());
    };

    task.onclick = () => {
      this.taskClicked(deleteBtn.id);
    };

    //Building the elements tree hierarchically
    deleteBtn.appendChild(deleteIcon);
    span.appendChild(task);
    span.appendChild(deleteBtn);
    item.appendChild(span);
    return item;
    }

    
}