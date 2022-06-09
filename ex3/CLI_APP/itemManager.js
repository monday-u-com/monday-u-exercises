import { createWriteStream } from "fs";
import { promises as fs } from "fs";
import chalk from "chalk";

import { pokemonAscii, textToAscii } from "./ascii.js";

let todosArray = [];
const TODOS_FILE = "todos.json";

// Check if input include numbers or not .
export async function inputOfNums(input){
  const regex = (/^[\d,]+$/);
  return regex.test(input);
}
//  Function for Add a todo
export async function addTodo(data) {
  let tempTodoArray = await getTodos();
  try {
    tempTodoArray.push(data);
    writeToFile(tempTodoArray);
    todosArray = [...tempTodoArray];
    console.log(chalk.bgGreen("New Todo Was Added Successfully!"));
    
    
  } catch (err) {
    console.log(err);
  }
}

async function writeToFile(newTodosArray) {
  await fs.writeFile(TODOS_FILE, JSON.stringify(newTodosArray, null, 2));
}

async function getTodos() {
  try {
    todosArray = await JSON.parse(await fs.readFile(TODOS_FILE));
    return [...todosArray];
  } catch {
    createWriteStream(TODOS_FILE);
    return [...todosArray];
  }
}

export async function showTodos() {
  const allTodos = await getTodos();
  allTodos.forEach((todo) => {
    console.log(chalk.bgBlue(todo.name));
  });
}

export async function deleteTodo(id) {
  let tempArray = await getTodos();
  const deletedTodo = tempArray[id].name;
  tempArray.splice(id, 1);
  try {
    writeToFile(tempArray);
    console.log(chalk.red.strikethrough(deletedTodo));
    todosArray = [...tempArray];
  } catch (err) {
    console.log(err);
  }
}

export async function displayAscii(id) {
  const currentTodosArray = await getTodos();
  let asciiTodo = currentTodosArray[id];
  console.log(asciiTodo)
  if (asciiTodo.pokemonId !== -1) {
    console.log(pokemonId)
    await pokemonAscii(asciiTodo.pokemonId);
    return;
  }
  textToAscii(asciiTodo.name);
  return;
}
