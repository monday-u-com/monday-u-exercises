import chalk from "chalk";
import Parser from "../services/parser.js";
import ItemManager from "../services/itemManager.js";

export async function deleteAll() {
  const itemManager = new ItemManager();
  
  itemManager.load();
  itemManager.itemList = []
  itemManager.save();
  return console.log(chalk.bgRedBright("Your list was deleted\nThe list is empty"))
 

 
}
