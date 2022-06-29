import { readFile } from './fileHandler.js'

export function isPokemon(item) {
    if (!isNaN(item)) return true
    return false
}

export function isListOfPokemons(item) {
    if (item.includes(",") && item.split(",").every(item => !isNaN(item))) {
        return true
    }
    return false
}

export async function pokemonExistsInTodoList(pokemon) {
    const list = await readFile("./server/data/data.json")
    if (list.includes(`Catch ${pokemon}`)) {
        return true
    }
    return false
}