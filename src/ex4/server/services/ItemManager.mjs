import FileManager from '../clients/FileManager.mjs';
import { GetPokemonById, GetPokemonsByList } from './PokemonService.mjs';
const file_manager = new FileManager();

async function ReadTasks() {
  try {
    // get json object
    const file_read_promise = await file_manager.ReadFromFileTasks();
    // assing json object to tasks
    return file_read_promise;
  } catch (error) {
    console.log(error);
  }
}

async function WriteTasks(tasks) {
  try {
    // set json object to file
    await file_manager.WriteToFileTasksArray(tasks);
  } catch (error) {
    console.log(error);
  }
}

async function GetTasksFromFile() {
  return await ReadTasks();
}

async function AddRegularTask(task) {
  const tasks = await GetTasksFromFile();
  tasks.push({ name: task, id: 'Regular task', completed: false });
  await WriteTasks(tasks);
};

async function AddPokemon(pokemon_id) {
  try {
    const tasks = await GetTasksFromFile();
    const pokemon = await GetPokemonById(pokemon_id);
    InsertPokemon(pokemon, tasks);
    await WriteTasks(tasks);
  } catch (error) {
    if(error.response.status === 404)
    {
      const err = new Error(`Pokemon with ID ${pokemon_id} was not found`);
      err.statusCode = 404;
      throw err;      
    }
    throw error;
  }
};

async function AddPokemons(list) {
  try {
    const tasks = await GetTasksFromFile();
    const pokemons = await GetPokemonsByList(list);
    const errors = [];
    pokemons.forEach((pokemon) => {
      try
      {
        InsertPokemon(pokemon, tasks);
      }catch(error)
      {
        errors.push(error);
      }      
    });
    if(errors.length)
      throw errors;
    await WriteTasks(tasks);
  } catch (error) {
    throw error;
  }
}

async function DeleteTasks() {
  await WriteTasks([]);
}

async function DeleteTask(task_id) {
  const tasks = await GetTasksFromFile();
  tasks.splice(task_id, 1);
  await WriteTasks(tasks);
}

async function CompleteTask(task_id) {
  const tasks = await GetTasksFromFile();
  tasks[task_id].completed = !tasks[task_id].completed;
  await WriteTasks(tasks);
}

async function SortTasksByName() {
  const tasks = await GetTasksFromFile();
  tasks.sort((a, b) => {
    // tasks object has name or data for error
    const item1 = a.name;
    const item2 = b.name;
    if (typeof item1 === 'undefined' || typeof item2 === 'undefined')
      throw new Error('Task is undefined');
    return item1.toLowerCase().localeCompare(item2.toLowerCase());
  });
  await WriteTasks(tasks);
}

function CheckIfPokemonExists(tasks, id) {
  return tasks.find((task) => task.id === id);
}

function InsertPokemon(pokemon, tasks) {
  try {
    if (!CheckIfPokemonExists(tasks, pokemon.id))
      tasks.push({ name: pokemon.name, images: pokemon.images, id: pokemon.id, completed: false });
    else {
      const error = new Error(`Pokemon Exists with id: ${pokemon.id}`);
      error.statusCode = 409;
      throw error;
    }
  }
  catch (error) {
    throw error;
  }
}

const ItemManagerService = {
  GetTasksFromFile,
  AddPokemon,
  AddPokemons,
  AddRegularTask,
  DeleteTask,
  DeleteTasks,
  CompleteTask,
  SortTasksByName
};

export default ItemManagerService;
