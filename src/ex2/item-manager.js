import TodoListModel from "./todolist-model.js";
import PokemonClient from "./pokemon-client.js"

const singleNumber = /^\d+$/
const singleWord = /^[A-Za-z]+$/
const multiNumbersSeparatedWithComma = /^\d+(,\d+)*$/

export default class ItemManager {
    constructor(main){
        this.pokemonClient = new PokemonClient()
        this.model = new TodoListModel()
        this.model.loadDataFromLS()
        this.main = main;
    }

    addTodo(enterValue){
        
        if(enterValue.trim() === ""){
            return
        }

        const trimValue = this.trim(enterValue)
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
        else{
            this.model.addData(trimValue)
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
            pokemonArr.push(this.pokemonClient.fetchMulti(this.trim(split[i])))
        }

        Promise.all(pokemonArr)
            .then(response => {
                response.forEach(res => {
                    const types = this.pokemonClient.getTypes(res)
                    this.model.addData(this.trim(this.pokemonClient.returnPokemonData(res, types)))
            })
            this.updateTodos()
        }).catch(error => {
            console.log(error)
            this.model.addData("failed to fetch pokemon with this input: " +enterValue)
            this.updateTodos()
        })
    }

    async handleAddSinglePokemonTodo(enterValue){
        const dataRetrieved = await this.pokemonClient.fetchSingle(enterValue)
        this.model.addData(dataRetrieved)
        this.updateTodos()
    }

    trim(value) {
        return value.replace(/^\s+|\s+$/g,"");
    }

    deleteTodo(index) {
    
        const removedTodo = this.model.todoList[index]
        this.model.removeData(index)
        this.updateTodos()

        return removedTodo
    }

    updateTodos(){
        this.model.saveDataToLS()
        this.main.showTodos()
    }

    clearAllTodos() {
        this.model.clearAllData()
        this.updateTodos()
    }

    filterDataAToZ() {
        this.model.filterDataAToZ()
        this.updateTodos()
    }

    filterDataZToA() {
        this.model.filterDataZToA()
        this.updateTodos()
    }

    todoListSize() {
        return this.getTodoList().length
    }

    getTodoList() {
        return this.model.todoList
    }
}
