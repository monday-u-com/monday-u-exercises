const {
  isTextContainOnlyNumbersAndSpaces,
  removeDuplicate,
  removeEmptyString,
} = require("../utils/utils");

function getTasksFromInput(input) {
  let pokemonsIdArr = [];
  let normalTasks = [];
  if (isTextContainOnlyNumbersAndSpaces(input)) {
    pokemonsIdArr.push(input);
  } else if (input.includes(",")) {
    let splittedInputArr = input.split(",");
    pokemonsIdArr = splittedInputArr.filter(isTextContainOnlyNumbersAndSpaces);

    normalTasks = splittedInputArr.filter((text) => {
      return !isTextContainOnlyNumbersAndSpaces(text);
    });
  } else {
    normalTasks.push(input);
  }
  pokemonsIdArr = removeDuplicate(pokemonsIdArr);
  normalTasks = removeDuplicate(normalTasks);
  normalTasks = removeEmptyString(normalTasks);
  const results = { pokemonsIdArr, normalTasks };
  return results;
}
module.exports = {
  getTasksFromInput,
};
