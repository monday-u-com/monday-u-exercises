const dataFromLS = localStorage.getItem("new-todo")

export default class TodoListModel {
    constructor() {
        this.todolist = []
    }

    loadDataFromLS(){
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