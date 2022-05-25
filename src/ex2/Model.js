export default class Model {
    constructor() {
        this.todolist = []
    }

    LoadDataFromLS(){
        let dataFromLS = localStorage.getItem("new-todo")
    
        if(dataFromLS === null){
            this.todoList = []
        }
        else{
            this.todoList = JSON.parse(dataFromLS)
        }
    }

    addData(enterValue){
        this.todoList.push(enterValue)
    }

    removeData(index){
        this.todoList.splice(index, 1)
    }

    saveDataToLS(){ 
        localStorage.setItem("new-todo", JSON.stringify(this.todoList))
    }

    clearAllData(){
        this.todoList = []
    }
}