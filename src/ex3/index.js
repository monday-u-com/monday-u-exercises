import chalk from "chalk"
import { Command } from "commander"
import fetch from "node-fetch"
const program = new Command()
import dotenv from "dotenv"
import { PokemonClient } from "./PokemonClient.js"
import { ItemManager } from "./itemManager.js"
dotenv.config()

const pokemonClient = new PokemonClient()

async function addNewPokemon(id) {
  try {
    const queryString = `${id}`
    const requestUrl = `${pokemonClient.api}${queryString}`
    const response = await fetch(requestUrl)
    const pokemonData = await response.json()
    return pokemonData.forms[0].name
  } catch (err) {
    throw err
  }
}

function getCommanderProgram() {
  const program = new Command()
  return program
}

const programm = getCommanderProgram()
programm.parse()
