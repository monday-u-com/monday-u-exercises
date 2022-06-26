const pokemonApi = require('../clients/pokemon_client');
const { Op } = require('sequelize');
const { Item } = require('../../db/models');
const { v4: uuidv4 } = require('uuid');
const pokemonClient = new pokemonApi();

class ItemManager {
  constructor() {
    this.pokemonClient = new pokemonApi();
  }

  getAll = async () => await Item.findAll({ order: [['createdAt', 'DESC']] });

  deleteAll = async () =>
    await Item.destroy({
      truncate: true,
    });

  deleteItem = async (id) =>
    await Item.destroy({
      where: {
        Id: id,
      },
    });

  changeState = async (id) => {
    const item = await Item.findOne({ where: { Id: id } });
    const newStatus = !item.status;
    await Item.update({ status: newStatus }, { where: { Id: id } });
  };

  editItem = async (id, text) => {
    await Item.update({ pokemonId: null, ...text }, { where: { Id: id } });
  };
  addTasksOrPokemons = async (tasks) => {
    const pokemonsRegisterd = await Item.findAll({
      where: { pokemonId: { [Op.ne]: null } },
    });
    const pokemonsIds = pokemonsRegisterd.map((item) => '' + item.pokemonId);
    const tasksFiltered = tasks.filter((task) => !pokemonsIds.includes(task));

    const result = await pokemonClient.fetchPokemons(tasksFiltered); // fetch only new pokemons
    const array = result.map((item) => {
      if (typeof item === 'object') {
        return {
          id: uuidv4(),
          ItemName: `Catch ${item.name}`,
          status: false,
          pokemonId: item.id,
        };
      } else {
        return { id: uuidv4(), ItemName: item, status: false, pokemonId: null };
      }
    });

    return await Item.bulkCreate(array);
  };
}

module.exports = new ItemManager();
