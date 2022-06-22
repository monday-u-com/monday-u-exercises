const PokemonClient =  require("../clients/pokemon-client.js")
const handleAddSingleOrMultiPokemonsTodo = require('./pokemon-utils.js')
const {Todos}  = require('../db/models')

const singleNumber = /^\d+$/
const singleWord = /^[A-Za-z]+$/
const multiNumbersSeparatedWithComma = /^\d+(,\d+)*$/

module.exports = class ItemManager {
    constructor(main){
        this.pokemonClient = new PokemonClient()
        this.model = {}
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
            await handleAddSingleOrMultiPokemonsTodo(this.model, this.pokemonClient, trimValue)
        }
        else{ //noraml todo
            const isPokemon = false
            const imagePokemonPath = null
            this.addTodoParse(trimValue, isPokemon, imagePokemonPath)
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
            this.updateTodos()
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
            this.addFailToLoadPokemonsTodo(enterValue)
        }   
    }

    async addTodoParse(value, isPokemon, imagePokemonPath){
        //generate unique id
        const id = Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        //this.model.addData({title: value, done: false, isPokemon, imagePokemonPath, id})
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

    updateTodos(){
        this.model.saveDataToFile()
    }

    clearAllTodos() {
        this.model.clearAllData()
        this.updateTodos()
    }

    orderDataAlphabetically() {
        this.model.orderDataAlphabetically()
        this.updateTodos()
    }

    orderDataAlphabeticallyReverse() {
        this.model.orderDataAlphabeticallyReverse()
        this.updateTodos()
    }

    async checkTodo(id) {
        const todo = await Todos.findOne({where:{id}})
        todo.status = true
        console.log('check',todo.status);
        await todo.save()

        return todo
    }

    async uncheckTodo(id) {
        const todo = await Todos.findOne({where:{id}})
        todo.status = false
        console.log('ucheck',todo.status);
        await todo.save()

        return todo
    }

    editDataInIndex(value, id){
        const index = this.model.todoList.findIndex(item => item.id === id)
        if(index === -1){
            return null;
        }
        
        const todo = this.model.editDataInIndex(value, index)
        this.updateTodos()
        return todo
    }

    orderUnDoneToDone(){
        this.model.orderUnDoneToDone()
        this.updateTodos()
    }

    orderDoneToUnDone(){
        this.model.orderDoneToUnDone()
        this.updateTodos()
    }

    getDoneTodos() {
        return this.model.getDoneTodos()
    }

    getUnDoneTodos(){
        return this.model.getUnDoneTodos()
    }

    todoListSize() {
        return this.getTodoList().length
    }

    async getTodoList() {
        return await Todos.findAll()
    }
}
