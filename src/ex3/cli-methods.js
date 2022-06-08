import chalk from "chalk";
import inquirer from 'inquirer';
import Main from './main.js';
import Image from 'ascii-art-image'

const main = new Main();

export function getFullCurrentList(data){

    if (data.length === 0) {
      console.log(chalk.bold.bgGrey("empty list"))
      return
    }
  
    console.log(chalk.bold.green("full list:"))
  
    data.forEach((todo, index) => {
        const indexText = chalk.bold.cyanBright(index)
        const titleText = chalk.bold.magenta(todo.title)
        const doneUndoneText = todo.done ? chalk.bold.green("done") : chalk.bold.red("undone")
        console.log(`${indexText}: ${titleText} is ${doneUndoneText}`)
    })
}

export function numberValidation(value){
    if(isNaN(value)) {
      console.log(chalk.bold.red("The index should be number"))
      return false
    }
  
    return true
}

export function indexValidation(value){
    if(value === null){
      console.log(chalk.bold.red("invalid index"))
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
        console.log(chalk.bold.red("can't add empty todo"))
        return
    }
    const prevLength = main.itemManager.getTodoList().length
      main.addTodo(todo)
      setTimeout(() => { //wait untill the async todo operation done
        const currLength = main.itemManager.getTodoList().length
        const diff = currLength - prevLength
        const data = main.itemManager.getTodoList()
        console.log(chalk.bold.blue('added new todo/s'))
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
    if(!numberValidation(answers.deleteTodo)) return

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
        console.log(chalk.bold.redBright("clear all todos"))
        main.clearAllTodos()
        showFullUpdatedList()
      }
      else{
        console.log(chalk.bold.red("no change"));
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
      if(!numberValidation(answers.editTodoIndex)) return
      
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
        console.log(chalk.bold.red("no change"));
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
    if(!numberValidation(answers.checkUncheckTodoIndex)) return

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
    if(!numberValidation(answers.pokemonIndex)) return

    const getIndexData = main.getDataInIndex(answers.pokemonIndex)
    if(!indexValidation(getIndexData)) return

    const data = main.itemManager.getTodoList()
    const {index} = getIndexData
    
    if(!data[index].isPokemon) {
      console.log(chalk.bold.red("that's is not a Pokemon"))
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
