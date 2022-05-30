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
        let copyArr = this.todoList
        copyArr.splice(index,1)
        this.todoList = copyArr
    }

    saveDataToLS(){ 
        localStorage.setItem("new-todo", JSON.stringify(this.todoList))
    }

    clearAllData(){
        this.todoList = []
    }

    filterDataAToZ(){
        this.todoList = [...this.todoList.sort()]
    }

    filterDataZToA(){
        this.todoList = [...this.todoList.sort().reverse()]
    }
}