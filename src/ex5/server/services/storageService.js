const { Item } = require('../db/models');

class StorageService {

getItems = () => Item.findAll();


getItem = async (item_id) => {
    
    return Item.findByIk(item_id);
}

createItem = async item => {
    //TODO 2: Use Player sequelize model to create a player
   
    await Item.create({itemId:item.itemId,name:item.name,isPokemon:item.isPokemon,pokemonId:item.pokemonId,pokemonData:item.pokemonData});
  };

}

module.exports = new StorageService;