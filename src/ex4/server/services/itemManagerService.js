
const fs = require('fs').promises;
const itemFile = './server/data/itemsList.json'
const { v4: uuidv4 } = require('uuid');
uuidv4(); 

async function getAllItems() {
    return await readItemFile();
}

async function addItem(item) {
    let data = await readItemFile();
    if (!data) {
        data = [];
    }
    data.push(jedi);
    await writeToItemFile(data);
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
};
