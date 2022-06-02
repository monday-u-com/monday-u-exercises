import Model from "./Model.js"
import fetch from 'node-fetch'

export default class ItemManager {
    constructor(pokemonClient){
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
        this.model = new Model()
        this.model.LoadDataFromFile()
        this.pokemonClient = pokemonClient;
    }

    addTodo(enterValue){
        const trimValue = ItemManager.trim(enterValue)

        this.handleInputToAdd(trimValue)
    }

    handleInputToAdd(trimValue){
        const singleNumber = /^\d+$/
        const singleWord = /^[A-Za-z]+$/
        const multiNumbersSeparatedWithComma = /^\d+(,\d+)*$/
        const partOfNumbersSeprateWithComma = 
            trimValue.substring(0,1).match(multiNumbersSeparatedWithComma)

        const singleNumberPattern = trimValue.match(singleNumber)
        const singleWordPattern = trimValue.match(singleWord)
        const multiNumberPattern = trimValue.match(multiNumbersSeparatedWithComma) 
    
        if(singleWordPattern !== null || 
                singleNumberPattern !== null || 
                    multiNumberPattern !== null || 
                        partOfNumbersSeprateWithComma !== null) {
            this.handleAddSingleOrMultiPokemonsTodo(trimValue)
        }
        else{ //noraml todo
            this.addTodoParse(trimValue)
            this.updateTodos()
        }
    }

    handleAddSingleOrMultiPokemonsTodo(enterValue){

        if(enterValue.includes(",")){
            this.handleAddMultiPokemonsTodo(enterValue)
        }
        else {
            this.handleAddSinglePokemonTodo(enterValue)
        }
    }

    handleAddMultiPokemonsTodo(enterValue){

        const split = enterValue.split(",")
        const pokemonArr = []

        for(let i = 0; i < split.length; i++){
            pokemonArr.push(this.fetchMulti(split[i]))
        }

        Promise.all(pokemonArr)
            .then(response => {
                response.forEach(res => {
                    const types = ItemManager.getTypes(res)
                    this.addTodoParse(ItemManager.returnPokemonData(res, types))
            })
            this.updateTodos()
        }).catch(error => {
            console.log(error)
            this.addTodoParse("failed to fetch pokemon with this input: " +enterValue)
            this.updateTodos()
        })
    }

    fetchMulti(pokemonName){
        return new Promise((resolve, reject) => {
            return fetch(this.API_BASE+pokemonName)
                .then(response => {
                    if(response.status === 200){
                        resolve(response.json())
                    }
                    else{
                        reject(response)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    async handleAddSinglePokemonTodo(enterValue){
        const dataRetrieved = await this.fetchSingle(enterValue)
        this.addTodoParse(dataRetrieved)
        this.updateTodos()
    }

    async fetchSingle(dataEntered){ 
        try{
            const response = await fetch(this.API_BASE+dataEntered)
            if(response.status === 404 && isNaN(+dataEntered)){
                return dataEntered
            }
            else if(response.status === 404 && !isNaN(+dataEntered)){    
                return `pokemon id ${dataEntered} not found` 
            }

            const res = await response.json()
            const types = ItemManager.getTypes(res)

            return ItemManager.returnPokemonData(res, types)
        }catch(error){
            console.log(error)
        }
    }

    addTodoParse(value){
        this.model.addData({title: value, done: false})
    }

    static getTypes(data){
        const typeNo = data.types
        let types = ""

        typeNo.forEach(type => {
            types += type.type.name + "/"    
        })

        return types
    }

    static returnPokemonData(res, types){
        return "catch " +res.name + " with type " + types
    }

    static trim(value) {
        return value.replace(/^\s+|\s+$/g,"");
    }

    deleteTodo(index) {

        if(index < 0 || index >= this.model.todoList.length){
            return null;
        }
    
        const removedTodo = this.model.todoList[index]
        this.model.removeData(index)
        this.updateTodos()

        return removedTodo
    }

    updateTodos(){
        this.model.saveDataToLS()
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

    checkTodo(index) {
        if(index < 0 || index >= this.model.todoList.length){
            return null;
        }

        const todo = this.model.checkUncheckTodo(index,true)
        this.updateTodos()
        return todo
    }

    uncheckTodo(index) {
        if(index < 0 || index >= this.model.todoList.length){
            return null;
        }

        const todo = this.model.checkUncheckTodo(index, false)
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
        return this.model.todoList.length
    }

    getTodoList() {
        return this.model.todoList
    }
}
