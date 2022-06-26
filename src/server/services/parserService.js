const closedListOfValues = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "pikachu",
];

function parseInputValue(inputValue) {
  // return the modified data.

  let inputValues = inputValue.split(/\s*,\s*/);

  let results = [];
  let dictionary = {
    pokemons: [],
    tasks: [],
  };

  for (let textItem of inputValues) {
    const checkIfTextItemIsNum = /^\d+$/.test(textItem);
    if (checkIfTextItemIsNum) {
      //inputValue is a number

      let result = { itemName: textItem, isPokemon: true };
      results.push(result);
      dictionary.pokemons.push(result);
      continue;
    }

    //this is a text item
    const wordsInTodo = textItem.split(" ");
    let isInClosedList = false;

    wordsInTodo.forEach((element) => {
      if (closedListOfValues.includes(element)) {
        let result = { itemName: textItem, isPokemon: true };
        results.push(result);
        dictionary.pokemons.push(result);
        isInClosedList = true;
      }
    });
    //textItem is a task
    if (!isInClosedList) {
      let result = { itemName: textItem, isPokemon: false };
      results.push(result);
      
      dictionary.tasks.push(result);
    }
  }

  return dictionary;
}

module.exports = {
  parseInputValue,
};
