import chalk from "chalk";
import inquirer from 'inquirer';
import Main from './main.js';
import Image from 'ascii-art-image'

const main = new Main();

const EMPTY_LIST = chalk.bold.bgGrey("empty list")
const FULL_LIST = chalk.bold.green("full list:")
const DONE = chalk.bold.green("done")
const UNDONE = chalk.bold.red("undone")
const NOT_VALID_NUMBER = chalk.bold.red("The index should be number")
const NOT_VALID_INDEX = chalk.bold.red("invalid index")
const EMPTY_TODO = chalk.bold.red("can't add empty todo")
const NEW_TODO = chalk.bold.blue('added new todo/s')
const CLEAR_ALL_TODOS = chalk.bold.redBright("clear all todos")
const NO_CHANGE = chalk.bold.red("no change")
const NOT_POKEMON = chalk.bold.red("that's is not a Pokemon")

export function getFullCurrentList(data){

    if (data.length === 0) {
      console.log(EMPTY_LIST)
      return
    }
  
    console.log(FULL_LIST)
  
    data.forEach((todo, index) => {
        const indexText = chalk.bold.cyanBright(index)
        const titleText = chalk.bold.magenta(todo.title)
        const doneUndoneText = todo.done ? DONE : UNDONE
        console.log(`${indexText}: ${titleText} is ${doneUndoneText}`)
    })
}

export function isValidNumber(value){
    if(isNaN(value)) {
      console.log(NOT_VALID_NUMBER)
      return false
    }
  
    return true
}

export function indexValidation(value){
    if(value === null){
      console.log(NOT_VALID_INDEX)
      return false
    }
  
    return true
}

export function showFullUpdatedList() {
  const data = main.itemManager.getTodoList()
  getFullCurrentList(data)
}

export function addAndShowAddedTodo(todo) {
    if(todo.trim() === ""){ 
        console.log(EMPTY_TODO)
        return
    }
    const prevLength = main.itemManager.getTodoList().length
      main.addTodo(todo)
      setTimeout(() => { //wait untill the async todo operation done
        const currLength = main.itemManager.getTodoList().length
        const diff = currLength - prevLength
        const data = main.itemManager.getTodoList()
        console.log(NEW_TODO)
        for (let i = 0; i < diff; i++) {
          console.log(chalk.bold.green(data[data.length-i-1].title))
        }
      },1000)
}

export function addTodoToList() {
    inquirer.prompt({
      type: 'input',
      name: 'addTodo',
      message: 'add new todo/single pokemon/multi pokemons - \nfor one pokemon write a number, \nfor multiple pokemons write a numbers seprate in comma, \nfor regular todo write a string with todo\n', 
    })
    .then(answers => {
      addAndShowAddedTodo(answers.addTodo)
    })
}

export function deleteTodoFromList() {
  inquirer.prompt({
    type: 'number',
    name: 'deleteTodo',
    message: 'enter the index for todo that you want to delete', 
  })
  .then(answers => {
    if(!isValidNumber(answers.deleteTodo)) return

    const deleteItem = main.deleteTodo(answers.deleteTodo)

    if(!indexValidation(deleteItem)){
      return
    }
    else{
      console.log(`deleted ${chalk.bold.blue(deleteItem.title)}`)
    }
  })
}

export function clearAllTodosFromList(){
    inquirer.prompt({
      type: 'confirm',
      name: 'clearTodo',
      message: 'are you sure you want to reset all the list?', 
    })
    .then(answers => {
      if(answers.clearTodo === true){
        console.log(CLEAR_ALL_TODOS)
        main.clearAllTodos()
        showFullUpdatedList()
      }
      else{
        console.log(NO_CHANGE);
        return
      }
    })
  }

export function editTodoFromList(){
    inquirer.prompt({
      type: 'number',
      name: 'editTodoIndex',
      message: 'enter the index for todo that you want to edit', 
    })
    .then(answers => {
      if(!isValidNumber(answers.editTodoIndex)) return
      
      const getIndexData = main.getDataInIndex(answers.editTodoIndex)
      
      if(!indexValidation(getIndexData)) {
        return
      }
      
      confirmEdit(answers.editTodoIndex, getIndexData)
    })
}
  
