//Selectors
const todoInput = document.getElementById("input-txt");
const todoButton = document.getElementById("add-btn");
const todoList = document.getElementById("list-element");
const clearAllBtn = document.getElementById("clearAll-btn");
const sortBtn = document.getElementById("sort-btn");
const inputBox = document.querySelector(".inputField input");
const svgContainer = document.getElementById("svg");
const todoElement = document.getElementById("list-element");
const footerSpan = document.querySelector(" .footer span ");

const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets4.lottiefiles.com/private_files/lf30_5aubt2fy.json",
});

const pendingTasksCount = document.querySelector(".pendingTasksCount");
const ENTER_KEY = 13;
const TRASH_ANIMATION_TIMEOUT = 500;

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", todoEnter);
todoList.addEventListener("click", deleteTask);
sortBtn.addEventListener("click", sortTasks);
clearAllBtn.addEventListener("click", clearAll);
todoElement.addEventListener("click", alertTask);

//Functions

//add alert feature when task is clicked
function alertTask(e) {
  const item = e.target;

  if (item.classList[0] === "todo") {
    const todo = item.parentElement;

    let message = "📝" + item.innerText;
    return alert(item.innerText);
    /*will be used later in the project launch_listElement(message); */
  }
}

//deactive / active buttons when todos are added / cleared
function listStyling(todosCount) {
  if (!todosCount) {
    clearAllBtn.classList.add("deactive");
    sortBtn.classList.add("deactive");
    footerSpan.classList.add("deactive");
  } else {
    clearAllBtn.classList.remove("deactive");
    sortBtn.classList.remove("deactive");
    footerSpan.classList.remove("deactive");
  }
}

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

  const listChildrenCount = todoList.childElementCount;
  listStyling(listChildrenCount);

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
    //delay the remove for animation
    setTimeout(function () {
      todo.remove();
    }, TRASH_ANIMATION_TIMEOUT);
  }
}

//clear all button clicked
function clearAll(e) {
  const item = e.target;
  if (item.classList[0] === "clearAllBtn") {
    todoList.classList.add("fall");

     //delay the remove for animation
    setTimeout(function () {
      todoList.innerHTML = "";
      localStorage.clear();
      todoList.classList.remove("fall");
      listStyling(0);
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
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

//save data to local storage
function saveLocalTodos(todo) {
  let todos = checkLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  pendingTasksCount.textContent = todos.length;
}

//get and show the data from local storage after refreshing the page
function getTodos() {
  //is the storage empty?
  let todos = checkLocalStorage();

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
  pendingTasksCount.textContent = todos.length;
  let todosCount = todoList.childElementCount;
  listStyling(todosCount);

  if (todos.length) {
    inputBox.classList.add("inactive");
    todoButton.classList.add("inactive");
  }
}

// remove element from local storage
function removeLocalTodos(todo) {
  let todos = checkLocalStorage();
  const todoIndex = todo.innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  pendingTasksCount.textContent = todos.length;
  listStyling(todos.length);
  if (!todos.length) {
    inputBox.classList.remove("inactive");
    todoButton.classList.remove("inactive");
    sortBtn.textContent = "Sort";
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
    todos.sort();
    todos.reverse();
    todoList.classList.remove("descending");
    todoList.classList.add("ascending");
    sortBtn.textContent = "Sort 🡳";
  }
  console.log(todoList.classList);
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

//toast of error message
function launch_toast() {
  let x = document.getElementById("toast");
  x.className = "show";
  //clearInterval()
  clearTimeout();
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 1800);
}

//function to be used in later projects
//currently this function is not used
function launch_listElement(message) {
  if (typeof message === "undefined") {
    return;
  }
  let x = document.getElementById("alertListElement");
  x.innerText = message;

  //clearInterval()
  x.className = x.className.replace("show", "");
  x.className = "show";
  return setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2000);
}
