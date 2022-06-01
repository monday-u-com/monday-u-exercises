import fetch from "node-fetch"
import { Command } from "commander"
import PokemonClient from "./PokemonClient.js"
import fs from "fs"

const pokemonClient = new PokemonClient()

async function getPokemon(id) {
  const isInteger = parseInt(id)
  if (isInteger) {
    const response = await fetch(`${pokemonClient.api}${id}`)
    const json = await response.json()
    return json
  } else {
    return id
  }
}

function getAllItemsFromFile() {
  const items = fs.readFileSync("./pokemon.txt", "utf8", (err, data) => {
    if (err) {
      console.log(data.toString())
      throw err
    }
  })
  return items
}

function deleteItemByIndex(index) {
  const items = getAllItemsFromFile()
  const newItems = items.split("\n")
  newItems.splice(index, 1)
  fs.writeFileSync("./pokemon.txt", newItems.join("\n"))
}

function getCommanderProgram() {
  const program = new Command()
  program.name("pokemon-cli").version("0.0.1").description("Pokemon CLI")

  program
    .command("add <name>")
    .description("Add a new todo task")
    .action(async (id) => {
      const pokemon = await getPokemon(id)
      if (pokemon.name) {
        fs.appendFileSync("./pokemon.txt", `Catch ${pokemon.name}\n`)
        console.log("New todo added successfully")
      } else {
        fs.appendFileSync("./pokemon.txt", `${id}\n`)
        console.log("New todo added successfully")
      }
    })

  program
    .command("get")
    .description("Get all pokemon")
    .action(async () => {
      const items = await getAllItemsFromFile()
      console.log(items)
    })

  program
    .command("delete <index>")
    .description("Delete a pokemon")
    .action(async (index) => {
      deleteItemByIndex(index)
      console.log("todo delete successfully")
    })

  return program
}
const program = getCommanderProgram()
program.parse()
