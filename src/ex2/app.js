import { ItemManager } from "./itemManager.js"
import { PokemonClient } from "./pokemonClient.js"

const addButton = document.getElementById("list-item-submit")
const textInput = document.getElementById("list-item-input")
const allLists = document.getElementById("list")
const counterLists = document.getElementById("counter")
// const deleteAllLists = document.getElementById("deleteAllTasks")
const errorMessage = document.getElementById("error")
const regex = /^[0-9]*$/

const itemManager = new ItemManager()
const pokemonClient = new PokemonClient()
class Main {
  constructor() {
    this.name = "Main"
  }
  init() {
    addButton.addEventListener("click", function () {
      itemManager.addItem(textInput.value)
      validation(itemManager.getLastItem())
    })
  }
}

function addNewList(name) {
  const li = document.createElement("li")
  const hr = document.createElement("hr")
  const deleteButton = document.createElement("button")
  deleteButton.setAttribute("class", "dltbtn")
  deleteButton.innerHTML = "X"

  deleteButton.addEventListener("click", function () {
    li.remove()
    hr.remove()
    itemManager.removeItem(textInput.value)
    countLists()
  })
  li.addEventListener("mouseover", function () {
    deleteButton.style.display = "block"
    deleteButton.style.transition = "all 0.5s ease-in-out"
  })
  li.addEventListener("mouseout", function () {
    deleteButton.style.display = "none"
    deleteButton.style.transition = "all 0.5s ease-in-out"
  })
  li.appendChild(document.createTextNode(name))
  li.appendChild(deleteButton)
  allLists.appendChild(li)
  allLists.appendChild(hr)
  textInput.value = ""
  console.log(itemManager.getItems())
}

function validation(item) {
  countLists()
  const input = document.getElementById("list-item-input")
  if (input.value === "") {
    errorMessage.innerHTML = "Please enter a task"
    errorMessage.style.display = "block"
  } else {
    if (item.includes(",")) {
      Promise.all(
        item.split(",").map(async (name) => {
          const pokemon = await pokemonClient.getPokemon(name) // promise
          addNewList(`Catch ${pokemon.name}`)
        })
      ).catch((error) => {
        console.log("error", error)
        addNewList(`Faild to fetch pokemon with the input: ${item}`)
      })
    } else {
      if (regex.test(item)) {
        pokemonClient
          .getPokemon(textInput.value)
          .then((data) => {
            addNewList(`Catch ${data.name}`)
          })
          .catch((error) => {
            console.log(error)
            addNewList(`Pokemon with ID ${input.value} was not found`)
          })
      } else {
        addNewList(item)
      }
      errorMessage.style.display = "none"
      errorMessage.style.transition = "all 0.5s ease-in-out"
    }
  }
}

function countLists() {
  const items = itemManager.getItems()
  counterLists.innerHTML = `${items.length}`
}
const main = new Main()

document.addEventListener("DOMContentLoaded", function () {
  main.init()
})
