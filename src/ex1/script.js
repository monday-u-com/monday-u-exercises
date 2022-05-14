const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllBtn = document.querySelector(".clearAllBtn");
const sortBtn = document.querySelector(".sortBtn");

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting user entered value
  if (userData.trim() != 0) {
    //if user values are not only spaces
    addBtn.classList.add("active"); //active the add button

    if (event.keyCode == 13) {
      addBtn.onclick();
    }
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
showTasks();

/* if (addBtn.classList.contains("active")){

} */

// if user clicked on the add button
addBtn.onclick = () => {
  let userData = inputBox.value; //getting user entered value
  let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  listArr.push(userData); //pushing or adding user data
  
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks();
  addBtn.classList.remove("active");
};

sortBtn.onclick = () => {
 
    listArr.sort();
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();
 
  };

// function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  const pendingTasksCount = document.querySelector(".pendingTasksCount");
  pendingTasksCount.textContent = listArr.length; //passing the length value in pendingTasksCount

  if (listArr.length > 0) {
    clearAllBtn.classList.add("active");
    sortBtn.classList.add("active");
  } else {
    clearAllBtn.classList.remove("active");
    sortBtn.classList.remove("active");
  }

  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag

  inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index) {

  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  todoList.childNodes[index].classList.add("fall");
 
  console.log( todoList.childNodes[index]);
  //after remove the li update the local storage
  listArr.splice(index, 1); //delete or remove the particular indexed li
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  setTimeout(function() {
    //your code to be executed after 1 second
    showTasks()
  }, 500);
  
  
 
}

//delete all tasks function
clearAllBtn.onclick = () => {
  listArr = []; //empty an array
  // delete all tasks and update
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  addBtn.classList.remove("active");
  showTasks();
};