function confirmEdit(editedIndex, getIndexData){
    inquirer.prompt({
      type: 'confirm',
      name: 'confirmEdit',
      message: `data in index ${editedIndex} is ${getIndexData.title}, are you want to change it?`, 
    })
    .then(confirm => {
      if(confirm.confirmEdit === false) {
        return
      }
  
      editData(getIndexData.title, getIndexData.index)
    })
}
  
function editData(title, index) {
    inquirer.prompt({
      type: 'input',
      name: 'editTodo',
      message: `change ${title} to:`, 
    })
    .then((edit) => {
      if(edit.editTodo === "") {
        console.log(NO_CHANGE);
        return
      }
  
      const editedValue = main.editDataInIndex(edit.editTodo, index);
      const indexText = chalk.bold.cyan(index)
      const titleText = chalk.bold.green(editedValue.title)
      console.log(`data in index ${indexText} changed to ${titleText}`)
    })
}

export function orderList(){
  inquirer.prompt({
    type: 'list',
    name: 'listOptions',
    message: 'which order do you want to list?', 
    choices:[
      "alphabetichal list order",
      "reverse alphabetichal list order",
      "done to undone order",
      "undone to done order"
    ]
  })
  .then(answers => {
    const answer = answers.listOptions
    switch(answer){
      case "alphabetichal list order":
        main.orderDataAlphabetically()
        break;

      case "reverse alphabetichal list order":
        main.orderDataAlphabeticallyReverse()
        break;

      case "done to undone order":
        main.orderDoneToUnDone()
        break;

      case "undone to done order":
        main.orderUnDoneToDone()
        break;
    }
    showFullUpdatedList()
  })
}

export function checkOrUncheckTodo() {
  inquirer.prompt({
    type: 'number',
    name: 'checkUncheckTodoIndex',
    message: 'enter the index for todo that you want to check or uncheck', 
  })
  .then(answers => {
    if(!isValidNumber(answers.checkUncheckTodoIndex)) return

    selectCheckOrUncheck(answers.checkUncheckTodoIndex)
  })
}

function selectCheckOrUncheck(index) {
  inquirer.prompt({
    type: 'list',
    name: 'checkUncheckOptions',
    message: `check/uncheck the todo in index ${index}`,
    choices: ["check", "uncheck"]
  })
  .then(answers => {
    let status

    if(answers.checkUncheckOptions === "check") {
      status = main.changeDoneStatus(index, true);
    }else if(answers.checkUncheckOptions === "uncheck"){
      status = main.changeDoneStatus(index,false);
    } 

    if(!indexValidation(status)){
      return
    }
    else{
      const data = main.itemManager.getTodoList()
      getFullCurrentList(data)
    }
  })
}

export function getAllDoneOrUndoneTodos() {
  inquirer.prompt({
    type: 'list',
    name: 'listOptions',
    message: 'do you want to get all done or undone todos?', 
    choices:[
      "get all done todos",
      "get all undone todos",
    ]
  })
  .then(answers => {
    const answer = answers.listOptions
    let todos
    switch(answer){
      case "get all done todos":
        todos = main.getDoneTodos()
        break;

      case "get all undone todos":
        todos = main.getUnDoneTodos()
        break;
    }

    getFullCurrentList(todos)
  })
}

export function displayPokemon() {

  inquirer.prompt({
    type: 'number',
    name: 'pokemonIndex',
    message: 'enter the index for pokemon that you want to display'
  })
  .then(answers => {
    if(!isValidNumber(answers.pokemonIndex)) return

    const getIndexData = main.getDataInIndex(answers.pokemonIndex)
    if(!indexValidation(getIndexData)) return

    const data = main.itemManager.getTodoList()
    const {index} = getIndexData
    
    if(!data[index].isPokemon) {
      console.log(NOT_POKEMON)
      return
    }

    let image = new Image({
      filepath: data[index].imagePokemonPath,
      alphabet: "blocks",
      width: 80,
      height: 80
    })
  
    image.write(function(err, rendered){
      console.log(rendered);
    }) 
  })
}
