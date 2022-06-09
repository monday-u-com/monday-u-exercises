#!/usr/bin/env node

import { Command } from "commander";
import chalkAnimation from "chalk-animation";
import figlet from 'figlet';
import PokemonClient from "./pokemonClient.js";
import {
  addTodo,
  showTodos,
  deleteTodo,
  displayAscii,
  inputOfNums
} from "./itemManager.js";
import inquire from "./inquire.js";


const program = new Command();
const pokemonClient = new PokemonClient();

function todoMsg(){
  figlet('ToDo`s By KUPER!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
  });
  } 


program.name("Todo App CLI").
description(`The Coolest CLI out there!`).
version("1.0.0");

program
  .command("add")
  .description(
    `To add an new Todo just run $node index.js add <Todo string>`
  )
  .argument("<string>", "newTask")
  .action(async (newTask) => {
    // If argument is passed
    if(newTask){
      // Check if Pokemon or not
      if (inputOfNums(newTask)) {
        pokemonClient.fetchPokemon(newTask).then((data) => {
          return addTodo({
            name: `YEAH! you just caught ${data.name} Cool! ◓ 🐾`,
            pokemonId: data.id,
          });
      
        });
        
    }else{
      console.log(`Great ${newTask} was Added`);
      return addTodo({ name: newTask.split(" "), pokemonId: -1 });
    }   
  
  }
  });

program
  .command("get")
  .description(
    `To See all The todos you have run $node index.js get `
  )
  .action(async () => {
    await showTodos();
  });

program
  .command("delete")
  .description(
    `To Delete a spcific todo by id run $node index.js delete <todo number>`
  )
  .argument("<number>", "id")
  .action(async (id) => {
    await deleteTodo(id);
  });

program
  .command("img")
  .description(
    `
  COOL and MindBLowing options to see the pokemon IMG in your console.
  just run :  $node index.js img <pokemon ID>`
  )
  .argument("<number>", "id")
  .action(async (id) => {
    await displayAscii(id);
  });
program.command("help").description("Help Menu").action(async ()=>{
  
  todoMsg();
  console.log(`  add : To add an todo just run $node index.js add <Todo string>
  delete : To Delete a spcific todo by id run $node index.js delete <todo number>
  get : To See all The todos you have run $node index.js get `);
})
program.command("inquire").description("inquire").action(async ()=>{
  
  inquire();
})
program.parse();
