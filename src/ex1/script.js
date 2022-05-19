const addButton = document.getElementById("addButton")
const textInput = document.getElementById("input")
const counterLists = document.getElementById("counterLists")
const deleteAllLists = document.getElementById("deleteAllTasks")
const errorMessage = document.getElementById("error")
const allLists = document.getElementById("todolist")

addButton.addEventListener("click", function () {
  validationText()
})

textInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault()
    validationText()
  }
})
deleteAllLists.addEventListener("click", function () {
  deleteAllTasks()
})
function addNewList() {
  countLiAdded()
  const input = document.getElementById("input")
  const list = document.getElementById("todolist")
  const li = document.createElement("li")
  const deleteButton = document.createElement("button")
  deleteButton.setAttribute("class", "dltbtn")
  deleteButton.innerHTML = "X"
  deleteButton.addEventListener("click", function () {
    li.remove()
    countLiDeleted()
  })
  li.addEventListener("mouseover", function () {
    deleteButton.style.display = "block"
    deleteButton.style.transition = "all 0.5s ease-in-out"
  })
  li.addEventListener("mouseout", function () {
    deleteButton.style.display = "none"
    deleteButton.style.transition = "all 0.5s ease-in-out"
  })
  li.appendChild(document.createTextNode(input.value))
  li.appendChild(deleteButton)
  list.appendChild(li)
  input.value = ""
  sortingListByAscending()
}

function countLiAdded() {
  const list = document.getElementById("todolist")
  const count = list.getElementsByTagName("li").length
  const counter = document.getElementById("counter")
  counter.innerHTML = count + 1
}

function countLiDeleted() {
  const list = document.getElementById("todolist")
  const count = list.getElementsByTagName("li").length
  const counter = document.getElementById("counter")
  counter.innerHTML -= 1
}

function deleteAllTasks() {
  const list = document.getElementById("todolist")
  const counter = document.getElementById("counter")
  counter.innerHTML = 0
  list.innerHTML = ""
}

function validationText() {
  const input = document.getElementById("input")
  if (input.value === "") {
    errorMessage.innerHTML = "Please enter a task"
    errorMessage.style.display = "block"
    errorMessage.style.transition = "all 0.5s ease-in-out"
    errorMessage.style.color = "red"
    errorMessage.style.fontSize = "20px"
    errorMessage.style.fontWeight = "bold"
    errorMessage.style.textAlign = "center"
    errorMessage.style.marginTop = "10px"
  } else {
    addNewList()
    errorMessage.style.display = "none"
    errorMessage.style.transition = "all 0.5s ease-in-out"
  }
}

function sortingListByAscending() {
  const list = document.getElementById("todolist")
  const listItems = list.getElementsByTagName("li")
  const listArray = Array.from(listItems)
  listArray.sort(function (a, b) {
    return a.innerHTML.toLowerCase().localeCompare(b.innerHTML.toLowerCase())
  })
  list.innerHTML = ""
  listArray.forEach(function (item) {
    list.appendChild(item)
  })
}
