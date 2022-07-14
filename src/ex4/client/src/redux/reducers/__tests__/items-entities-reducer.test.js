import itemsEntitiesReducer from "../items-entities-reducer";
import actionTypes from "../../actions/constants";

const initialState = {
	items: [],
	lastAction: null,
};

const items = [
	{
		id: 56,
		name: "Take dog out for a walk",
		status: false,
	},
	{
		id: 32,
		name: "Do the dishes",
		status: true,
	},
];

const itemToAdd = [
	{
		id: 73,
		name: "Take",
		status: false,
	},
];

beforeAll(() => {
	return itemsEntitiesReducer(initialState, {
		type: actionTypes.LOAD_ITEMS,
		payload: items,
	});
});

test("should return the initial state", () => {
	expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual({
		items: [],
		lastAction: null,
	});
});

test("should return list of items", () => {
	expect(
		itemsEntitiesReducer(initialState, {
			type: actionTypes.LOAD_ITEMS,
			payload: items,
		})
	).toEqual({
		items: items,
		lastAction: null,
	});
});

test("should add an item to items array", () => {
	expect(
		itemsEntitiesReducer(initialState, {
			type: actionTypes.ADD_ITEM,
			payload: itemToAdd,
		})
	).toStrictEqual({
		...initialState,
		items: [...initialState.items, ...itemToAdd],
		lastAction: {
			itemId: itemToAdd[0].id,
			actionType: "add",
			actionMessage: "Successfully created",
		},
	});
});
