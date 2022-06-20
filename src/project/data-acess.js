import fs from 'fs';

export function readData(){
    return fs.readFileSync('./todo.json', 'utf8')
}

export function writeData(todoList){
    fs.writeFile("./todo.json", JSON.stringify(todoList), err => {
        if(err) {
            console.log(err)
        }
    })
}