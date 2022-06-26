const fs = require('fs').promises;
const tasksFile = 'tasks_file.json';
const pokemonApi = require('../clients/pokemon_client');
const pokemonClient = new pokemonApi();
const cache = new Map();

async function addTasksOrPokemons(tasks) {
  let data = await readTasksFile();
  if (!data) {
    data = [];
  }

  const cachedTasks = tasks.filter((task) => !isNaN(task) && cache.has(task)); // find cached tasks (only numbers)

  const result = await pokemonClient.fetchPokemons(
    tasks.filter((item) => !cache.has(item))
  ); // fetch only new requests

  const modifiedResult = result.map((item) => {
    if (typeof item === 'object') {
      return { text: item.task };
    }
    return { text: item };
  });

  const modifiedCache = cachedTasks.map((task) => {
    return { text: cache.get(task) };
  });

  data.push(...modifiedResult, ...modifiedCache);
  await writeToTasksFile(data);

  updateCache(
    tasks,
    result.filter((res) => typeof res === 'object')
  ); //add new pokemon requests to the cache
}

async function deleteTask(task) {
  const fileData = await getAll(); // reading file data
  const taskIndex = fileData.findIndex((value) => value.text === task.text);
  if (taskIndex === -1) {
    return;
  }
  fileData.splice(taskIndex, 1);
  await writeToTasksFile(fileData);
  return task;
}

async function deleteAll() {
  await writeToTasksFile([]);
}

async function getAll() {
  return await readTasksFile();
}

async function readTasksFile() {
  try {
    const data = await fs.readFile(tasksFile);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeToTasksFile(content) {
  try {
    await fs.writeFile(tasksFile, JSON.stringify(content));
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`);
  }
}

function updateCache(keys, values) {
  keys.forEach((key) => {
    if (!isNaN(key) && !cache.has(key)) {
      const value = values.find((val) => parseInt(key) === val.id);
      cache.set(key, value.task);
    }
  });
}

module.exports = {
  addTasksOrPokemons,
  deleteAll,
  deleteTask,
  getAll,
};
