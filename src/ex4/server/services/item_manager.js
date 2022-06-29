import { isPokemon, isListOfPokemons, pokemonExistsInTodoList } from '../helper/pokemonHelper.js'
import { getPokemon, getAllPokemons } from '../clients/pokemon_client.js'
import items from '../db/models/items.cjs'
import { Sequelize } from 'sequelize'

class ItemManager {

    constructor() {
        this.sequelize = new Sequelize('todo_db', 'root', 'password', {
            host: 'localhost',
            dialect: 'mysql'
        });
    }

    async getItems(req, res) {
        try {
            let newItems = await items(this.sequelize).findAll()
            res.status(200).json(newItems)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async changeItemStatus(req, res) {
        try {
            let change = await items(this.sequelize).update(
                { status: req.body.status },
                { where: { itemName: req.body.item } }
            )
            res.status(200).json(change)
        } catch (error) {
            console.log(error)
        }
    }

    async postItem(req, res) {
        try {
            let newItem = req.body.item
            if (isListOfPokemons(newItem)) {
                let listOfPokemons = newItem.split(',');
                listOfPokemons = await getAllPokemons(listOfPokemons)
                for (let i = 0; i < listOfPokemons.length; i++) {
                    await items(this.sequelize).create({ itemName: `Catch ${listOfPokemons[i]}` })
                }
            }
            else if (isPokemon(newItem)) {
                const pokemon = await getPokemon(newItem)
                if (pokemon === undefined || pokemon === 0) {
                    res.status(404).json(items)
                }
                const pokemonExists = await pokemonExistsInTodoList(pokemon?.data?.name)
                if (!pokemonExists) {
                    await items(this.sequelize).create({ itemName: `Catch ${pokemon?.data?.name}` })
                }
            } else {
                await items(this.sequelize).create({ itemName: newItem })
            }
            res.status(200).json({})
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async deleteItem(req, res) {
        try {
            await items(this.sequelize).destroy({
                where: {
                    itemName: req.params.id
                }
            })
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