import inquirer from "inquirer";
import { addTodo,getTodo,deleteTodo,createListTodo} from "./utils.js";

await createListTodo();
  
function addTodoInquirer(){
  inquirer
    .prompt({
      type: "input",
      name: "todo",
      message: "input what's your todo?"
    })
    .then((answers) => {
      addTodo(answers.todo,{color:'red'});
    })
}

function deleteTodoInquirer(){
  inquirer
    .prompt({
      type: "list",
      name: "id",
      message: "Select todo to delete",
      choices: itemManager.todoList.map((todo) => todo)
    })
    .then((answers) => {
      deleteTodo(answers.id,{color:'red',deleteName:'n'});
    })
 }

inquirer
  .prompt({
    type: "list",
    name: "whatDo",
    message: "What do you want to do??",
    choices: ["Add todo", "Delete todo", "Get listTodo", "Exit"]
  })
  .then((answers) =>{
    if (answers.whatDo=='Add todo') addTodoInquirer();
    if (answers.whatDo=='Delete todo') deleteTodoInquirer();
    if (answers.whatDo=='Get listTodo') getTodo({color:'red'});
    if (answers.whatDo=='Exit') console.log('good bye');
  })
  .catch((error) =>{
    if (error.isTtyError){
      console.log("Your console environment is not supported!")
    } else{
      console.log(error)
    }
  })