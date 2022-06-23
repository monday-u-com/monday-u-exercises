const pokemonClinet = require("../clients/pokemonClient.js");
const { Item } = require("../DB/models");
const fs = require("fs").promises;
class ItemManager {
  constructor() {
    this.itemsArray = [];
    this.jsonFile = "tasks_json.json";
  }

  async getAll() {
    try{
      this.itemsArray = await Item.findAll({raw:true});
      return this.itemsArray;
    }catch(error){
      throw new Error(error)
    }
  }

  async deleteAll() {
    try{
    this.itemsArray = [];
    await Item.destroy({
      where :{},
      truncate : true,
    });
  }
    catch(error){
    console.log('Error While delete an Item');
    throw new Error(error) 
    
  }
}
  async checkByPokemonName(pokemon,itemToRender) {
   try{
    const pokemonIsExist = await this.exsitInDb(pokemon.id);
    if (!pokemonIsExist){
      const todo = this.initPokemonTask(
        pokemon.name,
        pokemon.sprites.front_default,
        pokemon.id
      );
    this.itemsArray.push(todo);
    await Item.bulkCreate([todo]);
    return [todo];
   }
   return itemToRender;
  }
  catch(error){
  throw new Error(error);
  }
  }

  async getPokemonById(filteredArr,newItems) {
    try {
      const pokemons = await pokemonClinet.fetchPokemon(filteredArr);
      pokemons.forEach((pokemon) => {
        const task = this.pokemonInit(
          true,
          pokemon.name,
          pokemon.sprites.front_default,
          pokemon.id
        );
        this.itemsArray.push(task);
        this.newItems.push(task);
      });
      await Item.bulkCreate(newItems)
    } catch (e) {
      let pokemonId = "";
      filteredArr.forEach((todo) => {
        pokemonId += todo + " ";
      });
      const todo = this.pokemonInit(
        false,
        `Cannot Find Pokemon with : ${pokemonId} ID`
      );
      this.itemsArray.push(todo);
      this.newItems.push(todo);
      await Item.bulkCreate(newItems)
    }
    return newItems;
  }
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
    this.newItems = [];
    this.readFile();
    if (!isPokemon) {
      const isPokemon = await pokemonClinet.checkByPokemonName(inputArray[0]);
      if (isPokemon) return this.checkByPokemonName(isPokemon,newItems);
    }
    if (isPokemon) {
      const filteredArr = this.itemToAdd(inputArray);
      if (filteredArr.length === 0) return this.newItems;
      return this.getPokemonById(filteredArr,newItems);
    } else {
      const todo = this.pokemonInit(false, inputArray[0]);
      this.itemsArray.push(todo);
      this.newItems.push(todo);
      await Item.bulkCreate(newItems)
      return newItems;
    }
  }

  pokemonInit(isPokemon, item, imageUrl = null, pokemonId = null) {
    const itemId = this.uuidGeneration();
    const task = {
      itemId: itemId,
      itemName: item,
      isPokemon: isPokemon,
      imageUrl: imageUrl,
      pokemonId: pokemonId,
      status:false
    };
    return task;
  }

  async deleteItem(itemId) {
    try {
      await Item.destroy({ where: { itemId: itemId } });
    } catch (error) {
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
      const pokemonItemDb= await Item.findOne({
        where: { pokemonId: pokemonId },
        raw: true,
      });
      if (pokemonItemDb!==null&& pokemonItemDb.pokemonId === pokemonId) return true;
      else return false;
    } catch (err) {
      throw new Error(error);
    }
  }
  async statusUpdateDn(itemId,newStatus){
    try{
      let status = newStatus
      await Item.update({status},{where: {itemId:itemId} })
    }
    catch(error){
    }
    throw new Error(error)
  }
}
module.exports = new ItemManager();
