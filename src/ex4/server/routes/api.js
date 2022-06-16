// Define your endpoints here (this is your "controller file")
import { Router } from "express";
import express from "express";
import ItemManager from "../services/item_manager.js";
const router = express.Router();
const item_manager = new ItemManager();

router.route("/").get(async (req, res) => {
	try {
		const allItems = await item_manager.getAllItems();
		if (!allItems.data) {
			throw new Error("something went wrong.");
		}
		res.status(200).send(allItems.data);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/add").post(async (req, res) => {
	try {
		const allItems = await item_manager.validateInput(req.body);
		if (!allItems) {
			throw new Error("something went wrong.");
		}
		res.status(201).json(allItems).send(allItems.data);
	} catch (err) {
		console.log(err);
		res.status(406).send(err.message);
	}
});

router.route("/delete/:index").delete(async (req, res) => {
	try {
		if (req.params.index === "all") {
			const cleanFile = item_manager.clearItemsArray();
			if (cleanFile.data.length > 0) {
				throw new Error("filed try to clean the data.", cleanFile);
			}
			res.status(200).send(cleanFile.data);
		}
		const allItems = await item_manager.removeItem(parseInt(req.params.index));
		res.status(200).send(allItems.data);
	} catch (err) {
		res.status(406).send(err.message);
	}
});
export default router;
