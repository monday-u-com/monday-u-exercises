import { readFile, writeToFile } from '../helper/fileHandler.js'
import { isPokemon, isListOfPokemons, pokemonExistsInTodoList } from '../helper/pokemonHelper.js'
import { getPokemon, getAllPokemons } from '../clients/pokemon_client.js'

class ItemManager {

    constructor() {
        this.filePath = "./server/data/data.json" //Why is this not working??
    }

    async getItems(req, res) {
        try {
            const items = await readFile("./server/data/data.json")
            res.status(200).json(items)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async postItem(req, res) {
        try {
            let items = await readFile("./server/data/data.json")
            if (!items) items = []
            let newItem = req.body.item
            if (isListOfPokemons(newItem)) {
                let listOfPokemons = newItem.split(',');
                listOfPokemons = await getAllPokemons(listOfPokemons)
                listOfPokemons.forEach(item => {
                    items = [...items, `Catch ${item}`]
                })
                await writeToFile("./server/data/data.json", items)
                res.status(200).json(items)
            } else if (isPokemon(newItem)) {
                const pokemon = await getPokemon(newItem)
                const pokemonExists = await pokemonExistsInTodoList(pokemon.data.name)
                if (!pokemonExists) {
                    items = [...items, `Catch ${pokemon.data.name}`]
                    await writeToFile("./server/data/data.json", items)
                }
                res.status(200).json(items)
            } else {
                items = [...items, newItem]
                await writeToFile("./server/data/data.json", items)
                res.status(200).json(items)
            }
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async deleteItem(req, res) {
        try {
            let items = await readFile("./server/data/data.json")
            items.splice(req.params.id, 1)
            await writeToFile("./server/data/data.json", items)
            res.status(200).json(items)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    deleteAllItems() {

    }
}

export default ItemManager