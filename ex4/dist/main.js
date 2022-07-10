import itemClient from "./clients/itemClient.js";

class Main {
  constructor() {
    this.input = document.getElementById("taskInput");
    this.addButton = document.getElementById("addButton");
    this.todoListH1Elem = document.querySelector("h1");
    this.sortBtn = document.getElementById("sortBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.taskElement = document.getElementById("tasks");
    this.counterElement = document.getElementById("count");
    this.loader = document.querySelector("#load-container");
  }
  async init() {
    const itemsArr = await itemClient.fetchItems();

    if (itemsArr.length != 0) {
      this.addItem(itemsArr);
    }
    this.whenPressEnter();
    this.sortBtn.addEventListener("click", () => this.sortTaskByName());
    this.clearAllBtn.addEventListener("click", () => this.deleteAllTasks());
    this.addButton.addEventListener("click", async () => {
      if (!this.input.value.trim()) {
        const invalidMsg = "Cannot insert Empty Input";
        this.addAlert(invalidMsg);
        return;
      }

      try {
        this.loader.classList.add("display");
        const itemsArr = await itemClient.createItem(this.input.value);
        this.loader.classList.remove("display");
        this.input.value =""
        this.addItem(itemsArr);
      } catch (err) {
        this.addItem([err], false);
      }
     
    });
  }

 async  deleteAllTasks() {
   await  itemClient.deleteAll();
    this.taskElement.classList.toggle("removed-item");
    setTimeout(() => {
    
      this.taskElement.innerHTML = ""; 
      this.taskElement.classList.remove("removed-item");
      this.countTasks();
    }, 500);
   
  }

  addAlert(invalidMsg, miilis) {
    this.addErorrAlert(invalidMsg, miilis);
  }

  addErorrAlert(invalidMsg, miilis = 4000) {
    const div = document.createElement("div");
    const i = document.createElement("i");
    div.classList = "error-msg";
    div.appendChild(i);
    this.todoListH1Elem.appendChild(div);
    div.innerText = invalidMsg;
    setTimeout(() => {
      div.remove();
      i.remove();
    }, miilis);
  }

  whenPressEnter() {
    this.input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.addButton.click();
      }
    });
  }
  countTasks() {
    const tasksCounter = this.taskElement.childElementCount;
    if (tasksCounter === 0) {
      this.counterElement.style.visibility = "hidden";
      this.clearAllBtn.style.visibility = "hidden";
    }
    if (tasksCounter > 0) {
      this.counterElement.innerText = `${tasksCounter} Pending Tasks`;
      this.counterElement.style.visibility = "visible";
      this.clearAllBtn.style.visibility = "visible";
    }
    if (tasksCounter < 2) {
      this.sortBtn.style.visibility = "hidden";
    } else {
      this.sortBtn.style.visibility = "visible";
    }
  }

  sortTaskByName() {
    const taksElements = [...this.taskElement.childNodes];
    taksElements.sort((task1, task2) => {
      const text1 = task1.querySelector("span").innerHTML;
      const text2 = task2.querySelector("span").innerHTML;
      return text1.toLowerCase().localeCompare(text2.toLowerCase());
    });

    taksElements.forEach((task) => task.remove());
    taksElements.forEach((task) => this.taskElement.appendChild(task));
  }

  addItem(renderNewTask) {
    for (const value of renderNewTask) {
      this.renderItem(value);
    }
    this.countTasks();
  }
  renderItem(value) {
    const taskListElem = document.createElement("li");
    const inputText = document.createElement("span");
    inputText.classList = "tasks_spans";
    taskListElem.appendChild(inputText);
    if (value.isPokemon) {
      inputText.innerText = `Cool you got ${value.item}`;
      const img = this.getPokemonImage(value);
      taskListElem.appendChild(img);
    } else {
      inputText.innerText = value.item;
    }
    taskListElem.setAttribute("id", `${value.itemId}`);
    taskListElem.classList = "new-item";
    this.taskElement.appendChild(taskListElem);
    this.createDeleteButton(taskListElem);
    this.clickOnItem(taskListElem, inputText);
  }

  getPokemonImage(pokemonObj) {
    const url = pokemonObj.imageUrl;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }

  async createDeleteBtn(taskListElem, deleteButton) {
    deleteButton.addEventListener("click", async () => {
      taskListElem.classList.toggle("removed-item");
      const itemId = taskListElem.id;
       await itemClient.deleteItem(itemId);
      setTimeout(() => {
        taskListElem.remove();
        this.countTasks();
      }, 400);
    });
    return;
  }

  clickOnItem(taskListElem, inputText) {
    taskListElem.addEventListener(
      "click",
      (e) => {
        if (e.target !== taskListElem) return;
        alert(inputText.innerText);
        taskListElem.classList.toggle("checked");
      },
      false
    );
  }

  createDeleteButton(taskListElem) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = "🗑️";
    taskListElem.appendChild(deleteButton);
    this.createDeleteBtn(taskListElem, deleteButton);
  }

}
const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
