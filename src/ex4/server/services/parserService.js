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
  
      for (let textItem of inputValues) {
        const checkIfTextItemIsNum = /^\d+$/.test(textItem);
        if (checkIfTextItemIsNum) {
          //inputValue is a number
  
          let result = { name: textItem, isPokemon: true };
          results.push(result);
          continue;
        }
  
        //this is a text item
        const wordsInTodo = textItem.split(" ");
        let isInClosedList = false;
  
        wordsInTodo.forEach((element) => {
          if (closedListOfValues.includes(element)) {
            let result = { name: textItem, isPokemon: true };
            results.push(result);
            isInClosedList = true;
          }
        });
        //textItem is a task
        if (!isInClosedList) {
          let result = { name: textItem, isPokemon: false };
          results.push(result);
        }
      }
  
      return results;
    }
  
    module.exports = {
        parseInputValue,
    }
