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

        /* try {
            const data = await fs.readFile('./todo.json', { encoding: 'utf8' });
            console.log(data);
            if(data === null){
                this.todoList = []
            }
            else{
                this.todoList = JSON.parse(data)
            } 
          } catch (err) {
            console.log(err);
        } */  

        /* fs.readFile('./todo.json', (err, data) => {
            if(err){
                return
            }
            if(data === null){
                this.todoList = []
            }
            else{
                this.todoList = JSON.parse(data)
            } 
        }) */
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

    checkUncheckTodo(index, status){
        this.todoList[index].done = status
    }
}