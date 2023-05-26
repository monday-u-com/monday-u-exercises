import item_client from "../../item_client";
import actionTypes from "../actions/constants/index";
import { dispatchIsLoading } from "./itemsViewActions";

const setAllItems = async () => {
	dispatchIsLoading(true);
	const res = await item_client.getAllItems();
	if (res.isResOk) {
		return { type: actionTypes.LOAD_ITEMS, payload: res.items };
	}
};

export const setAllItemsAction = () => {
	return async (dispatch) => {
		dispatch(await setAllItems());
	};
};

const addItems = async (value) => {
	dispatchIsLoading(true);
	const res = await item_client.addItem({ itemName: value });
	if (res.isResOk) {
		return { type: actionTypes.ADD_ITEM, payload: res.items };
	}
};

export const addItemsAction = (value) => {
	return async (dispatch) => {
		dispatch(await addItems(value));
	};
};

const updateItem = async (itemToUpdate) => {
	const res = await item_client.updateItem(itemToUpdate, itemToUpdate.id);
	if (res.isResOk) {
		return {
			type: actionTypes.UPDATE_ITEM,
			payload: res.item,
		};
	}
};

export const updateItemAction = (itemToUpdate) => {
	return async (dispatch) => {
		dispatch(await updateItem(itemToUpdate));
	};
};

const deleteItem = async (itemId, strToRecreate) => {
	const res = await item_client.deleteItem(itemId);
	if (res.isResOk) {
		return {
			type: actionTypes.DELETE_iTEM,
			payload: { itemId, strToRecreate },
		};
	}
};

export const deleteItemAction = (itemId, strToRecreate) => {
	return async (dispatch) => {
		dispatch(await deleteItem(itemId, strToRecreate));
	};
};

const clearAll = async () => {
	const isResOk = await item_client.clearAll();
	if (isResOk) {
		return { type: actionTypes.LOAD_ITEMS, payload: [] };
	}
};

export const clearAllAction = () => {
	return async (dispatch) => {
		dispatch(await clearAll());
	};
};

const undoLastAction = async (lastAction) => {
	const { itemId, actionType, actionMetaData } = lastAction;

	switch (actionType) {
		case "delete":
			return await addItems(actionMetaData);
		case "add":
			return await deleteItem(itemId);
		case "update":
			return await updateItem(actionMetaData);
		default:
	}
};

export const dispatchUndoLastAction = (lastAction) => {
	return async (dispatch) => {
		dispatch(await undoLastAction(lastAction));
	};
};
