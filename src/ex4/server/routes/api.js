// Define your endpoints here (this is your "controller file")
const pokemonService = require("../services/ItemManager")
const pokemonClient = require("../clients/PokemonClient")
const pc = new pokemonClient()

async function createPokemon(req, res) {
  const newPokemon = await pc.getPokemon(req.params.id)
  const pokemon = await pokemonService.addPokemon(newPokemon)
  res.status(200).json(pokemon)
}

async function getPokemon(req, res) {
  const pokemonId = Number.parseInt(req.params.id)
  if (isNaN(pokemonId)) {
    let error = Error()
    error.statusCode = 400
    error.message = "Wrong parameters"
    throw error
  }

  const pokemon = await pokemonService.getPokemon(pokemonId)

  if (!pokemon) {
    let error = Error()
    error.statusCode = 404
    error.message = "Pokemon not found"
    throw error
  }

  res.status(200).json(pokemon)
}

async function getAllPokemons(req, res) {
  const pokemons = await pokemonService.getAllPokemons()
  if (!pokemons) pokemons = []
  res.status(200).json(pokemons)
}

async function deletePokemon(req, res) {
  const pokemonId = Number.parseInt(req.params.id)
  if (isNaN(pokemonId)) {
    let error = Error()
    error.statusCode = 400
    error.message = "Wrong parameters"
    throw error
  }

  const pokemon = await pokemonService.deletePokemon(pokemonId)
  res.status(200).json(pokemon)
}

module.exports = {
  createPokemon,
  getPokemon,
  getAllPokemons,
  deletePokemon,
}
