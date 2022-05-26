import { ItemManager } from "./itemManager.js"
import { PokemonClient } from "./pokemonClient.js"

const addButton = document.getElementById("list-item-submit")
const textInput = document.getElementById("list-item-input")
const allLists = document.getElementById("list")
const counterLists = document.getElementById("counter")
const deleteAllLists = document.getElementById("deleteAllTasks")
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
      validation()
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
}

async function validation() {
  if (textInput.value === "") {
    errorMessage.innerHTML = "Please enter a task"
    errorMessage.style.display = "block"
  } else {
    if (textInput.value.includes(",")) {
      await Promise.all(
        textInput.value.split(",").map(async (id) => {
          const pokemon = await pokemonClient.getPokemon(id) // promise
          itemManager.addItem(id)
          addNewList(`Catch ${pokemon.name}`)
        })
      ).catch((error) => {
        console.log("error", error)
        itemManager.addItem(textInput.value)
        addNewList(`Faild to fetch pokemon with the input: ${textInput.value}`)
      })
    } else {
      if (regex.test(textInput.value)) {
        await pokemonClient
          .getPokemon(textInput.value)
          .then((data) => {
            if (itemManager.checkingDuplicate(textInput.value)) {
              alert(`${data.name} is already in the list`)
              textInput.value = ""
            } else {
              itemManager.addItem(textInput.value)
              addNewList(`Catch ${data.name}`)
            }
          })
          .catch((error) => {
            console.log(error)
            itemManager.addItem(textInput.value)
            addNewList(`Pokemon with ID ${textInput.value} was not found`)
          })
      } else {
        itemManager.addItem(textInput.value)
        addNewList(textInput.value)
      }
      errorMessage.style.display = "none"
      errorMessage.style.transition = "all 0.5s ease-in-out"
    }
  }
  countLists()
}

function countLists() {
  const items = itemManager.getItems()
  counterLists.innerHTML = `${items.length}`
}

function deleteAllTasks() {
  itemManager.removeAllItems()
  allLists.innerHTML = ""
  counterLists.innerHTML = "0"
}
const main = new Main()

document.addEventListener("DOMContentLoaded", function () {
  main.init()
})

deleteAllLists.addEventListener("click", function () {
  deleteAllTasks()
})
