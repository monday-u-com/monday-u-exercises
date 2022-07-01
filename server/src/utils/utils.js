function removeDuplicate(array) {
  const newArr = [...new Set(array)];
  return newArr;
}

function combineTwoArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}

function isTextContainOnlyNumbersAndSpaces(str) {
  return /^(?=.*\d)[\d ]+$/.test(str);
}

function clearSpacesFromNumber(number) {
  return number.replace(/\s+/g, "");
}

function removeExtraSpaceFromTask(task) {
  return task
    .split(" ")
    .filter((item) => {
      return item !== "";
    })
    .join(" ");
}

function removeAllExceptNumbers(str) {
  return str.replace(/[^\d.]/g, "");
}

function differenceOfTwoArray(arr1, arr2) {
  return arr1.filter((item) => {
    return !arr2.includes(item);
  });
}
function convertTextToLowerCase(arr) {
  return arr.map((text) => {
    return text.toLowerCase();
  });
}

function capitalizeFirstLetter(text) {
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return capitalized;
}

function removeItemFromArray(array, item) {
  const myIndex = array.indexOf(item);
  array.splice(myIndex, 1);
}

function removeEmptyString(normalTasks) {
  const array = normalTasks.filter((task) => {
    return task.trim().length !== 0;
  });
  return array;
}

module.exports = {
  removeItemFromArray,
  capitalizeFirstLetter,
  convertTextToLowerCase,
  differenceOfTwoArray,
  removeAllExceptNumbers,
  removeExtraSpaceFromTask,
  clearSpacesFromNumber,
  isTextContainOnlyNumbersAndSpaces,
  combineTwoArrays,
  removeDuplicate,
  removeEmptyString,
};
