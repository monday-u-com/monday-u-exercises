import fs from 'fs';
export default class Model {
    constructor() {
        this.todoList = []
    }

    LoadDataFromFile(){
        fs.readFile('./todo.json', (err, data) => {
            if(err){
                return
            }
            if(data === null){
                console.log('data is null');
                this.todoList = []
            }
            else{
                this.todoList = JSON.parse(data)
            } 
        })
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
        fs.writeFile("./todo.json", JSON.stringify(this.todoList), err => {
            if(err) {
                console.log(err)
            }
        })
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