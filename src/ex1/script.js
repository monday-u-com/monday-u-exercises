//Selectors
const todoInput = document.getElementById("input-txt");
const todoButton = document.getElementById("add-btn");
const todoList = document.getElementById("list-element");
const clearAllBtn = document.getElementById("clearAll-btn");
const sortBtn = document.getElementById("sort-btn");
const inputBox = document.querySelector(".inputField input");
const svgContainer = document.getElementById("svg");
const todoElement = document.getElementById("list-element");

const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets4.lottiefiles.com/private_files/lf30_5aubt2fy.json",
});
const TRASH_ANIMATION_TIMEOUT = 500

const pendingTasksCount = document.querySelector(".pendingTasksCount");
const ENTER_KEY = 13;

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", todoEnter);

todoList.addEventListener("click", deleteTask);
sortBtn.addEventListener("click", sortTasks);
clearAllBtn.addEventListener("click", clearAll);

todoElement.addEventListener("click", alertTask) ;

function alertTask(e) {
    const item = e.target;
    
    if (item.classList[0] === "todo") {
      const todo = item.parentElement;
      console.log(item.innerText)
      let message = "📝" + item.innerText
      return launch_listElement(message);
    }
  }




//Functions

//todo input styling
todoInput.onkeydown = () => {
  if (todoInput.value.length) {
    inputBox.classList.add("inactive");
    todoButton.classList.add("inactive");
  }

  if (!todoInput.value.length && !todoList.childElementCount) {
    inputBox.classList.remove("inactive");
    todoButton.classList.remove("inactive");
  }
};

//add todo to the todo list
function addTodo(event) {
  if (!todoInput.value.trim()) {
    return launch_toast();
  }
  event.preventDefault();

  //Todo li
  animItem.goToAndPlay(0, true);
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo");
  todoLi.innerText = todoInput.value;

  //Add todo to local storage
  saveLocalTodos(todoInput.value);
 
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i  class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoLi.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoLi);
  todoLi.setAttribute("id", "liNum" + todoList.childElementCount);

  //Clear Todo Input value
  todoInput.value = "";
  inputBox.classList.add("inactive");
}

//add todo when pressing enter key
function todoEnter(event) {
  
    if (event.keyCode == ENTER_KEY) {
    if (!todoInput.value.trim()) {
      return launch_toast();
    }
    addTodo(event);
  }
}

//delete a todo from the list
function deleteTask(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    setTimeout(function () {
      //delay the remove animation
      todo.remove();
    }, TRASH_ANIMATION_TIMEOUT);
  }
}

//clear all button clicked
function clearAll(e) {
  const item = e.target;
  if (item.classList[0] === "clearAllBtn") {
    todoList.classList.add("fall");


    setTimeout(function () {
      //delay the remove animation
      todoList.innerHTML = "";
      localStorage.clear();
      todoList.classList.remove("fall");
      clearAllBtn.classList.add("deactive")
    sortBtn.classList.add("deactive")

    }, TRASH_ANIMATION_TIMEOUT);
    pendingTasksCount.textContent = 0;
    if (!todoInput.value.length) {
      inputBox.classList.remove("inactive");
      todoButton.classList.remove("inactive");
    }
    sortBtn.textContent = "Sort";
  }
}

//return values from local storage as an array
function checkLocalStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
    clearAllBtn.classList.add("deactive")
    sortBtn.classList.add("deactive")
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    clearAllBtn.classList.remove("deactive")
    sortBtn.classList.remove("deactive")
  }
  return todos;
}

//save data to local storage
function saveLocalTodos(todo) {
  let todos = checkLocalStorage();
  /* todoLi.setAttribute('id', "liNum" + todos.indexOf(todo)) */
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  pendingTasksCount.textContent = todos.length;
  clearAllBtn.classList.remove("deactive")
  sortBtn.classList.remove("deactive")
 
}

//get and show the data from local storage after refreshing the page
function getTodos() {
  //is the storage empty?
  let todos = checkLocalStorage();

  todos.forEach(function (todo) {
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = todo;
    todoLi.setAttribute("id", "liNum" + todos.indexOf(todo));

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i  class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoLi.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoLi);
    //Clear Todo Input value
    todoInput.value = "";
  });
  pendingTasksCount.textContent = todos.length;
  if (todos.length) {
    inputBox.classList.add("inactive");
    todoButton.classList.add("inactive");
    clearAllBtn.classList.remove("deactive")
    sortBtn.classList.remove("deactive")
  }
  else {
    clearAllBtn.classList.add("deactive")
    sortBtn.classList.add("deactive")
  }
}

// remove element from local storage
function removeLocalTodos(todo) {
  let todos = checkLocalStorage();
  const todoIndex = todo.innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  pendingTasksCount.textContent = todos.length;
  if (!todos.length) {
    inputBox.classList.remove("inactive");
    todoButton.classList.remove("inactive");
    sortBtn.textContent = "Sort";
    clearAllBtn.classList.add("deactive")
    sortBtn.classList.add("deactive")
  }
}

//sort function in ascending and descending
function sortTasks() {
  let todos = checkLocalStorage();
  if (!todos.length) {
    return;
  }
  if (todoList.classList.contains("ascending")) {
    todos.sort(); /* ((a, b) => a.localeCompare(b)) */

    sortBtn.textContent = "Sort 🡱";

    todoList.classList.remove("ascending");
    todoList.classList.add("descending");
  } else {
    todos.reverse();
    todoList.classList.remove("descending");
    todoList.classList.add("ascending");
    sortBtn.textContent = "Sort 🡳";
  }

  todoList.innerHTML = "";
  localStorage.setItem("todos", JSON.stringify(todos));
  todos.forEach(function (todo) {
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo");
    todoLi.innerText = todo;

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i  class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoLi.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoLi);
    //Clear Todo Input value
    todoInput.value = "";
  });
}

function launch_toast() {
  let x = document.getElementById("toast"); 
  x.className = "show";
  //clearInterval()
  clearTimeout();
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 1800);
}


function launch_listElement(message) {

    if (typeof message==='undefined'){
        return;
    }
    let x = document.getElementById("alertListElement"); 
    x.innerText= message
    console.log(message)
    //clearInterval()
    x.className = x.className.replace("show", "");
    x.className = "show";
     return setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 2000); 
    
  }
  