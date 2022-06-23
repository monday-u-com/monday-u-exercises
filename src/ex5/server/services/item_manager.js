// The ItemManager should go here. Remember that you have to export it.
const { catchPokemons } = require("../clients/pokemon_client");
const { up } = require("../db/migrations/20220623014419-add_status_column");
const { Item } = require("../db/models");
const fs = require("fs").promises;
const TXT_FILE = "myTodoList.txt";

// function _objToArr(propName, objects) {
//   const data = objects?.map((item) => {
//     return item[propName];
//   });
//   return data;
// }

async function getAll() {
  let taskList = await Item.findAll();
  // taskList = _objToArr("ItemName", taskList);
  return taskList;
}

async function addTask(taskJson) {
  const task = taskJson.task;
  let data = [];
  try {
    if (!_isNumbers(task)) {
      data.push(task);
    } else {
      const newTasks = await fetchPokemonsTasks(task); //, await getAll());
      data = [...newTasks];
    }
    // await _writeToFile(data);
    for (const item of data) {
      await Item.create({ ItemName: item, status: false });
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchPokemonsTasks(ids, data) {
  const tasks = [];
  try {
    const data = await getAll();
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

async function deleteTask(task) {
  try {
    await Item.destroy({ where: { ItemName: task } });
  } catch (error) {
    console.error(error.message);
  }
}

async function updateTask(task) {
  const updateTask = {
    ItemName: task.ItemName,
    status: task.status,
  };
  try {
    await Item.update(updateTask, { where: { id: task.id } });
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteAllTasks() {
  try {
    await Item.destroy({
      where: {},
      truncate: true,
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function _writeToFile(taskList) {
  try {
    fs.writeFile(TXT_FILE, taskList.join("\n"));
  } catch (error) {
    console.error(`Error read the file: ${error.message}`);
  }
}

async function _readTasksFile() {
  try {
    let data = await fs.readFile(TXT_FILE, "utf-8");
    data = data.split("\n");
    return data.length === 1 && data[0].length === 0 ? [] : [...data];
  } catch (error) {
    console.error(`Error read the file: ${error.message}`);
  }
}

module.exports = {
  getAll,
  deleteTask,
  addTask,
  deleteAllTasks,
  updateTask,
};
