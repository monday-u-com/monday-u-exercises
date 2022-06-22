const PokemonClient = require("../clients/pokemon_client")
const { Items } = require("../db/models")
class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient()
  }

  getItems = async () => {
    const items = await Items.findAll()
    return items
  }

  handleItem = async (item) => {
    if (this._isNumber(item)) {
      return await this.fetchAndAddPokemon(item)
    }
    if (this._isList(item)) {
      return await this.fetchAndAddPokemons(item)
    }

    this.addItem(item)
  }

  addItem = (item) => {
    Items.create({
      ItemName: item,
    })
  }

  addPokemonItem = (pokemon) => {
    Items.create({
      ItemName: `Catch ${pokemon.name}`,
      id: pokemon.id,
    })
  }

  fetchAndAddPokemon = async (pokemonId) => {
    try {
      const pokemon = await this.pokemonClient.getPokemon(pokemonId)
      this.addPokemonItem(pokemon)
    } catch (error) {
      this.addItem(`Pokemon with ID ${pokemonId} was not found`)
    }
  }

  fetchAndAddManyPokemon = async (inputValue) => {
    try {
      const pokemons = await this.pokemonClient.getManyPokemon(
        inputValue.replace("/ /g", "").split(",")
      )
      pokemons.forEach(this.addPokemonItem)
    } catch (error) {
      console.error(error)
      this.addItem(`Failed to fetch pokemon with this input: ${inputValue}`)
    }
  }

  deleteItem = (item) => {
    Items.destroy({
      where: {
        id: item["id"],
      },
    })
  }

  _isNumber = (value) => !isNaN(Number(value))
  _isList = (value) => value.split(",").every(this._isNumber)
}

module.exports = new ItemManager()
