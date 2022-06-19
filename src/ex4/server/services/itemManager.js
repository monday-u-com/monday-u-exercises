const fs = require("fs").promises
const pokemonFile = "pokemons.txt"

async function readPokemonFile() {
  try {
    const data = await fs.readFile(pokemonFile)
    return JSON.parse(data.toString())
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}

async function writePokemonFile(content) {
  try {
    await fs.writeFile(pokemonFile, JSON.stringify(content))
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`)
  }
}

async function addPokemon(pokemon) {
  let pokemons = await readPokemonFile()
  if (!pokemons) pokemons = []
  pokemons.push({ name: pokemon.name, id: pokemon.order })
  await writePokemonFile(pokemons)
  return pokemon
}

async function getAllPokemons() {
  const pokemons = await readPokemonFile()
  return pokemons
}

async function deletePokemon(id) {
  const pokemons = await getAllPokemons()
  const index = pokemons.findIndex((pokemon) => pokemon.id === id)
  const deletedPokemon = pokemons[index]
  pokemons.splice(index, 1)
  await writePokemonFile(pokemons)
  return deletedPokemon
}

module.exports = {
  // getPokemon,
  addPokemon,
  getAllPokemons,
  deletePokemon,
}
