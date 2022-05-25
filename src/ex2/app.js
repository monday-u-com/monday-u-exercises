import { ItemManager } from "./itemManager.js"
import { PokemonClient } from "./PokemonClient.js"

const addButton = document.getElementById("list-item-submit")
const textInput = document.getElementById("list-item-input")
const allLists = document.getElementById("list")
const counterLists = document.getElementById("counterLists")
const deleteAllLists = document.getElementById("deleteAllTasks")
const errorMessage = document.getElementById("error")

const itemManager = new ItemManager()
class Main {
  constructor() {
    this.name = "Main"
  }
  init() {
    addButton.addEventListener("click", function () {
      validation()
    })
  }
}

function addNewList() {
  itemManager.addItem(textInput.value)
  const li = document.createElement("li")
  const hr = document.createElement("hr")
  const deleteButton = document.createElement("button")
  deleteButton.setAttribute("class", "dltbtn")
  deleteButton.innerHTML = "X"

  deleteButton.addEventListener("click", function () {
    li.remove()
    hr.remove()
    itemManager.removeItem(textInput.value)
  })
  li.addEventListener("mouseover", function () {
    deleteButton.style.display = "block"
    deleteButton.style.transition = "all 0.5s ease-in-out"
  })
  li.addEventListener("mouseout", function () {
    deleteButton.style.display = "none"
    deleteButton.style.transition = "all 0.5s ease-in-out"
  })
  li.appendChild(document.createTextNode(textInput.value))
  li.appendChild(deleteButton)
  allLists.appendChild(li)
  allLists.appendChild(hr)
  textInput.value = ""
  console.log(itemManager.getItems())
}

function validation() {
  const input = document.getElementById("list-item-input")
  if (input.value === "") {
    errorMessage.innerHTML = "Please enter a task"
    errorMessage.style.display = "block"
  } else {
    addNewList()
    errorMessage.style.display = "none"
    errorMessage.style.transition = "all 0.5s ease-in-out"
  }
}

const main = new Main()

document.addEventListener("DOMContentLoaded", function () {
  main.init()
})
