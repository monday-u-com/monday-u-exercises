const addButton = document.getElementById("list-item-submit")
const textInput = document.getElementById("list-item-input")
const allLists = document.getElementById("list")
const counterLists = document.getElementById("counter")
const errorMessage = document.getElementById("error")
const regex = /^[0-9]*$/

const itemC = new ItemClient()

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
  deleteButton.setAttribute("id", textInput.value)
  deleteButton.innerHTML = "X"

  deleteButton.addEventListener("click", async function (e) {
    li.remove()
    hr.remove()
    await itemC.deleteItem(e.target.id)
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
          const pokemon = await itemC.addItem(id) // promise
          addNewList(`Catch ${pokemon.name}`)
        })
      ).catch((error) => {
        console.log("error", error)
        itemC.addItem(textInput.value)
        addNewList(`Faild to fetch pokemon with the input: ${textInput.value}`)
      })
    } else {
      if (regex.test(textInput.value)) {
        const newPokemon = await itemC
          .addItem(textInput.value)
          .catch((error) => {
            console.log("error", error)
            itemC.addItem(textInput.value)
            addNewList(
              `Faild to fetch pokemon with the input: ${textInput.value}`
            )
          })
        addNewList(`Catch ${newPokemon.name}`)
      } else {
        await itemC.addItem(textInput.value)
        addNewList(textInput.value)
      }
      errorMessage.style.display = "none"
      errorMessage.style.transition = "all 0.5s ease-in-out"
    }
  }
  countLists()
}

async function countLists() {
  const items = await itemC.getItems()
  counterLists.innerHTML = `${items.length}`
}

const main = new Main()

document.addEventListener("DOMContentLoaded", async function () {
  main.init()
  const items = await itemC.getItems()
  items.forEach((item) => {
    addNewList(`Catch ${item.name}`)
  })
  countLists()
})
