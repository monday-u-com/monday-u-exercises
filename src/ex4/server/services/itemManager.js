const fs = require("fs").promises
const pokemonFile = "pokemons.json"

async function readPokemonFile() {
  try {
    const data = await fs.readFile(pokemonFile)
    return JSON.parse(data)
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
  // const index = pokemons.findIndex((pokemon) => pokemon.id === id)
  // pokemons.splice(index, 1)

  const res = pokemons.filter((pokemon) => pokemon.id !== id)

  await writePokemonFile(res)
}

module.exports = {
  addPokemon,
  getAllPokemons,
  deletePokemon,
}
