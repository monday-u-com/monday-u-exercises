// The Pokemon Client (using axios) goes here
import axios from "axios"

export async function getPokemon(num) {
    const url = `https://pokeapi.co/api/v2/pokemon/${num}`
    const pokeName = await axios.get(url)
    console.log(pokeName)
    if (pokeName.status === 200) {
        return pokeName
    }
    return undefined
}

export async function getAllPokemons(listOfPokemons) {
    let listOfPokemonNames = []
    listOfPokemons.forEach(item => {
        listOfPokemonNames.push(getPokemon(item))
    })
    listOfPokemonNames = await Promise.all(listOfPokemonNames)
    listOfPokemonNames = listOfPokemonNames.map(item => {
        return item.data.name
    })
    return listOfPokemonNames
}