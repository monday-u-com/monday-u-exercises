const PokemonClient =  require("../clients/pokemon-client.js")
const handleAddSingleOrMultiPokemonsTodo = require('./pokemon-utils.js')
const {Todos}  = require('../db/models')

const singleNumber = /^\d+$/
const singleWord = /^[A-Za-z]+$/
const multiNumbersSeparatedWithComma = /^\d+(,\d+)*$/

module.exports = class ItemManager {
    constructor(main){
        this.pokemonClient = new PokemonClient()
        this.main = main;
    }

    async addTodo(enterValue){
        const trimValue = ItemManager.trim(enterValue)
        if(trimValue === "") return

        await this.handleInputToAdd(trimValue)
    }

    async handleInputToAdd(trimValue){
        const partOfNumbersSeprateWithComma = 
            trimValue.substring(0,1).match(multiNumbersSeparatedWithComma)

        const singleNumberPattern = trimValue.match(singleNumber)
        const singleWordPattern = trimValue.match(singleWord)
        const multiNumberPattern = trimValue.match(multiNumbersSeparatedWithComma) 
    
        if(singleWordPattern !== null || 
                singleNumberPattern !== null || 
                    multiNumberPattern !== null || 
                        partOfNumbersSeprateWithComma !== null) {
            await handleAddSingleOrMultiPokemonsTodo(this.pokemonClient, trimValue)
        }
        else{ //noraml todo
            const isPokemon = false
            const imagePokemonPath = null
            await this.addTodoParse(trimValue, isPokemon, imagePokemonPath)
        }
    }

    async handleAddSingleOrMultiPokemonsTodo(enterValue){

        if(enterValue.includes(",")){
            await this.handleAddMultiPokemonsTodo(enterValue)
        }
        else {
            await this.handleAddSinglePokemonTodo(enterValue)
        }
    }

    async handleAddMultiPokemonsTodo(enterValue){

        const split = enterValue.split(",")
        const pokemonArr = []

        for(let i = 0; i < split.length; i++){
            pokemonArr.push(this.pokemonClient.fetchMulti(ItemManager.trim(split[i])))
        }

        return Promise.all(pokemonArr)
            .then( response => {
                response.forEach(async(res) => {
                    await this.addMultiplePokemonsTodo(res)
            })
        }).catch(async (error) => {
            console.log(error)
            await this.addFailToLoadPokemonsTodo()
        })
    }

    async addMultiplePokemonsTodo(res){
        const types = this.pokemonClient.getTypes(res)
        const dataRetrieved = this.pokemonClient.returnPokemonData(res, types)
        const {value, isPokemon, imagePokemonPath} = dataRetrieved
       await this.addTodoParse(value, isPokemon, imagePokemonPath)
    }

    async addFailToLoadPokemonsTodo(enterValue){
        const isPokemon = false
        const imagePokemonPath = null
        const value = `failed to fetch pokemon with this input: ${enterValue}`
        await this.addTodoParse(value, isPokemon, imagePokemonPath)
    }

    async handleAddSinglePokemonTodo(enterValue){
        const dataRetrieved = await this.pokemonClient.fetchSingle(enterValue)
        if(dataRetrieved){
            const {value, isPokemon, imagePokemonPath} = dataRetrieved
            await this.addTodoParse(value, isPokemon, imagePokemonPath)
        }
        else {
            await this.addFailToLoadPokemonsTodo(enterValue)
        }   
    }

    async addTodoParse(value, isPokemon, imagePokemonPath){
        //generate unique id
        const id = Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)

        await Todos.create({itemId: id, itemName: value, status:false, isPokemon, imagePokemonPath})
    }

    static trim(value) {
        return value.replace(/^\s+|\s+$/g,"");
    }

    async deleteTodo(id) {
        const removedTodo = await Todos.findOne({where:{id}})

        if(!removedTodo) return null;
        await removedTodo.destroy()

        return removedTodo
    }

    async clearAllTodos() {
        await Todos.destroy({
            where: {},
            truncate: true
        })
    }

    async orderData(field, orderAction) {
        return await Todos.findAll({
            order:[
                [field, orderAction]
            ]
        })
    }

    async checkUncheckTodo(id, status) {
        const todo = await Todos.findOne({where:{id}})
        todo.status = status  
        todo.done_timestamp = new Date().getTime();
        await todo.save()

        return todo
    }

    async editDataInIndex(value, id){
        const todo = await Todos.findOne({where:{id}})
        todo.itemName = value  
        await todo.save()

        return todo
    }

    async filterData(status){
        return await Todos.findAll({
            where:{status}
        })
    }

    todoListSize() {
        return this.getTodoList().length
    }

    async getTodoList() {
        return await Todos.findAll()
    }
}
