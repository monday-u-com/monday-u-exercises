import ItemManager from "./itemManager.js";
import chalk from "chalk";

const closedListOfValues = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "pikachu",
];

// Implement the `Main` class here
class Parser {
  constructor() {
    this.itemManager = new ItemManager();
  }

  parseInputValue(inputValue) {
    // return the modified data.

    let inputValues = inputValue.split(/\s*,\s*/);
    let dictionary = {
      pokemons: [],
      tasks: [],
    };

    for (let textItem of inputValues) {
      const checkIfTextItemIsNum = /^\d+$/.test(textItem);
      if (checkIfTextItemIsNum) {
        //inputValue is a number
        dictionary.pokemons.push(textItem);
        continue;
      }

      //this is a text item
      const wordsInTodo = textItem.split(" ");
      let isInClosedList = false;

      wordsInTodo.forEach((element) => {
        if (closedListOfValues.includes(element)) {
          dictionary.pokemons.push(element);
          isInClosedList = true;
        }
      });
      //textItem is a task
      if (!isInClosedList) {
        dictionary.tasks.push(textItem);
      }
    }
    return dictionary;
  }
}

export default Parser;
