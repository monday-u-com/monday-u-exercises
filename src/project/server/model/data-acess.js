const fs = require('fs');
import { fileURLToPath } from 'url';
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readData(){
    
    return fs.readFileSync(`${__dirname}/todo.json`, 'utf8');
}

function writeData(todoList){

    fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(todoList), err => {
        if(err) {
            console.log(err)
        }
    })
}

module.exports = {readData, writeData}