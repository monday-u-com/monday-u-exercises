import { PokemonClient } from './PokemonClient.js';
import * as fs from 'fs';

export async function addItem(item) {
  const writeStream = fs.createWriteStream('tasks.txt', { flags: 'a' });
  const isNumber = !isNaN(item);
  let newTask;

  if (isNumber) {
    newTask = await addPokemon(item);
  } else {
    newTask = item;
  }
  if(newTask){
  writeStream.write(`${newTask}\n`, (err) => {
    if (err) {
      console.log('task was not added');
    } else {
      console.log('task was added succesfuly!');
    }
  });
}
  return newTask;
}

async function addPokemon(id) {
  const pokemonClient = new PokemonClient();
  const result = await pokemonClient.fetchSinglePokemon(id);
  if (typeof result === 'string') {
    console.log(result);
    return '';
  } else {
  return result.task;
  }
}

export async function addOnlyPokemons(pokemons) {
  const writeStream = fs.createWriteStream('tasks.txt', { flags: 'a' });
  const pokemonClient = new PokemonClient();
  const result = await pokemonClient.fetchPokemons(pokemons);

  if (typeof result === 'string') {
    console.log(result);
    return;
  } else {
    result.forEach((task) => {
      writeStream.write(`${task.task}\n`, (err) => {
        if (err) {
          console.log('task was not added');
        } else {
          console.log('task was added succesfuly!');
        }
      });
    });
  }
}

export function removeItem(idx) {
  const fileData = fs.readFileSync('tasks.txt').toString();
  const tasksArray = fileData.split('\n').filter((task) => task !== '');

  if (idx > tasksArray.length - 1 || idx < 0) {
    console.log('index is invalid!');
    return;
  }

  tasksArray.splice(idx, 1);

  const newData = tasksArray.join('\n');
  const writeStream = fs.createWriteStream('tasks.txt');

  writeStream.write(newData, (err) => {
    if (err) {
      console.log('something went wrong');
    } else {
      console.log('task was deleted successfuly');
    }
  });
}

export function removeAll() {
  const writeStream = fs.createWriteStream('tasks.txt');

  writeStream.write('', (err) => {
    if (err) {
      console.log('something went wrong');
    } else {
      console.log('All tasks where deleted');
    }
  });
}

export function printTasks() {
  const fileData = fs.readFileSync('tasks.txt', 'utf8');
  console.log(fileData);
}

/*   export async function addPokemons(ids) {
    const pokemonsArray = ids.split(',');
    const pokemonClient = new PokemonClient();
    let result;
    if (pokemonsArray.length === 1) {
      result = await pokemonClient.fetchSinglePokemon(pokemonsArray);
    } else {
      result = await pokemonClient.fetchPokemons(pokemonsArray);
    }
    result.forEach((pokemon) => {
      if (!this.todos.find((p) => p.id === pokemon.id)) {
        this.todos.push(pokemon);
      }
    });
  }
 */
