export function isPokemon(item) {
    if (!isNaN(item)) return true
    return false
}

export function isListOfPokemons(item) {
    if (item.includes(",") && JSON.stringify(item.split(",")) === JSON.stringify(item.split(",").filter(item => !isNaN(item)))) {
        return true
    }
    return false
}

export async function pokemonExistsInTodoList(pokemon) {
    const list = await readFile()
    if (list.includes(`catch ${pokemon}`)) return true
    return false
}