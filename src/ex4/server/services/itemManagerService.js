const fs = require("fs")

const itemFile = "./server/data/itemsList.json";
const { v4: ideKeyGen } = require("uuid");

async function getAllItems() {
  return await readItemFile();
}

async function addItem(data) {


  return await writeToItemFile(data);
  
  
}



function addMultipleItems(items) {
  items.forEach((item) => {
    addItem(item);
  });
}

function isPokemonExist(data, pokemonName){
    const pokemonExist = data.find(item => item.name === pokemonName)
    return pokemonExist
}

async function getItemById(itemId) {
  const data = await readItemFile();
  return data.find((item) => item.itemId === itemId);
}

async function deleteItem(itemId) {
  const data = await getAllItems();
  const index = data.findIndex((item) => item.itemId === itemId);

  const deletedItem = data[index];
  data.splice(index, 1);

  await writeToItemFile(data);
  return deletedItem;
}

async function readItemFile() {
  try {
    const data = await fs.readFileSync(itemFile);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeToItemFile(content) {
  try {
     fs.writeFileSync(itemFile, JSON.stringify(content));
   return "file written"
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`);
  }
}

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  deleteItem,
  addMultipleItems,
  readItemFile,
  writeToItemFile,
  isPokemonExist,
};
