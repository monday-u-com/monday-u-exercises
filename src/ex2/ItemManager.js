import Model from "./Model.js";

export default class ItemManager {
    constructor(pokemonClient){
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
        //this.todolist = []
        this.model = new Model()
        this.model.LoadDataFromLS()
        this.pokemonClient = pokemonClient;
    }

    /* checkIfExistDataFromLS(){
        let dataFromLS = localStorage.getItem("new-todo")
    
        if(dataFromLS === null){
            this.todoList = []
        }
        else{
            this.todoList = JSON.parse(dataFromLS)
        }
    } */

    async addTodo(enterValue){
        
        if(enterValue.trim() === ""){
            alert("todo cannot be empty")
            return
        }

        if(enterValue.includes(",")){
            const split = enterValue.split(",")
            const pokemonArr = []
            for(let i = 0; i < split.length; i++){
                pokemonArr.push(this.fetchMulti(split[i]))
            }
            Promise.all(pokemonArr).then(response => {
                response.forEach(res => {
                    this.model.addData("catch " +res.name)
                })
                this.model.saveDataToLS()
                this.pokemonClient.showTodos()
            }).catch(error => {
                this.model.addData("failed to fetch pokemon with this input: " +enterValue)
                this.model.saveDataToLS()
                this.pokemonClient.showTodos()
            })
        }
        else {
            const dataRetrieved = await this.fetchSingle(enterValue)
            this.model.addData(dataRetrieved)
            this.model.saveDataToLS()
            this.pokemonClient.showTodos()
        }
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

    async fetchSingle(dataEntered){ 
        try{
            const response = await fetch(this.API_BASE+dataEntered)
            if(response.status === 404){
                return `pokemon id ${dataEntered} not found` 
            }
            const data = await response.json()
            console.log(data)
            return "catch " + data.name;
        }catch(error){
            console.dir(error)
        }
    }

    /* pushEnteredDataToLS(enterValue){
        this.todoList.push(enterValue)
        localStorage.setItem("new-todo", JSON.stringify(this.todoList))
        alert(`added new todo ${enterValue}`)
    } */

    deleteTodo(index) {
    
        const removedTodo = this.model.todoList[index]
        //this.model.todoList.splice(index, 1)//remove one todo
        this.model.removeData(index)
        this.model.saveDataToLS()   

        return removedTodo
    }

    todoListSize() {
        return this.model.todoList.length
    }

    getTodoList() {
        return this.model.todoList
    }
}
