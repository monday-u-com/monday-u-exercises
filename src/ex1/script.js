// Clear the input when a new item is added ✓
// Add input validation. ✓
// Add "empty state" - ✓
// Add ability to sort the list by name ✓
// Add task when enter key is pressed ✓
// Add animation when a new item is added

//Get all toDos
const inputText = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const orderDescBtn = document.querySelector(".fa-arrow-up");
const orderAscBtn = document.querySelector(".fa-arrow-down");

getToDo();


// Onkeyup event
inputText.onkeyup = () => {
  let userEnteredValue = inputText.value;
  if (!userEnteredValue.trim()) {
    addBtn.classList.remove("active");
  } else {
    addBtn.classList.add("active");
  }
};

//Add new task
addBtn.onclick = () => {
  let userEnteredValue = inputText.value;
  if (userEnteredValue.trim().length === 0) return; //input validation
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listOfToDoArr = [];
  } else {
    listOfToDoArr = JSON.parse(getLocalStorageData);
  }
  listOfToDoArr.push(userEnteredValue);
  localStorage.setItem("New Todo", JSON.stringify(listOfToDoArr));
  getToDo();
  confetti({
    particleCount: 250,
    spread: 45,
    origin: { y: 0.8 }
  });
  addBtn.classList.remove("active");
};

orderAscBtn.onclick = () => {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listOfToDoArr = JSON.parse(getLocalStorageData);
  let sortedListOfToDoArr = listOfToDoArr.sort();
  localStorage.setItem("New Todo", JSON.stringify(sortedListOfToDoArr));
  document.getElementById("arrow-down").style.color = "#721ce3";
  document.getElementById("arrow-up").style.color = "#bb87ff";
  getToDo();
};

orderDescBtn.onclick = () => {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listOfToDoArr = JSON.parse(getLocalStorageData);
  let sortedListOfToDoArr = listOfToDoArr.sort().reverse();
  localStorage.setItem("New Todo", JSON.stringify(sortedListOfToDoArr));
  document.getElementById("arrow-up").style.color = "#721ce3";
  document.getElementById("arrow-down").style.color = "#bb87ff";
  getToDo();
};

// Add task when enter key is pressed
inputText.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addBtn.onclick();
  }
});

// Get all toDo from local Storage and add them to HTML
function getToDo() {
  let getLocalStorageData = localStorage.getItem("New Todo");

  if (getLocalStorageData.length == 2) {
    document.getElementById("footer").style.display = "none"; // Empty display
    document.getElementById("order-container").style.display = "none";
    document.getElementById("gif").style.display = "inline";
    document.getElementById("arrow-up").style.color = "#bb87ff";
    document.getElementById("arrow-down").style.color = "#bb87ff";
    listOfToDoArr = new Array();
    let emptyState = "";
  } else {
    listOfToDoArr = JSON.parse(getLocalStorageData);
    document.getElementById("footer").style.display = "block";
    document.getElementById("order-container").style.display = "block";
    document.getElementById("gif").style.display = "none";
  }
  const pendingToDo = document.querySelector(".pendingTasks");
  pendingToDo.textContent = listOfToDoArr.length;
  if (listOfToDoArr.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newToDoTag = "";
  listOfToDoArr.forEach((toDo, index) => {
    newToDoTag += `<li>${toDo}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newToDoTag;
  inputText.value = "";
}

// Delete toDo
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listOfToDoArr = JSON.parse(getLocalStorageData);
  listOfToDoArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listOfToDoArr));
  getToDo();
}

// Delete All toDo
deleteAllBtn.onclick = () => {
  listOfToDoArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listOfToDoArr));
  getToDo();
};
