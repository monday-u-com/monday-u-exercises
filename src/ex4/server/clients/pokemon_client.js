// The Pokemon Client (using axios) goes here
import axios from "axios"

export async function getPokemon(num) {
    const url = `https://pokeapi.co/api/v2/pokemon/${num}`
    const pokeName = await axios.get(url).then(res => {
        return res
    }).catch(e => {
        return 0
    })
    return pokeName
}

export async function getAllPokemons(listOfPokemons) {
    let listOfPokemonNames = []
    listOfPokemons.forEach(item => {
        listOfPokemonNames.push(getPokemon(item))
    })
    await Promise.all(listOfPokemonNames).then(res => {
        listOfPokemonNames = []
        res.forEach(item => {
            listOfPokemonNames.push(item.data.name)
        })
    })
    return listOfPokemonNames
}