
class Main {
  constructor() {
    this.itemClient = new ItemClient();
    this.input = document.getElementById("taskInput");
    this.addButton = document.getElementById("addButton");
    this.titleH1Elem = document.querySelector("h1");
    this.sortBtn = document.getElementById("sortBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.taskElement = document.getElementById("tasks");
    this.counterElement = document.getElementById("count");
    this.loader = document.querySelector("#load-container");
  }
  async init() {
    await this.getAllItems();
    this.whenPressEnter();
    this.sortBtn.addEventListener("click", ()=> this.sortTaskByName());
    this.clearAllBtn.addEventListener("click", ()=> this.deleteAllItems());
    this.addButton.addEventListener("click",async() => {
      if (!this.input.value.trim()) {
        const msgAlert = "Invalid input : Cannot insert Empty Input"
        this.addAlert(msgAlert);
        return;
      }

      try {
        this.loader.classList.add("display");
        const itemsArray = await this.itemClient.createItem(this.input.value);
        this.loader.classList.remove("display");
        this.input.value =""
        this.addItem(itemsArray);
      } catch (err) {
        this.addItem([err], false);
      }
     
    });
  }
  async getAllItems(){
    try{
      const itemsArray = await this.itemClient.fetchItems();
      if(itemsArray.length != 0){
        this.addItem(itemsArray);
      }
    }
    catch(error)
    {
      throw error;
    }
  }


 async  deleteAllItems() {
   await  this.itemClient.deleteAll();
    this.taskElement.classList.toggle("removed-item");
    setTimeout(() => {
      this.taskElement.innerHTML = ""; 
      this.taskElement.classList.remove("removed-item");
      this.countTasks();
    }, 500);
   
  }

  addAlert(msgAlert, ms) {
    this.ErrorAlert(msgAlert, ms);
  }

  ErrorAlert(msgAlert, ms = 3000) {
    const div = document.createElement("div");
    const i = document.createElement("i");
    div.classList = "error-msg";
    div.appendChild(i);
    this.titleH1Elem.appendChild(div);
    div.innerText = msgAlert;
    setTimeout(() => {
      div.remove();
      i.remove();
    }, ms);
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
    const checkBox = this.addCheckBox(taskListElem);
    taskListElem.append(checkBox);
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

  addCheckBox(taskListElem) {
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.value = 1;
    this.onClickCheckBox(checkBox,taskListElem);
    return checkBox
  }

  onClickCheckBox(checkBox,taskListElem){
    checkBox.addEventListener('change', async(event) =>{
      if(event.target.checked){
        await this.itemClient.statusChange(taskListElem.id, true)
      }else{
        await this.itemClient.statusChange(taskListElem.id, false)
      }
    });
  }
  getPokemonImage(pokemonObj) {
    const url = pokemonObj.imageUrl;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }


  async onClickWhenDeleted(taskListElem, deleteButton) {
    deleteButton.addEventListener("click", async () => {
      taskListElem.classList.toggle("removed-item");
      const itemId = taskListElem.id;
       await this.itemClient.deleteItem(itemId);
      setTimeout(() => {
        taskListElem.remove();
        this.countTasks();
      }, 500);
    });
    return;
  }

  

  clickOnItem(taskListElem, inputText) {
    taskListElem.addEventListener(
      "click",
      (event) => {
        if (event.target !== taskListElem) return;
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
    this.onClickWhenDeleted(taskListElem, deleteButton);
  }

}
const main = new Main();
document.addEventListener("DOMContentLoaded", function () {
  main.init();
});



