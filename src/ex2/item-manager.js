import TodoListModel from "./todolist-model.js";

const API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
const singleNumber = /^\d+$/
const singleWord = /^[A-Za-z]+$/
const multiNumbersSeparatedWithComma = /^\d+(,\d+)*$/

export default class ItemManager {
    constructor(pokemonClient){
        this.model = new TodoListModel()
        this.model.loadDataFromLS()
        this.pokemonClient = pokemonClient;
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
            pokemonArr.push(this.fetchMulti(this.trim(split[i])))
        }

        Promise.all(pokemonArr)
            .then(response => {
                response.forEach(res => {
                    const types = this.getTypes(res)
                    this.model.addData(this.trim(this.returnPokemonData(res, types)))
            })
            this.updateTodos()
        }).catch(error => {
            console.log(error)
            this.model.addData("failed to fetch pokemon with this input: " +enterValue)
            this.updateTodos()
        })
    }

    fetchMulti(pokemonName){
        return new Promise((resolve, reject) => {
            return fetch(`${API_BASE}${pokemonName}`)
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
        this.model.addData(dataRetrieved)
        this.updateTodos()
    }

    async fetchSingle(dataEntered){ 
        try {
            const response = await fetch(`${API_BASE}${dataEntered}`)
            if(response.status === 404 && isNaN(+dataEntered)){
                return dataEntered
            }
            else if(response.status === 404 && !isNaN(+dataEntered)){    
                return `pokemon id ${dataEntered} not found` 
            }

            const res = await response.json()
            const types = this.getTypes(res)

            return this.returnPokemonData(res, types)
        } catch(error){
            console.log(error)
        }
    }

    getTypes(data){
        const typeNo = data.types
        let types = ""

        typeNo.forEach(type => {
            types += type.type.name + "/"    
        })

        return types
    }

    returnPokemonData(res, types){
        return `catch ${res.name} with type ${types}`
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
        this.pokemonClient.showTodos()
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
