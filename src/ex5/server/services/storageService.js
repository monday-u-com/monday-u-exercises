const { Item } = require("../db/models");

class StorageService {
  getItems = async () => Item.findAll();

  getItem = async (itemId) => {
    return Item.findOne({ where: { itemId: itemId } });
  };

  createItem = async (item) => {
    await Item.create({
      itemId: item.itemId,
      name: item.name,
      isPokemon: item.isPokemon,
      pokemonId: item.pokemonId,
      pokemonData: item.pokemonData,
    });
  };

  createItemsBulk = async (itemsRow) => {
    await Item.bulkCreate(itemsRow);
  };

  deleteItem = async (itemId) => {
    await Item.destroy({ where: { itemId: itemId } });
  };
}

module.exports = new StorageService();
