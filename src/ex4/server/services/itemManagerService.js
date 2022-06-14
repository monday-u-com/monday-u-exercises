
const fs = require('fs').promises;
const itemFile = './server/data/itemsList.json'
const { v4: ideKeyGen } = require('uuid');


async function getAllItems() {
    return await readItemFile();
}


async function addItem(item) {
  
    let data = await readItemFile();
    if (!data) {
        data = [];
    }
  
    item.itemId = ideKeyGen()
    data.push(item);
    await writeToItemFile(data);
}

async function getItemById(itemId) {
    const data = await readItemFile();
    return data.find((item) => item.itemId === itemId);
}

async function deleteItem(itemId) {
    const data = await getAllItems();
    const index = data.findIndex((item) => item.itemId === itemId);
   
    const deletedItem = data[index]
    data.splice(index, 1);
    console.log(deletedItem)
    await writeToItemFile(data);
    return deletedItem
}


async function readItemFile() {
    try {
        const data = await fs.readFile(itemFile);
        return JSON.parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeToItemFile(content) {
    try {
        await fs.writeFile(itemFile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}


module.exports = {
    addItem,
    getAllItems,
    getItemById,
    deleteItem,
};
