// The ItemManager should go here. Remember that you have to export it.
const { catchPokemons } = require("../clients/pokemon_client");
const { Item } = require("../db/models");

async function getAll() {
  let taskList = await Item.findAll();
  return taskList;
}

async function addTask(taskJson) {
  const { task } = taskJson;
  let tasks = [];
  let result = [];
  const data = await getAll();
  const contentList = data.map((item) => item.itemName);
  try {
    if (!_isNumbers(task)) {
      tasks.push(task);
    } else {
      const newTasks = await fetchPokemonsTasks(task);
      tasks = [...newTasks];
    }
    for (let item of tasks) {
      if (!contentList.includes(item)) {
        item = { itemName: item, status: false };
        const create = await Item.create(item);
        result.push(create.dataValues);
      } else {
        throw new Error("Task already exist!");
      }
    }
    return { status: true, data: result };
  } catch (error) {
    console.error(error.message);
    return { status: false, data: error.message };
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
      tasks.push(pokemonTask);
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
    await Item.destroy({ where: { id: task.id } });
    return { status: true };
  } catch (error) {
    console.error(error.message);
    return { status: false, data: error.message };
  }
}

async function updateTask(task) {
  const updateTask = {
    itemName: task.itemName,
    status: task.status,
  };
  try {
    await Item.update(updateTask, { where: { id: task.id } });
    return { status: true };
  } catch (error) {
    console.error(error.message);
    return { status: false, data: error.message };
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

module.exports = {
  getAll,
  deleteTask,
  addTask,
  deleteAllTasks,
  updateTask,
};
