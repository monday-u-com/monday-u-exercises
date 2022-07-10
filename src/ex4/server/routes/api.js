// Define your endpoints here (this is your "controller file")
const { Router } = require("express");
const express = require("express");
const ItemManager = require("../services/item_manager.js");
const router = express.Router();
const item_manager = new ItemManager();

router.route("/").get(async (req, res) => {
	try {
		const allItems = await item_manager.getAllItems();
		if (!allItems) {
			throw new Error("something went wrong on getAllItems function.");
		}
		res.status(200).send(allItems);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/add").post(async (req, res) => {
	try {
		const itemsToFetch = await item_manager.validateInput(req.body);
		if (
			(itemsToFetch && itemsToFetch.length != 0 && !itemsToFetch.length) ||
			itemsToFetch.length > 0
		) {
			const creationMessage = await item_manager.handleInput(itemsToFetch);
			if (!creationMessage) {
				throw new Error("something went wrong it's not created.");
			}
			res.status(201).send(creationMessage);
			return;
		}
		throw new Error("this item alredy exist.");
	} catch (err) {
		res.status(500).send(err);
	}
});

router.route("/update/:id").put(async (req, res) => {
	try {
		await item_manager.updateItem(req.body, req.params.id);
		res.status(204);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/delete/:id").delete(async (req, res) => {
	try {
		const allItemsafterDeleted = await item_manager.removeItem(
			parseInt(req.params.id)
		);
		if (!allItems) {
			throw new Error(`filed try to clean the item ${req.params.id}.`);
		}
		res.status(200).send(allItemsafterDeleted);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/clear").delete(async (req, res) => {
	try {
		const numOfDestringItems = await item_manager.clearAllItems();
		if (!numOfDestringItems) {
			throw new Error("filed try to clean the data.");
		}
		res.sendStatus(204);
	} catch (err) {
		res.status(500).send(err.message);
	}
});
module.exports = router;
