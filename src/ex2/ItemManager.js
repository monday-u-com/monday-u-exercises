import Model from "./Model.js";

export default class ItemManager {
    constructor(pokemonClient){
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
        this.model = new Model()
        this.model.LoadDataFromLS()
        this.pokemonClient = pokemonClient;
    }

    addTodo(enterValue){
        
        if(enterValue.trim() === ""){
            return
        }

        this.handleAddSingleOrMultiPokemonsTodo(enterValue)
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

        const trimValue = this.trim(enterValue)
        const split = trimValue.split(",")
        const pokemonArr = []

        for(let i = 0; i < split.length; i++){
            pokemonArr.push(this.fetchMulti(split[i]))
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
        const trimValue = this.trim(enterValue)
        const dataRetrieved = await this.fetchSingle(trimValue)
        this.model.addData(dataRetrieved)
        this.updateTodos()
    }

    async fetchSingle(dataEntered){ 
        try{
            const response = await fetch(this.API_BASE+dataEntered)

            if(response.status === 404){
                return `pokemon id ${dataEntered} not found` 
            }

            const res = await response.json()
            const types = this.getTypes(res)

            return this.returnPokemonData(res, types)
        }catch(error){
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
        return "catch " +res.name + " with type " + types
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
        return this.model.todoList.length
    }

    getTodoList() {
        return this.model.todoList
    }
}
