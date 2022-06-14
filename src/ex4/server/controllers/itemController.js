

const itemManagerService = require("../services/itemManagerService")


async function createItem(req, res) {
   await itemManagerService.addItem(req.body);
    res.status(200).json(req.body);
}


async function getAllItems(req, res) {
    let data = await itemManagerService.getAllItems();
    if (!data) data = [];
    res.status(200).json(data);
}


module.exports = {
    createItem,
    getAllItems,
};
