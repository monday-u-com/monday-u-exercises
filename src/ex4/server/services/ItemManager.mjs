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
  const current_task_length = tasks.length;
  tasks.splice(task_id, 1);
  const after_task_deletion = tasks.length;
  // task id is not in task length
  if (current_task_length === after_task_deletion)
  {
    const error = new Error();
    error.message = 'Task id illegal.';
    error.statusCode = 409;
    throw error;
  }
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
      const error = new Error();
      error.statusCode = 409;
      error.message = `Pokemon Exists with id: ${pokemon.id}`;
      throw error;
    }
  }
  catch (error) {
    // check if its axius error 404 or other error
    if (typeof error.response !== "undefined" && error.response.status === 404)
      tasks.push({ name: `Pokemon with ID ${pokemon.id} was not found`, id: "Error", completed: false });
    else
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
