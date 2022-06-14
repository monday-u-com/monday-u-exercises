import chalk from "chalk";
import ItemManager from "../services/itemManager.js";
import Parser from "../services/parser.js";
import PokemonClient from "../services/pokemonClient.js";

export  async function add(inputValue) {
  const parser = new Parser();
  const itemManager = new ItemManager();
  const pokemonClient = new PokemonClient();
  await itemManager.load()

  const dictionary = parser.parseInputValue(inputValue);
  itemManager.addMultipleTasksToList(dictionary.tasks);
  const fetchedPokemons = pokemonClient.fetchMultiplePokemons(
    dictionary.pokemons
  );

  Promise.all(fetchedPokemons).then((values) => {
    //all promises arrived
    const errorsId = [];
    for (const value of values) {
      const pokemonName = value.data.name;
      const pokemonData = value.data;

      const isPokemonExist = itemManager.isPokemonExists(pokemonName);

      if (isPokemonExist) {
        console.log(chalk.red(`${pokemonName} is already in list`));
        continue; //if pokemon exist continue to the next pokemon
      }

      if (!value.error && !isPokemonExist) {
        // pokemon does not exist and is not error , add it to the list
        itemManager.addToItemList(pokemonName, true, pokemonData);
      }

      if (value.error) {
        errorsId.push(pokemonData);
      }
    }

    if (errorsId.length == 1) {
      console.log(`Pokemon with id ${errorsId[0]} was not found`);
    }
    if (errorsId.length > 1) {
      const errorsToString = errorsId.join(",");

      console.log(`Failed to fetch data with input:${errorsToString}`);
    }
  });
}
