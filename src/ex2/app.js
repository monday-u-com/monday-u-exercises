import { ItemManager } from "./itemManager.js"

const addButton = document.getElementById("list-item-submit")
const textInput = document.getElementById("list-item-input")
const allLists = document.getElementById("list")
const counterLists = document.getElementById("counterLists")
const deleteAllLists = document.getElementById("deleteAllTasks")
const errorMessage = document.getElementById("error")

const pokemonApi = "https://pokeapi.co/api/v2/pokemon/"
const itemManager = new ItemManager()
class Main {
  constructor() {
    this.name = "Main"
  }
  init() {
    addButton.addEventListener("click", function () {
      validationText()
    })
  }
}

function addNewList() {
  itemManager.addItem(textInput.value)
  const list = document.getElementById("list")
  const li = document.createElement("li")
  const deleteButton = document.createElement("button")
  deleteButton.setAttribute("class", "dltbtn")
  deleteButton.innerHTML = "X"
  deleteButton.addEventListener("click", function () {
    li.remove()
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
  list.appendChild(li)
  textInput.value = ""
  console.log(itemManager.getItems())
}

function validationText() {
  const input = document.getElementById("list-item-input")
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

const main = new Main()
document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init()
})
