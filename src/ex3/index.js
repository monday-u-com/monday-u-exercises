import fetch from "node-fetch"
import { Command } from "commander"
import PokemonClient from "./PokemonClient.js"
import ItemManager from "./itemManager.js"
import fs from "fs"

const pokemonClient = new PokemonClient()

async function getPokemon(id) {
  fs.readFileSync("./pokemon.txt", "utf8", (err, data) => {
    if (err) {
      console.log(data.toString())
      throw err
    }
  })
  const response = await fetch(`${pokemonClient.api}${id}`)
  const json = await response.json()
  return json
}

async function getAllItemsFromFile() {
  const items = fs.readFileSync("./pokemon.txt", "utf8", (err, data) => {
    if (err) {
      console.log(data.toString())
      throw err
    }
  })
  return items
}

function getCommanderProgram() {
  const program = new Command()
  program.name("pokemon-cli").version("0.0.1").description("Pokemon CLI")

  program
    .command("add <name>")
    .description("Add a pokemon to your collection")
    .action(async (id) => {
      const pokemon = await getPokemon(id)
      fs.appendFileSync("./pokemon.txt", `Catch ${pokemon.name}\n`)
      console.log("New todo added successfully")
    })

  program
    .command("getAll")
    .description("Get all pokemon")
    .action(async () => {
      const items = await getAllItemsFromFile()
      console.log(items)
    })

  return program
}
const program = getCommanderProgram()
program.parse()
