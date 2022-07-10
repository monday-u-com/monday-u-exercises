import itemClient from "../../item_client";
import actionTypes from "../actions/constants/index";

const setAllItems = async () => {
	const res = await itemClient.getAllItems();
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
	const res = await itemClient.addItem({ itemName: value });
	if (res.isResOk) {
		return { type: actionTypes.ADD_ITEM, payload: res.items };
	}
};

export const dispatchAddItems = (value) => {
	return async (dispatch) => {
		dispatch(await addItems(value));
	};
};

const updateItem = async (itemToUpdate) => {
	const res = await itemClient.updateItem(itemToUpdate, itemToUpdate.id);
	if (res.isResOk) {
		return {
			type: actionTypes.UPDATE_ITEM,
			payload: res.item,
		};
	}
};

export const dispachUpdateItem = (itemToUpdate) => {
	return async (dispatch) => {
		dispatch(await updateItem(itemToUpdate));
	};
};

const deleteItem = async (itemId, strToRecreate) => {
	const res = await itemClient.deleteItem(itemId);
	if (res.isResOk) {
		return {
			type: actionTypes.DELETE_iTEM,
			payload: { itemId, strToRecreate },
		};
	}
};

export const dispatchDeleteItem = (itemId, strToRecreate) => {
	return async (dispatch) => {
		dispatch(await deleteItem(itemId, strToRecreate));
	};
};

const clearAll = async () => {
	const isResOk = await itemClient.clearAll();
	if (isResOk) {
		return { type: actionTypes.LOAD_ITEMS, payload: [] };
	}
};

export const dispatchClearAll = () => {
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
