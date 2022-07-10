const pokemonClinet = require("../clients/pokemonClient.js");
const { items } = require("../db/models");

class ItemManager {
  constructor() {
    this.itemsArray = [];
    this.taskToDbPath = "../server/db/taskToDb.json";
  }

  async getAll() {
    try{
      this.itemsArray = await items.findAll({raw : true});
      return this.itemsArray;
    }catch(err){
      throw new Error(err)
    }
  }

  async deleteAll() {
    try{
    this.itemsArray = [];
    await items.destroy({
      where :{},
      truncate : true,
    });
  }
    catch(err){
    console.log('Error While delete an Item');
    throw new Error(err) 
    
  }
}
  async checkByPokemonName(pokemon,itemToRender) {
   try{
    const pokemonIsExist = await this.exsitInDb(pokemon.id);
    if (!pokemonIsExist){
      const task = this.pokemonInit(
        1,
        pokemon.name,
        pokemon.sprites.front_default,
        pokemon.id
      );
    this.itemsArray.push(task);
    await items.bulkCreate([task]);
    return [task];
   }
   return itemToRender;
  }
  catch(err){
  throw new Error(err);
  }
  }

  async getPokemonById(filteredArr,itemToRender) {
    try {
      const pokemons = await pokemonClinet.fetchPokemon(filteredArr);

      pokemons.forEach((pokemon) => {
        const task = this.pokemonInit(
          1,
          pokemon.name,
          pokemon.sprites.front_default,
          pokemon.id
        );
        this.itemsArray.push(task);
        itemToRender.push(task);
      });
      await items.bulkCreate(itemToRender);
    } catch (e) {
      let pokemonId = "";
      filteredArr.forEach((task) => {
        pokemonId += task + " ";
      });
      const task = this.pokemonInit(
        0,
        `pokemon with id: ${pokemonId} was not found`
      );
      this.itemsArray.push(task);
      itemToRender.push(task);
      await items.bulkCreate(itemToRender);
    }
    return itemToRender;
  }
  // generate UUID number
  uuidGeneration() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  async addItem(isPokemon, inputArray) {
    const itemToRender =[];
    if (!isPokemon) {
      const isPokemon = await pokemonClinet.checkByPokemonName(inputArray[0]);
      if (isPokemon) return this.checkByPokemonName(isPokemon,itemToRender);
    }
    if (isPokemon) {
      const filteredArr = this.itemToAdd(inputArray);
      if (filteredArr.length === 0) return itemToRender;
      return this.getPokemonById(filteredArr,itemToRender);
    } else {
      const task = this.pokemonInit(false, inputArray[0]);
      this.itemsArray.push(task);
      itemToRender.push(task);
      await items.bulkCreate(itemToRender)
      return itemToRender;
    }
  }

  pokemonInit(isPokemon, item, imageUrl = null, pokemonId = null) {
    const itemId = this.uuidGeneration();
    const task = {
      itemId: itemId,
      itemName: item,
      item: item,
      imageUrl: imageUrl,
      isPokemon: isPokemon,
      pokemonId: pokemonId,
      status:false
    };
    return task;
  }

  async deleteItem(itemId) {
    try {
      const indexId = this.itemsArray.findIndex((item)=>{
        item.itemId === itemId;
      });
      this.itemsArray.splice(indexId,1);
      await items.destroy({ where: { itemId: itemId } });
    } catch (err) {
      throw `There is no task with id: ${itemId} `;
    }
  }
  itemToAdd(arr) {
    const pokemonsIdArr = this.itemsArray
      .filter((obj) => obj.isPokemon)
      .map((obj) => obj.pokemonId.toString());
    return arr.filter((id) => !pokemonsIdArr.includes(id));
  }
  async exsitInDb(pokemonId) {
    try {
      const pokemonItemDb = await items.findOne({
        where: { pokemonId : pokemonId },
        raw: true,
      });
      if (pokemonItemDb!==null&& pokemonItemDb.pokemonId === pokemonId) return true;
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  }
  async statusUpdateDb(itemId,newStatus){
    try{
      const status = newStatus
      await items.update({status},{ where: { itemId: itemId } })
    }
    catch(err)
  {
throw new Error(err)
  }
}
async editTodoNameInDb(itemId, newTaskName) {
  try {
    const item = newTaskName;
    await items.update({ item }, { where: { itemId: itemId } });
  } catch (err) {
    throw new Error(err);
    }
  }
}


module.exports = new ItemManager();