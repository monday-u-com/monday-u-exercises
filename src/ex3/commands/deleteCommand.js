import chalk from "chalk";
import Parser from "../services/parser.js";
import ItemManager from "../services/itemManager.js";

export async function deleteTask(inputValue) {
  const itemManager = new ItemManager();
  
  itemManager.load();
  const itemList = itemManager.itemList
  
  if(!itemList.length){
    return console.log(chalk.bgRedBright("The list is empty"))
  }
  if(inputValue - 1 >= 0 && inputValue < itemList.length){
  const itemToRemove = itemList[inputValue -1].name
  itemManager.removeFromItemListByIndex(inputValue)
  console.log(chalk.bgYellowBright(`${itemToRemove} was removed successfully`))
  }
  else {
    console.log(chalk.bgYellowBright(`task number ${inputValue} does not exist`))
  }

 
}
