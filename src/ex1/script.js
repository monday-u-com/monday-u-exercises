const addButton = document.getElementById("addButton")

addButton.addEventListener("click", function () {
  addNewList()
})

function addNewList() {
  const input = document.getElementById("input")
  const list = document.getElementById("todolist")
  const li = document.createElement("li")
  const deleteButton = document.createElement("button")
  deleteButton.setAttribute("class", "dltbtn")
  deleteButton.innerHTML = "X"
  deleteButton.addEventListener("click", function () {
    li.remove()
  })
  li.appendChild(document.createTextNode(input.value))
  li.appendChild(deleteButton)
  list.appendChild(li)
  input.value = ""
}
