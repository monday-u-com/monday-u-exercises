#!/usr/bin/env node
import { Command } from "commander";
import figlet from 'figlet';
import PokemonClient from "./pokemonClient.js";
import {
  addTodo,
  showTodos,
  deleteTodo,
  displayAscii,
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
  .argument("<string>", "input")
  .action(async (newTask) => {
    if (isNaN(newTask)) {
      return addTodo({ name: newTask, pokemonId: -1 });
    }
    pokemonClient.fetchPokemon(newTask).then((data) => {
      console.log(chalk.Blue(`Great ${data.name} was Added`));
      return addTodo({
        name: `YEAH! you just caught ${data.name} Cool! ◓ 🐾`,
        pokemonId: data.id,
      });
    });
    

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
  .action(async (pokemonId) => {
    await displayAscii(pokemonId);
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
