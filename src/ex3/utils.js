import {ItemManager} from "./ItemManager.js";
import {PokemonClient} from "./PokemonClient.js";
import chalk from "chalk";
import fs from "fs/promises";
import fetch from "node-fetch";
import dotenv from "dotenv";

const itemManager = new ItemManager();
const pokemon = new PokemonClient();
const FILE='./listTodo.txt';
const CHOICE = {
  ID: "i",
  NAME: "n"
};
const CHOICE_ARG_DESCRIPTION =
  "Choose how to delete - either i for id or n for name";

dotenv.config();
globalThis.fetch = fetch;
globalThis.itemManager = itemManager;
globalThis.pokemon = pokemon;
globalThis.CHOICE = CHOICE;
globalThis.CHOICE_ARG_DESCRIPTION = CHOICE_ARG_DESCRIPTION;

async function WriteFileTodo(){
  await fs.writeFile(FILE, itemManager.todoList.join("\n"));
}

export async function createListTodo(){
  const data = await fs.readFile(FILE);
  if(data.toString()) itemManager.todoList=data.toString().split("\n");
}

export async function addTodo(todo,options){
  await itemManager.addArrayItem(todo
    .split(',')
    .map(todo => todo.trim())
    .filter(Boolean))
    .then(()=> { WriteFileTodo(); console.log(chalk[options.color](`New todo added successfully`));});
}

export async function getTodo(options){
  if (!itemManager.todoList.length){
    console.log(chalk[options.color]('The ListTodo empty')); 
    return;
  }
  let count=1;
  itemManager.todoList.forEach((todo) =>{
    console.log(chalk[options.color](count+") "+todo)); 
    count++ 
  });
}
  
export async function deleteTodo(id,options){
  switch (options.deleteName) {
    case CHOICE.ID: {
      id--;
      itemManager.deleteIdListTodo(id);
    }
    case CHOICE.NAME: {
      itemManager.deleteNameListTodo(id);
    }
  }
  WriteFileTodo();
  console.log(chalk[options.color](`Todo deleted successfully`));
}

export async function deleteAllTodo(options){
  itemManager.deleteListTodo();
  WriteFileTodo();
  console.log(chalk[options.color](`ListTodo deleted successfully`));
}
