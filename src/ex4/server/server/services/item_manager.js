const pokemonApi = require('../clients/pokemon_client');
const { Op } = require('sequelize');
const { item } = require('../db/models');
const { v4: uuidv4 } = require('uuid');
const pokemonClient = new pokemonApi();

class ItemManager {
  constructor() {
    this.pokemonClient = new pokemonApi();
  }

  getAll = async (field) => await item.findAll({ order: [[field, 'ASC']] });

  deleteAll = async () =>
    await item.destroy({
      truncate: true,
    });

  deleteItem = async (id) =>
    await item.destroy({
      where: {
        id: id,
      },
    });

  changeStatus = async (id, status) => {
    await item.update({ status: status }, { where: { id: id } });
  };

  editItem = async (id, text) => {
    await item.update({ pokemonId: null, ...text }, { where: { id: id } });
  };
  addTasksOrPokemons = async (tasks) => {
    const uniqueTasks = [...new Set(tasks)]; // remove duplicates
    const pokemonsRegisterd = await item.findAll({
      where: { pokemonId: { [Op.ne]: null } },
    });
    const pokemonsIds = pokemonsRegisterd.map((item) => '' + item.pokemonId);
    const tasksFiltered = uniqueTasks.filter(
      (task) => !pokemonsIds.includes(task)
    );

    const result = await pokemonClient.fetchPokemons(tasksFiltered); // fetch only new pokemons
    const array = result.map((item) => {
      if (typeof item === 'object') {
        return {
          id: uuidv4(),
          name: `Catch ${item.name}`,
          status: false,
          pokemonId: item.id,
        };
      } else {
        return { id: uuidv4(), name: item, status: false, pokemonId: null };
      }
    });

    return await item.bulkCreate(array);
  };
}

module.exports = new ItemManager();
