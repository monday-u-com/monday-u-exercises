import actionTypes from "../actions/constants";

const initialState = {
	items: [],
	lastAction: null,
};

const itemsEntitiesReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_ITEMS:
			return { ...state, items: action.payload };

		case actionTypes.ADD_ITEM:
			return {
				...state,
				items: [...state.items, ...action.payload],
				lastAction: {
					itemId: action.payload[0].id,
					actionType: "add",
					actionMessage: "Successfully created",
				},
			};

		case actionTypes.DELETE_iTEM:
			const newItemsArr = state.items.filter(
				(item) => item.id !== action.payload.itemId
			);
			return {
				...state,
				items: newItemsArr,
				lastAction: {
					itemId: action.payload.id || action.payload.itemId,
					actionType: "delete",
					actionMetaData: action.payload.strToRecreate,
					actionMessage: "Successfully deleted",
				},
			};

		case actionTypes.UPDATE_ITEM:
			const itemToUpdateIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			const itemToUpdate = state.items.splice(itemToUpdateIndex, 1)[0];
			const actionMetaData = { ...itemToUpdate };
			itemToUpdate.status = action.payload.status;
			itemToUpdate.itemName = action.payload.itemName;
			state.items.splice(itemToUpdateIndex, 0, itemToUpdate);
			const newState = {
				...state,
				items: [...state.items],
				lastAction: {
					itemId: action.payload.id,
					actionType: "update",
					actionMetaData,
					actionMessage: "Successfully created",
				},
			};

			return newState;
		default:
			return state;
	}
};

export default itemsEntitiesReducer;
