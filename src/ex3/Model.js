import fs from 'fs';
export default class Model {
    constructor() {
        this.todoList = []
    }

    LoadDataFromFile(){
        try {
            const data = fs.readFileSync('./todo.json', 'utf8');
            if(data === null){
                this.todoList = []
            }
            else{
                this.todoList = JSON.parse(data)
            } 
        } catch (err) {
            console.error(err);
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
        fs.writeFile("./todo.json", JSON.stringify(this.todoList), err => {
            if(err) {
                console.log(err)
            }
        })
    }

    clearAllData(){
        this.todoList = []
    }

    orderDataAlphabetically(){
        this.todoList = this.compareFunc(this.todoList,"title")
    }

    orderDataAlphabeticallyReverse(){
        this.todoList = this.compareFunc(this.todoList,"title").reverse()
    }

    filterUnDoneToDone(){
        this.todoList = this.compareFunc(this.todoList,"done")
    }

    filterDoneToUnDone(){
        this.todoList = this.compareFunc(this.todoList,"done").reverse()
    }

    compareFunc(array, key){
        let copyArr = array
        return copyArr.sort(function(a, b) {
            const x = a[key]; 
            const y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
    }

    checkUncheckTodo(index, status){
        this.todoList[index].done = status

        return this.todoList[index]
    }

    getDoneTodos() {
        const filteredArr = [...this.todoList].filter(todo => todo.done === true)

        return filteredArr
    }

    getUnDoneTodos(){
        const filteredArr = [...this.todoList].filter(todo => todo.done === false)

        return filteredArr
    }
}