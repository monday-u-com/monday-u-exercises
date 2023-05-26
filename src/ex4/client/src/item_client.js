// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

const getAllItems = async () => {
	const res = await fetch("/tasks");
	return {
		isResOk: res.ok,
		items: await res.json(),
	};
};

const addItem = async (item) => {
	const res = await fetch("/tasks/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
	return {
		isResOk: res.ok,
		items: await res.json(),
	};
};

const updateItem = async (itemToUpdate, itemId) => {
	const res = await fetch(`/tasks/update/${itemId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(itemToUpdate),
	});
	return {
		isResOk: res.ok,
		item: await res.json(),
	};
};

const deleteItem = async (itemId) => {
	const res = await fetch(`/tasks/delete/${itemId}`, {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
		},
	});
	return { isResOk: res.ok, numOfDestroyedItems: await res.json() };
};

const clearAll = async (itemId) => {
	const res = await fetch(`/tasks/clear`, {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
		},
	});
	return res.ok;
};

const itemClient = {
	getAllItems,
	addItem,
	deleteItem,
	updateItem,
	clearAll,
};

export default itemClient;
