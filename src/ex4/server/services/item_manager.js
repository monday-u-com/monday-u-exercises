// The ItemManager should go here. Remember that you have to export it.
const { catchPokemons } = require("../clients/pokemon_client");

const fs = require("fs").promises;
const TXT_FILE = "myTodoList.txt";

async function getAll() {
  return await _readTasksFile();
}

async function addTask(taskJson) {
  const task = taskJson.task;
  let data = await _readTasksFile();
  if (!data) data = [];
  if (!_isNumbers(task)) {
    data.push(task);
  } else {
    const newTasks = await fetchPokemonsTasks(task, data);
    data = [...data, ...newTasks];
  }
  await _writeToFile(data);
}

async function fetchPokemonsTasks(ids, data) {
  const tasks = [];
  try {
    const pokemonsRawJson = await catchPokemons(ids.split(","));
    pokemonsRawJson?.forEach((pokemonJson) => {
      const pokemonName = pokemonJson.name;
      const pokemonTask = "Catch: " + pokemonName;
      if (data.indexOf(pokemonTask) === -1)
        //task not exist
        tasks.push(pokemonTask);
      else {
        console.log(`Task ${pokemonTask} already exist!`);
      }
    });
  } catch {
    const msg = `Failed to fetch pokemon with this input: ${ids}`;
    tasks.push(msg);
  }
  return tasks;
}

function _isNumbers(input) {
  const arr = input.split(",");
  return arr.every((item) => {
    return !isNaN(item);
  });
}

async function deleteTask(id) {
  let data = await getAll();
  const deletedTask = data[id];
  data.splice(id, 1);
  await _writeToFile(data);
  return deletedTask;
}

async function deleteAllTasks() {
  await _writeToFile([]);
}

async function _writeToFile(taskList) {
  try {
    fs.writeFile(TXT_FILE, taskList.join("\n"));
  } catch (err) {
    console.error(`Error read the file: ${err.message}`);
  }
}

async function _readTasksFile() {
  try {
    let data = await fs.readFile(TXT_FILE, "utf-8");
    data = data.split("\n");
    return data.length === 1 && data[0].length === 0 ? [] : [...data];
  } catch (err) {
    console.error(`Error read the file: ${err.message}`);
  }
}

module.exports = {
  getAll,
  deleteTask,
  addTask,
  deleteAllTasks,
};
