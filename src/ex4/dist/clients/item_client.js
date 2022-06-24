// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

const getAllTasks = async () => {
	try {
		const res = await fetch("/tasks");
		if (res.ok) {
			return res.json();
		}
	} catch (err) {
		return err;
	}
};

const addItem = async (item) => {
	const res = await fetch("/tasks/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
	if (res.ok) {
		return res.status;
	} else {
		return res.status;
	}
};

const updateItem = async (itemToUpdate, itemId) => {
	try {
		const res = await fetch(`/tasks/update/${itemId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(itemToUpdate),
		});
		if (res.ok) {
			return;
		} else {
			throw new Error("not updated");
		}
	} catch (err) {
		return err;
	}
};

const deleteItem = async (itemId) => {
	try {
		const res = await fetch(`/tasks/delete/${itemId}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (res.ok) {
			return res.json();
		}
		throw new Error("No items were deleted Something went wrong");
	} catch (err) {
		return err;
	}
};

const clearAll = async (itemId) => {
	try {
		const res = await fetch(`/tasks/clear`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (res.ok) {
			return res.json();
		}
		throw new Error("No items were deleted Something went wrong");
	} catch (err) {
		return err;
	}
};

export { getAllTasks, addItem, deleteItem, updateItem, clearAll };
